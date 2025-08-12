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
                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Facebook"
                                    className="bg-[#1877F2] hover:bg-[#166FE5] text-white p-3 rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Instagram"
                                    className="bg-[#E1306C] hover:bg-[#C13584] text-white p-3 rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.252-1.691 4.771-4.919 4.919-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.148-3.252 1.691-4.771 4.919-4.919 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.667.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.667-.014 4.948-.072 4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.948-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                {/* Twitter (X) */}
                                <a
                                    href="https://www.twitter.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Twitter"
                                    className="bg-[#000000] hover:bg-[#333333] text-white p-3 rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/company/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on LinkedIn"
                                    className="bg-[#0A66C2] hover:bg-[#0A5BB0] text-white p-3 rounded-lg transition duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">Our Office Location</h2>
                    <p className="text-base font-regular text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Whether you need assistance with vehicle rentals or are interested in partnership opportunities, our team is here to help.
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