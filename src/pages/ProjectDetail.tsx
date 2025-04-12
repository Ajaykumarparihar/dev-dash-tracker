
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import PageHeader from '@/components/layout/PageHeader';
import TaskItem from '@/components/projects/TaskItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, ChevronLeft, ExternalLink, Github, Plus, 
  Edit, Save, Trash, CheckCircle, Clock, CircleDashed 
} from 'lucide-react';
import { format } from 'date-fns';
import { Task, TaskStatus } from '@/types';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProject, updateProject, addTask, deleteProject } = useProjects();
  const project = getProject(id!);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskFilter, setTaskFilter] = useState<TaskStatus | 'all'>('all');
  
  if (!project) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-xl font-medium mb-4">Project not found</h2>
        <Link to="/dashboard">
          <Button>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }
  
  const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = project.tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const filteredTasks = taskFilter === 'all' 
    ? project.tasks 
    : project.tasks.filter(task => task.status === taskFilter);
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTaskTitle.trim()) return;
    
    addTask(project.id, {
      title: newTaskTitle.trim(),
      status: 'todo',
    });
    
    setNewTaskTitle('');
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center text-sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>
      
      <PageHeader
        title={project.name}
        description={project.description}
      >
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </PageHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Task management section */}
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Tasks</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-1" />
                {completedTasks}/{totalTasks} completed
              </div>
            </div>
            
            <div className="w-full bg-secondary rounded-full h-2 mb-6">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex gap-2 mb-6">
              <Button
                variant={taskFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTaskFilter('all')}
              >
                All
              </Button>
              <Button
                variant={taskFilter === 'todo' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTaskFilter('todo')}
              >
                <CircleDashed className="h-4 w-4 mr-1" />
                To Do
              </Button>
              <Button
                variant={taskFilter === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTaskFilter('in-progress')}
              >
                <Clock className="h-4 w-4 mr-1" />
                In Progress
              </Button>
              <Button
                variant={taskFilter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTaskFilter('completed')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </Button>
            </div>
            
            <form onSubmit={handleAddTask} className="flex mb-4">
              <Input
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button type="submit" disabled={!newTaskTitle.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </form>
            
            <div className="space-y-1 mt-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskItem key={task.id} task={task} projectId={project.id} />
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No {taskFilter !== 'all' ? taskFilter : ''} tasks found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Project info */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-lg font-medium mb-4">Project Info</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm bg-status-${project.status}/20 text-status-${project.status}`}>
                  {project.status.replace('-', ' ')}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                <div className="text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(project.startDate), 'MMMM d, yyyy')}
                </div>
              </div>
              
              {project.endDate && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">End Date</p>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(project.endDate), 'MMMM d, yyyy')}
                  </div>
                </div>
              )}
              
              {project.githubUrl && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">GitHub Repository</p>
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center text-blue-400 hover:text-blue-500"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    {project.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                  </a>
                </div>
              )}
              
              {project.deploymentUrl && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Deployment URL</p>
                  <a 
                    href={project.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center text-blue-400 hover:text-blue-500"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {project.deploymentUrl.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Tech stack */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-lg font-medium mb-4">Tech Stack</h2>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
