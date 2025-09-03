"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { X } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) return 'Invalid email format';
        if (!formData.password) return 'Password is required';
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
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            let data = await response.json();

            if (!response.ok && data.message === 'Invalid email or password') {
                response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/agency/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email.trim(),
                        password: formData.password,
                    }),
                });

                data = await response.json();
            }

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user || data.agency));
            setSuccess('Login successful! Redirecting...');
            setFormData({ email: '', password: '' });
            setRememberMe(false);

            setTimeout(() => {
                setSuccess('');
                onClose();
                const entity = data.user || data.agency;
                const redirectPath = entity.role === 'user' ? '/useraccount' : '/agency';
                router.push(redirectPath);
            }, 2000);
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/google`;
    };

    useEffect(() => {
        // Check for error in URL params
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        if (error === 'auth_failed') {
            setError('Google authentication failed');
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        if (error === 'token_failed') {
            setError('Failed to create authentication token');
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        // Function to get cookie value
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };

        // Check for JWT token and user data in cookies
        const token = getCookie('jwt');
        const userCookie = getCookie('user');

        console.log('Checking cookies:', { token: !!token, userCookie: !!userCookie });

        if (token && userCookie) {
            try {
                const userData = JSON.parse(decodeURIComponent(userCookie));
                console.log('Parsed user data:', userData);

                // Store in localStorage
                localStorage.setItem('jwt', token);
                localStorage.setItem('user', JSON.stringify(userData));

                setSuccess('Google login successful! Redirecting...');

                // Clean up cookies after storing in localStorage
                document.cookie = 'jwt=; Max-Age=0; path=/; sameSite=lax';
                document.cookie = 'user=; Max-Age=0; path=/; sameSite=lax';

                setTimeout(() => {
                    setSuccess('');
                    onClose();

                    // Redirect based on user role
                    const redirectPath = userData.role === 'user' ? '/useraccount' : '/agency';
                    console.log('Redirecting to:', redirectPath);
                    router.push(redirectPath);
                }, 1500);

            } catch (parseError) {
                console.error('Error parsing user cookie:', parseError);
                setError('Failed to process Google login data');
            }
        }
    }, [isOpen, onClose, router]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-100 opacity-100 relative">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            aria-label="Close login modal"
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
                    <form className="space-y-4" onSubmit={handleSubmit}>
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your password"
                                required
                                aria-describedby={error && !formData.password ? 'password-error' : undefined}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    aria-label="Remember me"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'}`}
                            aria-label="Sign in"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-3">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                aria-label="Sign in with Google"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={onSwitchToSignup}
                                className="text-blue-600 hover:underline font-medium"
                                aria-label="Switch to sign up"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;