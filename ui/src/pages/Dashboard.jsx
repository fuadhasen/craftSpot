import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

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
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className="bg-gray-100 flex flex-1">
                <Sidebar />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
