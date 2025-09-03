"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import { X } from 'lucide-react';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Full name is required';
        if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) return 'Invalid email format';
        if (formData.password.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            localStorage.setItem('jwt', data.token);
            setSuccess('User created successfully! You can now log in.');
            setFormData({ name: '', email: '', password: '' });

            setTimeout(() => {
                setSuccess('');
                onSwitchToLogin();
            }, 3000);
        } catch (err) {
            setError(err.message || 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out scale-100 opacity-100 relative max-h-[90vh] overflow-y-auto">
                <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            aria-label="Close signup modal"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm" role="alert">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm" role="alert">
                            {success}
                            <button
                                onClick={() => setSuccess('')}
                                className="ml-2 text-green-900 hover:underline"
                                aria-label="Dismiss success message"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your full name"
                                required
                                aria-describedby={error && formData.name === '' ? 'name-error' : undefined}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your email"
                                required
                                aria-describedby={error && !formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ? 'email-error' : undefined}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Create a password"
                                required
                                aria-describedby={error && formData.password.length < 6 ? 'password-error' : undefined}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'}`}
                            aria-label="Create account"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-blue-600 hover:underline font-medium"
                                aria-label="Switch to login"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SignupModal;