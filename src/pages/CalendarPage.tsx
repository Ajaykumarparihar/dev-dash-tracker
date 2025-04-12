
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import CalendarView from '@/components/calendar/CalendarView';

const CalendarPage = () => {
  return (
    <div className="container py-8">
      <PageHeader
        title="Calendar"
        description="Track your project deadlines and milestones"
      />
      
      <div className="mt-8">
        <CalendarView />
      </div>
    </div>
  );
};

export default CalendarPage;
