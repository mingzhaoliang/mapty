import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkoutFormItem from "./WorkoutFormItem";
import { mapActions } from "../store/map-slice";
import { dataActions } from "../store/data-slice";
import { useRef } from "react";
import Modal from "./UI/Modal";

export default function WorkoutForm({ isUpdate, workoutItem }) {
    const formRef = useRef();
    const workouts = useSelector(state => state.data.workouts);
    const position = useSelector(state => state.map.position);
    const isAdding = useSelector(state => state.map.isAdding);
    const invalidInput = useSelector(state => state.data.invalidInput);
    const dispatch = useDispatch();

    const [workoutType, setWorkoutType] = useState("running");
    const [error, setError] = useState(null);

    const { id, type, distance, duration, cadence, elev_gain } = workoutItem || {};


    const fetchAddress = async (lat, lng) => {
        try {
            const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${process.env.REACT_APP_API_KEY}`);
            const place = await response.json();
            console.log(response, place)

            if (place.error) throw new Error(place.error);

            return place.address;
        } catch (e) {
            setError({ title: "Failed to fetch location", message: "Please choose a valid location." });
            console.log(e);
        }
    }

    const selectHandler = (e) => {
        setWorkoutType(e.target.value);
    }

    const cancelHandler = () => {
        if (isUpdate) {
            dispatch(dataActions.setIsEditing(null));
        } else {
            dispatch(mapActions.setIsAdding(false));
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);

        const pace = data.type === "running" ? data.duration / data.distance : data.distance / (data.duration / 60);

        if (data.distance <= 0 || data.duration <= 0 || data.cadence <= 0 || data.elev_gain <= 0) {
            setError({ title: "Invalid Input", message: "Please enter positive numbers." });
            return;
        }

        let updatedWorkouts;

        if (isUpdate) {
            const updatedWorkout = { ...workoutItem, ...data, pace };

            updatedWorkouts = [
                ...(workouts.filter(w => w.id !== id)),
                updatedWorkout
            ];

            dispatch(dataActions.setIsEditing(null));

        } else {
            const timestamp = Date.now();
            data.id = timestamp;
            data.timestamp = timestamp;
            data.position = position;
            data.pace = pace;

            const address = await fetchAddress(...position);
            if (!address) return;

            data.city = address.city || "";
            data.country = address.country;

            updatedWorkouts = [...workouts, data];
            dispatch(mapActions.setIsAdding(false));
            dispatch(mapActions.setPosition(null));
        }

        localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
        dispatch(dataActions.updateWorkouts(updatedWorkouts));

        formRef.current.reset();
    }

    const confirmError = () => {
        setError(null);
    };

    return (
        <>
            <form
                ref={formRef}
                className={`bg-[#42484d] rounded p-4 flex flex-col gap-y-1 transition-all duration-400 ${!isUpdate ? "mb-4" : ""}`}
                style={(isAdding || isUpdate) ? {} : {
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
                    <WorkoutFormItem label="Type" isSelect onSelect={selectHandler} value={type} />
                    <WorkoutFormItem label="Distance" placeholder="km" value={distance} />
                    <WorkoutFormItem label="Duration" placeholder="min" value={duration} />
                    {workoutType === "running" && <WorkoutFormItem label="Cadence" placeholder="step/min" value={cadence} />}
                    {workoutType !== "running" && <WorkoutFormItem label="Elev Gain" placeholder="meters" value={elev_gain} />}
                </div>
                <div className="mt-2 grid grid-cols-2 items-center">
                    {invalidInput && <p className="text-sm text-rose-400 text-wrap">Please enter positive numbers.</p>}
                    <div className="w-full flex gap-x-4 col-start-2">
                        <button
                            type="button"
                            className="outline-none text-sm text-white rounded w-full py-1 border border-slate-200 transition-all hover:bg-slate-200 hover:border-slate-200 hover:text-slate-800"
                            onClick={cancelHandler}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="outline-none text-sm bg-green-500 border border-green-500 text-white rounded w-full py-1 transition-all hover:bg-green-600 hover:border-green-600">
                            {isUpdate ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </form>
            <Modal open={error !== null} onClose={confirmError}>
                <div className="flex flex-col items-center gap-8 pt-2 px-6">
                    <h2 className="text-xl text-slate-700 font-bold">{error?.title}</h2>
                    <p className="text-slate-700">{error?.message}</p>
                    <button onClick={confirmError} className="mt-2 outline-none bg-rose-400 border text-white px-4 py-2 rounded text-sm font-medium transition-all hover:bg-rose-500">
                        OK
                    </button>
                </div>
            </Modal>

        </>
    )
}