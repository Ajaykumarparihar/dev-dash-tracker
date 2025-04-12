
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Calendar, GitBranch, ExternalLink, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = project.tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Link 
      to={`/projects/${project.id}`}
      className="block group"
    >
      <div className="bg-card hover:bg-card/90 transition-colors rounded-lg overflow-hidden border border-border h-full">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className={`px-2 py-1 rounded-full text-xs uppercase font-medium tracking-wider bg-status-${project.status}/20 text-status-${project.status}`}>
              {project.status.replace('-', ' ')}
            </div>
          </div>
          
          <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
            {project.description}
          </p>
          
          <div className="mt-5 flex items-center text-muted-foreground text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Started: {format(new Date(project.startDate), 'MMM dd, yyyy')}</span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          <div className="mt-5">
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-muted-foreground flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                {completedTasks}/{totalTasks} tasks
              </span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {(project.githubUrl || project.deploymentUrl) && (
            <div className="mt-4 flex gap-3 text-muted-foreground">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitBranch className="h-3 w-3 mr-1" />
                  Repository
                </a>
              )}
              {project.deploymentUrl && (
                <a 
                  href={project.deploymentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
