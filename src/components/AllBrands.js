'use client';
import Image from 'next/image';

const brands = [
    { name: 'Mercedes', logo: '/mer.png', color: '#dbeafe' },
    { name: 'BMW', logo: '/bm.png', color: '#dbeafe' },
    { name: 'Land Rover', logo: '/mer.png', color: '#dbeafe' },
    { name: 'Kia', logo: '/mer.png', color: '#dbeafe' },
    { name: 'Nissan', logo: '/mer.png', color: '#dbeafe' },
    { name: 'Porsche', logo: '/mer.png', color: '#dbeafe' },
];

export default function AllBrands() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            All Brands
                        </h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Explore 40+ premium marques. Swipe or hover to discover.
                        </p>
                        <hr className="mt-4 w-48 border-t-2 border-blue-600" />
                    </div>

                    {/* Premium CTA */}
                    <button className="
                        inline-flex items-center gap-2
                        px-5 py-2.5
                        text-sm font-semibold text-blue-600
                        border border-blue-600 rounded-full
                        hover:bg-blue-50 hover:text-blue-700
                        transition-all duration-200
                    ">
                        View all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Brand grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {brands.map((brand) => (
                        <div
                            key={brand.name}
                            className="
                                group relative flex flex-col items-center justify-center
                                aspect-square rounded-2xl border border-gray-200
                                bg-white hover:shadow-2xl hover:border-[#dbeafe]
                                transition-all duration-300 cursor-pointer
                                transform hover:-translate-y-1
                            "
                        >
                            <div className="relative w-24 h-24"> {/* Container with fixed dimensions */}
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <span className="mt-3 text-sm font-semibold text-gray-800">
                                {brand.name}
                            </span>
                            <div
                                className="
                                    absolute inset-0 rounded-2xl border-2 pointer-events-none
                                    opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105
                                    transition-all duration-300
                                "
                                style={{ borderColor: brand.color }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}