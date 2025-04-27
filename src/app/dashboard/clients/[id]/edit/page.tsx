'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { Client, clients, updateClient } from '@/lib/mock-data';

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [clientData, setClientData] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Fetch client data
  useEffect(() => {
    const client = clients.find((c) => c.id === params.id);
    setClientData(client || null);
    setIsLoading(false);
  }, [params.id]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
    } = {};

    if (!clientData?.name) {
      errors.name = 'Name is required';
    }

    if (!clientData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(clientData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!clientData?.phone) {
      errors.phone = 'Phone number is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);

    // Simulate API call to update client
    setTimeout(() => {
      // Use the shared update function
      if (clientData) {
        updateClient(clientData);
      }

      setIsSaving(false);

      // Navigate back to client details page
      router.push(`/dashboard/clients/${params.id}`);
    }, 1000);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!clientData) return;

    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-8 px-4'>
        <div className='flex items-center mb-6'>
          <Link href={`/dashboard/clients/${params.id}`} className='mr-4'>
            <Button variant='ghost' size='sm'>
              <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back to Client
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className='container mx-auto py-8 px-4'>
        <div className='flex items-center mb-6'>
          <Link href='/dashboard/clients' className='mr-4'>
            <Button variant='ghost' size='sm'>
              <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back to Clients
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>Client Not Found</h1>
        </div>
        <p>The requested client could not be found.</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 px-4'>
      {/* Header */}
      <div className='flex items-center mb-6'>
        <Link href={`/dashboard/clients/${params.id}`} className='mr-4'>
          <Button variant='ghost' size='sm'>
            <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back to Client
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>Edit Client</h1>
      </div>

      {/* Edit Form */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>
                Client Type
              </label>
              <select
                name='type'
                className='w-full border border-primary/10 rounded-md p-2'
                value={clientData.type}
                onChange={handleChange}
              >
                <option value='Individual'>Individual</option>
                <option value='Company'>Company</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Name
                <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                className={`w-full border ${
                  formErrors.name ? 'border-red-500' : 'border-primary/10'
                } rounded-md p-2`}
                value={clientData.name}
                onChange={handleChange}
                required
              />
              {formErrors.name && (
                <p className='text-red-500 text-xs mt-1'>{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Email
                <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                name='email'
                className={`w-full border ${
                  formErrors.email ? 'border-red-500' : 'border-primary/10'
                } rounded-md p-2`}
                value={clientData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <p className='text-red-500 text-xs mt-1'>{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Phone
                <span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                name='phone'
                className={`w-full border ${
                  formErrors.phone ? 'border-red-500' : 'border-primary/10'
                } rounded-md p-2`}
                value={clientData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && (
                <p className='text-red-500 text-xs mt-1'>{formErrors.phone}</p>
              )}
            </div>

            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>Address</label>
              <textarea
                name='address'
                className='w-full border border-primary/10 rounded-md p-2'
                value={clientData.address}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Client Since
              </label>
              <input
                type='date'
                name='dateAdded'
                className='w-full border border-primary/10 rounded-md p-2'
                value={clientData.dateAdded}
                onChange={handleChange}
                disabled
              />
              <p className='text-xs text-muted-foreground mt-1'>
                This field cannot be changed
              </p>
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <Button
              type='button'
              variant='outline'
              className='mr-2'
              onClick={() => router.push(`/dashboard/clients/${params.id}`)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isSaving}>
              {isSaving ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <SaveIcon className='h-4 w-4 mr-2' /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
