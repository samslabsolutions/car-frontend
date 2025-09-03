import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown, X, Trash2, Edit, Save, XCircle } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, contact }) => {
    if (!isOpen || !contact) return null;

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'close': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

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
                    <h2 className="text-2xl font-bold text-gray-900">{contact.name} Contact Details</h2>
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
                        <span className="block text-sm font-medium text-gray-700">Name</span>
                        <span className="text-sm text-gray-500">{contact.name}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Email</span>
                        <span className="text-sm text-gray-500">{contact.email}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Phone</span>
                        <span className="text-sm text-gray-500">{contact.phone || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Company</span>
                        <span className="text-sm text-gray-500">{contact.companyName || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Job Title</span>
                        <span className="text-sm text-gray-500">{contact.jobTitle || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Fleet Size</span>
                        <span className="text-sm text-gray-500">{contact.fleetSize || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Country</span>
                        <span className="text-sm text-gray-500">{contact.country || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">City</span>
                        <span className="text-sm text-gray-500">{contact.city || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Status</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(contact.status)}`}>
                            {contact.status || 'pending'}
                        </span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Created Date</span>
                        <span className="text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const StatusEditModal = ({ isOpen, onClose, contact, onSave }) => {
    const [status, setStatus] = useState('pending');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (contact) {
            setStatus(contact.status || 'pending');
        }
    }, [contact]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(contact._id, { status });
            onClose();
        } catch (error) {
            console.error('Error saving contact:', error);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen || !contact) return null;

    const statusOptions = ['active', 'close', 'pending'];

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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 ease-out scale-100 opacity-100 relative p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Update Status</h2>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                        <p className="text-sm text-gray-600 font-medium">{contact.name}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Change Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {statusOptions.map(option => (
                                <option key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                    >
                        {saving ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Update Status
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

const AgencyContact = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [selectedContact, setSelectedContact] = useState(null);
    const [statusEditingContact, setStatusEditingContact] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const router = useRouter();

    useEffect(() => {
        const fetchContacts = async () => {
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact/all`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                const fetchedContacts = response.data.contacts || response.data;
                if (!Array.isArray(fetchedContacts)) {
                    throw new Error('Unexpected API response format');
                }
                setContacts(fetchedContacts);
                setFilteredContacts(fetchedContacts);
            } catch (err) {
                console.error('Error fetching contacts:', err.response?.data || err.message);
                setError('Failed to load contacts. Please try again.');
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
        fetchContacts();
    }, [router]);

    useEffect(() => {
        let updatedContacts = [...contacts];

        // Apply search filter
        if (searchTerm) {
            updatedContacts = updatedContacts.filter(
                (contact) =>
                    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            updatedContacts = updatedContacts.filter(contact => contact.status === statusFilter);
        }

        // Apply sorting
        if (sortConfig.key) {
            updatedContacts.sort((a, b) => {
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
        setFilteredContacts(updatedContacts);
    }, [searchTerm, sortConfig, contacts, statusFilter]);

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

    const handleUpdateStatus = async (contactId, updateData) => {
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

            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact/update/${contactId}`,
                { status: updateData.status },
                { headers: { Authorization: `Bearer ${jwt}` } }
            );

            // Update local state
            const updatedContact = response.data.contact;
            setContacts(prev => prev.map(contact =>
                contact._id === contactId ? updatedContact : contact
            ));
            setError(null);
            alert('Contact status updated successfully!');
        } catch (err) {
            console.error('Error updating contact status:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update contact status. Please try again.';
            setError(errorMessage);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError('Your session has expired or you lack permission. Please log in again.');
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                router.push('/login');
            }
        }
    };

    const handleDeleteContact = async (contactId) => {
        if (!window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
            return;
        }

        setDeleteLoading(contactId);
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

            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact/delete/${contactId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            setContacts((prev) => prev.filter((contact) => contact._id !== contactId));
            setFilteredContacts((prev) => prev.filter((contact) => contact._id !== contactId));
            setError(null);
            alert('Contact deleted successfully!');
        } catch (err) {
            console.error('Error deleting contact:', err);
            const errorMessage = err.response?.data?.message || 'Failed to delete contact. Please try again.';
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

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'close': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-6">Agency Contacts</h2>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4 flex gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, email, or company..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="close">Closed</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">
                        Loading contacts...
                    </div>
                ) : filteredContacts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No contacts found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                                        Name {renderSortIcon('name')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                                        Email {renderSortIcon('email')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                                        Status {renderSortIcon('status')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact._id} className="hover:bg-gray-50">
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                                            onClick={() => setSelectedContact(contact)}
                                        >
                                            {contact.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                            onClick={() => setSelectedContact(contact)}
                                        >
                                            {contact.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                            onClick={() => setSelectedContact(contact)}
                                        >
                                            {contact.companyName || 'N/A'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                            onClick={() => setSelectedContact(contact)}
                                        >
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(contact.status)}`}>
                                                {contact.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setStatusEditingContact(contact);
                                                    }}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit Status
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteContact(contact._id);
                                                    }}
                                                    disabled={deleteLoading === contact._id}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors duration-200"
                                                >
                                                    {deleteLoading === contact._id ? (
                                                        'Deleting...'
                                                    ) : (
                                                        <>
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Modal
                isOpen={!!selectedContact}
                onClose={() => setSelectedContact(null)}
                contact={selectedContact}
            />

            <StatusEditModal
                isOpen={!!statusEditingContact}
                onClose={() => setStatusEditingContact(null)}
                contact={statusEditingContact}
                onSave={handleUpdateStatus}
            />
        </div>
    );
};

export default AgencyContact;