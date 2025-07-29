import React from 'react';

const CarRentalPricing = () => {
    // const carData = [
    //     {
    //         name: "Chevrolet Captiva (Black), 2023",
    //         daily: "AED 130",
    //         weekly: "-",
    //         monthly: "AED 2,400"
    //     },
    //     {
    //         name: "Hyundai Creta 5-Seater (Blue), 2024",
    //         daily: "AED 99",
    //         weekly: "AED 599",
    //         monthly: "AED 1,799"
    //     },
    //     {
    //         name: "Mazda CX5 (Golden), 2025",
    //         daily: "AED 139",
    //         weekly: "-",
    //         monthly: "AED 2,489"
    //     },
    //     {
    //         name: "MG 3 (White), 2025",
    //         daily: "AED 49",
    //         weekly: "AED 340",
    //         monthly: "AED 1,225"
    //     },
    //     {
    //         name: "MG 3 (Black), 2025",
    //         daily: "AED 120",
    //         weekly: "AED 699",
    //         monthly: "AED 1,399"
    //     }
    // ];

    // return (
    //     <div className="w-full px-9  bg-white mt-16">
    //         <h1 className="text-2xl font-semibold text-gray-800  text-left">
    //             Economy car rental price in Dubai
    //         </h1>

    //         <div className="overflow-x-auto">
    //             <table className="w-full border-collapse text-left">
    //                 <thead>
    //                     <tr className="border-b border-gray-200">
    //                         <th className="py-4 pr-8 font-medium text-gray-600 text-sm uppercase tracking-wide">
    //                             {/* Empty header for car names */}
    //                         </th>
    //                         <th className="py-4 px-4 font-medium text-gray-600 text-sm uppercase tracking-wide">
    //                             DAILY
    //                         </th>
    //                         <th className="py-4 px-4 font-medium text-gray-600 text-sm uppercase tracking-wide">
    //                             WEEKLY
    //                         </th>
    //                         <th className="py-4 px-4 font-medium text-gray-600 text-sm uppercase tracking-wide">
    //                             MONTHLY
    //                         </th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {carData.map((car, index) => (
    //                         <tr
    //                             key={index}
    //                             className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
    //                         >
    //                             <td className="py-6 pr-8 text-gray-700 font-medium">
    //                                 {car.name}
    //                             </td>
    //                             <td className="py-6 px-4 text-gray-800 font-semibold">
    //                                 {car.daily}
    //                             </td>
    //                             <td className="py-6 px-4 text-gray-800 font-semibold">
    //                                 {car.weekly}
    //                             </td>
    //                             <td className="py-6 px-4 text-gray-800 font-semibold">
    //                                 {car.monthly}
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>

    //         {/* Mobile responsive cards for smaller screens */}
    //         <div className="md:hidden">
    //             <div className="space-y-4 mt-6">
    //                 {carData.map((car, index) => (
    //                     <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    //                         <h3 className="font-semibold text-gray-800 mb-3 text-left">{car.name}</h3>
    //                         <div className="grid grid-cols-3 gap-4 text-sm">
    //                             <div className="text-left">
    //                                 <div className="text-gray-500 uppercase tracking-wide text-xs mb-1">Daily</div>
    //                                 <div className="font-semibold text-gray-800">{car.daily}</div>
    //                             </div>
    //                             <div className="text-left">
    //                                 <div className="text-gray-500 uppercase tracking-wide text-xs mb-1">Weekly</div>
    //                                 <div className="font-semibold text-gray-800">{car.weekly}</div>
    //                             </div>
    //                             <div className="text-left">
    //                                 <div className="text-gray-500 uppercase tracking-wide text-xs mb-1">Monthly</div>
    //                                 <div className="font-semibold text-gray-800">{car.monthly}</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default CarRentalPricing;
