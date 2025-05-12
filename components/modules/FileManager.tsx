import React from "react";
import SideBar from "../filemanager/SideBar";
import { usePathname } from "next/navigation";
import { Hero } from "../Hero";
import Acceuil from "../filemanager/Acceuil";
import Dossiers from "../filemanager/Dossiers";

interface FileManagerProps {
  onFile3DImport?: (file: File) => void;
  activePanelsCount: number;
}

const FileManager:React.FC<FileManagerProps> = ({ onFile3DImport, activePanelsCount }) => {
  const pathname = usePathname();

  return (
    <div className="h-full relative flex">
      <SideBar />
      <div className="flex flex-col w-full h-full items-center p-8">
        <Hero onFile3DImport={onFile3DImport} />
        {pathname === "/dashboard" ? (<Acceuil activePanelsCount={activePanelsCount} />) : (<Dossiers />)}
      </div>
    </div>
  );
};

export default FileManager;
