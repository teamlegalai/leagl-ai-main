"use client";

import { useState } from 'react';
import { FileText, Eye, RefreshCw, Download } from 'lucide-react';
import { format } from 'date-fns';

interface Document {
  id: number;
  fileName: string;
  uploadDate: Date;
  status: string;
  summary: string;
}

interface DocumentCardProps {
  document: Document;
  onViewSummary: (doc: Document) => void;
}

export default function DocumentCard({ document, onViewSummary }: DocumentCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReprocess = async () => {
    setIsProcessing(true);
    // Add reprocessing logic here
    setTimeout(() => setIsProcessing(false), 2000); // Simulate processing
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 truncate" title={document.fileName}>
                {document.fileName}
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Uploaded on {format(document.uploadDate, "MMM d, yyyy")}
            </p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Processing...
                  </>
                ) : (
                  document.status
                )}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-end space-x-3">
          <button
            onClick={() => onViewSummary(document)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </button>
          <button
            onClick={handleReprocess}
            disabled={isProcessing}
            className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
              isProcessing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            } transition-colors duration-200`}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isProcessing ? 'animate-spin' : ''}`} />
            {isProcessing ? 'Processing...' : 'Reprocess'}
          </button>
          <button
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
