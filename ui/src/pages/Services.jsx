import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const data = [
    {
        id: 1,
        name: "Plumbing",
        description: "Get your plumbing issues fixed by professionals.",
        image_url: "https://via.placeholder.com/300",
        user: {
            id: 1,
            name: "John Doe",
            profile_image: "https://via.placeholder.com/150",
        }
    },
    {
        id: 2,
        name: "Electrical",
        description: "Electrical services for your home and office.",
        image_url: "https://via.placeholder.com/300",
        user: {
            id: 2,
            name: "Jane Doe",
            profile_image: "https://via.placeholder.com/150"
        }
    },
    {
        id: 3,
        name: "Cleaning",
        description: "Professional cleaning services for your home.",
        image_url: "https://via.placeholder.com/300",
        user: {
            id: 3,
            name: "Alice",
            profile_image: "https://via.placeholder.com/150"
        }
    },
]

function Services() {
    // const [services, setServices] = useState([]);

    const [services, setServices] = useState(data);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch services from the backend
    // useEffect(() => {
    //     const fetchServices = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axiosInstance.get('/api/services/');
    //             const data = response.data;


    //             setServices(data);
    //         } catch (err) {
    //             console.error("Error fetching services:", err);
    //         }
    //         setLoading(false);
    //     };
    //     fetchServices();
    // }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        // Optionally implement search filtering on the services
        // or send the search query to the backend
        const filteredServices = services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setServices(filteredServices);
    };

    return (
        <div className="h-screen">
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mt-8 mx-4">Browse Services</h1>
                <p className="text-lg text-gray-600 mt-4 mx-4">
                    Find skilled professionals for your home and business needs.
                </p>
                <div className="grid grid-cols-1 gap-4 mt-8 mx-4">
                    <form className="flex p-1 rounded-md border-2 items-center focus-within:border-blue-600 justify-between" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for services"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 focus:outline-none"
                        />
                        <FaSearch className="text-stone-400" />

                    </form>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {loading ? (
                        <Loading />
                    ) : (
                        services.length > 0 ? (
                            services.map((service) => (
                                <Link key={service.id} className="group rounded-md" to={`${service.id}`}>
                                    <div className="bg-white rounded-lg shadow-lg p-4">
                                        <img
                                            src={service.image_url || "https://via.placeholder.com/300"}
                                            alt={service.name}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-semibold mt-4">{service.name}</h2>
                                            <p className=" text-gray-600 mt-4">By <span className="font-bold">{service.user.name}</span></p>
                                        </div>
                                        <p className="text-gray-600 mt-1 truncate group-hover:text-gray-900 group-hover:underline">{service.description}</p>
                                    </div>
                                </Link>

                            ))
                        ) : (
                            <p className="mx-4">No services found.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Services;
