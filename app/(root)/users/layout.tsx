"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State required for Header component
  const [showFile, setShowFile] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Toggle handlers
  const toggleFile = () => setShowFile(!showFile);
  const toggleProject = () => setShowProject(!showProject);
  const toggleChat = () => setShowChat(!showChat);
  const togglePreview = () => setShowPreview(!showPreview);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen flex flex-col">
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
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}