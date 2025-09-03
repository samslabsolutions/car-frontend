"use client"
import React, { useState } from 'react';
import {
    Home,
    Car,
    Plus,
    Heart,
    Search,
    MessageCircle,
    User,
    LogOut,
    ChevronDown,
    Trash2,
    Edit,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const Listing = () => {
    const [activeTab, setActiveTab] = useState('My Listings');
    const [sortBy, setSortBy] = useState('Newest');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample car listings data
    const listings = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            make: "Mercedes-Benz",
            model: "C Class",
            fullTitle: "2023 C300e AMG Line Night Ed Premium Plus...",
            year: "2023",
            transmission: "Automatic",
            fuelType: "Petrol",
            price: "$399",
            originalPrice: "789"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            make: "Mercedes-Benz",
            model: "C Class",
            fullTitle: "2023 C300e AMG Line Night Ed Premium Plus...",
            year: "2023",
            transmission: "Automatic",
            fuelType: "Petrol",
            price: "$399",
            originalPrice: "789"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            make: "Mercedes-Benz",
            model: "C Class",
            fullTitle: "2023 C300e AMG Line Night Ed Premium Plus...",
            year: "2023",
            transmission: "Automatic",
            fuelType: "Petrol",
            price: "$399",
            originalPrice: "789"
        }
    ];

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', active: false },
        { icon: Car, label: 'My Listings', active: true },
        { icon: Plus, label: 'Add Listings', active: false },
        { icon: Heart, label: 'My Favorites', active: false },
        { icon: Search, label: 'Saved Search', active: false },
        { icon: MessageCircle, label: 'Messages', active: false },
        { icon: User, label: 'My Profile', active: false },
        { icon: LogOut, label: 'Logout', active: false }
    ];

    const handleDelete = (id) => {
        console.log('Delete listing:', id);
    };

    const handleEdit = (id) => {
        console.log('Edit listing:', id);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                {/* Logo/Brand */}
                <div className="p-6 border-b border-slate-700">
                    <div className="text-xl font-bold">CarRental</div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={index}
                                href="#"
                                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${item.active
                                    ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">My Listings</h1>
                            <p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        {/* Search and Sort */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search Cars eg. Audi Q"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                                <span className="text-sm text-gray-600">Sort by</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm"
                                    >
                                        <option value="Newest">Newest</option>
                                        <option value="Oldest">Oldest</option>
                                        <option value="Price Low to High">Price Low to High</option>
                                        <option value="Price High to Low">Price High to Low</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Listings Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-blue-50 px-6 py-4">
                                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-blue-600">
                                    <div>Make</div>
                                    <div>Model</div>
                                    <div>Year</div>
                                    <div>Transmission</div>
                                    <div>FuelType</div>
                                    <div>Action</div>
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {listings.map((listing) => (
                                    <div key={listing.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                        <div className="grid grid-cols-6 gap-4 items-center">
                                            {/* Make Column */}
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={listing.image}
                                                    alt={listing.make}
                                                    className="w-16 h-12 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">{listing.make}</div>
                                                    <div className="text-sm text-gray-500 max-w-xs truncate">
                                                        {listing.fullTitle}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-lg font-bold text-gray-900">${listing.price}</span>
                                                        <span className="text-sm text-gray-500 line-through">${listing.originalPrice}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Model Column */}
                                            <div className="text-gray-900 font-medium">Volvo</div>

                                            {/* Year Column */}
                                            <div className="text-gray-900">{listing.year}</div>

                                            {/* Transmission Column */}
                                            <div className="text-gray-900">{listing.transmission}</div>

                                            {/* Fuel Type Column */}
                                            <div className="text-gray-900">{listing.fuelType}</div>

                                            {/* Action Column */}
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleDelete(listing.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(listing.id)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-center space-x-2">
                            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50">
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium ${page === 1
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-50 border border-gray-300'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <span className="px-2 text-gray-500">...</span>
                            <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-300">
                                20
                            </button>

                            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;