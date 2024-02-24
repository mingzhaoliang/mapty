import { MapContainer, TileLayer } from 'react-leaflet';
import { useState, useEffect } from 'react';
import LocationMarker from './LocationMarker';
import Relocate from './Relocate';
import { useSelector } from 'react-redux';
import HistoryMarker from './HistoryMarker';
import LocateWorkout from './LocateWorkout';


export default function Map() {
    const [initialPosition, setInitialPosition] = useState(null);
    const workouts = useSelector(state => state.data.workouts);

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
                    <LocateWorkout />
                    <LocationMarker />
                    {workouts && workouts.map(({ type, timestamp, position }) => <HistoryMarker key={timestamp} type={type} timestamp={timestamp} position={position} />)}
                </MapContainer>
            )}
        </>
    )
}