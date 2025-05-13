'use client';

import type { TurtleProject } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PortfolioContextType {
  projects: TurtleProject[];
  addProject: (project: Omit<TurtleProject, 'id' | 'createdAt'>) => void;
  removeProject: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'pythonSproutsPortfolio'; // Updated key

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<TurtleProject[]>(() => {
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedProjects ? JSON.parse(savedProjects) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const addProject = (project: Omit<TurtleProject, 'id' | 'createdAt'>) => {
    const newProject: TurtleProject = {
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
