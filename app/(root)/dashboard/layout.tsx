"use client";

import Header from "@/components/Header";
import React, { useState, useMemo, useEffect } from "react";
import ChatPanel from "@/components/modules/ChatPanel";
import FileManager from "@/components/modules/FileManager";
import ProjectBoard from "@/components/modules/ProjectBoard";
import { ThemeProvider } from "@/components/theme-provider";
import Split from "react-split";

import dynamic from 'next/dynamic';

const Preview3D = dynamic(
  () => import('@/components/modules/Preview3d.jsx'),
  { ssr: false }
);

const DashboardLayout = () => {
  const [showChat, setShowChat] = useState(false);
  const [showFile, setShowFile] = useState(true);
  const [showProject, setShowProject] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [modelFile, setModelFile] = useState<File | undefined>(undefined);
  const [splitSizes, setSplitSizes] = useState([50, 50]); // Proportions par défaut

  // Référence pour stocker/récupérer les tailles du localStorage
  const splitSizesKey = "file-preview-split-sizes";

  // Charger les proportions sauvegardées
  useEffect(() => {
    const savedSizes = localStorage.getItem(splitSizesKey);
    if (savedSizes) {
      try {
        setSplitSizes(JSON.parse(savedSizes));
      } catch (e) {
        console.error("Erreur lors du chargement des proportions sauvegardées:", e);
      }
    }
  }, []);

  // Calculer le nombre de panneaux actifs pour déterminer le layout de la grille
  const activePanelsCount = useMemo(() => {
    // Considérer FileManager et Preview3D comme un seul panneau s'ils sont affichés ensemble
    const fileAndPreviewCount = (showFile && showPreview) ? 1 : (showFile || showPreview ? 1 : 0);
    return fileAndPreviewCount + (showProject ? 1 : 0) + (showChat ? 1 : 0);
  }, [showFile, showProject, showChat, showPreview]);

  // Déterminer la classe de grille en fonction du nombre de panneaux
  const gridClass = useMemo(() => {
    switch (activePanelsCount) {
      case 1:
        return "grid-cols-1"; // 1 panneau = 1 colonne pleine largeur
      case 2:
        return "grid-cols-2"; // 2 panneaux = 2 colonnes
      case 3:
        return "grid-cols-3"; // 3 panneaux = 3 colonnes
      default:
        return ""; // Aucun panneau actif
    }
  }, [activePanelsCount]);

  const handleModelImport = (file: File) => {
    console.log("Dashboard a reçu le fichier 3D:", file.name);
    setModelFile(file);
    // Activer automatiquement le panneau 3D quand un fichier est importé
    setShowPreview(true);
  };

  const toggleFile = () => {
    setShowFile(!showFile);
  };

  const toggleProject = () => {
    setShowProject(!showProject);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Gestionnaire pour sauvegarder les proportions du split
  const handleSplitDragEnd = (sizes: number[]) => {
    localStorage.setItem(splitSizesKey, JSON.stringify(sizes));
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col h-screen w-screen">
        <Header
          isFileVisible={showFile}
          isProjectVisible={showProject}
          isChatVisible={showChat}
          isPreviewVisible={showPreview}
          showFile={toggleFile}
          showProject={toggleProject}
          showChat={toggleChat}
          showPreview={togglePreview}
        />

        {activePanelsCount > 0 ? (
          <div className={`grid ${gridClass} flex-1 overflow-auto`}>
            {/* Colonne pour FileManager et Preview3D */}
            {(showFile || showPreview) && (
              <div className="h-full overflow-auto border-r border-secondary-foreground">
                {showFile && showPreview ? (
                  // Disposition verticale avec Split pour redimensionnement
                  <Split
                    className="flex flex-col h-full split-wrapper"
                    direction="vertical"
                    sizes={splitSizes}
                    minSize={100} // Taille minimale en pixels
                    expandToMin={false}
                    gutterSize={8} // Taille de la poignée de redimensionnement
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    onDragEnd={handleSplitDragEnd}
                  >
                    <div className="overflow-auto h-full">
                      <FileManager
                        onFile3DImport={handleModelImport}
                        activePanelsCount={activePanelsCount}
                      />
                    </div>
                    <div className="overflow-auto h-full border-t border-secondary-foreground">
                      {modelFile ? (
                        <Preview3D modelFile={modelFile} />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p>Importez un fichier 3D pour voir la prévisualisation</p>
                        </div>
                      )}
                    </div>
                  </Split>
                ) : (
                  // Affichage normal quand un seul est actif
                  <>
                    {showFile && (
                      <FileManager
                        onFile3DImport={handleModelImport}
                        activePanelsCount={activePanelsCount}
                      />
                    )}
                    {showPreview && !showFile && (
                      <>
                        {modelFile ? (
                          <Preview3D modelFile={modelFile} />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p>Importez un fichier 3D pour voir la prévisualisation</p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {showProject && (
              <div className="h-full overflow-auto border-r border-secondary-foreground">
                <ProjectBoard />
              </div>
            )}

            {showChat && (
              <div className="h-full overflow-auto border-r border-secondary-foreground">
                <ChatPanel />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Cliquez sur un bouton du header pour afficher un panneau</p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;