import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useRef, useEffect } from "react";

const defaultIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    popupAnchor: [0, -41]
});

export default function HistoryMarker({ type, timestamp, position }) {
    const marker = useRef();
    const date = new Date(timestamp).toLocaleString("en-US", { month: "long", day: "numeric" });

    useEffect(() => {
        marker.current.openPopup();
    }, [])

    return (
        <Marker ref={marker} position={position} icon={defaultIcon}>
            <Popup autoClose={false} closeOnClick={false} autoPan={false} className={`${type}-popup`}>
                <p className="font-medium">{type === "running" ? "🏃‍♂️ Running" : "🚴‍♀️ Cycling"} on {date}</p>
            </Popup>
        </Marker>
    )
}