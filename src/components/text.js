// src/components/BreadcrumbHeader.js
import Link from 'next/link';
import { Bookmark, X } from 'lucide-react';

export default function BreadcrumbHeader({ adCount = 1651, onSaveSearch, onClearSearch, isSaved = false }) {
    return (
        <section className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-3">
                <Link href="/" className="text-blue-600 hover:underline">
                    Home
                </Link>
                <span className="text-gray-400" aria-hidden="true">›</span>
                <Link href="/dubai" className="text-blue-600 hover:underline">
                    Dubai
                </Link>
                <span className="text-gray-400" aria-hidden="true">›</span>
                <span className="text-gray-600">Economy Cars</span>
            </nav>

            {/* Header with Title and Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                {/* Heading */}
                <h1 className="text-2xl font-medium text-gray-900">
                    Cars for Rent in Dubai{' '}
                    <span className="text-gray-500 font-normal">• {adCount.toLocaleString()} Ads</span>
                </h1>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* Save Search Button */}
                    <button
                        onClick={onSaveSearch}
                        className={`
                            inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md
                            transition-all duration-200
                            ${isSaved
                                ? 'bg-blue-50 border border-blue-600 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
                                : 'border border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                            }
                           
                        `}
                        title={isSaved ? "Search saved" : "Save this search"}
                    >
                        <Bookmark
                            className={`w-4 h-4 ${isSaved ? '' : ''}`}
                        />
                        <span>
                            {isSaved ? 'Saved' : 'Save'}
                        </span>
                    </button>

                    {/* Clear Search Button */}
                    <button
                        onClick={onClearSearch}
                        className="
                            inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md
                            border border-gray-300 text-gray-600
                            hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400
                            transition-all duration-200 
                        "
                        title="Clear all search filters"
                    >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                    </button>
                </div>
            </div>
        </section>
    );
}