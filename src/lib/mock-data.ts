// Client type definition
export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'Individual' | 'Company';
  dateAdded: string;
};

// Case type definition
export type Case = {
  id: string;
  title: string;
  caseNumber: string;
  client: string;
  status: 'Active' | 'Pending' | 'Closed';
  type: string;
  dateOpened: string;
  description?: string;
  judge?: string;
  court?: string;
  filingDate?: string;
  hearingDate?: string;
  attorney?: string;
};

// Note type definition
export type Note = {
  id: string;
  caseId: string;
  content: string;
  createdAt: string;
  createdBy: string;
};

// Mock clients data
export const clients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA 12345',
    type: 'Individual',
    dateAdded: '2023-04-15',
  },
  {
    id: '2',
    name: 'Jane Williams',
    email: 'jane.williams@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Dr, Somewhere, USA 67890',
    type: 'Individual',
    dateAdded: '2023-05-21',
  },
  {
    id: '3',
    name: 'Parker Industries, LLC',
    email: 'contact@parkerindustries.com',
    phone: '(555) 765-4321',
    address: '789 Corporate Blvd, Metropolis, USA 54321',
    type: 'Company',
    dateAdded: '2023-06-03',
  },
];

// Mock cases data
export const cases: Case[] = [
  {
    id: '1',
    title: 'Smith v. Johnson',
    caseNumber: 'CV-2023-1234',
    client: 'John Smith',
    status: 'Active',
    type: 'Civil',
    dateOpened: '2023-05-15',
    description:
      'Personal injury case resulting from car accident on Main Street.',
    judge: 'Hon. Robert Davis',
    court: 'Superior Court of Fulton County',
    filingDate: '2023-05-20',
    hearingDate: '2023-09-15',
    attorney: 'Sarah Williams',
  },
  {
    id: '2',
    title: 'Estate of Williams',
    caseNumber: 'PR-2023-5678',
    client: 'Jane Williams',
    status: 'Active',
    type: 'Probate',
    dateOpened: '2023-06-21',
    description: 'Probate proceedings for the estate of Thomas Williams.',
    judge: 'Hon. Lisa Chen',
    court: 'Probate Court of Cook County',
    filingDate: '2023-06-28',
    hearingDate: '2023-08-05',
    attorney: 'Michael Johnson',
  },
  {
    id: '3',
    title: 'Parker Industries Contract Dispute',
    caseNumber: 'CV-2023-9012',
    client: 'Parker Industries, LLC',
    status: 'Pending',
    type: 'Commercial',
    dateOpened: '2023-07-03',
    description: 'Contract dispute regarding software implementation failure.',
    judge: 'Hon. James Wilson',
    court: 'U.S. District Court, Northern District',
    filingDate: '2023-07-10',
    hearingDate: '2023-10-25',
    attorney: 'David Miller',
  },
];

// Mock notes data
export const notes: Note[] = [
  {
    id: '1',
    caseId: '1',
    content:
      'Initial client consultation completed. Client has medical records from ER visit.',
    createdAt: '2023-05-16T10:30:00Z',
    createdBy: 'Sarah Williams',
  },
  {
    id: '2',
    caseId: '1',
    content: 'Filed complaint with court. Awaiting service confirmation.',
    createdAt: '2023-05-22T14:15:00Z',
    createdBy: 'Sarah Williams',
  },
  {
    id: '3',
    caseId: '2',
    content:
      'Filed petition for probate. Need to follow up on inventory of assets.',
    createdAt: '2023-06-29T09:45:00Z',
    createdBy: 'Michael Johnson',
  },
];

// Mock related cases data
export const clientCases: Record<string, Case[]> = {
  '1': [
    {
      id: '1',
      title: 'Smith v. Johnson',
      caseNumber: 'CV-2023-1234',
      status: 'Active',
      type: 'Civil',
      dateOpened: '2023-05-15',
      client: 'John Smith',
    },
  ],
  '2': [
    {
      id: '2',
      title: 'Estate of Williams',
      caseNumber: 'PR-2023-5678',
      status: 'Active',
      type: 'Probate',
      dateOpened: '2023-06-21',
      client: 'Jane Williams',
    },
  ],
  '3': [
    {
      id: '3',
      title: 'Parker Industries Contract Dispute',
      caseNumber: 'CV-2023-9012',
      status: 'Pending',
      type: 'Commercial',
      dateOpened: '2023-07-03',
      client: 'Parker Industries, LLC',
    },
  ],
};

// Function to update a client
export const updateClient = (updatedClient: Client): void => {
  const index = clients.findIndex((client) => client.id === updatedClient.id);
  if (index !== -1) {
    clients[index] = updatedClient;
  }
};

// Function to update a case
export const updateCase = (updatedCase: Case): void => {
  const index = cases.findIndex((c) => c.id === updatedCase.id);
  if (index !== -1) {
    cases[index] = updatedCase;
  }
};
