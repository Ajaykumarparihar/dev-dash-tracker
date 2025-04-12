
import React, { useState } from 'react';
import { Task } from '@/types';
import { Check, Clock, Calendar, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { useProjects } from '@/context/ProjectContext';

interface TaskItemProps {
  task: Task;
  projectId: string;
}

const TaskItem = ({ task, projectId }: TaskItemProps) => {
  const { updateTask, deleteTask } = useProjects();
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    updateTask(projectId, task.id, {
      status: task.status === 'completed' ? 'todo' : 'completed'
    });
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <div className="h-4 w-4 rounded-full border border-muted-foreground" />;
    }
  };

  return (
    <div 
      className="flex items-start p-3 rounded-md hover:bg-secondary/50 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className="mt-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-ring rounded"
        onClick={handleToggle}
      >
        {getStatusIcon()}
      </button>
      
      <div className="ml-3 flex-grow">
        <div className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
        )}
        
        {task.dueDate && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        )}
      </div>
      
      {isHovered && (
        <button 
          className="absolute right-3 top-3 text-muted-foreground hover:text-destructive transition-colors"
          onClick={() => deleteTask(projectId, task.id)}
        >
          <Trash className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default TaskItem;
