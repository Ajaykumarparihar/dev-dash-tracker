
import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import ProjectCard from '@/components/projects/ProjectCard';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter } from 'lucide-react';
import { ProjectStatus } from '@/types';

const Dashboard = () => {
  const { projects } = useProjects();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  
  const filteredProjects = statusFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === statusFilter);
  
  const statusOptions: Array<{ value: ProjectStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Projects' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  return (
    <div className="container py-8">
      <PageHeader
        title="Projects"
        description="Manage and track all your development projects"
      >
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </PageHeader>
      
      <div className="mt-8 flex flex-wrap gap-3">
        <div className="flex items-center text-sm text-muted-foreground mr-2">
          <Filter className="h-4 w-4 mr-1" />
          Filter:
        </div>
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={statusFilter === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(option.value)}
            className={statusFilter === option.value ? '' : 'text-muted-foreground'}
          >
            {option.label}
          </Button>
        ))}
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground mt-1">
            {statusFilter === 'all' 
              ? "You don't have any projects yet. Create your first project!"
              : `You don't have any ${statusFilter.replace('-', ' ')} projects.`}
          </p>
          <Button className="mt-4">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
