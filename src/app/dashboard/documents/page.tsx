'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  PlusIcon,
  SearchIcon,
  FileTextIcon,
  FileIcon,
  DownloadIcon,
  TrashIcon,
  FolderIcon,
} from 'lucide-react';

// Define document type
type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  caseId?: string;
  caseName?: string;
  clientId?: string;
  clientName?: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  fileContent?: Blob; // Store the actual file blob
};

// Mock data
const initialDocuments: Document[] = [
  {
    id: '1',
    name: 'Smith_Complaint.pdf',
    type: 'application/pdf',
    size: '1.2 MB',
    caseId: '1',
    caseName: 'Smith v. Johnson',
    clientId: '1',
    clientName: 'John Smith',
    category: 'Pleadings',
    uploadedBy: 'Sarah Williams',
    uploadedAt: '2023-05-20T10:30:00Z',
    lastModified: '2023-05-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Medical_Records.pdf',
    type: 'application/pdf',
    size: '3.5 MB',
    caseId: '1',
    caseName: 'Smith v. Johnson',
    clientId: '1',
    clientName: 'John Smith',
    category: 'Evidence',
    uploadedBy: 'Sarah Williams',
    uploadedAt: '2023-05-22T14:15:00Z',
    lastModified: '2023-05-22T14:15:00Z',
  },
  {
    id: '3',
    name: 'Accident_Scene_Photo.jpg',
    type: 'image/jpeg',
    size: '2.7 MB',
    caseId: '1',
    caseName: 'Smith v. Johnson',
    clientId: '1',
    clientName: 'John Smith',
    category: 'Evidence',
    uploadedBy: 'Sarah Williams',
    uploadedAt: '2023-05-25T09:45:00Z',
    lastModified: '2023-05-25T09:45:00Z',
  },
  {
    id: '4',
    name: 'Will_And_Testament.pdf',
    type: 'application/pdf',
    size: '0.8 MB',
    caseId: '2',
    caseName: 'Estate of Williams',
    clientId: '2',
    clientName: 'Jane Williams',
    category: 'Estate Documents',
    uploadedBy: 'Michael Johnson',
    uploadedAt: '2023-06-28T11:20:00Z',
    lastModified: '2023-06-28T11:20:00Z',
  },
  {
    id: '5',
    name: 'Contract_Draft.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: '0.5 MB',
    caseId: '3',
    caseName: 'Parker Industries Contract Dispute',
    clientId: '3',
    clientName: 'Parker Industries, LLC',
    category: 'Contracts',
    uploadedBy: 'David Miller',
    uploadedAt: '2023-07-05T15:30:00Z',
    lastModified: '2023-07-10T09:15:00Z',
  },
];

