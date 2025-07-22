'use client';
import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Zap, BadgeCheck, Shield } from 'lucide-react';

const FAQSection = () => {
    const [activeCategory, setActiveCategory] = useState('guide');
    const [expandedItems, setExpandedItems] = useState([]);

    const faqData = {
        guide: {
            title: "Booking Guide",
            icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
            items: [
                {
                    question: "How do I rent a car through OneClickDrive?",
                    answer: "Our 3-step process makes renting effortless: 1) Select your dates/location 2) Compare 2000+ verified vehicles 3) Book instantly with our certified partners. Most bookings are confirmed within 90 seconds.",
                    premium: true
                },
                {
                    question: "Is OneClickDrive free to use?",
                    answer: "Absolutely free - we charge zero commission. You pay only the rental company's rate with complete price transparency.",
                    badge: "No Hidden Fees"
                },
                {
                    question: "How can I find a car near me?",
                    answer: "Enable location access or enter your address to see real-time availability from 120+ pickup locations across Dubai, with filters for distance, price, and vehicle type."
                }
            ]
        },
        pricing: {
            title: "Pricing & Value",
            icon: <BadgeCheck className="w-5 h-5 text-blue-600" />,
            items: [
                {
                    question: "What's included in the rental price?",
                    answer: "All prices include: Basic insurance, 24/7 roadside assistance, unlimited mileage (standard), and 24-hour customer support. Additional options available during booking.",
                    premium: true
                },
                {
                    question: "How can I get the best deal?",
                    answer: "Book 7+ days in advance for 15-30% discounts. Our Price Alert tool notifies you when rates drop for your selected vehicle category."
                }
            ]
        },
        safety: {
            title: "Safety & Support",
            icon: <Shield className="w-5 h-5 text-blue-600" />,
            items: [
                {
                    question: "What if I have an accident?",
                    answer: "Immediately call our 24/7 emergency line. All rentals include accident support - we'll arrange a replacement vehicle and handle insurance paperwork.",
                    premium: true
                },
                {
                    question: "Is roadside assistance available?",
                    answer: "Yes - our partners provide free 24/7 support for mechanical issues, lockouts, and fuel delivery. Average response time is 38 minutes in Dubai."
                }
            ]
        }
    };

    const toggleItem = (category, index) => {
        const key = `${category}-${index}`;
        setExpandedItems(prev =>
            prev.includes(key)
                ? prev.filter(item => item !== key)
                : [...prev, key]
        );
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Premium Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                        <Zap className="w-4 h-4 mr-1" /> MOST ASKED QUESTIONS
                    </span>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-4">
                        Dubai Car Rental <span className="text-blue-600">FAQs</span>
                    </h2>
                    <p className="text-[16px] text-gray-600 max-w-3xl mx-auto">
                        Everything you need for a seamless rental experience
                    </p>
                </div>

                {/* Interactive FAQ Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Category Navigation */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-6 space-y-2">
                            {Object.entries(faqData).map(([key, category]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeCategory === key ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                                >
                                    <div className="flex items-center">
                                        <span className="mr-3">{category.icon}</span>
                                        <span className="text-[15px] font-medium">{category.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Questions Panel */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                            <div className="p-6 bg-blue-50 border-b border-blue-100">
                                <h3 className="text-[16px] font-bold text-gray-900 flex items-center">
                                    {faqData[activeCategory].icon}
                                    <span className="ml-3">{faqData[activeCategory].title}</span>
                                </h3>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {faqData[activeCategory].items.map((item, index) => {
                                    const isExpanded = expandedItems.includes(`${activeCategory}-${index}`);
                                    return (
                                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                                            <button
                                                onClick={() => toggleItem(activeCategory, index)}
                                                className="flex justify-between items-start w-full text-left gap-4"
                                            >
                                                <div>
                                                    <h4 className="text-[15px] font-semibold text-gray-900 mb-1">
                                                        {item.question}
                                                        {item.premium && (
                                                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                Premium Feature
                                                            </span>
                                                        )}
                                                    </h4>
                                                    {item.badge && (
                                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md mb-2">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <ChevronDown className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'mt-4 max-h-96' : 'max-h-0'}`}>
                                                <p className="text-[14px] text-gray-600 pr-6">{item.answer}</p>
                                                {item.premium && (
                                                    <div className="mt-4 flex items-center text-sm text-blue-600">
                                                        <Phone className="w-4 h-4 mr-1" />
                                                        <span>Priority support available for this service</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conversion CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 shadow-xl">
                        <h3 className="text-[20px] font-bold text-white mb-3">Still have questions?</h3>
                        <p className="text-[15px] text-blue-100 mb-6 max-w-2xl mx-auto">
                            Our rental experts are available 24/7 to help you choose the perfect vehicle
                        </p>
                        <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 hover:scale-105">
                            <Phone className="w-5 h-5 mr-2" />
                            Chat with Rental Expert
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
