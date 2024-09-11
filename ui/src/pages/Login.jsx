// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Import your axios instance

function Dashboard() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [role, setRole] = useState('seeker'); // Default role
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get(`/services?role=${role}`);
                setServices(response.data);
            } catch (err) {
                setError('Failed to load services.');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [role]); // Refetch services when role changes

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axiosInstance.get('/user/role'); // Endpoint to get user role
                setUserRole(response.data.role);
            } catch (err) {
                setError('Failed to load user role.');
            }
        };

        fetchUserRole();
    }, []);

    const handleRoleChange = async (newRole) => {
        try {
            await axiosInstance.post('/user/role', { role: newRole }); // Endpoint to update user role
            setRole(newRole);
            setUserRole(newRole);
        } catch (err) {
            setError('Failed to switch role.');
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Services</h1>
            <div className="mb-4">
                <button
                    onClick={() => handleRoleChange('seeker')}
                    className={`mr-2 px-4 py-2 rounded ${role === 'seeker' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Seeker
                </button>
                <button
                    onClick={() => handleRoleChange('provider')}
                    className={`px-4 py-2 rounded ${role === 'provider' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Provider
                </button>
            </div>
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
