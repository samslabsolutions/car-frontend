import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';

const PackageManagement = () => {
    const [activeTab, setActiveTab] = useState('Create Package');
    const [formData, setFormData] = useState({
        name: '',
        monthlyCarListings: '',
        monthlyRefreshes: '',
        monthlyDuration: '',
        annualCarListings: '',
        annualRefreshes: '',
        annualDuration: '',
    });
    const [packages, setPackages] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const router = useRouter();

    const tabs = ['Create Package', 'Edit Package', 'Delete Package'];

    // Fetch packages
    useEffect(() => {
        const fetchPackages = async () => {
            if (typeof window === 'undefined') {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/packages', {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                console.log('Packages:', response.data); // Debug
                setPackages(response.data.packages || []);
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError('Failed to load packages. Please try again.');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setError('Your session has expired or you lack permission. Please log in again.');
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('user');
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, [router]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setError(null);
    };

    const validateForm = () => {
        const requiredFields = [
            'name',
            'monthlyCarListings',
            'monthlyRefreshes',
            'monthlyDuration',
            'annualCarListings',
            'annualRefreshes',
            'annualDuration',
        ];
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                setError(`${field.replace(/([A-Z])/g, ' $1').trim()} is required`);
                return false;
            }
        }
        const numberFields = [
            'monthlyCarListings',
            'monthlyRefreshes',
            'monthlyDuration',
            'annualCarListings',
            'annualRefreshes',
            'annualDuration',
        ];
        for (const field of numberFields) {
            if (isNaN(formData[field]) || Number(formData[field]) < 0) {
                setError(`${field.replace(/([A-Z])/g, ' $1').trim()} must be a valid non-negative number`);
                return false;
            }
        }
        if (Number(formData.monthlyDuration) < 1 || Number(formData.annualDuration) < 1) {
            setError('Duration must be at least 1 day');
            return false;
        }
        return true;
    };

    const handleCreateSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            if (typeof window === 'undefined') {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            const payload = {
                name: formData.name,
                monthly: {
                    carListings: Number(formData.monthlyCarListings),
                    refreshes: Number(formData.monthlyRefreshes),
                    duration: Number(formData.monthlyDuration),
                },
                annual: {
                    carListings: Number(formData.annualCarListings),
                    refreshes: Number(formData.annualRefreshes),
                    duration: Number(formData.annualDuration),
                },
            };

            await axios.post(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/packages', payload, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setFormData({
                name: '',
                monthlyCarListings: '',
                monthlyRefreshes: '',
                monthlyDuration: '',
                annualCarListings: '',
                annualRefreshes: '',
                annualDuration: '',
            });
            setError(null);
            alert('Package created successfully!');

            // Refresh packages list
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/packages', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setPackages(response.data.packages || []);
        } catch (err) {
            console.error('Error creating package:', err);
            const errorMessage = err.response?.data?.message || 'Failed to create package. Please try again.';
            setError(errorMessage);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError('Your session has expired or you lack permission. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async () => {
        if (!selectedPackageId) {
            setError('Please select a package to edit.');
            return;
        }
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            if (typeof window === 'undefined') {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            const payload = {
                name: formData.name,
                monthly: {
                    carListings: Number(formData.monthlyCarListings),
                    refreshes: Number(formData.monthlyRefreshes),
                    duration: Number(formData.monthlyDuration),
                },
                annual: {
                    carListings: Number(formData.annualCarListings),
                    refreshes: Number(formData.annualRefreshes),
                    duration: Number(formData.annualDuration),
                },
            };

            await axios.put(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/auth/admin/packages/${selectedPackageId}`, payload, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setFormData({
                name: '',
                monthlyCarListings: '',
                monthlyRefreshes: '',
                monthlyDuration: '',
                annualCarListings: '',
                annualRefreshes: '',
                annualDuration: '',
            });
            setSelectedPackageId('');
            setError(null);
            alert('Package updated successfully!');

            // Refresh packages list
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/packages', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setPackages(response.data.packages || []);
        } catch (err) {
            console.error('Error updating package:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update package. Please try again.';
            setError(errorMessage);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError('Your session has expired or you lack permission. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePackage = async (packageId) => {
        if (!window.confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
            return;
        }

        setDeleteLoading(packageId);
        try {
            if (typeof window === 'undefined') {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            await axios.delete(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/auth/admin/packages/${packageId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setPackages((prev) => prev.filter((pkg) => pkg._id !== packageId));
            setSelectedPackageId('');
            setError(null);
            alert('Package deleted successfully!');
        } catch (err) {
            console.error('Error deleting package:', err);
            const errorMessage = err.response?.data?.message || 'Failed to delete package. Please try again.';
            setError(errorMessage);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError('Your session has expired or you lack permission. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            }
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleSelectPackage = (pkg) => {
        setSelectedPackageId(pkg._id);
        setFormData({
            name: pkg.name,
            monthlyCarListings: pkg.monthly.carListings,
            monthlyRefreshes: pkg.monthly.refreshes,
            monthlyDuration: pkg.monthly.duration,
            annualCarListings: pkg.annual.carListings,
            annualRefreshes: pkg.annual.refreshes,
            annualDuration: pkg.annual.duration,
        });
        setError(null);
    };

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-6">Package Management</h2>

            <nav className="flex space-x-8 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setError(null);
                            setSelectedPackageId('');
                            setFormData({
                                name: '',
                                monthlyCarListings: '',
                                monthlyRefreshes: '',
                                monthlyDuration: '',
                                annualCarListings: '',
                                annualRefreshes: '',
                                annualDuration: '',
                            });
                        }}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {activeTab === 'Create Package' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Package</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Pro, Luxury"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Car Listings</label>
                                <input
                                    type="number"
                                    value={formData.monthlyCarListings}
                                    onChange={(e) => handleInputChange('monthlyCarListings', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter number"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Refreshes</label>
                                <input
                                    type="number"
                                    value={formData.monthlyRefreshes}
                                    onChange={(e) => handleInputChange('monthlyRefreshes', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter number"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Duration (days)</label>
                                <input
                                    type="number"
                                    value={formData.monthlyDuration}
                                    onChange={(e) => handleInputChange('monthlyDuration', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter days"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Car Listings</label>
                                <input
                                    type="number"
                                    value={formData.annualCarListings}
                                    onChange={(e) => handleInputChange('annualCarListings', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter number"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Refreshes</label>
                                <input
                                    type="number"
                                    value={formData.annualRefreshes}
                                    onChange={(e) => handleInputChange('annualRefreshes', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter number"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Duration (days)</label>
                                <input
                                    type="number"
                                    value={formData.annualDuration}
                                    onChange={(e) => handleInputChange('annualDuration', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter days"
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setFormData({
                                        name: '',
                                        monthlyCarListings: '',
                                        monthlyRefreshes: '',
                                        monthlyDuration: '',
                                        annualCarListings: '',
                                        annualRefreshes: '',
                                        annualDuration: '',
                                    });
                                    setError(null);
                                }}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleCreateSubmit}
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Package'}
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Edit Package' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Package</h3>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                            <select
                                value={selectedPackageId}
                                onChange={(e) => {
                                    const pkg = packages.find((p) => p._id === e.target.value);
                                    if (pkg) {
                                        handleSelectPackage(pkg);
                                    } else {
                                        setSelectedPackageId('');
                                        setFormData({
                                            name: '',
                                            monthlyCarListings: '',
                                            monthlyRefreshes: '',
                                            monthlyDuration: '',
                                            annualCarListings: '',
                                            annualRefreshes: '',
                                            annualDuration: '',
                                        });
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a package</option>
                                {packages.map((pkg) => (
                                    <option key={pkg._id} value={pkg._id}>
                                        {pkg.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedPackageId && (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Pro, Luxury"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Car Listings</label>
                                        <input
                                            type="number"
                                            value={formData.monthlyCarListings}
                                            onChange={(e) => handleInputChange('monthlyCarListings', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter number"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Refreshes</label>
                                        <input
                                            type="number"
                                            value={formData.monthlyRefreshes}
                                            onChange={(e) => handleInputChange('monthlyRefreshes', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter number"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Duration (days)</label>
                                        <input
                                            type="number"
                                            value={formData.monthlyDuration}
                                            onChange={(e) => handleInputChange('monthlyDuration', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter days"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Car Listings</label>
                                        <input
                                            type="number"
                                            value={formData.annualCarListings}
                                            onChange={(e) => handleInputChange('annualCarListings', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter number"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Refreshes</label>
                                        <input
                                            type="number"
                                            value={formData.annualRefreshes}
                                            onChange={(e) => handleInputChange('annualRefreshes', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter number"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Duration (days)</label>
                                        <input
                                            type="number"
                                            value={formData.annualDuration}
                                            onChange={(e) => handleInputChange('annualDuration', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter days"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end space-x-4">
                                    <button
                                        onClick={() => {
                                            setFormData({
                                                name: '',
                                                monthlyCarListings: '',
                                                monthlyRefreshes: '',
                                                monthlyDuration: '',
                                                annualCarListings: '',
                                                annualRefreshes: '',
                                                annualDuration: '',
                                            });
                                            setSelectedPackageId('');
                                            setError(null);
                                        }}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={handleEditSubmit}
                                        disabled={loading}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Updating...' : 'Update Package'}
                                    </button>
                                </div>
                            </div>
                        )}
                        {packages.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No packages found
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Delete Package' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Delete Package</h3>
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-5 w-5 text-red-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Warning</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>
                                            Deleting a package is permanent and cannot be undone. Packages in use by
                                            agencies cannot be deleted.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Package Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Monthly Listings
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Monthly Refreshes
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Monthly Duration
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Annual Listings
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Annual Refreshes
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Annual Duration
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {packages.map((pkg) => (
                                        <tr key={pkg._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {pkg.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {pkg.monthly.carListings}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {pkg.monthly.refreshes}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {pkg.monthly.duration} days
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {pkg.annual.carListings}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {pkg.annual.refreshes}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {pkg.annual.duration} days
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(pkg.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    onClick={() => handleDeletePackage(pkg._id)}
                                                    disabled={deleteLoading === pkg._id}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                                >
                                                    {deleteLoading === pkg._id ? (
                                                        'Deleting...'
                                                    ) : (
                                                        <>
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {packages.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No packages found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackageManagement;