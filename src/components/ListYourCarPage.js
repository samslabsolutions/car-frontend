"use client";
import React, { useState } from "react";
import {
    ArrowRight,
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageSquare,
    Send,
    CheckCircle,
    Car,
    Users,
    ShieldCheck,
    TrendingUp,
    Star,
    DollarSign,
    Target,
    Zap,
    BarChart3,
    Globe,
    Smartphone
} from "lucide-react";

const ListYourCarPage = () => {
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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
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
        }, 1500);
    };

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

    const benefits = [
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Marketing for Car Rentals",
            description: "Market your brand and rental cars to our 200,000+ monthly users. This serves as a comprehensive car rental marketing plan to reach local residents as well as tourists planning to visit your city."
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "High-quality Leads",
            description: "Get genuine leads from users who are interested in renting your car at your terms. Your car rental listing includes all the relevant info for users to make an informed decision."
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Top Ranking",
            description: "The OneClickDrive website and app rank the highest among the biggest of search engines and social media Sites when it comes to car rentals in your city."
        },
        {
            icon: <DollarSign className="w-6 h-6" />,
            title: "Zero Commission",
            description: "Your rental charges are your earnings. OneClickDrive does not charge any commission on the bookings, only a monthly subscription fee as per the selected package."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "You're in control",
            description: "Manage your shop at your fingertips. Update your cars' rental price, mileage, upload real car pictures and other details, instantly online."
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Get bookings",
            description: "Receive calls, WhatsApp messages, SMS and emails directly from customers looking to rent your car. Deal directly with zero commission."
        }
    ];

    const features = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Direct Leads",
            description: "Get direct leads via phone, SMS and emails."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Full Training",
            description: "Full training provided for your staff to use the CMS."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Account Manager",
            description: "Assistance from your dedicated Account Manager."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Marketing Tools",
            description: "Tools and resources to plan your marketing strategy."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative py-16 sm:py-24 lg:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')]"></div>
                </div>
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                                List Your Cars for Rent
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Today</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Empty your parking lot tomorrow!
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                                <p className="text-lg font-medium text-gray-900 mb-4">
                                    Join OneClickDrive to profit from over <span className="text-blue-600 font-semibold">1 million page views</span> every month, with more than <span className="text-blue-600 font-semibold">50,000 quality leads</span> sent to car rental companies and brokers all across the world.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0 text-blue-600">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                                            <p className="text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center space-x-2 text-blue-600 mb-4">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-medium">Exclusive member benefits</span>
                            </div>

                            {/* Service Type Toggle */}
                            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl inline-flex">
                                <button
                                    className={`px-6 py-2 rounded-lg font-medium transition-all ${formData.serviceType === 'rental'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    onClick={() => setFormData({ ...formData, serviceType: 'rental' })}
                                >
                                    Car Rental
                                </button>
                                <button
                                    className={`px-6 py-2 rounded-lg font-medium transition-all ${formData.serviceType === 'sales'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    onClick={() => setFormData({ ...formData, serviceType: 'sales' })}
                                >
                                    Car Sales
                                </button>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                            {submitted ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Application Submitted Successfully</h3>
                                    <p className="text-base text-gray-600 mb-6">
                                        Thank you for your interest! Our team will contact you within 24 hours to discuss partnership opportunities.
                                    </p>
                                    <div className="inline-flex items-center text-gray-500 bg-gray-50 px-5 py-2 rounded-lg">
                                        <Clock className="w-5 h-5 mr-2" />
                                        Response time: 24 hours
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
                                        Advertise your cars for rent
                                    </h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
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
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                            <select
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
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
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
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
                                                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 flex items-center space-x-3 pointer-events-none">
                                                    <span className="text-gray-600 font-medium">+971</span>
                                                    <div className="w-px h-5 bg-gray-300"></div>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="contactNo"
                                                    value={formData.contactNo}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-20 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
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
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
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
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
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

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Note:</strong> To advertise on OneClickDrive, you should be a car rental company or broker and have a registered office.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center"
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
                                                    Submit Application
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Partnership Section */}
            <div className="bg-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                            Shaping the future of car rentals
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            OneClickDrive is more than just a marketplace—we are shaping the future of car rentals. As we continue to expand our platform and digital ecosystem, we are open to strategic collaborations with industry leaders and investors who share our vision. If you are interested in exploring partnership opportunities, reach out to us.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Join Section */}
            <div className="py-16 sm:py-20 lg:py-24">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                            Why Join OneClickDrive?
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            Partner up with one of the world's biggest car rental marketplaces. Our car rental website and app, available on Android and iOS devices, is marketed specifically to renters planning a trip to your city.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">1M+</div>
                            <div className="text-blue-100">Monthly Page Views</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">50K+</div>
                            <div className="text-blue-100">Quality Leads</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">200K+</div>
                            <div className="text-blue-100">Monthly Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">0%</div>
                            <div className="text-blue-100">Commission Fee</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-16">
                <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready to get started?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of car rental companies already growing their business with OneClickDrive.
                    </p>
                    <button
                        onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center"
                    >
                        Start Your Application
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListYourCarPage;