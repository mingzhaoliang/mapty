import { useMap, useMapEvent } from 'react-leaflet';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from '../store/map-slice';

export default function Relocate() {
    const map = useMap();
    const dispatch = useDispatch();
    const relocate = useSelector(state => state.map.relocate);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            map.flyTo([latitude, longitude], map.getZoom());
            dispatch(mapActions.setRelocate(false));
        });

    }, [relocate])

    return null;
}