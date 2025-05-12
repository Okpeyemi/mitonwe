import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, Link2 } from 'lucide-react';

export type FileType = 'folder' | 'doc' | 'pdf' | '3d';

interface FileIconProps {
  type: FileType;
  name: string;
  date?: string;
  size?: string;
  onClick?: () => void;
  onPreview?: () => void;
  onShare?: () => void;
  activePanelsCount?: number;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ 
  type, 
  name, 
  date = "", 
  size = "", 
  onClick,
  onPreview,
  onShare,
  activePanelsCount,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    switch (type) {
      case 'folder':
        return '/color.png';
      case 'doc':
        return '/doc-file.png';
      case 'pdf':
        return '/pdf-file.png';
      case '3d':
        return '/3d-file.png';
      default:
        return '/foler.png';
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPreview) onPreview();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare();
  };

  // Déterminer la classe de grille en fonction du nombre de panneaux actifs
    const getFileIconGridClass = () => {
      switch (activePanelsCount) {
        case 1:
          return "w-[206px] h-[203px]"; // Plus d'espace quand un seul panneau
        case 2:
          return "w-[180px] h-[153px]"; // Moins d'espace quand deux panneaux
        case 3:
          return "w-[140px] h-[160px]"; // Encore moins d'espace quand trois panneaux
        default:
          return "w-[206px] h-[203px]";
      }
    };

  return (
    <div 
      className={`flex ${getFileIconGridClass()} ${className} flex-col items-center cursor-pointer border-2 border-secondary-foreground rounded-[13px] relative group`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 bg-secondary-foreground w-full rounded-t-[10px] flex items-center justify-center">
        <Image
          src={getIcon()}
          alt={`${type} icon`}
          width={80}
          height={80}
          className="object-contain"
        />
        
        {/* Overlay actions on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 rounded-t-[10px] flex items-center justify-center gap-4">
            <button 
              onClick={handlePreview}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
              title={type === 'folder' ? "Ouvrir" : "Prévisualiser"}
            >
              {type === 'folder' ? <Eye size={18} /> : <Eye size={18} />}
            </button>
            
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
              title="Partager"
            >
              <Link2 size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="w-full bg-primary text-secondary p-3 rounded-b-[10px] flex flex-col items-start">
        <h4 className="text-xs truncate w-full">{name}</h4>
        <p className="text-xs">{date} - {size}</p>
      </div>
    </div>
  );
};

export default FileIcon;