"use client";

import { useState, useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import Link from 'next/link';

export default function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Here you would implement the actual file upload logic
      // For demonstration, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful upload, redirect to the directory view
      window.location.href = '/directory';
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-semibold text-gray-900">LegalAI Pro</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Upload Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
            } transition-colors duration-200`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-6">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedFile ? selectedFile.name : 'Upload your legal document'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Drag and drop your PDF file here, or click to select
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  id="file-upload"
                />
              </div>
              <div className="flex justify-center gap-4">
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  Select File
                </label>
                {selectedFile && (
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isUploading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isUploading ? (
                      <>
                        <Upload className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload Document'
                    )}
                  </button>
                )}
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-500">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
