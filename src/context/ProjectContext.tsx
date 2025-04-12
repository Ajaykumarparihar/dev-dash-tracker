
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Task } from '@/types';
import { projects as initialProjects } from '@/data/projects';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (projectId: string, taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      tasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, ...updatedProject, updatedAt: new Date().toISOString() }
          : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const getProject = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  const addTask = (projectId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          return {
            ...project,
            tasks: [...project.tasks, newTask],
            updatedAt: new Date().toISOString(),
          };
        }
        return project;
      })
    );
  };

  const updateTask = (projectId: string, taskId: string, updatedTask: Partial<Task>) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) =>
            task.id === taskId
              ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
              : task
          );
          return { ...project, tasks: updatedTasks, updatedAt: new Date().toISOString() };
        }
        return project;
      })
    );
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
            updatedAt: new Date().toISOString(),
          };
        }
        return project;
      })
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
