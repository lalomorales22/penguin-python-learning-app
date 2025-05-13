'use client';

import type { ArtProject } from '@/types'; // Renamed TurtleProject to ArtProject
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PortfolioContextType {
  projects: ArtProject[];
  addProject: (project: Omit<ArtProject, 'id' | 'createdAt'>) => void;
  removeProject: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'penguinPythonPortfolio'; // Updated key

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<ArtProject[]>(() => {
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
      try {
        // Ensure createdAt is parsed as Date objects
        const parsedProjects = savedProjects ? JSON.parse(savedProjects) : [];
        return parsedProjects.map((p: ArtProject) => ({ ...p, createdAt: new Date(p.createdAt) }));
      } catch (error) {
        console.error("Failed to parse projects from localStorage", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const addProject = (project: Omit<ArtProject, 'id' | 'createdAt'>) => {
    const newProject: ArtProject = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  };

  const removeProject = (id: string) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
  };

  return (
    <PortfolioContext.Provider value={{ projects, addProject, removeProject }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
