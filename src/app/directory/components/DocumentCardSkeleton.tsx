"use client";

export default function DocumentCardSkeleton() {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
      <div className="p-6 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="h-5 w-5 bg-gray-200 rounded mr-2" />
              <div className="h-6 w-48 bg-gray-200 rounded" />
            </div>
            <div className="mt-1 h-4 w-32 bg-gray-200 rounded" />
            <div className="mt-2">
              <div className="h-5 w-20 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-end space-x-3">
          <div className="h-8 w-20 bg-gray-200 rounded-md" />
          <div className="h-8 w-24 bg-gray-200 rounded-md" />
          <div className="h-8 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
