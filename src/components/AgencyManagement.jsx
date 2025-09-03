import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

const AgencyManagement = () => {
    const [activeTab, setActiveTab] = useState('Create Agency');
    const [formData, setFormData] = useState({
        agencyName: '',
        email: '',
        contactPhone: '',
        address: '',
        package: '',
        billingType: 'monthly',
        password: '',
    });
    const [packages, setPackages] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const router = useRouter();

    const tabs = ['Create Agency', 'Status', 'Delete Agency'];

    // Fetch available packages and agencies
    useEffect(() => {
        const fetchData = async () => {
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

                // Fetch packages
                const packagesResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/packages', {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setPackages(packagesResponse.data.packages);

                // Fetch agencies
                const agenciesResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/agencies', {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                setAgencies(agenciesResponse.data.agencies || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data. Please try again.');
            }
        };
        fetchData();
    }, [router]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setError(null);
    };

    const generatePassword = () => {
        const length = 12;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        handleInputChange('password', password);
    };

    const validateForm = () => {
        const requiredFields = ['agencyName', 'email', 'contactPhone', 'address', 'package', 'billingType', 'password'];
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                setError(`${field.replace(/([A-Z])/g, ' $1').trim()} is required`);
                return false;
            }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Invalid email format');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
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

            await axios.post(
                process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/create-agency',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            setFormData({
                agencyName: '',
                email: '',
                contactPhone: '',
                address: '',
                package: '',
                billingType: 'monthly',
                password: '',
            });
            setError(null);
            alert('Agency created successfully with pending status!');

            // Refresh agencies list
            const agenciesResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/auth/admin/agencies', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setAgencies(agenciesResponse.data.agencies || []);
        } catch (err) {
            console.error('Error creating agency:', err);
            const errorMessage = err.response?.data?.message || 'Failed to create agency. Please try again.';
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

    const handleStatusChange = async (agencyId, newStatus) => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            await axios.patch(
                process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/auth/agency/${agencyId}/status`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                }
            );

            // Update local state
            setAgencies(prev => prev.map(agency =>
                agency._id === agencyId ? { ...agency, status: newStatus } : agency
            ));
            setError(null);
        } catch (err) {
            console.error('Error updating agency status:', err);
            setError('Failed to update agency status.');
        }
    };

    const handleDeleteAgency = async (agencyId) => {
        if (!window.confirm('Are you sure you want to delete this agency? This action cannot be undone.')) {
            return;
        }

        setDeleteLoading(agencyId);
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                router.push('/login');
                return;
            }

            await axios.delete(process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/auth/admin/agencies/${agencyId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            // Remove from local state
            setAgencies(prev => prev.filter(agency => agency._id !== agencyId));
            setError(null);
            alert('Agency deleted successfully!');
        } catch (err) {
            console.error('Error deleting agency:', err);
            setError('Failed to delete agency.');
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-6">Agency Management</h2>

            <nav className="flex space-x-8 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
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
                {activeTab === 'Create Agency' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Agency</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Agency Name</label>
                                <input
                                    type="text"
                                    value={formData.agencyName}
                                    onChange={(e) => handleInputChange('agencyName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter agency name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                                <input
                                    type="text"
                                    value={formData.contactPhone}
                                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter contact phone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
                                <select
                                    value={formData.package}
                                    onChange={(e) => handleInputChange('package', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Package</option>
                                    {packages.map((pkg) => (
                                        <option key={pkg._id} value={pkg.name}>
                                            {pkg.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Type</label>
                                <select
                                    value={formData.billingType}
                                    onChange={(e) => handleInputChange('billingType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="annual">Annual</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter or generate password"
                                    />
                                    <button
                                        onClick={generatePassword}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                onClick={() => setFormData({
                                    agencyName: '',
                                    email: '',
                                    contactPhone: '',
                                    address: '',
                                    package: '',
                                    billingType: 'monthly',
                                    password: '',
                                })}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Agency'}
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Status' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Agency Status Management</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {agencies.map((agency) => (
                                        <tr key={agency._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {agency.agencyName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {agency.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {agency.contactPhone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {agency.package}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${agency.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : agency.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : agency.status === 'suspended'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {agency.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <select
                                                    value={agency.status}
                                                    onChange={(e) => handleStatusChange(agency._id, e.target.value)}
                                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="active">Active</option>
                                                    <option value="suspended">Suspended</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {agencies.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No agencies found
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'Delete Agency' && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Delete Agency</h3>
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Warning
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>Deleting an agency is permanent and cannot be undone. All associated data will be removed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {agencies.map((agency) => (
                                        <tr key={agency._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {agency.agencyName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {agency.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${agency.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : agency.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : agency.status === 'suspended'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {agency.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(agency.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    onClick={() => handleDeleteAgency(agency._id)}
                                                    disabled={deleteLoading === agency._id}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                                >
                                                    {deleteLoading === agency._id ? (
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
                            {agencies.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No agencies found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgencyManagement;