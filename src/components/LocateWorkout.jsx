import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";

export default function LocateWorkout() {
    const map = useMap();
    const selectedWorkoutPosition = useSelector(state => state.map.selectedWorkoutPosition);

    useEffect(() => {
        if (selectedWorkoutPosition) {
            map.flyTo(selectedWorkoutPosition, map.getZoom());
        }
    }, [selectedWorkoutPosition, map]);

    return null;
}