'use client';

import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CalendarPage() {
  return (
    <div className='container py-8 px-4 md:px-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Calendar</h1>
        <Button>
          <span className='mr-2'>+</span> Add Event
        </Button>
      </div>

      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-8 shadow-sm mb-8 flex flex-col items-center justify-center min-h-[500px]'>
        <CalendarIcon className='h-16 w-16 text-muted-foreground mb-4' />
        <h2 className='text-xl font-semibold mb-2'>
          Calendar Feature Coming Soon
        </h2>
        <p className='text-muted-foreground mb-4 text-center max-w-md'>
          The calendar feature is under development. Soon you&apos;ll be able to
          schedule events, hearings, meetings, and deadlines all in one place.
        </p>
        <Button variant='outline'>View Upcoming Events</Button>
      </div>
    </div>
  );
}
