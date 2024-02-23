import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkoutFormItem from "./WorkoutFormItem";
import { mapActions } from "../store/map-slice";
import { dataActions } from "../store/data-slice";
import { useRef } from "react";

export default function WorkoutForm() {
    const formRef = useRef();
    const workouts = useSelector(state => state.data.workouts);
    const position = useSelector(state => state.map.position);
    const isClicked = useSelector(state => state.map.isClicked);
    const dispatch = useDispatch();

    const [workoutType, setWorkoutType] = useState("running");

    const selectHandler = (e) => {
        setWorkoutType(e.target.value);
    }

    const cancelHandler = () => {
        dispatch(mapActions.setClicked(false));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);

        const timestamp = Date.now();
        const pace = data.type === "running" ? data.duration / data.distance : data.distance / (data.duration / 60);

        data.id = timestamp;
        data.timestamp = timestamp;
        data.position = position;
        data.pace = pace;

        const updatedWorkouts = [...workouts, data];
        localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        dispatch(dataActions.updateWorkout(updatedWorkouts));
        dispatch(mapActions.setClicked(false));
        dispatch(mapActions.setPosition(null));

        formRef.current.reset();
    }

    useEffect(() => {
        document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                dispatch(mapActions.setClicked(false));
            }
        })
    }, [])

    return (
        <form
            ref={formRef}
            className="bg-[#42484d] rounded p-4 mb-4 flex flex-col gap-y-1 transition-all duration-400"
            style={isClicked ? {} : {
                transform: "translateY(-4rem)",
                opacity: 0,
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0,
                zIndex: -1,
            }}
            onSubmit={submitHandler}
        >
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                <WorkoutFormItem label="Type" isSelect onSelect={selectHandler} />
                <WorkoutFormItem label="Distance" placeholder="km" />
                <WorkoutFormItem label="Duration" placeholder="min" />
                {workoutType === "running" && <WorkoutFormItem label="Cadence" placeholder="step/min" />}
                {workoutType !== "running" && <WorkoutFormItem label="Elev Gain" placeholder="meters" />}
            </div>
            <div className="mt-2 flex justify-end">
                <div className="w-1/2 flex gap-x-4">
                    <button
                        type="button"
                        className="text-sm text-white rounded w-full py-1 border border-slate-200 transition-all hover:bg-slate-200 hover:border-slate-200 hover:text-slate-800"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="text-sm bg-green-500 border border-green-500 text-white rounded w-full py-1 transition-all hover:bg-green-600 hover:border-green-600">Add</button>
                </div>
            </div>
        </form>
    )
}