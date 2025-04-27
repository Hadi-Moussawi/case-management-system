'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  SettingsIcon,
  UserIcon,
  BellIcon,
  ShieldIcon,
  MonitorIcon,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className='container py-8 px-4 md:px-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Settings</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Settings Sidebar */}
        <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-4 shadow-sm'>
          <nav className='space-y-1'>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'account'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5'
              }`}
            >
              <UserIcon className='h-5 w-5 mr-3' />
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5'
              }`}
            >
              <BellIcon className='h-5 w-5 mr-3' />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'security'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5'
              }`}
            >
              <ShieldIcon className='h-5 w-5 mr-3' />
              Security
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'appearance'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5'
              }`}
            >
              <MonitorIcon className='h-5 w-5 mr-3' />
              Appearance
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className='md:col-span-3 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-sm'>
          <div className='flex flex-col items-center justify-center min-h-[400px]'>
            <SettingsIcon className='h-16 w-16 text-muted-foreground mb-4' />
            <h2 className='text-xl font-semibold mb-2'>Settings Coming Soon</h2>
            <p className='text-muted-foreground mb-4 text-center max-w-md'>
              The settings panel is under development. Soon you&apos;ll be able
              to customize your account, preferences, and system settings.
            </p>
            <Button variant='outline'>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
