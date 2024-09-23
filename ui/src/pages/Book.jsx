import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Navbar from '../components/Navbar';

const Book = () => {
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(""); // State for the selected date
    const [selectedTime, setSelectedTime] = useState(""); // State for the selected time
    const [error, setError] = useState(""); // State to handle errors
    const [successMessage, setSuccessMessage] = useState(""); // State for success messages
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
    const navigate = useNavigate();
    const { id } = useParams(); // `id` refers to the service ID

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate("/login");
        }
    }, [navigate]);


    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/services/${id}/`);
                setService(response.data);
            } catch (err) {
                console.error('Error fetching service:', err);
            }
            setLoading(false);
        };

        fetchService();
    }, [id]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!selectedDate || !selectedTime) {
            setError("Please select both date and time.");
            return;
        }

        const scheduleTime = new Date(`${selectedDate}T${selectedTime}`).toISOString();

        try {
            const response = await axiosInstance.post(`/services/${id}/book`, {
                schedule_time: scheduleTime,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );

            if (response.status === 201) {
                setSuccessMessage("Booking created successfully.");
                setTimeout(() => {
                    navigate("/me/bookings"); // Redirect to bookings page after successful creation
                }, 2000);
            }
        } catch (err) {
            console.error('Error creating booking:', err);
            setError("Failed to create the booking. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-2xl font-bold mb-4'>Schedule Your Booking</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='bg-white shadow-md rounded-md p-4'>
                        <p>
                            <span className='font-bold'>Service:</span> {service.name}
                        </p>
                        <p>
                            <span className='font-bold'>Location:</span> {service.location}
                        </p>

                        {/* Schedule Date and Time Form */}
                        <form onSubmit={handleSubmit} className="mt-4">
                            <label className='block text-sm font-medium text-gray-700'>
                                Select Date:
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />

                            <label className='block text-sm font-medium text-gray-700 mt-4'>
                                Select Time:
                            </label>
                            <input
                                type="time"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />

                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

                            <button
                                type="submit"
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Schedule Booking
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Book;
