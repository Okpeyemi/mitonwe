"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "@google/model-viewer";
import { MessageSquare } from "lucide-react";

// Chargement dynamique et uniquement côté client
const ModelViewer = dynamic(
  async () => {
    await import("@google/model-viewer");
    return function MV(props) {
      return React.createElement('model-viewer', props);
    };
  },
  { ssr: false }
);

const Preview3D = ({ modelFile }) => {
  const viewerRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [src, setSrc] = useState("voiture.glb");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Utilisez useEffect pour détecter les changements de modelFile
  useEffect(() => {
    if (modelFile && viewerRef.current) {
      console.log("Fichier 3D reçu dans Preview3D:", modelFile.name);
      setLoading(true);
      setError(null);

      try {
        const url = URL.createObjectURL(modelFile);
        console.log("URL créée pour le fichier 3D:", url);
        setSrc(url);

        const viewer = viewerRef.current;

        const onLoad = () => {
          console.log("Modèle 3D chargé avec succès");
          setLoading(false);
        };

        const onError = (event) => {
          console.error("Erreur de chargement du modèle 3D:", event);
          setError("Impossible de charger le modèle 3D. Vérifiez le format du fichier.");
          setLoading(false);
        };

        viewer.addEventListener("load", onLoad);
        viewer.addEventListener("error", onError);

        return () => {
          viewer.removeEventListener("load", onLoad);
          viewer.removeEventListener("error", onError);
        };
      } catch (err) {
        console.error("Erreur lors de la création de l'URL:", err);
        setError("Erreur lors du traitement du fichier");
        setLoading(false);
      }
    }
  }, [modelFile]);

  // Ajouter hotspots & commentaires
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onContextMenu = async (ev) => {
      ev.preventDefault();
      if (!viewer.positionAndNormalFromPoint) return;
      const hit = await viewer.positionAndNormalFromPoint(
        ev.clientX,
        ev.clientY
      );
      if (!hit) return;
      const text = prompt("Ajouter un commentaire :");
      if (!text) return;

      const id = `hotspot-${Date.now()}`;
      const { position, normal } = hit;
      // Création du hotspot
      const btn = document.createElement("button");
      btn.className = "hotspot";
      btn.slot = id;
      btn.dataset.position = `${position.x} ${position.y} ${position.z}`;
      btn.innerText = "💬";

      // Tooltip
      const tip = document.createElement("div");
      tip.className = "comment-tooltip";
      tip.textContent = text;
      btn.appendChild(tip);
      viewer.appendChild(btn);

      setComments((prev) => [
        ...prev,
        { id, comment: text, position, normal },
      ]);
      
      // Ouvrir automatiquement la sidebar quand un commentaire est ajouté
      setShowSidebar(true);
    };

    viewer.addEventListener("contextmenu", onContextMenu);
    return () => viewer.removeEventListener("contextmenu", onContextMenu);
  }, []);

  // Calcul orbit pour recentrer la caméra
  const computeCameraOrbit = (pos) => {
    const { x, y, z } = pos;
    const r = Math.sqrt(x * x + y * y + z * z);
    const theta = (Math.atan2(x, z) * 180) / Math.PI;
    const phi = (Math.acos(y / r) * 180) / Math.PI;
    return `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg ${r.toFixed(2)}m`;
  };

  // Supprimer un commentaire
  const deleteComment = (index) => {
    const toRemove = comments[index];
    const viewer = viewerRef.current;
    if (!viewer) return;
    
    const el = viewer.querySelector(`button[slot="${toRemove.id}"]`);
    if (el) viewer.removeChild(el);
    setComments((prev) => prev.filter((_, i) => i !== index));
  };

  const resetCamera = () => {
    if (viewerRef.current) {
      viewerRef.current.cameraOrbit = "0deg 75deg 2m";
      viewerRef.current.fieldOfView = "30deg";
    }
  };

  // Fonction pour basculer l'affichage de la sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-full relative">
      {/* Zone 3D */}
      <main className={`p-4 ${showSidebar ? "w-[calc(100%-18rem)]" : "w-full"}`}>
        <h2 className="text-xl mb-2">Visualisation 3D & Commentaires</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            Chargement du modèle 3D en cours...
          </div>
        )}

        <div className="relative">
          <ModelViewer
            ref={viewerRef}
            src={src}
            alt="Modèle 3D"
            camera-controls
            auto-rotate
            disable-tap
            interaction-prompt="none"
            style={{ width: "100%", height: "80vh", borderRadius: 8, backgroundColor: "#f5f5f5" }}
          />

          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={resetCamera}
              className="bg-secondary text-white px-3 py-1 rounded shadow"
            >
              Réinitialiser la vue
            </button>
          </div>
          
          {/* Bouton pour basculer la sidebar - toujours visible */}
          <button
            onClick={toggleSidebar}
            className={`absolute top-4 right-4 p-2 rounded-full shadow-lg ${
              showSidebar 
                ? "bg-primary text-secondary border border-secondary" 
                : "bg-secondary text-white"
            }`}
            title={showSidebar ? "Masquer les commentaires" : "Afficher les commentaires"}
          >
            <MessageSquare size={20} />
            {comments.length > 0 && !showSidebar && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {comments.length}
              </span>
            )}
          </button>
        </div>
      </main>

      {/* Sidebar commentaires - simplement hidden/visible */}
      <aside className={`w-72 bg-primary border-l p-4 overflow-auto ${!showSidebar && "hidden"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">📝 Commentaires</h3>
        </div>

        {modelFile && (
          <div className="mb-4 p-2 border border-secondary rounded text-secondary">
            <p className="font-semibold">Fichier chargé:</p>
            <p>{modelFile.name}</p>
            <p className="text-xs">{Math.round(modelFile.size / 1024)} Ko</p>
          </div>
        )}

        {comments.length === 0 ? (
          <p className="text-secondary italic">Faites un clic droit sur le modèle pour ajouter des commentaires</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((c, i) => (
              <li
                key={c.id}
                className="border p-2 rounded hover:bg-primary cursor-pointer"
                onClick={() => {
                  if (viewerRef.current) {
                    viewerRef.current.cameraOrbit = computeCameraOrbit(c.position);
                  }
                }}
              >
                <p>{c.comment}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComment(i);
                  }}
                  className="mt-1 text-sm text-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default Preview3D;