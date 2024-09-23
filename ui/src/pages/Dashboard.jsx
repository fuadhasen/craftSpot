import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import Navbar from '../components/Navbar';

function Dashboard() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axiosInstance.get('/users/me',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    }
                );
                setUser(userResponse.data);
            } catch (err) {
                setError('Failed to load user data.');
            }
        };

        const fetchServices = async () => {
            try {
                const servicesResponse = await axiosInstance.get('/services');
                console.log(servicesResponse.data);
                setServices(servicesResponse.data);
            } catch (err) {
                setError('Failed to load services.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        if (user) {
            fetchServices();
        }
    }, []);

    return (
        <div>
            <Navbar />

            <div className="min-h-screen p-4 bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Services</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {services.length === 0 && !loading && <p>No services available.</p>}
                {services.length > 0 && (
                    <ul className="space-y-4">
                        {services.map(service => (
                            <li key={service.id} className="bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-semibold">{service.service_type}</h2>
                                <p className="text-gray-600">{service.description}</p>
                                <p className="text-gray-500">{service.location}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
