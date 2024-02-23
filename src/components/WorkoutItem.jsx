import { useState } from "react";

const Stats = ({ icon, value, unit }) => {
    return (
        <div className="flex items-baseline">
            <span className="mr-1 h-1">{icon}</span>
            <span className="mr-1 text-sm">{Math.round((+ value + Number.EPSILON) * 100) / 100}</span>
            <span className="uppercase text-[0.6rem] xl:text-xs text-slate-300 font-semibold">{unit}</span>
        </div>
    )
}

export default function WorkoutItem({ type, distance, duration, pace, cadence, elev_gain, timestamp, position }) {
    const date = new Date(timestamp).toLocaleString("en-US", { month: "long", day: "numeric" });
    const [isHovered, setIsHovered] = useState(false);

    const mouseOverHandler = () => {
        setIsHovered(true);
    };

    const mouseOutHandler = () => {
        setIsHovered(false);
    };

    return (
        <li
            className={`relative max-h-28 bg-[#42484d] rounded cursor-pointer border-l-4 transition-all ${type === "running" ? "border-emerald-400" : "border-amber-400"}`}
            data-id="1234567890"
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
        >
            <div className="p-4 grid grid-cols-2 lg:grid-cols-4-auto gap-2 text-white overflow-scroll">
                <h2 className="col-span-full font-semibold">{type === "running" ? "Running" : "Cycling"} on {date}</h2>
                <Stats icon={type === "running" ? "🏃‍♂️" : "🚴‍♀️"} value={distance} unit="km" />
                <Stats icon="⏱" value={duration} unit="min" />
                <Stats icon="⚡️" value={pace} unit={type === "running" ? "min/km" : "km/h"} />
                <Stats icon={type === "running" ? "🦶🏼" : "⛰"} value={cadence || elev_gain} unit={type === "running" ? "spm" : "m"} />
            </div>
            <div
                className="absolute top-0 right-0 flex flex-col max-w-8 transition-all h-full"
                style={
                    isHovered
                        ? { transform: "translateX(0)" }
                        : {
                            transform: "translateX(100%)",
                            opacity: 0,
                            pointerEvents: "none",
                        }
                }
            >
                <button className="p-2 rounded-tr bg-rose-500 hover:bg-rose-600 transition-all h-1/2">
                    <img src="/icons/edit.png" alt="Edit" draggable="false" className="w-4 m-auto" />
                </button>
                <button className="p-2 rounded-br bg-slate-300 hover:bg-slate-400 transition-all h-1/2">
                    <img src="/icons/bin.png" alt="Delete" draggable="false" className="w-4 m-auto" />
                </button>
            </div>
        </li>
    )
}