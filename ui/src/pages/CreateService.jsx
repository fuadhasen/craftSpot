// Create service page

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const CreateService = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            await axiosInstance.post('/services', {
                name,
                description,
                price,
            });
            setSuccessMessage('Service created successfully!');
        } catch (err) {
            setError('Failed to create service.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4 bg-gray-100'>
            <h1 className='text-3xl font-bold mb-4'>Create Service</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block font-semibold'>Name</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full border p-2 rounded'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description' className='block font-semibold'>Description</label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full border p-2 rounded'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='price' className='block font-semibold'>Price</label>
                    <input
                        type='number'
                        id='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='w-full border p-2 rounded'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 text-white p-2 rounded'
                    disabled={loading}
                >
                    Create Service
                </button>
                {error && <p className='text-red-500'>{error}</p>}
                {successMessage && <p className='text-green-500'>{successMessage}</p>}
            </form>
        </div>
    );
}

export default CreateService;