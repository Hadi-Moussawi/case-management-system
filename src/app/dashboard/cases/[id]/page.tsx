'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeftIcon,
  FilePlusIcon,
  PencilIcon,
  ClockIcon,
  FolderIcon,
  UserIcon,
} from 'lucide-react';
import { Case, Note, cases, notes } from '@/lib/mock-data';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [caseNotes, setCaseNotes] = useState<Note[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Fetch case data and notes based on ID
  useEffect(() => {
    // Find the case and filter notes for this case
    const foundCase = cases.find((c) => c.id === params.id);
    const filteredNotes = notes.filter((n) => n.caseId === params.id);

    setCaseData(foundCase || null);
    setCaseNotes(filteredNotes);
  }, [params.id]);

  // Handle adding a note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNote.trim()) return;

    const note: Note = {
      id: (caseNotes.length + 1).toString(),
      caseId: params.id,
      content: newNote,
      createdAt: new Date().toISOString(),
      createdBy: 'User',
    };

    // Update both the local state and the shared notes array
    notes.push(note);
    setCaseNotes([...caseNotes, note]);
    setNewNote('');
    setIsAddingNote(false);
  };

  if (!caseData) {
    return (
      <div className='container mx-auto py-8 px-4'>
        <div className='flex items-center mb-6'>
          <Link href='/dashboard/cases' className='mr-4'>
            <Button variant='ghost' size='sm'>
              <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back to Cases
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>Case Not Found</h1>
        </div>
        <p>The requested case could not be found.</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 px-4'>
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between mb-6'>
        <div className='flex items-center mb-4 md:mb-0'>
          <Link href='/dashboard/cases' className='mr-4'>
            <Button variant='ghost' size='sm'>
              <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>{caseData.title}</h1>
          <span className='ml-4 px-3 py-1 text-xs font-medium rounded-full bg-background/80 border border-primary/10'>
            {caseData.caseNumber}
          </span>
        </div>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' asChild>
            <Link href={`/dashboard/cases/${params.id}/documents`}>
              <FolderIcon className='h-4 w-4 mr-2' /> Documents
            </Link>
          </Button>
          <Button variant='outline' size='sm' asChild>
            <Link href={`/dashboard/cases/${params.id}/timeline`}>
              <ClockIcon className='h-4 w-4 mr-2' /> Timeline
            </Link>
          </Button>
          <Button size='sm' asChild>
            <Link href={`/dashboard/cases/${params.id}/edit`}>
              <PencilIcon className='h-4 w-4 mr-2' /> Edit Case
            </Link>
          </Button>
        </div>
      </div>

      {/* Case Summary Card */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <div className='lg:col-span-2'>
          <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
            <h2 className='text-xl font-semibold mb-4'>Case Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Client</p>
                <p className='font-medium'>{caseData.client}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Status</p>
                <p>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      caseData.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : caseData.status === 'Closed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {caseData.status}
                  </span>
                </p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Type</p>
                <p className='font-medium'>{caseData.type}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Date Opened</p>
                <p className='font-medium'>{caseData.dateOpened}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Attorney</p>
                <p className='font-medium'>{caseData.attorney}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Court</p>
                <p className='font-medium'>{caseData.court}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Judge</p>
                <p className='font-medium'>{caseData.judge}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Filing Date</p>
                <p className='font-medium'>{caseData.filingDate}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Next Hearing</p>
                <p className='font-medium'>{caseData.hearingDate}</p>
              </div>
            </div>
            {caseData.description && (
              <div className='mt-6'>
                <p className='text-sm text-muted-foreground mb-1'>
                  Description
                </p>
                <p className='font-medium'>{caseData.description}</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold'>Related Parties</h2>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 p-3 rounded-lg border border-primary/10 hover:bg-background/50'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <UserIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='font-medium'>{caseData.client}</p>
                  <p className='text-xs text-muted-foreground'>Client</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg border border-primary/10 hover:bg-background/50'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <UserIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='font-medium'>{caseData.attorney}</p>
                  <p className='text-xs text-muted-foreground'>Attorney</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg border border-primary/10 hover:bg-background/50'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <UserIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='font-medium'>{caseData.judge}</p>
                  <p className='text-xs text-muted-foreground'>Judge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Notes */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Case Notes</h2>
          <Button onClick={() => setIsAddingNote(true)} size='sm'>
            <FilePlusIcon className='h-4 w-4 mr-2' /> Add Note
          </Button>
        </div>

        {isAddingNote && (
          <div className='mb-6 bg-background/50 p-4 rounded-lg border border-primary/10'>
            <form onSubmit={handleAddNote}>
              <div className='mb-2'>
                <textarea
                  className='w-full border border-primary/10 rounded-md p-2 min-h-[100px]'
                  placeholder='Enter your note here...'
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className='flex justify-end space-x-2'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setIsAddingNote(false)}
                >
                  Cancel
                </Button>
                <Button type='submit'>Save Note</Button>
              </div>
            </form>
          </div>
        )}

        <div className='space-y-4'>
          {caseNotes.length > 0 ? (
            caseNotes.map((note) => (
              <div
                key={note.id}
                className='p-4 rounded-lg border border-primary/10 hover:bg-background/50'
              >
                <p className='mb-2'>{note.content}</p>
                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>{note.createdBy}</span>
                  <span>{new Date(note.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className='text-muted-foreground text-center py-4'>
              No notes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
