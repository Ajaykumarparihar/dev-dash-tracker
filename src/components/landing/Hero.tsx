
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, LayoutDashboard, CheckCircle, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
        Introducing ProjectPilot
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
        Manage your projects with 
        <span className="text-primary block mt-2">simplicity and focus</span>
      </h1>
      
      <p className="text-muted-foreground max-w-[600px] mb-10 text-lg">
        The minimal project tracker built for solo developers and indie hackers.
        Stop context switching and start shipping.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link to="/dashboard">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/dashboard">Explore Demo</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-3xl w-full">
        <div className="bg-card/50 border border-border rounded-lg p-6 text-left">
          <div className="bg-primary/10 p-2 rounded-md inline-block mb-4">
            <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Project Dashboard</h3>
          <p className="text-muted-foreground text-sm">
            Keep track of all your projects in one place with status updates and progress tracking.
          </p>
        </div>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 text-left">
          <div className="bg-primary/10 p-2 rounded-md inline-block mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Task Management</h3>
          <p className="text-muted-foreground text-sm">
            Organize tasks with simple checklists and track your progress as you complete them.
          </p>
        </div>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 text-left">
          <div className="bg-primary/10 p-2 rounded-md inline-block mb-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Calendar View</h3>
          <p className="text-muted-foreground text-sm">
            Plan your work with a visual calendar to see upcoming deadlines and milestones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