// Document categories
const categories = [
  'All Categories',
  'Pleadings',
  'Evidence',
  'Contracts',
  'Estate Documents',
  'Correspondence',
  'Notes',
  'Financials',
  'Other',
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadDetails, setUploadDetails] = useState({
    name: '',
    category: 'Pleadings',
    caseId: '',
    clientId: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: '',
    visible: false,
  });

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Auto-fill name if not already set
      if (!uploadDetails.name) {
        setUploadDetails({
          ...uploadDetails,
          name: file.name,
        });
      }
    }
  };

  // Filter documents based on search term and category
  const filteredDocuments = documents.filter(
    (doc) =>
      (selectedCategory === 'All Categories' ||
        doc.category === selectedCategory) &&
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.caseName &&
          doc.caseName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (doc.clientName &&
          doc.clientName.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <FileIcon className='h-10 w-10 text-red-500' />;
    } else if (type.includes('image')) {
      return <FileIcon className='h-10 w-10 text-blue-500' />;
    } else if (type.includes('word')) {
      return <FileTextIcon className='h-10 w-10 text-blue-700' />;
    } else {
      return <FileIcon className='h-10 w-10 text-gray-500' />;
    }
  };

  // Handle document upload
  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile && !uploadDetails.name) {
      alert('Please select a file or enter a document name');
      return;
    }

    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      // In a real app, this would upload to a server
      const newDocument: Document = {
        id: (documents.length + 1).toString(),
        name:
          uploadDetails.name ||
          (selectedFile ? selectedFile.name : 'Untitled Document'),
        type: selectedFile
          ? selectedFile.type ||
            (selectedFile.name.endsWith('.pdf')
              ? 'application/pdf'
              : selectedFile.name.endsWith('.docx')
              ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              : selectedFile.name.endsWith('.jpg') ||
                selectedFile.name.endsWith('.jpeg')
              ? 'image/jpeg'
              : 'application/octet-stream')
          : 'application/octet-stream',
        size: selectedFile
          ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
          : '0.5 MB', // Convert to MB
        category: uploadDetails.category,
        uploadedBy: 'User',
        uploadedAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        fileContent: selectedFile ? selectedFile : undefined, // Store the actual file content
      };

      // Add case and client details if provided
      if (uploadDetails.caseId) {
        const matchedCase = documents.find(
          (doc) => doc.caseId === uploadDetails.caseId
        );
        if (matchedCase) {
          newDocument.caseId = uploadDetails.caseId;
          newDocument.caseName = matchedCase.caseName;
        }
      }

      if (uploadDetails.clientId) {
        const matchedClient = documents.find(
          (doc) => doc.clientId === uploadDetails.clientId
        );
        if (matchedClient) {
          newDocument.clientId = uploadDetails.clientId;
          newDocument.clientName = matchedClient.clientName;
        }
      }

      setDocuments([...documents, newDocument]);
      setUploadDetails({
        name: '',
        category: 'Pleadings',
        caseId: '',
        clientId: '',
      });
      setSelectedFile(null);
      setUploading(false);
      setIsUploadDialogOpen(false);
    }, 1500); // Simulated upload time
  };

  // Handle document deletion
  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    }
  };

  // Handle document download
  const handleDownloadDocument = (doc: Document) => {
    if (doc.fileContent) {
      // If we have the actual file content, use it directly
      const url = URL.createObjectURL(doc.fileContent);

      // Create a temporary link element
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;

      // Append the link to the body
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show notification
      showNotification(`Downloaded: ${doc.name}`);
    } else {
      // For pre-existing documents that don't have stored content
      // (this is for backward compatibility with initial mock data)
      let content = '';
      let mimeType = 'text/plain';
      const isPreexistingMockData = true;

      if (doc.type.includes('pdf')) {
        content = `%PDF-1.5\n% This is a sample PDF file for ${doc.name}\n% In a real application, this would be an actual PDF file content`;
        mimeType = 'application/pdf';
      } else if (doc.type.includes('word')) {
        content = `This is a sample Word document for ${doc.name}.\nIn a real application, this would be an actual Word file.`;
        mimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else if (doc.type.includes('image')) {
        content = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
          <rect width="200" height="200" fill="#f0f0f0" />
          <text x="40" y="100" font-family="sans-serif" font-size="14" fill="#333">
            ${doc.name}
          </text>
        </svg>`;
        mimeType = 'image/svg+xml';
      } else {
        content = `This is a sample document for ${doc.name}.\nIn a real application, this would be the actual file content.`;
      }

      // Create a blob from the content
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;

      // Append the link to the body
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show a notification with warning for mock data
      if (isPreexistingMockData) {
        showNotification(`Downloaded simulation of: ${doc.name}`);
      } else {
        showNotification(`Downloaded: ${doc.name}`);
      }
    }
  };

  // Show a brief notification
  const showNotification = (message: string) => {
    setDownloadNotification({
      message,
      visible: true,
    });

    // Hide after 3 seconds
    setTimeout(() => {
      setDownloadNotification({
        message: '',
        visible: false,
      });
    }, 3000);
  };

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Documents</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <PlusIcon className='mr-2 h-4 w-4' /> Upload Document
        </Button>
      </div>

      {/* Download Notification */}
      {downloadNotification.visible && (
        <div className='fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded shadow-lg flex items-center z-50 animate-in fade-in slide-in-from-bottom-4'>
          <FileIcon className='h-5 w-5 mr-2' />
          <span>{downloadNotification.message}</span>
        </div>
      )}

      {/* Filters and Search */}
      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        <div className='relative flex-1'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <SearchIcon className='w-5 h-5 text-gray-400' />
          </div>
          <input
            type='text'
            className='bg-background/80 border border-primary/10 text-sm rounded-lg block w-full pl-10 p-2.5'
            placeholder='Search documents...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className='bg-background/80 border border-primary/10 text-sm rounded-lg p-2.5 min-w-[200px]'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Documents List */}
      <div className='bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-primary/10'>
            <thead className='bg-background/50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Document
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Category
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Related Case
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Size
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
                >
                  Uploaded
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
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className='hover:bg-background/80'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      {getFileIcon(doc.type)}
                      <div className='ml-4'>
                        <div className='text-sm font-medium'>{doc.name}</div>
                        <div className='text-xs text-muted-foreground'>
                          {doc.uploadedBy}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {doc.category}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {doc.caseName ? (
                      <Link
                        href={`/dashboard/cases/${doc.caseId}`}
                        className='text-primary hover:text-primary/80'
                      >
                        {doc.caseName}
                      </Link>
                    ) : (
                      <span className='text-muted-foreground'>-</span>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {doc.size}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDownloadDocument(doc)}
                    >
                      <DownloadIcon className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>
              No documents found. Try adjusting your search or upload a new
              document.
            </p>
          </div>
        )}
      </div>

      {/* Upload Document Dialog */}
      {isUploadDialogOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-background rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Upload Document</h2>
            <form onSubmit={handleUploadDocument}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    File Upload
                  </label>
                  <div className='border border-dashed border-primary/10 rounded-md p-6 flex flex-col items-center justify-center'>
                    <FolderIcon className='h-10 w-10 text-muted-foreground mb-2' />
                    {selectedFile ? (
                      <div className='text-center mb-2'>
                        <p className='text-sm font-medium'>
                          {selectedFile.name}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <p className='text-sm text-muted-foreground mb-2'>
                        Drag and drop your file here, or click to browse
                      </p>
                    )}
                    <input
                      type='file'
                      className='hidden'
                      id='file-upload'
                      onChange={handleFileSelect}
                    />
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        document.getElementById('file-upload')?.click()
                      }
                    >
                      {selectedFile ? 'Change File' : 'Browse Files'}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Document Name
                  </label>
                  <input
                    type='text'
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={uploadDetails.name}
                    onChange={(e) =>
                      setUploadDetails({
                        ...uploadDetails,
                        name: e.target.value,
                      })
                    }
                    required
                    placeholder='e.g., Contract_Draft.pdf'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Category
                  </label>
                  <select
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={uploadDetails.category}
                    onChange={(e) =>
                      setUploadDetails({
                        ...uploadDetails,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories
                      .filter((c) => c !== 'All Categories')
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Related Case (Optional)
                  </label>
                  <select
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={uploadDetails.caseId}
                    onChange={(e) =>
                      setUploadDetails({
                        ...uploadDetails,
                        caseId: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select a case</option>
                    <option value='1'>Smith v. Johnson</option>
                    <option value='2'>Estate of Williams</option>
                    <option value='3'>
                      Parker Industries Contract Dispute
                    </option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Related Client (Optional)
                  </label>
                  <select
                    className='w-full border border-primary/10 rounded-md p-2'
                    value={uploadDetails.clientId}
                    onChange={(e) =>
                      setUploadDetails({
                        ...uploadDetails,
                        clientId: e.target.value,
                      })
                    }
                  >
                    <option value=''>Select a client</option>
                    <option value='1'>John Smith</option>
                    <option value='2'>Jane Williams</option>
                    <option value='3'>Parker Industries, LLC</option>
                  </select>
                </div>
              </div>
              <div className='flex justify-end space-x-2 mt-6'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setIsUploadDialogOpen(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={uploading}>
                  {uploading ? (
                    <>
                      <span className='mr-2'>
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
                      </span>
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
