import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";

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
    latitude: 6.5244,
    longitude: 3.3792,
    service_picture: "https://via.placeholder.com/300",
    service_category: "Electrical"

}

function ServiceDetail() {
    const { id } = useParams();
    // const [service, setService] = useState({});
    const [service, setService] = useState(service_data);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchService = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/api/services/${id}/`);
                const data = response.data;
                setService(data);
            } catch (err) {
                console.error("Error fetching service:", err);
            }
            setLoading(false);
        }

        fetchService();
    }, [id]);
    return (

        <div className="">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>{service.service_name}</h1>
                    <p>{service.service_description}</p>
                    <p>Price: {service.service_price}</p>
                    <p>Location: {service.service_location}</p>
                    <p>Category: {service.service_category}</p>
                    <img src={service.service_picture} alt={service.service_name} />
                </div>
            )}
            <Link to="/services">Back to services</Link>
        </div>
    )
}

export default ServiceDetail