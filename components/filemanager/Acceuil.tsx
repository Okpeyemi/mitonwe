import React from "react";
import { Star, History } from "lucide-react";
import FileIcon from "@/components/File";
import RecentFileTable from "@/components/RecentFileTable";

interface AcceuilProps {
  activePanelsCount?: number;
}

const files = [
  {
    id: "1",
    name: "Document de cadrage",
    type: "pdf",
    modified: "12/04/2025 14:35",
    sharedWith: [
      { id: "user1", avatar: "/avatar.png" },
      { id: "user2", avatar: "/avatar-1.png" },
      { id: "user3", avatar: "/avatar-2.png" },
      { id: "user4", avatar: "/avatar-3.png" },
    ],
    starred: false,
  },
  {
    id: "2",
    name: "Document de cadrage",
    type: "doc",
    modified: "12/04/2025 14:35",
    sharedWith: [{ id: "user1", avatar: "/avatar.png" }],
    starred: false,
  },
  {
    id: "3",
    name: "T-Shirt",
    type: "3d",
    modified: "12/04/2025 14:35",
    sharedWith: [
      { id: "user1", avatar: "/avatar.png" },
      { id: "user2", avatar: "/avatar-1.png" },
    ],
    starred: false,
  }
];

const Acceuil: React.FC<AcceuilProps> = ({ activePanelsCount = 1 }) => {
  const handleSelectFiles = (selectedIds: string[]) => {
    console.log("Files selected:", selectedIds);
  };

  const handleToggleStar = (id: string) => {
    console.log("Toggle star for:", id);
  };

    // Déterminer la classe de grille en fonction du nombre de panneaux actifs
  const getFileIconGridClass = () => {
    switch (activePanelsCount) {
      case 1:
        return "grid-cols-5"; // Plus d'espace quand un seul panneau
      case 2:
        return "grid-cols-4"; // Moins d'espace quand deux panneaux
      case 3:
        return "grid-cols-3"; // Encore moins d'espace quand trois panneaux
      default:
        return "grid-cols-5";
    }
  };

  const getFileIconHiddenClass = () => {
    switch (activePanelsCount) {
      case 1:
        return ""; // Plus d'espace quand un seul panneau
      case 2:
        return ""; // Moins d'espace quand deux panneaux
      case 3:
        return "hidden"; // Encore moins d'espace quand trois panneaux
      default:
        return "";
    }
  };

  const getFileIconHiddenControlClass = () => {
    switch (activePanelsCount) {
      case 1:
        return ""; // Plus d'espace quand un seul panneau
      case 2:
        return "hidden"; // Moins d'espace quand deux panneaux
      case 3:
        return "hidden"; // Encore moins d'espace quand trois panneaux
      default:
        return "";
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex w-full items-center space-x-2">
          <Star size={15} />
          <h1>Favoris</h1>
        </div>
        <div className={`grid ${getFileIconGridClass()} p-4`}>
          <FileIcon
            type="folder"
            name="Document example"
            date="12/04/2023"
            size="4.2 MB"
            activePanelsCount={activePanelsCount}
            onClick={() => console.log("Fichier cliqué")}
            onPreview={() => console.log("Prévisualiser le fichier")}
            onShare={() => console.log("Partager le fichier")}
          />
          <FileIcon
            type="folder"
            name="Document example"
            date="12/04/2023"
            size="4.2 MB"
            activePanelsCount={activePanelsCount}
            onClick={() => console.log("Fichier cliqué")}
            onPreview={() => console.log("Prévisualiser le fichier")}
            onShare={() => console.log("Partager le fichier")}
          />
          <FileIcon
            type="folder"
            name="Document example"
            date="12/04/2023"
            size="4.2 MB"
            activePanelsCount={activePanelsCount}
            onClick={() => console.log("Fichier cliqué")}
            onPreview={() => console.log("Prévisualiser le fichier")}
            onShare={() => console.log("Partager le fichier")}
          />
          <FileIcon
            type="folder"
            name="Document example"
            date="12/04/2023"
            size="4.2 MB"
            activePanelsCount={activePanelsCount}
            onClick={() => console.log("Fichier cliqué")}
            onPreview={() => console.log("Prévisualiser le fichier")}
            onShare={() => console.log("Partager le fichier")}
            className={getFileIconHiddenControlClass()}
          />
          <FileIcon
            type="folder"
            name="Document example"
            date="12/04/2023"
            size="4.2 MB"
            activePanelsCount={activePanelsCount}
            onClick={() => console.log("Fichier cliqué")}
            onPreview={() => console.log("Prévisualiser le fichier")}
            onShare={() => console.log("Partager le fichier")}
            className={getFileIconHiddenClass()}
          />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex w-full items-center space-x-2 mb-4">
          <History size={15} />
          <h1>Récents</h1>
        </div>
        <div>
          <RecentFileTable
            files={files}
            onSelect={handleSelectFiles}
            onStar={handleToggleStar}
            activePanelsCount={activePanelsCount}
          />
        </div>
      </div>
    </>
  );
};

export default Acceuil;
