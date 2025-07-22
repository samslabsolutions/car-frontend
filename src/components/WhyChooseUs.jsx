'use client';
import {
    ShieldCheck,
    BadgePercent,
    CarFront,
    CheckCircle2,
    MessageSquareText
} from 'lucide-react';

const features = [
    {
        label: 'Unmatched Pricing',
        desc: 'Daily, weekly & monthly rates updated in real-time.',
        icon: <BadgePercent className="w-6 h-6 text-blue-600 mb-3" />
    },
    {
        label: '2000+ Verified Cars',
        desc: 'Economy to exotic, luxury & SUVs — all inspected.',
        icon: <CarFront className="w-6 h-6 text-blue-600 mb-3" />
    },
    {
        label: 'Pay Zero Commission',
        desc: 'Talk & pay the supplier directly. No hidden fees.',
        icon: <CheckCircle2 className="w-6 h-6 text-blue-600 mb-3" />
    },
    {
        label: 'Instant WhatsApp Connect',
        desc: 'Tap once to chat or call the rental company.',
        icon: <MessageSquareText className="w-6 h-6 text-blue-600 mb-3" />
    },
];

export default function WhyOneClickDrive() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
                    <div>
                        <h2 className="text-[26px] font-bold text-gray-900">
                            Why OneClickDrive is #1
                        </h2>
                        <p className="mt-2 text-[16px] text-gray-600">
                            Verified deals, zero commission, instant booking.
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
                        Explore Fleet
                        <ShieldCheck className="w-4 h-4" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((item) => (
                        <div
                            key={item.label}
                            className="
                                flex flex-col p-6
                                bg-white rounded-2xl shadow-sm
                                hover:shadow-md hover:-translate-y-1
                                transition-all duration-300
                                border border-gray-100
                            "
                        >
                            {item.icon}
                            <span className="text-[16px] font-semibold text-gray-800 mb-1">
                                {item.label}
                            </span>
                            <span className="text-sm text-gray-600">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
