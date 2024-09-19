import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const ServiceLocation = ({ service }) => {
    const { latitude, longitude } = service;

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (

        <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: '300px' }}
        >
            <ChangeView center={[latitude, longitude]} zoom={13} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>

    );
}

export default ServiceLocation;