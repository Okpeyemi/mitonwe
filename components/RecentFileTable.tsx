import React, { useState } from "react";
import {
  MoreVertical,
  Star,
  ExternalLink,
  Share2,
  Shredder,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FileItem {
  id: string;
  type: string;
  name: string;
  modified: string;
  sharedWith: {
    id: string;
    avatar: string;
  }[];
  starred: boolean;
}

interface FileTableProps {
  files: FileItem[];
  onSelect?: (selectedFiles: string[]) => void;
  onStar?: (id: string) => void;
  onOpen?: (id: string) => void;
  onShare?: (id: string) => void;
  onDelete?: (id: string) => void;
  activePanelsCount?: number;
}

const RecentFileTable: React.FC<FileTableProps> = ({
  files,
  onSelect,
  onStar,
  onOpen,
  onShare,
  onDelete,
  activePanelsCount,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const pathname = usePathname();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFiles(files.map((file) => file.id));
    } else {
      setSelectedFiles([]);
    }

    if (onSelect) {
      onSelect(selectedFiles);
    }
  };

  const handleSelectFile = (id: string) => {
    const newSelected = selectedFiles.includes(id)
      ? selectedFiles.filter((fileId) => fileId !== id)
      : [...selectedFiles, id];

    setSelectedFiles(newSelected);

    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const handleOpen = (id: string) => {
    onOpen && onOpen(id);
  };

  const handleShare = (id: string) => {
    onShare && onShare(id);
  };

  const handleDelete = (id: string) => {
    onDelete && onDelete(id);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return "/color.png";
      case "doc":
        return "/doc-file.png";
      case "pdf":
        return "/pdf-file.png";
      case "3d":
        return "/3d-file.png";
      default:
        return "/foler.png";
    }
  };


    // Déterminer la classe de grille en fonction du nombre de panneaux actifs
      const getFileIconGridClass = () => {
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

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-secondary-foreground text-secondary">
            <th className="w-12 p-3 rounded-tl-[10px]">
              <input
                type="checkbox"
                className="accent-blue-500"
                onChange={handleSelectAll}
                checked={selectedFiles.length === files.length}
              />
            </th>
            <th className="w-12 "></th>
            <th className="text-left p-3 font-medium">Nom</th>
            <th className={`text-left p-3 font-medium ${getFileIconGridClass()}`}>Modification le</th>
            <th className={`text-left p-3 font-medium ${getFileIconGridClass()}`}>Qui peut accéder</th>
            <th className="text-end p-3 font-medium rounded-tr-[10px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="border-b border-secondary-foreground hover:bg-inactive"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleSelectFile(file.id)}
                />
              </td>
              <td className="p-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image
                    src={getFileIcon(file.type)}
                    alt={file.type}
                    width={24}
                    height={24}
                  />
                </div>
              </td>
              <td className="p-3">{file.name}</td>
              <td className={`p-3 ${getFileIconGridClass()}`}>{file.modified}</td>
              <td className={`p-3 ${getFileIconGridClass()}`}>
                <div className="flex -space-x-2">
                  {file.sharedWith.map((user, index) => (
                    <div
                      key={user.id}
                      className={`w-8 h-8 rounded-full ${
                        index > 2 ? "hidden" : ""
                      }`}
                    >
                      <Image
                        src={user.avatar}
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                  {file.sharedWith.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-secondary-foreground text-secondary flex items-center justify-center text-xs">
                      +{file.sharedWith.length - 3}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={() => onStar && onStar(file.id)}
                    className={
                      file.starred
                        ? "text-yellow-400"
                        : "text-secondary hover:text-secondary-foreground"
                    }
                  >
                    <Star
                      size={20}
                      fill={file.starred ? "currentColor" : "none"}
                    />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-secondary cursor-pointer hover:text-secondary-foreground">
                        <MoreVertical size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44 bg-primary border border-secondary-foreground">
                      {pathname === "/dashboard" ? (
                        <DropdownMenuItem
                          onClick={() => handleOpen(file.id)}
                          className="flex items-center gap-2 hover:bg-secondary-foreground cursor-pointer"
                        >
                          <Eye size={16} />
                          <span>Prévisualiser</span>
                        </DropdownMenuItem>
                      ) : (
                        <></>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleOpen(file.id)}
                        className="flex items-center gap-2 hover:bg-secondary-foreground cursor-pointer"
                      >
                        <ExternalLink size={16} />
                        <span>Ouvrir</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleShare(file.id)}
                        className="flex items-center gap-2 hover:bg-secondary-foreground cursor-pointer"
                      >
                        <Share2 size={16} />
                        <span>Partager</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDelete(file.id)}
                        className="flex items-center gap-2 hover:bg-secondary-foreground cursor-pointer text-red-500"
                      >
                        <Shredder size={16} />
                        <span>Supprimer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentFileTable;
