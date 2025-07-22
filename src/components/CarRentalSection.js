'use client';
import Image from 'next/image';

const cars = [
    {
        name: 'Sedan',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'Hatchback',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'Pickup Truck',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'SUV',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'Sedan',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'Hatchback',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'Pickup Truck',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
    {
        name: 'SUV',
        count: '271 Car',
        image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
    },
];

export default function CarTypesSection() {
    return (
        <section className="py-10 px-4 md:px-10 mb-6 mt-6">
            <h2 className="text-[26px] font-bold text-gray-900 mb-6 leading-tight">
                Popular Car Makes & Body Types
            </h2>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-200 mb-6">
                {['Body Type', 'City', 'Model', 'Budget'].map((tab, index) => (
                    <button
                        key={index}
                        className={`pb-2 text-base font-medium ${tab === 'Body Type'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-blue-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {cars.map((car, index) => (
                    <div
                        key={index}
                        className="w-full h-[130px] bg-blue-50 rounded-xl flex flex-col items-center justify-center text-center px-4 py-4 hover:shadow-md transition duration-200"
                    >
                        <div className="mb-1">
                            <Image
                                src={car.image}
                                alt={car.name}
                                width={140}
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-[17px] font-semibold text-gray-900">{car.name}</h3>
                        <p className="text-sm text-gray-500">{car.count}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
