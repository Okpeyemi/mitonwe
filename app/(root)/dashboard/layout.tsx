"use client";

import Header from "@/components/Header";
import React, { createContext, useState } from "react";

// Créer un contexte pour partager l'état des panneaux
export const PanelContext = createContext({
  showFile: true,
  showProject: false,
  showChat: false,
  showPreview: false,
  toggleFile: () => {},
  toggleProject: () => {},
  toggleChat: () => {},
  togglePreview: () => {},
});

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [showFile, setShowFile] = useState(true);
  const [showProject, setShowProject] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Fonctions pour basculer la visibilité des panneaux
  const toggleFile = () => setShowFile(!showFile);
  const toggleProject = () => setShowProject(!showProject);
  const toggleChat = () => setShowChat(!showChat);
  const togglePreview = () => setShowPreview(!showPreview);

  return (
    <PanelContext.Provider value={{
      showFile,
      showProject,
      showChat,
      showPreview,
      toggleFile,
      toggleProject,
      toggleChat,
      togglePreview
    }}>
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
        {children}
      </div>
    </PanelContext.Provider>
  );
};

export default DashboardLayout;
