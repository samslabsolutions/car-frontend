import React from 'react';
import { ArrowRight } from 'lucide-react';

const CarBodyTypesSection = () => {
    const cars = [
        {
            name: 'Sedan',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
        },
        {
            name: 'Hatchback',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list2.png',
        },
        {
            name: 'Pickup Truck',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list3.png',
        },
        {
            name: 'SUV',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list4.png',
        },
        {
            name: 'Sedan',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list1.png',
        },
        {
            name: 'Hatchback',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list2.png',
        },
        {
            name: 'Pickup Truck',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list3.png',
        },
        {
            name: 'SUV',
            count: '271 Car',
            image: 'https://auto-deal-rho.vercel.app/assets/images/icon-box/car-list4.png',
        },
    ];

    const filterTabs = ['Body Type', 'City', 'Model', 'Budget'];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[26px] font-bold text-gray-900">
                        Popular Car Makes & Body Types
                    </h2>
                    <button className="
            inline-flex items-center gap-2
            px-5 py-2.5 text-sm font-semibold text-blue-600
            border border-blue-600 rounded-full
            hover:bg-blue-50 hover:text-blue-700
            transition-all duration-200
          ">
                        View all
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-8 mb-12 border-b border-gray-200">
                    {filterTabs.map((tab, index) => (
                        <button
                            key={tab}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${index === 0
                                ? 'text-blue-600 border-blue-600'
                                : 'text-gray-500 border-transparent hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cars.map((car, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer"
                        >
                            <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: '#fff7f0' }}>
                                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-4/5 h-24 object-contain"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-[16px] font-semibold text-gray-800 mb-1">
                                    {car.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {car.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarBodyTypesSection;