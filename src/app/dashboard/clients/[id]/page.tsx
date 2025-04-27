'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeftIcon,
  PencilIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  FileTextIcon,
} from 'lucide-react';
import { Client, Case, clients, clientCases } from '@/lib/mock-data';

export default function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [client, setClient] = useState<Client | null>(null);
  const [relatedCases, setRelatedCases] = useState<Case[]>([]);

  // Fetch client data and related cases
  useEffect(() => {
    const foundClient = clients.find((c) => c.id === params.id);
    setClient(foundClient || null);

    const cases = clientCases[params.id] || [];
    setRelatedCases(cases);
  }, [params.id]);

  if (!client) {
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
      <div className='flex flex-wrap items-center justify-between mb-6'>
        <div className='flex items-center mb-4 md:mb-0'>
          <Link href='/dashboard/clients' className='mr-4'>
            <Button variant='ghost' size='sm'>
              <ArrowLeftIcon className='h-4 w-4 mr-2' /> Back
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>{client.name}</h1>
          <span className='ml-4 px-3 py-1 text-xs font-medium rounded-full bg-background/80 border border-primary/10'>
            {client.type}
          </span>
        </div>
        <Button size='sm' asChild>
          <Link href={`/dashboard/clients/${params.id}/edit`}>
            <PencilIcon className='h-4 w-4 mr-2' /> Edit Client
          </Link>
        </Button>
      </div>

      {/* Client Information */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <div className='lg:col-span-2'>
          <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
            <h2 className='text-xl font-semibold mb-4'>Client Information</h2>
            <div className='space-y-4'>
              <div className='flex items-start'>
                <div className='bg-primary/10 p-2 rounded-full mr-3'>
                  <MailIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Email</p>
                  <p className='font-medium'>
                    <a
                      href={`mailto:${client.email}`}
                      className='hover:text-primary'
                    >
                      {client.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='bg-primary/10 p-2 rounded-full mr-3'>
                  <PhoneIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Phone</p>
                  <p className='font-medium'>
                    <a
                      href={`tel:${client.phone}`}
                      className='hover:text-primary'
                    >
                      {client.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='bg-primary/10 p-2 rounded-full mr-3'>
                  <MapPinIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Address</p>
                  <p className='font-medium'>{client.address}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='bg-primary/10 p-2 rounded-full mr-3'>
                  <CalendarIcon className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Client Since</p>
                  <p className='font-medium'>{client.dateAdded}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 h-full'>
            <h2 className='text-xl font-semibold mb-4'>Client Stats</h2>
            <div className='space-y-4'>
              <div className='p-4 rounded-lg border border-primary/10'>
                <p className='text-sm text-muted-foreground'>Active Cases</p>
                <p className='text-2xl font-bold'>
                  {relatedCases.filter((c) => c.status === 'Active').length}
                </p>
              </div>

              <div className='p-4 rounded-lg border border-primary/10'>
                <p className='text-sm text-muted-foreground'>Total Cases</p>
                <p className='text-2xl font-bold'>{relatedCases.length}</p>
              </div>

              <div className='p-4 rounded-lg border border-primary/10'>
                <p className='text-sm text-muted-foreground'>Documents</p>
                <p className='text-2xl font-bold'>5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cases */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Related Cases</h2>

        {relatedCases.length > 0 ? (
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
                    Status
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
                {relatedCases.map((caseItem) => (
                  <tr key={caseItem.id} className='hover:bg-background/80'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      {caseItem.caseNumber}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <Link
                        href={`/dashboard/cases/${caseItem.id}`}
                        className='text-primary hover:text-primary/80'
                      >
                        {caseItem.title}
                      </Link>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          caseItem.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : caseItem.status === 'Closed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      {caseItem.dateOpened}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <Button variant='ghost' size='sm' asChild>
                        <Link href={`/dashboard/cases/${caseItem.id}`}>
                          <FileTextIcon className='h-4 w-4' />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-muted-foreground text-center py-4'>
            No cases associated with this client.
          </p>
        )}
      </div>

      {/* Recent Activity */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 p-6'>
        <h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
        <div className='space-y-4'>
          <div className='p-4 rounded-lg border border-primary/10 hover:bg-background/50'>
            <div className='flex justify-between'>
              <p className='font-medium'>
                Document uploaded: Will_And_Testament.pdf
              </p>
              <span className='text-xs text-muted-foreground'>
                Today, 10:30 AM
              </span>
            </div>
            <p className='text-sm text-muted-foreground mt-1'>
              Uploaded by Michael Johnson
            </p>
          </div>

          <div className='p-4 rounded-lg border border-primary/10 hover:bg-background/50'>
            <div className='flex justify-between'>
              <p className='font-medium'>Note added to Estate of Williams</p>
              <span className='text-xs text-muted-foreground'>
                Yesterday, 2:15 PM
              </span>
            </div>
            <p className='text-sm text-muted-foreground mt-1'>
              Filed petition for probate. Need to follow up on inventory of
              assets.
            </p>
          </div>

          <div className='p-4 rounded-lg border border-primary/10 hover:bg-background/50'>
            <div className='flex justify-between'>
              <p className='font-medium'>Client information updated</p>
              <span className='text-xs text-muted-foreground'>
                May 21, 2023
              </span>
            </div>
            <p className='text-sm text-muted-foreground mt-1'>
              Updated phone number and address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
