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
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Car,
    Users,
    ShieldCheck
} from "lucide-react";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNo: '',
        email: '',
        query: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

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
                    contactNo: '',
                    email: '',
                    query: '',
                    message: ''
                });
            }, 3000);
        }, 1500);
    };

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const queryOptions = [
        { value: '', label: 'Select inquiry type' },
        { value: 'join-partner', label: 'Partnership Opportunities' },
        { value: 'support', label: 'Technical Support' },
        { value: 'help-rent-car', label: 'Vehicle Rental Assistance' },
        { value: 'chauffeur-service', label: 'Chauffeur Services' },
        { value: 'hire-safe-driver', label: 'Professional Driver Services' }
    ];

    const faqs = [
        {
            question: "What is your average response time?",
            answer: "We typically respond within 2 business hours during our operating days."
        },
        {
            question: "Do you offer corporate discounts?",
            answer: "Yes, we provide special pricing for corporate clients and long-term rentals."
        },
        {
            question: "How can I verify vehicle availability?",
            answer: "Our online booking system shows real-time availability for all vehicles."
        }
    ];

    const trustFeatures = [
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Enterprise Security",
            description: "Bank-grade encryption protecting your personal information"
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Premium Support",
            description: "Dedicated customer success team available around the clock"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "50,000+ Clients",
            description: "Trusted by leading businesses and individual customers globally"
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
                    <div className="text-center">
                        <h1 className="text-5xl lg:text-[36px] font-semibold text-gray-900 mb-4 sm:mb-5 tracking-tight">
                            Contact Our Team
                        </h1>
                        <p className="text-base font-regular text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                            Whether you need assistance with vehicle rentals or are interested in partnership opportunities, our team is here to help.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="w-full max-w-[1300px] mt-[-112px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {trustFeatures.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-base font-regular text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            {submitted ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Message Sent Successfully</h3>
                                    <p className="text-base font-regular text-gray-600 mb-6">
                                        Thank you for contacting us. We'll get back to you within 24 hours.
                                    </p>
                                    <div className="inline-flex items-center text-gray-500 bg-gray-50 px-5 py-2 rounded-lg">
                                        <Clock className="w-5 h-5 mr-2" />
                                        Response time: 2-24 hours
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">
                                        Send us a message
                                    </h2>
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-base font-normal text-gray-900"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
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
                                                        className="w-full pl-20 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-base font-normal text-gray-900"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-base font-normal text-gray-900"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type *</label>
                                            <select
                                                name="query"
                                                value={formData.query}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-base font-normal text-gray-900"
                                                required
                                            >
                                                {queryOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <textarea
                                                name="message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 text-base font-normal text-gray-900"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-normal transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* FAQ Section */}


                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                                        <p className="text-base font-regular text-gray-600 mt-1">+971 4 123 4567</p>
                                        <p className="text-sm font-normal text-gray-500 mt-1">24/7 availability</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                                        <p className="text-base font-regular text-gray-600 mt-1">contact@fastdrive.com</p>
                                        <p className="text-sm font-normal text-gray-500 mt-1">Response within 4 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Headquarters</h3>
                                        <p className="text-base font-regular text-gray-600 mt-1">Business Bay, Dubai, UAE</p>
                                        <button className="text-sm text-blue-600 hover:text-blue-700 font-normal mt-2 flex items-center">
                                            View on map <ArrowRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight flex items-center">
                                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                                Business Hours
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="font-medium text-gray-900">Monday - Friday</span>
                                    <span className="text-base font-regular text-gray-600">8:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="font-medium text-gray-900">Saturday</span>
                                    <span className="text-base font-regular text-gray-600">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="font-medium text-gray-900">Sunday</span>
                                    <span className="text-base font-regular text-gray-600">9:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">Follow Us</h2>
                            <div className="flex space-x-4">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-300">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white p-3 rounded-lg transition duration-300">
                                    <Instagram className="w-5 h-5" />
                                </button>
                                <button className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg transition duration-300">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg transition duration-300">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">Our Location</h2>
                    <p className="text-base font-regular text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Visit our headquarters in Dubai's Business Bay district.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-96 w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509744292!2d55.2721877150095!3d25.19751498389647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v162987654321!5m2!1sen!2sae"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* CTA Section */}


        </div>
    );
};

export default ContactUsPage;