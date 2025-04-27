'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { Case, cases, updateCase, clients } from '@/lib/mock-data';

const caseTypes = [
  'Civil',
  'Criminal',
  'Family',
  'Probate',
  'Bankruptcy',
  'Immigration',
  'Commercial',
  'Tax',
  'Intellectual Property',
  'Other',
];

export default function EditCasePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    caseNumber?: string;
    client?: string;
  }>({});

  // Fetch case data
  useEffect(() => {
    const caseRecord = cases.find((c) => c.id === params.id);
    setCaseData(caseRecord || null);
    setIsLoading(false);
  }, [params.id]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors: {
      title?: string;
      caseNumber?: string;
      client?: string;
    } = {};

    if (!caseData?.title) {
      errors.title = 'Title is required';
    }

    if (!caseData?.caseNumber) {
      errors.caseNumber = 'Case number is required';
    }

    if (!caseData?.client) {
      errors.client = 'Client is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);

    // Simulate API call to update case
    setTimeout(() => {
      // Use the shared update function
      if (caseData) {
        updateCase(caseData);
      }

      setIsSaving(false);

      // Navigate back to case details page
      router.push(`/dashboard/cases/${params.id}`);
    }, 1000);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!caseData) return;

    const { name, value } = e.target;
    setCaseData({
      ...caseData,
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
          <Link href={`/dashboard/cases/${params.id}`} className='mr-4'>
            <Button variant='ghost' size='sm'>
              <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back to Case
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>Loading...</h1>
        </div>
      </div>
    );
  }

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
      <div className='flex items-center mb-6'>
        <Link href={`/dashboard/cases/${params.id}`} className='mr-4'>
          <Button variant='ghost' size='sm'>
            <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back to Case
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>Edit Case</h1>
      </div>

      {/* Edit Form */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>
                Case Title
                <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='title'
                className={`w-full border ${
                  formErrors.title ? 'border-red-500' : 'border-primary/10'
                } rounded-md p-2`}
                value={caseData.title}
                onChange={handleChange}
                required
              />
              {formErrors.title && (
                <p className='text-red-500 text-xs mt-1'>{formErrors.title}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Case Number
                <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='caseNumber'
                className={`w-full border ${
                  formErrors.caseNumber ? 'border-red-500' : 'border-primary/10'
                } rounded-md p-2`}
                value={caseData.caseNumber}
                onChange={handleChange}
                required
              />
              {formErrors.caseNumber && (
                <p className='text-red-500 text-xs mt-1'>
                  {formErrors.caseNumber}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Client
                <span className='text-red-500'>*</span>
              </label>
              <select
                name='client'
                className={`w-full border ${
                  formErrors.client ? 'border-red-500' : 'border-primary/10'
                } rounded-md p-2`}
                value={caseData.client}
                onChange={handleChange}
                required
              >
                <option value=''>Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
              {formErrors.client && (
                <p className='text-red-500 text-xs mt-1'>{formErrors.client}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Case Type
              </label>
              <select
                name='type'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.type}
                onChange={handleChange}
              >
                <option value=''>Select a type</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Status</label>
              <select
                name='status'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.status}
                onChange={handleChange}
              >
                <option value='Active'>Active</option>
                <option value='Pending'>Pending</option>
                <option value='Closed'>Closed</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Date Opened
              </label>
              <input
                type='date'
                name='dateOpened'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.dateOpened}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Filing Date
              </label>
              <input
                type='date'
                name='filingDate'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.filingDate || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Hearing Date
              </label>
              <input
                type='date'
                name='hearingDate'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.hearingDate || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Attorney</label>
              <input
                type='text'
                name='attorney'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.attorney || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Judge</label>
              <input
                type='text'
                name='judge'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.judge || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Court</label>
              <input
                type='text'
                name='court'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.court || ''}
                onChange={handleChange}
              />
            </div>

            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>
                Description
              </label>
              <textarea
                name='description'
                className='w-full border border-primary/10 rounded-md p-2'
                value={caseData.description || ''}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <Button
              type='button'
              variant='outline'
              className='mr-2'
              onClick={() => router.push(`/dashboard/cases/${params.id}`)}
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
