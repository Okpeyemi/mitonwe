import React, { useRef, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { Upload, Plus, FileUp, FilePlus2, FolderUp, FolderPlus } from "lucide-react";
import Button from "./Button";
import Modal from "./Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Créez un event emitter ou contexte pour les fichiers 3D
// Cette fonction sera déclenchée quand un fichier 3D est importé
type File3DImportHandler = (file: File) => void;

interface HeroProps {
  onFile3DImport?: File3DImportHandler;
}

interface DirectoryAttributes {
  directory: string;
  webkitdirectory: string;
}

export const Hero: React.FC<HeroProps> = ({ onFile3DImport }) => {
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Références pour les input file invisibles
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const model3dInputRef = useRef<HTMLInputElement>(null); // Ajoutez une référence spécifique pour les modèles 3D

  // Gérer l'importation de fichier
  const handleFileImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Gérer l'importation de modèle 3D
  const handle3DModelImport = () => {
    if (model3dInputRef.current) {
      model3dInputRef.current.click();
    }
  };

  // Gérer l'importation de dossier
  const handleFolderImport = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click();
    }
  };

  // Traitement du fichier importé
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Fichiers importés:", files);
      // Traitement des fichiers importés
      setImportModalOpen(false);
    }
  };

  // Traitement spécifique pour les fichiers 3D
  const on3DFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFile3DImport) {
      console.log("Modèle 3D importé:", files[0]);
      onFile3DImport(files[0]);
      setImportModalOpen(false);
    }
  };

  // Gérer la création de fichier
  const handleFileCreate = (type: string) => {
    console.log(`Création d'un fichier de type: ${type}`);
    setDropdownOpen(false);
    setCreateModalOpen(false);
    // Logique pour créer un nouveau fichier du type spécifié
  };

  // Gérer la création de dossier
  const handleFolderCreate = () => {
    console.log("Création d'un nouveau dossier");
    setCreateModalOpen(false);
    // Logique pour créer un nouveau dossier
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1>Kemet Drive</h1>
      <SearchBar />
      <div className="flex justify-between space-x-4">
        <Button
          label="Importer"
          icon={<Upload size={20} />}
          variant="active"
          className="flex flex-col space-y-2 items-start h-[80px] w-[170px] justify-center p-[20px] hover:bg-secondary-foreground hover:text-secondary"
          onClick={() => setImportModalOpen(true)}
        />
        <Button
          label="Créer"
          icon={<Plus size={20} />}
          className="flex flex-col space-y-2 items-start h-[80px] w-[170px] justify-center p-[20px] hover:bg-secondary-foreground"
          onClick={() => setCreateModalOpen(true)}
        />
      </div>

      {/* Input file invisible pour l'importation */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={onFileSelected}
        multiple
      />
      <input
        type="file"
        ref={folderInputRef}
        className="hidden"
        onChange={onFileSelected}
        {...({ directory: "", webkitdirectory: "" } as DirectoryAttributes)}
      />
      {/* Input spécifique pour les modèles 3D */}
      <input
        type="file"
        ref={model3dInputRef}
        className="hidden"
        accept=".glb,.gltf"
        onChange={on3DFileSelected}
      />

      {/* Modal d'importation */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="Importer"
      >
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleFileImport}
            className="flex items-center p-3 rounded-[5px] cursor-pointer bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground"
          >
            <FileUp size={18} className="mr-2" /> Importer un fichier
          </button>
          <button
            onClick={handleFolderImport}
            className="flex items-center p-3 rounded-[5px] cursor-pointer bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground"
          >
            <FolderUp size={18} className="mr-2" /> Importer un dossier
          </button>
          {/* Ajoutez cette option pour importer un modèle 3D */}
          <button
            onClick={handle3DModelImport}
            className="flex items-center p-3 rounded-[5px] cursor-pointer bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground"
          >
            <FileUp size={18} className="mr-2" /> Importer un modèle 3D (.glb)
          </button>
        </div>
      </Modal>

      {/* Modal de création */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Créer"
      >
        <div className="flex flex-col space-y-3">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center p-3 rounded-[5px] cursor-pointer bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground w-full justify-start">
                <FilePlus2 size={18} className="mr-2" /> Créer un fichier
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleFileCreate("text")}>
                Document texte
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileCreate("spreadsheet")}>
                Feuille de calcul
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFileCreate("presentation")}
              >
                Présentation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileCreate("drawing")}>
                Dessin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileCreate("pdf")}>
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={handleFolderCreate}
            className="flex items-center p-3 rounded-[5px] cursor-pointer bg-secondary text-primary hover:text-secondary hover:bg-secondary-foreground"
          >
            <FolderPlus size={18} className="mr-2" /> Créer un dossier
          </button>
        </div>
      </Modal>
    </div>
  );
};
