import React, { useState, useEffect, useRef } from "react";
import LogoNoir from "@/public/logo-noir.png";
import LogoBlanc from "@/public/logo-blanc.png";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import {
  FileText,
  Grid,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  ScanEye,
  Users,
} from "lucide-react";
import Button from "./Button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOnClickOutside } from "@/lib/hooks";

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
  showPreview,
}) => {
  const { resolvedTheme } = useTheme();
  // État pour gérer le montage côté client
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Fermer le dropdown quand on clique ailleurs
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  // Effet uniquement côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex border-b-2 border-secondary-foreground p-5 items-center justify-between">
      <div>
        <Link href="/dashboard">
          {!mounted ? (
            // Durant le rendu SSR, afficher une seule version
            <Image src={LogoNoir} alt="Logo" width={50} height={29} />
          ) : (
            // Après montage côté client, condition basée sur le thème
            <Image
              src={resolvedTheme === "dark" ? LogoBlanc : LogoNoir}
              alt={resolvedTheme === "dark" ? "Logo Blanc" : "Logo Noir"}
              width={50}
              height={29}
            />
          )}
        </Link>
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
        <Button
          icon={<Mail size={20} />}
          variant="disabled"
          // onClick={showPreview}
        />
      </div>
      <div className="flex items-center justify-center space-x-2 ml-2">
        <ModeToggle />
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="p-4 rounded-full bg-amber-200"></span>
            <p>Darell Chooks</p>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-42 py-2 bg-primary border border-secondary-foreground rounded-md shadow-lg z-10">
              <Link
                href="/dashboard"
                className={`flex items-center mx-2 px-4 py-2 hover:bg-secondary-foreground rounded-[5px] ${pathname === "/dashboard" ? "bg-secondary-foreground mb-2" : ""}`}
              >
                <LayoutDashboard className="mr-2" size={16} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/users"
                className={`flex items-center mx-2 px-4 py-2 hover:bg-secondary-foreground rounded-[5px] ${pathname === "/users" ? "bg-secondary-foreground mb-2" : ""}`}
              >
                <Users className="mr-2" size={16} />
                <span>Utilisateurs</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center mx-2 px-4 py-2 text-left hover:bg-red-300 text-red-800 rounded-[5px]"
              >
                <LogOut className="mr-2" size={16} />
                <span>Déconnexion</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
