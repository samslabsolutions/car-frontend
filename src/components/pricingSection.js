"use client";
import React, { useState } from "react";
import {
    Check,
    ChevronDown,
    Star,
    Crown,
    Zap,
    Globe,
    Users,
    TrendingUp,
    Shield,
    Eye,
    RefreshCw,
    MapPin,
    Award,
    Smartphone,
    Phone,
    Car,
    CarTaxiFront,
    CarFront
} from "lucide-react";

const PricingSection = () => {
    const [selectedCountry, setSelectedCountry] = useState("UAE");
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState("pro");

    const countries = [
        { code: "UAE", name: "United Arab Emirates", flag: "🇦🇪" },
        { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦" },
        { code: "QAT", name: "Qatar", flag: "🇶🇦" },
        { code: "KWT", name: "Kuwait", flag: "🇰🇼" },
        { code: "OMN", name: "Oman", flag: "🇴🇲" },
        { code: "BHR", name: "Bahrain", flag: "🇧🇭" }
    ];

    const plans = [
        {
            id: "starter",
            name: "Starter Pack",
            subtitle: "Essential for new businesses",
            icon: <Users className="w-6 h-6" />,
            carIcon: <Car className="w-8 h-8 text-blue-600" />,
            popular: false,
            features: [
                { text: "10 Car Listings", included: true },
                { text: "10 Refreshes", included: true },
                { text: "Visible on Web + App", included: true },
                { text: "Basic Support", included: true },
                { text: "Featured Listing", included: false },
                { text: "Multiple City Coverage", included: false }
            ]
        },
        {
            id: "pro",
            name: "Pro Pack",
            subtitle: "Best for customer growth",
            icon: <TrendingUp className="w-6 h-6" />,
            carIcon: <CarTaxiFront className="w-8 h-8 text-blue-600" />,
            popular: true,
            features: [
                { text: "20 Car Listings", included: true },
                { text: "20 Refreshes", included: true },
                { text: "Visible on Web + App", included: true },
                { text: "Featured Listing", included: true },
                { text: "Priority Support", included: true },
                { text: "Multiple City Coverage", included: false }
            ]
        },
        {
            id: "luxury",
            name: "Luxury Pack",
            subtitle: "Features for larger fleets",
            icon: <Crown className="w-6 h-6" />,
            carIcon: <CarFront className="w-8 h-8 text-blue-600" />,
            popular: false,
            features: [
                { text: "30 Car Listings", included: true },
                { text: "30 Refreshes", included: true },
                { text: "Visible on Web + App", included: true },
                { text: "Featured Listing", included: true },
                { text: "Multiple City Coverage", included: true },
                { text: "Premium Support", included: true }
            ]
        }
    ];

    const handleRequestQuote = (planId) => {
        setSelectedPlan(planId);
        console.log(`Requesting quote for ${planId} plan in ${selectedCountry}`);
    };

    return (
        <div className="bg-white py-16 sm:py-20 lg:py-24">
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                        Why Join OneClickDrive?
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                        Partner up with one of the world's biggest car rental marketplaces. Our car rental website and app, available on Android and iOS devices, is marketed specifically to renters planning a trip to your city.
                    </p>

                    {/* Controls Row */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                        {/* Country Selector */}
                        <div className="flex items-center space-x-3">
                            <label className="text-sm font-medium text-gray-700">
                                Select a country you wish to advertise:
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 min-w-[200px]"
                                >
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.flag} {country.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Billing Toggle */}
                        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl inline-flex">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === "monthly"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Bill Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("annually")}
                                className={`px-6 py-2 rounded-lg font-medium transition-all relative ${billingCycle === "annually"
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Bill Annually
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                                    20% OFF
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${plan.popular ? "ring-2 ring-purple-200" : ""
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="p-6">
                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 mb-4">
                                        {plan.carIcon}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-base font-regular text-gray-600 mb-4">
                                        {plan.subtitle}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-center space-x-2 mb-2">
                                            <span className="text-orange-600 text-sm font-medium bg-orange-50 px-3 py-1 rounded-lg">
                                                💰 PRICE ON REQUEST
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center space-x-3">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${feature.included
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-100 text-gray-400"
                                                }`}>
                                                {feature.included ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <span className="text-xs">×</span>
                                                )}
                                            </div>
                                            <span className={`text-base font-regular ${feature.included ? "text-gray-900" : "text-gray-400 line-through"
                                                }`}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleRequestQuote(plan.id)}
                                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center ${plan.popular
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="flex items-center space-x-2">
                                        <Zap className="w-4 h-4" />
                                        <span>Request Quote</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingSection;