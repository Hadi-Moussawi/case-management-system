'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react';
import { Client, clients as initialClients } from '@/lib/mock-data';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Individual',
    dateAdded: new Date().toISOString().split('T')[0],
  });

  // Filter clients based on search term
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

  // Handle adding a new client
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();

    setClients([
      ...clients,
      {
        id: (clients.length + 1).toString(),
        ...newClient,
      },
    ]);

    setNewClient({
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'Individual',
      dateAdded: new Date().toISOString().split('T')[0],
    });

    setIsAddClientDialogOpen(false);
  };

  // Handle deleting a client
  const handleDeleteClient = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Clients</h1>
        <Button onClick={() => setIsAddClientDialogOpen(true)}>
          <PlusIcon className='mr-2 h-4 w-4' /> Add Client
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
          placeholder='Search clients...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Clients List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 hover:shadow-md transition-shadow'
          >
            <div className='flex justify-between items-start mb-4'>
              <div className='flex items-center'>
                <div className='bg-primary/10 p-2 rounded-full mr-3'>
                  <UserIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <h3 className='font-medium'>
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className='hover:text-primary'
                    >
                      {client.name}
                    </Link>
                  </h3>
                  <p className='text-xs text-muted-foreground'>{client.type}</p>
                </div>
              </div>
              <div className='flex space-x-1'>
                <Button variant='ghost' size='sm' asChild>
                  <Link href={`/dashboard/clients/${client.id}/edit`}>
                    <EditIcon className='h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleDeleteClient(client.id)}
                >
                  <TrashIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='text-muted-foreground'>Email: </span>
                <a
                  href={`mailto:${client.email}`}
                  className='hover:text-primary'
                >
                  {client.email}
                </a>
              </p>
              <p>
                <span className='text-muted-foreground'>Phone: </span>
                <a href={`tel:${client.phone}`} className='hover:text-primary'>
                  {client.phone}
                </a>
              </p>
              <p className='line-clamp-2'>
                <span className='text-muted-foreground'>Address: </span>
                {client.address}
              </p>
              <p>
                <span className='text-muted-foreground'>Client since: </span>
                {client.dateAdded}
              </p>
            </div>
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div className='col-span-full text-center py-8'>
            <p className='text-muted-foreground'>
              No clients found. Try adjusting your search or add a new client.
            </p>
          </div>
        )}
      </div>

      {/* Add Client Dialog */}
      {isAddClientDialogOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-background rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Add New Client</h2>
            <form onSubmit={handleAddClient}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Client Type
                  </label>
                  <select
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newClient.type}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        type: e.target.value as 'Individual' | 'Company',
                      })
                    }
                  >
                    <option value='Individual'>Individual</option>
                    <option value='Company'>Company</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Name</label>
                  <input
                    type='text'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newClient.name}
                    onChange={(e) =>
                      setNewClient({ ...newClient, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Phone
                  </label>
                  <input
                    type='tel'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newClient.phone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Address
                  </label>
                  <textarea
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={newClient.address}
                    onChange={(e) =>
                      setNewClient({ ...newClient, address: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
              </div>
              <div className='flex justify-end space-x-2 mt-6'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setIsAddClientDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit'>Save Client</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
