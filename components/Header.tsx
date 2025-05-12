import React, { useState, useEffect } from "react";
import LogoNoir from "@/public/logo-noir.png";
import LogoBlanc from "@/public/logo-blanc.png";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { FileText, Grid, MessageCircle, ScanEye } from "lucide-react";
import Button from "./Button";
import { useTheme } from "next-themes";

interface HeaderProps {
  isFileVisible: boolean;
  isProjectVisible: boolean;
  isChatVisible: boolean;
  isPreviewVisible: boolean;
  showFile: () => void;
  showProject: () => void;
  showChat: () => void;
  showPreview: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isFileVisible,
  isProjectVisible,
  isChatVisible,
  isPreviewVisible,
  showFile,
  showProject,
  showChat,
  showPreview
}) => {
  const { resolvedTheme } = useTheme();
  // État pour gérer le montage côté client
  const [mounted, setMounted] = useState(false);

  // Effet uniquement côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex border-b-2 border-secondary-foreground p-5 items-center justify-between">
      <div>
        {!mounted ? (
          // Durant le rendu SSR, afficher une seule version
          <Image
            src={LogoNoir}
            alt="Logo"
            width={50}
            height={29}
          />
        ) : (
          // Après montage côté client, condition basée sur le thème
          <Image
            src={resolvedTheme === "dark" ? LogoBlanc : LogoNoir}
            alt={resolvedTheme === "dark" ? "Logo Blanc" : "Logo Noir"}
            width={50}
            height={29}
          />
        )}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button
          icon={<FileText size={20} />}
          variant={isFileVisible ? "active" : "default"}
          onClick={showFile}
        />
        <Button
          icon={<Grid size={20} />}
          variant={isProjectVisible ? "active" : "default"}
          onClick={showProject}
        />
        <Button
          icon={<MessageCircle size={20} />}
          variant={isChatVisible ? "active" : "default"}
          onClick={showChat}
        />
        <Button
          icon={<ScanEye size={20} />}
          variant={isPreviewVisible ? "active" : "default"}
          onClick={showPreview}
        />
      </div>
      <div className="flex items-center justify-center space-x-2 ml-2">
        <ModeToggle />
        <div className="flex items-center space-x-2">
          <span className="p-4 rounded-full bg-amber-200"></span>
          <p>Darell Chooks</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
