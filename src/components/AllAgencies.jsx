import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, agency }) => {
    if (!isOpen || !agency) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-100 opacity-100 relative p-8" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{agency.agencyName} Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Address</span>
                        <span className="text-sm text-gray-500">{agency.address}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Billing Type</span>
                        <span className="text-sm text-gray-500">
                            {agency.billingType.charAt(0).toUpperCase() + agency.billingType.slice(1)}
                        </span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Expiry Date</span>
                        <span className="text-sm text-gray-500">{new Date(agency.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Car Listings</span>
                        <span className="text-sm text-gray-500">{agency.carListings} / {agency.maxCarListings}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Refreshes</span>
                        <span className="text-sm text-gray-500">{agency.refreshes} / {agency.maxRefreshes}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Expired</span>
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agency.isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                }`}
                        >
                            {agency.isExpired ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Days Remaining</span>
                        <span className="text-sm text-gray-500">{agency.daysRemaining}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Created Date</span>
                        <span className="text-sm text-gray-500">{new Date(agency.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const AllAgencies = () => {
    const [agencies, setAgencies] = useState([]);
    const [filteredAgencies, setFilteredAgencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'agencyName', direction: 'asc' });
    const [selectedAgency, setSelectedAgency] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAgencies = async () => {
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/admin/agencies`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                console.log('Agencies:', response.data); // Debug
                const fetchedAgencies = response.data.agencies || [];
                setAgencies(fetchedAgencies);
                setFilteredAgencies(fetchedAgencies);
            } catch (err) {
                console.error('Error fetching agencies:', err);
                setError('Failed to load agencies. Please try again.');
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
        fetchAgencies();
    }, [router]);

    useEffect(() => {
        let updatedAgencies = [...agencies];
        if (searchTerm) {
            updatedAgencies = updatedAgencies.filter(
                (agency) =>
                    agency.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    agency.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sortConfig.key) {
            updatedAgencies.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        setFilteredAgencies(updatedAgencies);
    }, [searchTerm, sortConfig, agencies]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? (
            <ChevronUp className="w-4 h-4 inline ml-1" />
        ) : (
            <ChevronDown className="w-4 h-4 inline ml-1" />
        );
    };

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-6">All Agencies</h2>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by agency name or email..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">
                        Loading agencies...
                    </div>
                ) : filteredAgencies.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No agencies found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('agencyName')}>
                                        Agency Name {renderSortIcon('agencyName')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                                        Email {renderSortIcon('email')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                                        Status {renderSortIcon('status')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Package
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAgencies.map((agency) => (
                                    <tr
                                        key={agency._id}
                                        onClick={() => setSelectedAgency(agency)}
                                        className="cursor-pointer hover:bg-gray-50"
                                    >
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
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agency.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : agency.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {agency.status.charAt(0).toUpperCase() + agency.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {agency.package.charAt(0).toUpperCase() + agency.package.slice(1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Modal
                isOpen={!!selectedAgency}
                onClose={() => setSelectedAgency(null)}
                agency={selectedAgency}
            />
        </div>
    );
};

export default AllAgencies;