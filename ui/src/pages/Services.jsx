import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const data = [
    // Sample data (same as before)
];

function Services() {
    const [services, setServices] = useState(data); // All available services
    const [visibleServices, setVisibleServices] = useState([]); // Currently visible services
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track current page for pagination
    const servicesPerPage = 3;

    // Load more services when user scrolls to the bottom
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
                loadMoreServices();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleServices]); // Update scroll listener when services change

    // Load the initial set of services
    useEffect(() => {
        loadMoreServices();
    }, []);

    const loadMoreServices = () => {
        setLoading(true);
        const nextPage = page + 1;
        const newVisibleServices = services.slice(0, nextPage * servicesPerPage);
        setVisibleServices(newVisibleServices);
        setPage(nextPage);
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredServices = services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setVisibleServices(filteredServices.slice(0, servicesPerPage)); // Reset pagination on search
        setPage(1);
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
                        visibleServices.length > 0 ? (
                            visibleServices.map((service) => (
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
