
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  deploymentUrl?: string;
  technologies: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
