'use client';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    CreditCard,
    Shield,
    Globe,
    ChevronDown
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            <span className="text-blue-400">Sameel</span>
                        </h3>
                        <p className="mb-6 text-gray-400">
                            Dubai's premier luxury car rental platform, offering exclusive vehicles with white-glove service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronDown className="w-4 h-4 text-blue-400" /> Luxury Fleet</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronDown className="w-4 h-4 text-blue-400" /> Special Offers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronDown className="w-4 h-4 text-blue-400" /> Monthly Rentals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronDown className="w-4 h-4 text-blue-400" /> Chauffeur Services</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><ChevronDown className="w-4 h-4 text-blue-400" /> Corporate Programs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Golden Business Center, Cluster I, JLT, Dubai UAE</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-400" />
                                <a href="tel:+97144234567" className="hover:text-white transition-colors">+971 4 423 4567</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-400" />
                                <a href="mailto:bookings@oneclickdrive.ae" className="hover:text-white transition-colors">bookings@oneclickdrive.ae</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-blue-400" />
                                <span>24/7 Customer Support</span>
                            </li>
                        </ul>
                    </div>

                    {/* Trust Badges */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2">
                            Why Choose Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>All vehicles fully insured with 24/7 roadside assistance</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CreditCard className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>No hidden fees - Price match guarantee</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Globe className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Multilingual support in 8 languages</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-10"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Sameel. All rights reserved.
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>

                {/* Payment Methods */}

            </div>
        </footer>
    );
};

export default Footer;