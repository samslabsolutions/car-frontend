// src/components/BreadcrumbHeader.js
import Link from 'next/link';

export default function BreadcrumbHeader({ adCount = 1651 }) {
    return (
        <section className="w-full max-w-[1230px] px-4 mx-auto  mb-1">
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

            {/* Heading */}
            <h1 className="text-2xl  font-medium text-gray-900 mt-4">
                Cars for Rent in Dubai{' '}
                <span className="text-gray-500 font-normal">• {adCount.toLocaleString()} Ads</span>
            </h1>
        </section>
    );
}