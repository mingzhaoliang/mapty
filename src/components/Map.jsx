import { MapContainer, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState, useEffect } from 'react';
import LocationMarker from './LocationMarker';
import Relocate from './Relocate';

export default function Map() {
    const [initialPosition, setInitialPosition] = useState(null);

    const customIcon = new Icon({
        iconUrl: '/icons/marker.png',
        iconSize: [38, 38],
        iconAnchor: [25, 50],
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setInitialPosition([pos.coords.latitude, pos.coords.longitude]);
        });
    }, []);

    return (
        <>
            {initialPosition && (
                <MapContainer
                    center={[...initialPosition]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className='h-screen flex-1 z-0'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                    <Relocate />
                    <LocationMarker customIcon={customIcon} />
                </MapContainer>
            )}
        </>
    )
}