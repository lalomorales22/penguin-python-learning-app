'use client';

import type { ArtProject } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PortfolioContextType {
  projects: ArtProject[];
  addProject: (project: Omit<ArtProject, 'id' | 'createdAt'>) => void;
  removeProject: (id: string) => void;
  isLoading: boolean; // Added to indicate when projects are being loaded from localStorage
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'penguinPythonPortfolio';

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<ArtProject[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  // Effect to load projects from localStorage on client-side mount
  useEffect(() => {
    // This effect runs only on the client, after initial mount
    const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      const parsedProjects = savedProjects ? JSON.parse(savedProjects) : [];
      // Ensure createdAt is parsed as Date objects
      setProjects(parsedProjects.map((p: ArtProject) => ({ ...p, createdAt: new Date(p.createdAt) })));
    } catch (error) {
      console.error("Failed to parse projects from localStorage", error);
      setProjects([]); // Fallback to empty if parsing fails
    }
    setIsLoading(false); // Loading finished
  }, []); // Empty dependency array ensures this runs once on mount (client-side)

  // Effect to save projects to localStorage when they change
  useEffect(() => {
    // Only save if not in initial loading phase and on the client
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, isLoading]);

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
    <PortfolioContext.Provider value={{ projects, addProject, removeProject, isLoading }}>
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
