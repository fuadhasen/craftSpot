// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

function Dashboard() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get('/api/services'); // Adjust the endpoint as needed
                setServices(response.data);
            } catch (err) {
                setError('Failed to load services.');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Services</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {services.length === 0 && !loading && <p>No services available.</p>}
            {services.length > 0 && (
                <ul className="space-y-4">
                    {services.map(service => (
                        <li key={service.id} className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{service.name}</h2>
                            <p className="text-gray-600">{service.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;
