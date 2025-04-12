
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Home, Calendar, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="bg-primary/20 p-1 rounded">
            <Layout className="h-6 w-6 text-primary" />
          </div>
          <span className="text-lg font-semibold">ProjectPilot</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/calendar"
            className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
