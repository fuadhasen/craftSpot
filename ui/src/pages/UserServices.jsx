// Displays the current user's services

import { useState, useEffect } from 'react';

import axiosInstance from '../axiosInstance';
import Loading from '../components/Loading';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';


const UserServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/users/me/services',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    }
                );
                setServices(response.data);
                console.log(response.data);

            } catch (err) {
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="p-4 bg-gray-100">
            <div className='flex items-center justify-between mb-4'>
                <h1 className="text-3xl font-bold">Services</h1>
                <Link to="/me/create-service" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300 mt-4">New service</Link>
            </div>
            {loading && <Loading />}
            {services.length === 0 && !loading && <p>No services available.</p>}
            {services.length > 0 && (
                <ul className="space-y-4 grid md:grid-cols-4">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserServices;