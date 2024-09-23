import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Services() {
    const [services, setServices] = useState([]);
    const [visibleServices, setVisibleServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const servicesPerPage = 3;

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/services/",
                    { params: { limit: 100 } }
                );
                setServices(response.data);
                setFilteredServices(response.data);
                setVisibleServices(response.data.slice(0, servicesPerPage));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const startIndex = (page - 1) * servicesPerPage;
        const endIndex = startIndex + servicesPerPage;
        setVisibleServices(filteredServices.slice(startIndex, endIndex));
    }, [page, filteredServices]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredServices(filtered); // Update filtered services to include only search results
        setPage(1); // Reset to first page
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(filteredServices.length / servicesPerPage)) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // Generate pagination page numbers dynamically
    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

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
                                            alt={service.type}
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

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-8">
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                        className={`px-4 py-2 mx-2 bg-gray-300 rounded-lg ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    >
                        Previous
                    </button>

                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-4 py-2 mx-2 rounded-lg ${pageNumber === page ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className={`px-4 py-2 mx-2 bg-gray-300 rounded-lg ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Services;
