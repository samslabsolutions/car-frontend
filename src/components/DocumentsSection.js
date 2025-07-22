'use client';
import { useState } from 'react';
import {
    ShieldCheck,
    CheckCircle,
    CarFront,
    CreditCard,
    Car
} from 'lucide-react';

const docs = {
    residents: [
        { label: 'Emirates ID', icon: <CreditCard className="w-6 h-6 text-blue-600" /> },
        { label: 'UAE Driving License', icon: <Car className="w-6 h-6 text-blue-600" /> },
    ],
    tourists: [
        { label: 'Passport', icon: <CreditCard className="w-6 h-6 text-blue-600" /> },
        { label: 'Visit Visa', icon: <CreditCard className="w-6 h-6 text-blue-600" /> },
        { label: 'Home Country License', icon: <Car className="w-6 h-6 text-blue-600" /> },
        { label: 'International Driving Permit (IDP)', icon: <CarFront className="w-6 h-6 text-blue-600" /> },
    ],
    exceptions: [
        { label: 'GCC / US / UK / EU / Canada', icon: <CheckCircle className="w-5 h-5 text-blue-500" /> },
        { label: 'Drive with home license — no IDP needed', icon: <CheckCircle className="w-5 h-5 text-blue-500" /> },
    ],
};

export default function DocumentsRequired() {
    const [activeTab, setActiveTab] = useState('residents');

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-[26px] font-bold text-gray-900">
                            Documents Required
                        </h2>
                        <p className="mt-2 text-[16px] text-gray-600">
                            Skip the paperwork hassle – know exactly what to bring.
                        </p>
                        <hr className="mt-4 w-64 border-t-2 border-blue-600" />
                    </div>

                    <button className="
                        mt-6 sm:mt-0 inline-flex items-center gap-2
                        px-5 py-2.5 text-sm font-semibold text-blue-600
                        border border-blue-600 rounded-full
                        hover:bg-blue-50 hover:text-blue-700
                        transition-all duration-200
                    ">
                        Check Eligibility
                        <ShieldCheck className="w-4 h-4" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8">
                    {['residents', 'tourists'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tab === 'residents' ? 'UAE Residents' : 'Tourists'}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {(activeTab === 'residents' ? docs.residents : docs.tourists).map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                        >
                            <div className="p-2 bg-blue-50 rounded-lg">
                                {item.icon}
                            </div>
                            <span className="text-[15px] font-semibold text-gray-800">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Exception note */}
                <div className="mt-10 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-[16px] font-bold text-blue-900 flex items-center gap-2 mb-3">
                        <CarFront className="w-5 h-5 text-blue-600" />
                        Driving License Exception
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        {docs.exceptions.map((e) => (
                            <li key={e.label} className="flex items-start gap-2">
                                {e.icon}
                                <span>{e.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
