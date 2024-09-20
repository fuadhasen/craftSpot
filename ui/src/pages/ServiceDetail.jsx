import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Loading from "../components/Loading";
import ServiceLocation from "../components/ServiceLocation";
import Navbar from "../components/Navbar";

/**
 * service_name: str
    service_description: str
    service_price: float
    service_location: str
    latitude: Optional[float] = None 
    longitude: Optional[float] = None
    service_picture: str
    service_category: str
 */
const service_data = {

    service_name: "Electrical",
    service_description: "Electrical services for your home and office.",
    service_price: 100.00,
    service_location: "Lagos",
    latitude: 34.0411829,
    longitude: -4.9870592,
    service_picture: "https://via.placeholder.com/300",
    service_category: "Electrical"

}

function ServiceDetail() {
    const { id } = useParams();
    // const [service, setService] = useState({});
    const [service, setService] = useState(service_data);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {

    //     const fetchService = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axiosInstance.get(`/api/services/${id}/`);
    //             const data = response.data;
    //             setService(data);
    //         } catch (err) {
    //             console.error("Error fetching service:", err);
    //         }
    //         setLoading(false);
    //     }

    //     fetchService();
    // }, [id]);
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
                <div className="container mx-auto px-4 py-8 flex flex-1">
                    <div className="bg-white rounded-l-lg shadow-lg border-l-2 border-t-2 border-b-2 p-6">
                        <img
                            src={service.service_picture || "https://via.placeholder.com/600"}
                            alt={service.service_name}
                            className="w-full h-60 object-cover rounded-lg"
                        />
                        <h1 className="text-4xl font-bold text-gray-900 mt-6">{service.service_name}</h1>
                        <p className="text-lg text-gray-600 mt-4">{service.service_description}</p>
                        <p className="text-lg text-gray-600 mt-2">Price: <span className="font-semibold">{service.service_price}</span></p>
                        <p className="text-lg text-gray-600 mt-2">Location: <span className="font-semibold">{service.service_location}</span></p>
                        <p className="text-lg text-gray-600 mt-2">Category: <span className="font-semibold">{service.service_category}</span></p>
                    </div>
                    <ServiceLocation
                        service={service}
                    />
                </div>
            )}
        </div>

    )
}

export default ServiceDetail