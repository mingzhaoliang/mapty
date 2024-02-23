
const Stats = ({ icon, value, unit }) => {
    return (
        <div className="flex items-baseline">
            <span className="mr-1 h-1">{icon}</span>
            <span className="mr-1">{Math.round((+ value + Number.EPSILON) * 100) / 100}</span>
            <span className="uppercase text-xs text-slate-300 font-semibold">{unit}</span>
        </div>
    )
}

export default function WorkoutItem({ type, distance, duration, pace, cadence, elev_gain, timestamp, position }) {
    const date = new Date(timestamp).toLocaleString("en-US", { month: "long", day: "numeric" });

    return (
        <li className={`max-h-24 bg-[#42484d] rounded cursor-pointer flex gap-3 border-l-4 transition-all ${type === "running" ? "border-emerald-400" : "border-amber-400"}`} data-id="1234567890">
            <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg text-white font-semibold">{type === "running" ? "Running" : "Cycling"} on {date}</h2>
                <div className="flex justify-between text-white gap-2">
                    <Stats icon={type === "running" ? "🏃‍♂️" : "🚴‍♀️"} value={distance} unit="km" />
                    <Stats icon="⏱" value={duration} unit="min" />
                    <Stats icon="⚡️" value={pace} unit={type === "running" ? "min/km" : "km/h"} />
                    <Stats icon={type === "running" ? "🦶🏼" : "⛰"} value={cadence || elev_gain} unit={type === "running" ? "spm" : "m"} />
                </div>
            </div>
            {/* <div className="flex flex-col w-12">
                <button className="p-4 hover:bg-[#2d3439] transition-all">
                    <img src="/icons/edit.png" alt="Edit" draggable="false" className="" />
                </button>
                <button className="p-4 hover:bg-[#2d3439] transition-all">
                    <img src="/icons/bin.png" alt="Delete" draggable="false" />
                </button>
            </div> */}
        </li>
    )
}