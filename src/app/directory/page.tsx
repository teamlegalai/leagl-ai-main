"use client";

"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Upload,
  LogOut,
  Search,
  Filter,
  FileText,
  Eye,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';
import DocumentCard from './components/DocumentCard';
import DocumentCardSkeleton from './components/DocumentCardSkeleton';
import SummaryModal from './components/SummaryModal';

export default function UserDirectory() {
  const handleViewSummary = (doc: typeof documents[0]) => {
    setSelectedDocument(doc);
    setShowSummaryModal(true);
  };

  const handleCloseSummary = () => {
    setShowSummaryModal(false);
    setSelectedDocument(null);
  };
  const [documents, setDocuments] = useState([
    {
      id: 1,
      fileName: "Smith_vs_Johnson_2025.pdf",
      uploadDate: new Date("2025-08-20"),
      status: "Processed",
      summary: "This case involves...",
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const documentsPerPage = 10;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Create a new FormData instance
      const formData = new FormData();
      formData.append('file', file);

      // Make the upload request
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      // Add the new document to the list
      const uploadedDoc = {
        id: result.id,
        fileName: file.name,
        uploadDate: new Date(),
        status: "Processing",
        summary: "",
      };
      
      setDocuments([uploadedDoc, ...documents]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add the new document to the list (in a real app, this would come from the server)
      const newDoc = {
        id: Date.now(),
        fileName: file.name,
        uploadDate: new Date(),
        status: "In Progress",
        summary: "Processing...",
      };
      
      // Update your documents list here
      
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error appropriately
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-semibold text-gray-900">User Directory</h1>
            </div>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                {isUploading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New PDF
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Status</option>
              <option value="processed">Processed</option>
              <option value="in-progress">In Progress</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.length > 0 ? (
            documents.map((doc: typeof documents[0]) => (
              <div key={doc.id} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate" title={doc.fileName}>
                        {doc.fileName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Uploaded on {format(doc.uploadDate, "MMM d, yyyy")}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doc.status === "Processed" ? "bg-green-100 text-green-800" :
                          doc.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end space-x-3">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Reprocess
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
              <FileText className="h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading a new document.</p>
              <Link className="btn btn-primary" href="/directory/upload">
                Try It
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Summary Modal */}
      <SummaryModal
        isOpen={showSummaryModal}
        document={selectedDocument ?? { fileName: '', summary: '' }}
        onClose={handleCloseSummary}
      />

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
