'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const locations = [
    { city: 'Dubai', count: 120, img: '/subai.webp', color: '#00D2FF' },
    { city: 'Abu Dhabi', count: 160, img: '/subai.webp', color: '#0066B1' },
    { city: 'Sharjah', count: 120, img: '/subai.webp', color: '#005A2B' },
    { city: 'Ras Al Khaimah', count: 70, img: '/subai.webp', color: '#BB162B' },
    { city: 'Ajman', count: 90, img: '/subai.webp', color: '#C3002F' },
];

export default function LocationSelector() {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-[26px] font-bold text-gray-900">
                            Find Car Rental Near You
                        </h2>
                        <p className="mt-2 text-[16px] text-gray-600">
                            Pick-up & drop-off in 5 UAE cities — instant booking.
                        </p>
                        <hr className="mt-4 w-64 border-t-2 border-blue-600" />
                    </div>

                    {/* CTA */}
                    <button className="
                        mt-6 sm:mt-0 inline-flex items-center gap-2
                        px-5 py-2.5 text-sm font-semibold text-blue-600
                        border border-blue-600 rounded-full
                        hover:bg-blue-50 hover:text-blue-700
                        transition-all duration-200
                    ">
                        View all Cities
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {locations.map(({ city, count, img, color }) => (
                        <div
                            key={city}
                            onMouseEnter={() => setHovered(city)}
                            onMouseLeave={() => setHovered(null)}
                            className="
                                group relative rounded-2xl overflow-hidden
                                shadow-md hover:shadow-2xl hover:-translate-y-1
                                transition-all duration-300 cursor-pointer
                            "
                        >
                            {/* Image */}
                            <Image
                                src={img}
                                alt={city}
                                width={320}
                                height={180}
                                className="w-full h-44 object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <span className="text-[16px] font-semibold">{city}</span>
                                <p className="text-sm opacity-90">{count}+ cars available</p>
                            </div>

                            {/* Accent ring on hover */}
                            <div
                                className={`
                                    absolute inset-0 rounded-2xl border-2 pointer-events-none
                                    transition-all duration-300
                                    ${hovered === city ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}
                                `}
                                style={{ borderColor: color }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
