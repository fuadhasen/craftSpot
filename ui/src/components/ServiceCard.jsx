import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <p className="text-lg font-bold">{service.name}</p>
            <p>{service.description}</p>
            <p className="text-gray-600 my-2">${service.pricing}</p>
            <Link to={`/me/services/${service.id}`} className="mt-2 text-blue-600 py-2 rounded-md hover:underline">Update the service</Link>
        </div>
    );
}

export default ServiceCard;