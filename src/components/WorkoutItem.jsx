import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import WorkoutForm from "./WorkoutForm";
import { useSelector } from "react-redux";
import { mapActions } from "../store/map-slice";

const Stats = ({ icon, value, unit }) => {
    return (
        <div className="flex items-baseline">
            <span className="mr-1 h-1">{icon}</span>
            <span className="mr-1 text-sm">{Math.round((+ value + Number.EPSILON) * 100) / 100}</span>
            <span className="uppercase text-[0.6rem] xl:text-xs text-slate-300 font-semibold">{unit}</span>
        </div>
    )
}

export default function WorkoutItem({ item }) {
    const { id, type, distance, duration, pace, cadence, elev_gain, timestamp, position, city, country } = item;
    const date = new Date(timestamp).toLocaleTimeString("en-AU", { month: "long", day: "numeric", hour: 'numeric', minute: '2-digit' });

    const dispatch = useDispatch();
    const isEditing = useSelector(state => state.data.isEditing);
    const selectedWorkoutPosition = useSelector(state => state.map.selectedWorkoutPosition);
    // const workouts = useSelector(state => state.data.workouts);

    const [isHovered, setIsHovered] = useState(false);

    const clickHandler = () => {
        dispatch(mapActions.setSelectedWorkoutPosition(position));
    };

    const mouseOverHandler = () => {
        setIsHovered(true);
    };

    const mouseOutHandler = () => {
        setIsHovered(false);
    };

    const deleteHandler = (id) => {
        dispatch(dataActions.deleteWorkout(id))
    }

    const editHandler = (id) => {
        dispatch(mapActions.setIsAdding(false));
        dispatch(dataActions.setIsEditing(id));
        setIsHovered(false);
    }

    let content;

    if (isEditing === id) {
        content = (
            <li
                className={`relative bg-[#42484d] rounded cursor-pointer border-l-4 transition-all ${type === "running" ? "border-emerald-400" : "border-amber-400"}`}
            >
                <WorkoutForm isUpdate workoutItem={item} />
            </li>
        )
    } else {
        content = (
            <li
                className={`relative flex bg-[#42484d] rounded cursor-pointer border-l-4 transition-all ${type === "running" ? "border-emerald-400" : "border-amber-400"}`}
                style={isHovered ? { width: "100%", } : { width: "calc(100% + 2rem)", }}
                data-id="1234567890"
                onMouseOver={mouseOverHandler}
                onMouseOut={mouseOutHandler}
            >
                <div
                    className="p-4 grid grid-cols-2 xl:grid-cols-4-auto gap-x-4 gap-y-3 xl:gap-3 text-white overflow-auto w-full grow"
                    onClick={clickHandler}
                >
                    <h2 className="col-span-full font-semibold">{type === "running" ? "Running" : "Cycling"} on {date}</h2>
                    {country && (
                        <div className="col-span-full flex">
                            <img src="/icons/location.png" alt="Location" draggable="false" className="w-4 mr-1" />
                            <p className="text-xs">{`${city ? city + ", " : ""}${country}`}</p>
                        </div>
                    )}
                    <Stats icon={type === "running" ? "🏃‍♂️" : "🚴‍♀️"} value={distance} unit="km" />
                    <Stats icon="⏱" value={duration} unit="min" />
                    <Stats icon="⚡️" value={pace} unit={type === "running" ? "min/km" : "km/h"} />
                    <Stats icon={type === "running" ? "🦶🏼" : "⛰"} value={cadence || elev_gain} unit={type === "running" ? "spm" : "m"} />
                </div>
                <div
                    className="flex flex-col w-8 transition-all h-full"
                    style={
                        isHovered
                            ? {
                                transform: "translateX(0)",
                            }
                            : {
                                transform: "translateX(100%)",
                                opacity: 0,
                                pointerEvents: "none",
                            }
                    }
                >
                    <button
                        className="p-2 rounded-tr bg-rose-500 hover:bg-rose-600 transition-all h-1/2"
                        onClick={() => editHandler(id)}
                    >
                        <img src="/icons/edit.png" alt="Edit" draggable="false" className="w-4 m-auto" />
                    </button>
                    <button
                        className="p-2 rounded-br bg-slate-300 hover:bg-slate-400 transition-all h-1/2"
                        onClick={() => deleteHandler(id)}
                    >
                        <img src="/icons/bin.png" alt="Delete" draggable="false" className="w-4 m-auto" />
                    </button>
                </div>
            </li>
        )
    }

    return (
        <>
            {content}
        </>
    )
}