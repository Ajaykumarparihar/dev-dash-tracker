
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Project, Task } from '@/types';
import { useProjects } from '@/context/ProjectContext';
import { format } from 'date-fns';

interface CalendarEvent {
  date: Date;
  projectId: string;
  projectName: string;
  taskId: string;
  taskTitle: string;
}

const CalendarView = () => {
  const { projects } = useProjects();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Build calendar events from project tasks with due dates
  const events: CalendarEvent[] = projects.flatMap(project => 
    project.tasks
      .filter(task => task.dueDate)
      .map(task => ({
        date: new Date(task.dueDate!),
        projectId: project.id,
        projectName: project.name,
        taskId: task.id,
        taskTitle: task.title
      }))
  );
  
  // Count tasks due on each day
  const getDayContent = (day: Date) => {
    const dayEvents = events.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
    
    if (dayEvents.length > 0) {
      return (
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  // Get tasks for the selected date
  const selectedDateEvents = selectedDate ? events.filter(event => 
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  ) : [];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-[350px]">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          components={{
            DayContent: (props) => (
              <>
                {props.children}
                {getDayContent(props.date)}
              </>
            ),
          }}
        />
      </div>
      
      <div className="flex-1">
        <div className="bg-card rounded-md border border-border p-4">
          <h3 className="font-medium mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </h3>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event, index) => (
                <div key={index} className="bg-secondary/50 rounded-md p-3">
                  <div className="text-sm font-medium">{event.taskTitle}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Project: {event.projectName}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">
              No tasks due on this date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
