import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown, X, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

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
                    <h2 className="text-2xl font-bold text-gray-900">{user.name} Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="space-y-4">
                    {user.dateOfBirth && (
                        <div>
                            <span className="block text-sm font-medium text-gray-700">Date of Birth</span>
                            <span className="text-sm text-gray-500">{new Date(user.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                    )}
                    {user.nationality && (
                        <div>
                            <span className="block text-sm font-medium text-gray-700">Nationality</span>
                            <span className="text-sm text-gray-500">{user.nationality}</span>
                        </div>
                    )}
                    {user.preferredCity && (
                        <div>
                            <span className="block text-sm font-medium text-gray-700">Preferred City</span>
                            <span className="text-sm text-gray-500">{user.preferredCity}</span>
                        </div>
                    )}
                    {user.photo && (
                        <div>
                            <span className="block text-sm font-medium text-gray-700">Photo URL</span>
                            <span className="text-sm text-gray-500">{user.photo}</span>
                        </div>
                    )}
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Created Date</span>
                        <span className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700">Role</span>
                        <span className="text-sm text-gray-500">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/admin/allusers`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });
                console.log('JWT:', jwt); // Debug JWT
                console.log('Response:', response.data); // Debug full response
                const fetchedUsers = response.data.users || (response.data.data?.users || response.data); // Handle different response structures
                if (!Array.isArray(fetchedUsers)) {
                    throw new Error('Unexpected API response format');
                }
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            } catch (err) {
                console.error('Error fetching users:', err.response?.data || err.message);
                setError('Failed to load users. Please try again.');
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
        fetchUsers();
    }, [router]);

    useEffect(() => {
        let updatedUsers = [...users];
        if (searchTerm) {
            updatedUsers = updatedUsers.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sortConfig.key) {
            updatedUsers.sort((a, b) => {
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
        setFilteredUsers(updatedUsers);
    }, [searchTerm, sortConfig, users]);

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

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        setDeleteLoading(userId);
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

            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/admin/user/${userId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            // Update the users list by removing the deleted user
            setUsers((prev) => prev.filter((user) => user._id !== userId));
            setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));
            setError(null);
            alert('User deleted successfully!');
        } catch (err) {
            console.error('Error deleting user:', err);
            const errorMessage = err.response?.data?.message || 'Failed to delete user. Please try again.';
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

    return (
        <div className="p-6">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-6">All Users</h2>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">
                        Loading users...
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No users found
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
                                        Phone Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('active')}>
                                        Active {renderSortIcon('active')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => {
                                    console.log('Rendering user:', user); // Debug each user
                                    return (
                                        <tr key={user._id} className="hover:bg-gray-50">
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                                                onClick={() => setSelectedUser(user)}
                                            >
                                                {user.name}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                                onClick={() => setSelectedUser(user)}
                                            >
                                                {user.email}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                                onClick={() => setSelectedUser(user)}
                                            >
                                                {user.phoneNumber || 'N/A'}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                                onClick={() => setSelectedUser(user)}
                                            >
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {user.active ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row click from opening modal
                                                        handleDeleteUser(user._id);
                                                    }}
                                                    disabled={deleteLoading === user._id}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors duration-200"
                                                >
                                                    {deleteLoading === user._id ? (
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
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Modal
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                user={selectedUser}
            />
        </div>
    );
};

export default AllUsers;