'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  FileTextIcon,
  UsersIcon,
  FolderIcon,
  LayoutDashboardIcon,
  CalendarIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  LogOutIcon,
  BellIcon,
  SearchIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboardIcon className='h-5 w-5' />,
    },
    {
      name: 'Cases',
      href: '/dashboard/cases',
      icon: <FileTextIcon className='h-5 w-5' />,
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      icon: <UsersIcon className='h-5 w-5' />,
    },
    {
      name: 'Documents',
      href: '/dashboard/documents',
      icon: <FolderIcon className='h-5 w-5' />,
    },
    {
      name: 'Calendar',
      href: '/dashboard/calendar',
      icon: <CalendarIcon className='h-5 w-5' />,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: <SettingsIcon className='h-5 w-5' />,
    },
  ];

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex'>
        {/* Sidebar for desktop */}
        <aside
          className={`hidden md:flex flex-col border-r border-primary/10 bg-background/80 backdrop-blur-xl transition-all duration-300 ${
            collapsed ? 'w-[70px]' : 'w-[240px]'
          }`}
        >
          <div
            className={`flex items-center h-16 ${
              collapsed ? 'justify-center' : 'px-4'
            } border-b border-primary/10`}
          >
            {!collapsed ? (
              <div className='flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-6 w-6 text-primary'
                >
                  <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                  <polyline points='14 2 14 8 20 8' />
                  <path d='m10 14 2 2 4-4' />
                  <path d='M8 18h1.93a2 2 0 0 0 1.66-.9l.82-1.2a2 2 0 0 1 1.66-.9H16' />
                </svg>
                <span className='font-bold'>CaseFlow</span>
              </div>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6 text-primary'
              >
                <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                <polyline points='14 2 14 8 20 8' />
                <path d='m10 14 2 2 4-4' />
                <path d='M8 18h1.93a2 2 0 0 0 1.66-.9l.82-1.2a2 2 0 0 1 1.66-.9H16' />
              </svg>
            )}
          </div>

          <div className='flex-1 overflow-y-auto py-6'>
            <nav className='px-2 space-y-1'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <div className='flex items-center'>
                    {item.icon}
                    {!collapsed && <span className='ml-3'>{item.name}</span>}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div
            className={`p-4 border-t border-primary/10 ${
              collapsed ? 'flex justify-center' : ''
            }`}
          >
            <button
              onClick={() => setCollapsed(!collapsed)}
              className='rounded-md p-1.5 hover:bg-primary/5 text-muted-foreground'
            >
              {collapsed ? (
                <ChevronRightIcon className='h-5 w-5' />
              ) : (
                <ChevronLeftIcon className='h-5 w-5' />
              )}
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-40 md:hidden'
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-[240px] z-50 bg-background transform transition-transform duration-300 md:hidden ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex items-center h-16 px-4 border-b border-primary/10'>
            <div className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6 text-primary'
              >
                <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
                <polyline points='14 2 14 8 20 8' />
                <path d='m10 14 2 2 4-4' />
                <path d='M8 18h1.93a2 2 0 0 0 1.66-.9l.82-1.2a2 2 0 0 1 1.66-.9H16' />
              </svg>
              <span className='font-bold'>CaseFlow</span>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto py-6'>
            <nav className='px-2 space-y-1'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className='flex items-center'>
                    {item.icon}
                    <span className='ml-3'>{item.name}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className='flex-1 flex flex-col min-w-0'>
          {/* Top navbar */}
          <header className='sticky top-0 z-30 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl'>
            <div className='flex h-16 items-center justify-between px-4'>
              <div className='flex items-center md:hidden'>
                <button
                  onClick={() => setMobileOpen(true)}
                  className='p-2 rounded-md hover:bg-primary/5'
                >
                  <MenuIcon className='h-5 w-5' />
                </button>
              </div>

              <div className='flex flex-1 items-center justify-end md:justify-between'>
                <div className='hidden md:block w-full max-w-md'>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <SearchIcon className='w-4 h-4 text-muted-foreground' />
                    </div>
                    <input
                      type='text'
                      className='bg-background/80 border border-primary/10 text-sm rounded-lg block w-full pl-10 p-2 placeholder:text-muted-foreground/70'
                      placeholder='Search...'
                    />
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <button className='p-2 rounded-md hover:bg-primary/5 text-muted-foreground relative'>
                    <BellIcon className='h-5 w-5' />
                    <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-primary'></span>
                  </button>

                  <div className='hidden md:flex items-center'>
                    <span className='text-sm text-muted-foreground mr-2'>
                      Welcome,
                    </span>
                    <span className='text-sm font-medium'>User</span>
                  </div>

                  <Button variant='outline' size='sm' asChild>
                    <Link href='/'>
                      <LogOutIcon className='h-4 w-4 mr-2' /> Home
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className='flex-1 overflow-auto'>{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
