'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react';
import { Case, cases as initialCases } from '@/lib/mock-data';

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCaseDialogOpen, setIsAddCaseDialogOpen] = useState(false);
  const [newCase, setNewCase] = useState<Omit<Case, 'id'>>({
    title: '',
    caseNumber: '',
    client: '',
    status: 'Active',
    type: '',
    dateOpened: new Date().toISOString().split('T')[0],
  });

  // Filter cases based on search term
  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new case
  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    setCases([
      ...cases,
      {
        id: (cases.length + 1).toString(),
        ...newCase,
      },
    ]);
    setNewCase({
      title: '',
      caseNumber: '',
      client: '',
      status: 'Active',
      type: '',
      dateOpened: new Date().toISOString().split('T')[0],
    });
    setIsAddCaseDialogOpen(false);
  };

  // Handle deleting a case
  const handleDeleteCase = (id: string) => {
    if (confirm('Are you sure you want to delete this case?')) {
      setCases(cases.filter((c) => c.id !== id));
    }
  };

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Cases</h1>
        <Button onClick={() => setIsAddCaseDialogOpen(true)}>
          <PlusIcon className='mr-2 h-4 w-4' /> Add Case
        </Button>
      </div>

      {/* Search */}
      <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <SearchIcon className='w-5 h-5 text-gray-400' />
        </div>
        <input
          type='text'
          className='bg-background/80 border border-primary/10 text-sm rounded-lg block w-full pl-10 p-2.5'
          placeholder='Search cases...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cases Table */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-primary/10'>
            <thead className='bg-background/50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Case Number
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Client
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Status
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Type
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Date Opened
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-background/50 divide-y divide-primary/10'>
              {filteredCases.map((legalCase) => (
                <tr key={legalCase.id} className='hover:bg-background/80'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {legalCase.caseNumber}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <Link
                      href={`/dashboard/cases/${legalCase.id}`}
                      className='text-primary hover:text-primary/80'
                    >
                      {legalCase.title}
                    </Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {legalCase.client}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        legalCase.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : legalCase.status === 'Closed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {legalCase.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {legalCase.type}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {legalCase.dateOpened}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link href={`/dashboard/cases/${legalCase.id}/edit`}>
                        <EditIcon className='h-4 w-4' />
                      </Link>
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeleteCase(legalCase.id)}
                    >
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Case Dialog */}
      {isAddCaseDialogOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-background rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Add New Case</h2>
            <form onSubmit={handleAddCase}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Case Title
                  </label>
                  <input
                    type='text'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newCase.title}
                    onChange={(e) =>
                      setNewCase({ ...newCase, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Case Number
                  </label>
                  <input
                    type='text'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newCase.caseNumber}
                    onChange={(e) =>
                      setNewCase({ ...newCase, caseNumber: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Client
                  </label>
                  <input
                    type='text'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newCase.client}
                    onChange={(e) =>
                      setNewCase({ ...newCase, client: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Status
                  </label>
                  <select
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newCase.status}
                    onChange={(e) =>
                      setNewCase({
                        ...newCase,
                        status: e.target.value as
                          | 'Active'
                          | 'Pending'
                          | 'Closed',
                      })
                    }
                  >
                    <option value='Active'>Active</option>
                    <option value='Pending'>Pending</option>
                    <option value='Closed'>Closed</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Type</label>
                  <input
                    type='text'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newCase.type}
                    onChange={(e) =>
                      setNewCase({ ...newCase, type: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Date Opened
                  </label>
                  <input
                    type='date'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newCase.dateOpened}
                    onChange={(e) =>
                      setNewCase({ ...newCase, dateOpened: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className='flex justify-end space-x-2 mt-6'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setIsAddCaseDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit'>Save Case</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
