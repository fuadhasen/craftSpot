// Display the bookings for the current user

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import BookingCard from '../components/BookingCard';


const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/users/me/bookings',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    }
                );
                setBookings(response.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }
        , []);

    return (
        <div className="p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Bookings</h1>
            {loading && <Loading />}
            {bookings.length === 0 && !loading && <p>No bookings available.</p>}
            {bookings.length > 0 && (
                <ul className="space-y-4">
                    {bookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Bookings;