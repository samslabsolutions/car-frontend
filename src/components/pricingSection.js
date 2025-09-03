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
    CarFront,
    X,
    Send
} from "lucide-react";

const PricingSection = () => {
    const [selectedCountry, setSelectedCountry] = useState("UAE");
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState("pro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        jobTitle: '',
        fleetSize: '',
        contactNo: '',
        email: '',
        country: 'UAE',
        city: '',
        serviceType: 'rental'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

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

    const jobTitleOptions = [
        { value: '', label: 'Select Job Title' },
        { value: 'owner-founder', label: 'Owner / Founder' },
        { value: 'general-manager', label: 'General Manager' },
        { value: 'sales-manager', label: 'Sales Manager' },
        { value: 'marketing-manager', label: 'Marketing Manager' },
        { value: 'admin-receptionist', label: 'Admin / Receptionist' },
        { value: 'other', label: 'Other' }
    ];

    const fleetSizeOptions = [
        { value: '', label: 'Select Fleet Size' },
        { value: '5-10', label: '5-10 cars' },
        { value: 'upto-50', label: 'Upto 50 cars' },
        { value: 'upto-100', label: 'Upto 100 cars' },
        { value: 'upto-500', label: 'Upto 500 cars' },
        { value: '500+', label: '500+ cars' }
    ];

    const cityOptions = [
        { value: '', label: 'Select City' },
        { value: 'abu-dhabi', label: 'Abu Dhabi' },
        { value: 'ajman', label: 'Ajman' },
        { value: 'dubai', label: 'Dubai' },
        { value: 'fujairah', label: 'Fujairah' },
        { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
        { value: 'sharjah', label: 'Sharjah' },
        { value: 'umm-al-quwain', label: 'Umm Al Quwain' }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRequestQuote = (planId) => {
        setSelectedPlan(planId);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const payload = {
            name: formData.name,
            email: formData.email,
            companyName: formData.companyName,
            jobTitle: formData.jobTitle === 'owner-founder' ? 'Owner/Founder' :
                formData.jobTitle === 'general-manager' ? 'General Manager' :
                    formData.jobTitle === 'sales-manager' ? 'Sales Manager' :
                        formData.jobTitle === 'marketing-manager' ? 'Marketing Manager' :
                            formData.jobTitle === 'admin-receptionist' ? 'Admin / Receptionist' : formData.jobTitle,
            fleetSize: formData.fleetSize === 'upto-50' ? 'Upto 50 cars' :
                formData.fleetSize === 'upto-100' ? 'Upto 100 cars' :
                    formData.fleetSize === 'upto-500' ? 'Upto 500 cars' :
                        formData.fleetSize === '500+' ? '500+ cars' : formData.fleetSize,
            phone: `+971${formData.contactNo}`,
            country: formData.country,
            city: formData.city === 'abu-dhabi' ? 'Abu Dhabi' :
                formData.city === 'ajman' ? 'Ajman' :
                    formData.city === 'dubai' ? 'Dubai' :
                        formData.city === 'fujairah' ? 'Fujairah' :
                            formData.city === 'ras-al-khaimah' ? 'Ras Al Khaimah' :
                                formData.city === 'sharjah' ? 'Sharjah' :
                                    formData.city === 'umm-al-quwain' ? 'Umm Al Quwain' : formData.city
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit form');
            }

            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    companyName: '',
                    jobTitle: '',
                    fleetSize: '',
                    contactNo: '',
                    email: '',
                    country: 'UAE',
                    city: '',
                    serviceType: 'rental'
                });
            }, 3000);
        } catch (err) {
            setIsSubmitting(false);
            setError(err.message);
        }
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

                {/* Modal Popup */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                        }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsModalOpen(false);
                            }
                        }}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out scale-100 opacity-100 relative p-6" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            {submitted ? (
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Quote Request Submitted</h3>
                                    <p className="text-base text-gray-600 mb-4">
                                        Thank you for your interest in the {plans.find(plan => plan.id === selectedPlan)?.name}! Our team will contact you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                                        Request Quote for {plans.find(plan => plan.id === selectedPlan)?.name}
                                    </h2>
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                            <select
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            >
                                                {jobTitleOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fleet Size *</label>
                                            <select
                                                name="fleetSize"
                                                value={formData.fleetSize}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            >
                                                {fleetSizeOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact No. *</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                                                    <span className="text-gray-600 font-medium">+971</span>
                                                    <div className="w-px h-4 bg-gray-300"></div>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="contactNo"
                                                    value={formData.contactNo}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-16 px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                    required
                                                >
                                                    <option value="UAE">UAE</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                    required
                                                >
                                                    {cityOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    Submit Quote Request
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingSection;