'use client';
import Image from 'next/image';

const brands = [
    { name: 'Mercedes', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/mercedes.svg' },
    { name: 'BMW', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/bmw.svg' },
    { name: 'Land Rover', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/range-rover.svg' },
    { name: 'Rolls Royce', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/rolls-royce.svg' },
    { name: 'Audi', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/audi.svg' },
    { name: 'Porsche', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/porsche.svg' },
    { name: 'Ferrari', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/ferrari.svg' },
    { name: 'Lamborghini', logo: 'https://renty.ae/assets-nd/icons/site/brand_svg/lamborghini.svg' },
];

export default function AllBrands() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
                            All Brands
                        </h2>
                        <p className="mt-2 text-[16px] text-gray-600">
                            Explore 40+ premium marques. Swipe or hover to discover.
                        </p>
                        <hr className="mt-4 w-48 border-t-2 border-blue-600" />
                    </div>

                    <button className="
                        mt-6 sm:mt-0 inline-flex items-center gap-2
                        px-5 py-2.5 text-sm font-semibold text-blue-600
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

                {/* Brand grid - single row layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {brands.map((brand) => (
                        <a
                            key={brand.name}
                            href={`/brands/${brand.name.toLowerCase()}`}
                            className="
                                flex flex-col items-center justify-center
                                bg-white p-4 rounded-lg
                                border border-gray-200
                                hover:shadow-md hover:border-blue-200
                                transition-all duration-300
                                no-underline
                                w-full
                                h-24
                            "
                            title={brand.name}
                        >
                            <div className="relative w-8 h-8 mb-2">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs text-gray-800 font-medium text-center">
                                {brand.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
