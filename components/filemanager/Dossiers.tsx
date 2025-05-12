import React, { useState } from "react";
import { Folder } from "lucide-react";
import FileTable from "@/components/FileTable";
import Pagination from "../Pagination";

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
  },
  {
    id: "4",
    name: "Dossier Test",
    type: "folder",
    modified: "12/04/2025 14:35",
    sharedWith: [
      { id: "user1", avatar: "/avatar.png" },
      { id: "user2", avatar: "/avatar-1.png" },
    ],
    starred: false,
  },
  {
    id: "5",
    name: "Dossier Test",
    type: "folder",
    modified: "12/04/2025 14:35",
    sharedWith: [
      { id: "user1", avatar: "/avatar.png" },
      { id: "user2", avatar: "/avatar-1.png" },
    ],
    starred: false,
  },
  {
    id: "6",
    name: "Dossier Test",
    type: "folder",
    modified: "12/04/2025 14:35",
    sharedWith: [
      { id: "user1", avatar: "/avatar.png" },
      { id: "user2", avatar: "/avatar-1.png" },
    ],
    starred: false,
  },
  {
    id: "7",
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
    id: "8",
    name: "Document de cadrage",
    type: "doc",
    modified: "12/04/2025 14:35",
    sharedWith: [{ id: "user1", avatar: "/avatar.png" }],
    starred: false,
  },
];

const Dossiers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(files.length / itemsPerPage);

  const currentFiles = files.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectFiles = (selectedIds: string[]) => {
    console.log("Files selected:", selectedIds);
  };

  const handleToggleStar = (id: string) => {
    console.log("Toggle star for:", id);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex w-full items-center space-x-2 mb-4">
          <Folder size={15} />
          <h1>Dossiers</h1>
        </div>
        <div>
          <FileTable
            files={currentFiles}
            onSelect={handleSelectFiles}
            onStar={handleToggleStar}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-4"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dossiers;
