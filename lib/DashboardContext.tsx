import React, { createContext, useContext, useState, ReactNode } from 'react';

type DashboardContextType = {
  showChat: boolean;
  showFile: boolean;
  showProject: boolean;
  toggleChat: () => void;
  toggleFile: () => void;
  toggleProject: () => void;
};

const DashboardContext = createContext<DashboardContextType>({
  showChat: false,
  showFile: true,
  showProject: false,
  toggleChat: () => {},
  toggleFile: () => {},
  toggleProject: () => {},
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [showChat, setShowChat] = useState(false);
  const [showFile, setShowFile] = useState(true);
  const [showProject, setShowProject] = useState(false);

  const toggleChat = () => setShowChat(!showChat);
  const toggleFile = () => setShowFile(!showFile);
  const toggleProject = () => setShowProject(!showProject);

  return (
    <DashboardContext.Provider
      value={{
        showChat,
        showFile,
        showProject,
        toggleChat,
        toggleFile,
        toggleProject,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}