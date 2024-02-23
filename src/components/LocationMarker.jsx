import { useSelector, useDispatch } from 'react-redux';
import { useMapEvent, Marker } from 'react-leaflet';
import { mapActions } from '../store/map-slice';

export default function LocationMarker({ customIcon }) {
    const position = useSelector(state => state.map.position);
    const dispatch = useDispatch();

    const map = useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        map.setView([lat, lng], map.getZoom());

        dispatch(mapActions.setPosition([lat, lng]));
        dispatch(mapActions.setClicked(true));
    });

    return (
        position ? <Marker position={position} icon={customIcon} /> : null
    );
}