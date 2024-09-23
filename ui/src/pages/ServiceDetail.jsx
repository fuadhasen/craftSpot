import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Loading from "../components/Loading";
import ServiceLocation from "../components/ServiceLocation";
import Navbar from "../components/Navbar";

function ServiceDetail() {
    const { id } = useParams();
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/services/${id}/`);
                setService(response.data);
            } catch (err) {
                console.error("Error fetching service:", err);
            }
            setLoading(false);
        };

        fetchService();
    }, [id]);


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {loading ? (
                <div className="container mx-auto px-4 py-8 text-center flex-1">
                    <Loading />
                    <Link to="/services" className="text-blue-600 hover:underline mt-8 inline-block">
                        Back to services
                    </Link>
                </div>
            ) : (
                service.name ? (
                    <div className="container mx-auto px-4 py-8 flex flex-1">
                        <div className="bg-white rounded-l-lg shadow-lg border-l-2 border-t-2 border-b-2 p-6">
                            <img
                                src={service.image || "https://via.placeholder.com/600"}
                                alt={service.name}
                                className="w-full h-60 object-cover rounded-lg"
                            />
                            <h1 className="text-4xl font-bold text-gray-900 mt-6">{service.name}</h1>
                            <p className="text-lg text-gray-600 mt-4">{service.description}</p>
                            <p className="text-lg text-gray-600 mt-2">Location: <span className="font-semibold">{service.location}</span></p>
                            <p className="text-lg text-gray-600 mt-2">Category: <span className="font-semibold">{service.type}</span></p>
                            <p className="text-lg text-gray-600 mt-4">Pricing: <span className="font-semibold">${service.pricing}</span></p>
                            <Link to={`/services/${id}/book`} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300 mt-4 inline-block">Book Now</Link>
                        </div>
                        <ServiceLocation service={service} />
                    </div>
                ) : (
                    <Link to="/services" className="text-blue-600 hover:underline mt-8 inline-block">
                        Back to services
                    </Link>
                )
            )}
        </div>
    );
}

export default ServiceDetail;
