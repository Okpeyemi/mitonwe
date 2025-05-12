import React, { useState } from "react";
import { Home, Folder, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOnClickOutside } from "@/lib/hooks";
import { useRef } from "react";

const links = [
  { name: "Accueil", href: "/dashboard", icon: <Home size={20} /> },
  { name: "Dossiers", href: "/dashboard/dossiers", icon: <Folder size={20} /> },
];

const SideBar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Ferme le dropdown quand on clique ailleurs
  useOnClickOutside(menuRef, () => setIsDropdownOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      {/* Bouton pour ouvrir le dropdown */}
      <button 
        onClick={toggleDropdown}
        className="fixed left-4 top-30 z-50 bg-secondary text-primary p-2 rounded-full shadow-lg hover:bg-secondary-foreground hover:text-secondary transition-colors duration-200"
        aria-label="Ouvrir le menu"
        aria-expanded={isDropdownOpen}
        aria-controls="sidebar-dropdown"
      >
        <Menu size={24} />
      </button>
      
      {/* Dropdown menu de navigation */}
      {isDropdownOpen && (
        <div 
          id="sidebar-dropdown"
          className="fixed left-4 top-40 z-50 w-64 bg-primary rounded-lg shadow-xl p-4 origin-top-left transition-all duration-200 animate-in fade-in-0 zoom-in-95 border border-secondary-foreground cursor-pointer"
        >
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-md w-full ${
                  link.href === pathname 
                    ? "bg-secondary-foreground text-secondary" 
                    : "text-secondary hover:bg-secondary/10"
                }`}
                onClick={toggleDropdown}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
