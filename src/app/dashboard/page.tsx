'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  FileTextIcon,
  UsersIcon,
  FolderIcon,
  ClockIcon,
  BarChart3Icon,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
} from 'lucide-react';

// Mock data for recent cases
const recentCases = [
  {
    id: '1',
    title: 'Smith v. Johnson',
    caseNumber: 'CV-2023-1234',
    client: 'John Smith',
    status: 'Active',
    updatedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Estate of Williams',
    caseNumber: 'PR-2023-5678',
    client: 'Jane Williams',
    status: 'Active',
    updatedAt: '1 day ago',
  },
  {
    id: '3',
    title: 'Parker Industries Contract Dispute',
    caseNumber: 'CV-2023-9012',
    client: 'Parker Industries, LLC',
    status: 'Pending',
    updatedAt: '2 days ago',
  },
];

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: '1',
    title: 'Client Meeting - John Smith',
    date: 'Today, 2:00 PM',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Court Hearing - Smith v. Johnson',
    date: 'Tomorrow, 10:00 AM',
    type: 'hearing',
  },
  {
    id: '3',
    title: 'Document Filing Deadline - Estate of Williams',
    date: 'May 20, 2023',
    type: 'deadline',
  },
];

// Mock data for tasks
const tasks = [
  {
    id: '1',
    title: 'Review medical records for Smith case',
    completed: false,
    dueDate: 'Today',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Prepare client invoice for Williams estate',
    completed: true,
    dueDate: 'Yesterday',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Call expert witness regarding Parker dispute',
    completed: false,
    dueDate: 'May 18, 2023',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'File motion for Smith case',
    completed: false,
    dueDate: 'May 25, 2023',
    priority: 'high',
  },
];

// Case statistics
const stats = [
  {
    name: 'Active Cases',
    value: '8',
    icon: <FileTextIcon className='h-5 w-5' />,
    color: 'bg-green-100 text-green-800',
  },
  {
    name: 'Clients',
    value: '12',
    icon: <UsersIcon className='h-5 w-5' />,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Documents',
    value: '47',
    icon: <FolderIcon className='h-5 w-5' />,
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Tasks',
    value: '18',
    icon: <CheckIcon className='h-5 w-5' />,
    color: 'bg-purple-100 text-purple-800',
  },
];

export default function DashboardPage() {
  return (
    <div className='container py-8 px-4 md:px-6'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {stats.map((stat) => (
          <div
            key={stat.name}
            className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center'>
              <div className={`p-2 rounded-full ${stat.color} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>{stat.name}</p>
                <p className='text-2xl font-bold'>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Cases */}
        <div className='lg:col-span-2 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Recent Cases</h2>
            <Button variant='outline' size='sm' asChild>
              <Link href='/dashboard/cases'>
                View All <ChevronRightIcon className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>
          <div className='space-y-4'>
            {recentCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className='flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border border-primary/10 hover:bg-background/50 transition-colors'
              >
                <div className='mb-2 md:mb-0'>
                  <Link
                    href={`/dashboard/cases/${caseItem.id}`}
                    className='font-medium hover:text-primary'
                  >
                    {caseItem.title}
                  </Link>
                  <div className='flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground'>
                    <span>{caseItem.caseNumber}</span>
                    <span>•</span>
                    <span>{caseItem.client}</span>
                    <span>•</span>
                    <span>Updated {caseItem.updatedAt}</span>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caseItem.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : caseItem.status === 'Closed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {caseItem.status}
                  </span>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href={`/dashboard/cases/${caseItem.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Calendar & Tasks */}
        <div className='space-y-6'>
          {/* Calendar Upcoming Events */}
          <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Upcoming Events</h2>
              <Button variant='outline' size='sm' asChild>
                <Link href='/dashboard/calendar'>
                  <CalendarIcon className='mr-1 h-4 w-4' /> Calendar
                </Link>
              </Button>
            </div>
            <div className='space-y-3'>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className='flex items-start p-3 rounded-lg border border-primary/10 hover:bg-background/50 transition-colors'
                >
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      event.type === 'meeting'
                        ? 'bg-blue-100 text-blue-800'
                        : event.type === 'hearing'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {event.type === 'meeting' ? (
                      <UsersIcon className='h-4 w-4' />
                    ) : event.type === 'hearing' ? (
                      <BarChart3Icon className='h-4 w-4' />
                    ) : (
                      <ClockIcon className='h-4 w-4' />
                    )}
                  </div>
                  <div>
                    <p className='font-medium text-sm'>{event.title}</p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Tasks</h2>
              <Button variant='outline' size='sm'>
                <span className='mr-1'>+</span> Add Task
              </Button>
            </div>
            <div className='space-y-2'>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start p-3 rounded-lg border ${
                    task.completed
                      ? 'border-muted bg-muted/50'
                      : 'border-primary/10 hover:bg-background/50'
                  } transition-colors`}
                >
                  <div className='flex items-center h-5 mt-0.5'>
                    <input
                      type='checkbox'
                      checked={task.completed}
                      className='h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary'
                      readOnly
                    />
                  </div>
                  <div className='ml-3 flex-1'>
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? 'line-through text-muted-foreground'
                          : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className='flex items-center mt-1'>
                      <span
                        className={`text-xs mr-2 ${
                          task.dueDate.includes('Today')
                            ? 'text-red-600'
                            : 'text-muted-foreground'
                        }`}
                      >
                        Due: {task.dueDate}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex flex-col items-center text-center'>
            <div className='p-3 rounded-full bg-primary/10 mb-4'>
              <FolderIcon className='h-6 w-6 text-primary' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>Upload Document</h3>
            <p className='text-muted-foreground mb-4'>
              Quickly upload and organize case documents
            </p>
            <Button asChild>
              <Link href='/dashboard/documents'>Upload Document</Link>
            </Button>
          </div>
        </div>

        <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex flex-col items-center text-center'>
            <div className='p-3 rounded-full bg-primary/10 mb-4'>
              <FileTextIcon className='h-6 w-6 text-primary' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>Create New Case</h3>
            <p className='text-muted-foreground mb-4'>
              Start a new case and add all essential details
            </p>
            <Button asChild>
              <Link href='/dashboard/cases'>Create Case</Link>
            </Button>
          </div>
        </div>

        <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex flex-col items-center text-center'>
            <div className='p-3 rounded-full bg-primary/10 mb-4'>
              <UsersIcon className='h-6 w-6 text-primary' />
            </div>
            <h3 className='text-lg font-semibold mb-2'>Add New Client</h3>
            <p className='text-muted-foreground mb-4'>
              Register a new client to your contact database
            </p>
            <Button asChild>
              <Link href='/dashboard/clients'>Add Client</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
