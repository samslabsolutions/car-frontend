// components/EditCarModal.js
"use client";
import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import axios from 'axios';

const EditCarModal = ({ car, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        title: '',
        description: '',
        location: '',
        bodyType: '',
        fuelType: '',
        gearbox: '',
        engineCapacity: '',
        seatingCapacity: '',
        doors: '',
        bags: '',
        exteriorColor: '',
        interiorColor: '',
        securityDeposit: '',
        category: '',
        // Pricing
        dailyOriginalPrice: '',
        dailyDiscountedPrice: '',
        weeklyOriginalPrice: '',
        weeklyDiscountedPrice: '',
        monthlyOriginalPrice: '',
        monthlyDiscountedPrice: '',
        // Features
        technicalFeatures: [],
        otherFeatures: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newImages, setNewImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    useEffect(() => {
        if (car && isOpen) {
            setFormData({
                make: car.make || '',
                model: car.model || '',
                year: car.year || '',
                title: car.title || '',
                description: car.description || '',
                location: car.location || '',
                bodyType: car.bodyType || '',
                fuelType: car.fuelType || '',
                gearbox: car.gearbox || '',
                engineCapacity: car.engineCapacity || '',
                seatingCapacity: car.seatingCapacity || '',
                doors: car.doors || '',
                bags: car.bags || '',
                exteriorColor: car.exteriorColor || '',
                interiorColor: car.interiorColor || '',
                securityDeposit: car.securityDeposit || '',
                category: car.category || '',
                dailyOriginalPrice: car.pricing?.daily?.originalPrice || '',
                dailyDiscountedPrice: car.pricing?.daily?.discountedPrice || '',
                weeklyOriginalPrice: car.pricing?.weekly?.originalPrice || '',
                weeklyDiscountedPrice: car.pricing?.weekly?.discountedPrice || '',
                monthlyOriginalPrice: car.pricing?.monthly?.originalPrice || '',
                monthlyDiscountedPrice: car.pricing?.monthly?.discountedPrice || '',
                technicalFeatures: car.technicalFeatures || [],
                otherFeatures: car.otherFeatures || [],
            });
        }
    }, [car, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prev => [...prev, ...files]);
    };

    const handleRemoveNewImage = (index) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleDeleteImage = (imageId) => {
        setImagesToDelete(prev => [...prev, imageId]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('Please log in to perform this action.');
                return;
            }

            const formDataToSend = new FormData();

            // Append all form data
            Object.keys(formData).forEach(key => {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(item => {
                        formDataToSend.append(key, item);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Append new images
            newImages.forEach(image => {
                formDataToSend.append('images', image);
            });

            // Append images to delete
            imagesToDelete.forEach(imageId => {
                formDataToSend.append('imagesToDelete', imageId);
            });

            const response = await axios.put(
                process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000/api/cars/${car._id}`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            onUpdate(response.data.car);
            onClose();
        } catch (error) {
            console.error('Error updating car:', error);
            setError(error.response?.data?.message || 'Failed to update car listing');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Edit Car Listing</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Make
                            </label>
                            <input
                                type="text"
                                value={formData.make}
                                onChange={(e) => handleInputChange('make', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Model
                            </label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={(e) => handleInputChange('model', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year
                            </label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Add more fields as needed */}
                    </div>

                    {/* Image Management Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>

                        {/* Existing Images */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {car.images && car.images.filter(img => !imagesToDelete.includes(img._id)).map((image) => (
                                <div key={image._id} className="relative group">
                                    <img
                                        src={process.env.NEXT_PUBLIC_API_URL || `http://localhost:5000${image.url}`}
                                        alt={image.caption}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(image._id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {image.isMain && (
                                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                            Main
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add New Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Add New Images
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Upload Images</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>

                                {newImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`New image ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveNewImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCarModal;