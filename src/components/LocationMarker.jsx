import { useSelector, useDispatch } from 'react-redux';
import { useMapEvent, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { mapActions } from '../store/map-slice';

const customIcon = new Icon({
    iconUrl: '/icons/marker.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
});

export default function LocationMarker() {
    const position = useSelector(state => state.map.position);
    const isClicked = useSelector(state => state.map.isClicked);
    const dispatch = useDispatch();

    const map = useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        map.setView([lat, lng], map.getZoom());

        dispatch(mapActions.setPosition([lat, lng]));
        dispatch(mapActions.setClicked(true));
    });

    return (
        position && isClicked ? <Marker position={position} icon={customIcon} /> : null
    );
}