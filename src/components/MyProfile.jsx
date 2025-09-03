import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, MapPin, Package, Calendar, CheckCircle, Car, RefreshCw } from 'lucide-react';
import axios from 'axios';

const MyProfile = () => {
    const [agencyData, setAgencyData] = useState({
        id: '',
        agencyName: '',
        email: '',
        contactPhone: '',
        address: '',
        package: '',
        billingType: '',
        expiryDate: '',
        carListings: 0,
        refreshes: 0,
        maxCarListings: 0,
        maxRefreshes: 0,
        status: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgencyData = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('jwt') || localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/agency/me', { headers });
                if (response.status === 200 && response.data.agency) {
                    const data = response.data.agency;
                    setAgencyData(data);
                    // Update localStorage to sync with dashboard
                    localStorage.setItem('agency', JSON.stringify(data));
                } else {
                    setError('Failed to fetch agency data. Please try again.');
                }
            } catch (err) {
                console.error('Error fetching agency data:', err);
                // Fallback to localStorage
                const cachedData = JSON.parse(localStorage.getItem('agency') || '{}');
                if (cachedData.id && cachedData.agencyName && cachedData.email) {
                    setAgencyData(cachedData);
                    setError('Error fetching agency data. Using cached data.');
                } else {
                    setError('Error fetching agency data. Please log in again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAgencyData();
    }, []);

    return (
        <div className="p-6">
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            )}
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-8">
                    {/* Agency Information */}
                    <div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Building2 className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Agency Name
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.agencyName}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.email}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Contact Phone
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.contactPhone}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.address}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Package Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Package className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Package
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.package ? agencyData.package.charAt(0).toUpperCase() + agencyData.package.slice(1) : ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Package className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Billing Type
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.billingType ? agencyData.billingType.charAt(0).toUpperCase() + agencyData.billingType.slice(1) : ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    value={
                                        agencyData.expiryDate
                                            ? new Date(agencyData.expiryDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : 'N/A'
                                    }
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <CheckCircle className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Status
                                </label>
                                <input
                                    type="text"
                                    value={agencyData.status ? agencyData.status.charAt(0).toUpperCase() + agencyData.status.slice(1) : ''}
                                    disabled
                                    className={`w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 focus:outline-none ${agencyData.status === 'active'
                                        ? 'text-green-600'
                                        : agencyData.status === 'pending'
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Account Metrics */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Car className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Car Listings
                                </label>
                                <input
                                    type="text"
                                    value={`${agencyData.carListings} / ${agencyData.maxCarListings}`}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <RefreshCw className="inline w-5 h-5 mr-2 text-gray-500" />
                                    Refreshers
                                </label>
                                <input
                                    type="text"
                                    value={`${agencyData.refreshes} / ${agencyData.maxRefreshes}`}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;