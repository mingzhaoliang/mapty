import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkoutFormItem from "./WorkoutFormItem";
import { mapActions } from "../store/map-slice";

export default function WorkoutForm() {
    const isClicked = useSelector(state => state.map.isClicked);
    const dispatch = useDispatch();

    const [workoutType, setWorkoutType] = useState("running");

    const selectHandler = (e) => {
        setWorkoutType(e.target.value);
    }

    const cancelHandler = () => {
        dispatch(mapActions.setClicked(false));
    }

    useEffect(() => {
        document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                dispatch(mapActions.setClicked(false));
            }
        })
    }, [])

    return (
        <form className="bg-[#42484d] rounded p-4 mb-7 h-30 flex flex-col gap-y-1 transition-all" style={{ opacity: isClicked ? 1 : 0 }}>
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                <WorkoutFormItem label="Type" isSelect onSelect={selectHandler} />
                <WorkoutFormItem label="Distance" placeholder="km" />
                <WorkoutFormItem label="Duration" placeholder="min" />
                {workoutType === "running" && <WorkoutFormItem label="Cadence" placeholder="step/min" />}
                {workoutType !== "running" && <WorkoutFormItem label="Elev Gain" placeholder="meters" />}
                {/* <button class="form__btn">OK</button> */}
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
                    <button type="submit" className="text-sm bg-green-500 border border-green-500 text-white rounded w-full py-1 transition-all hover:bg-green-600 hover:border-green-600">OK</button>
                </div>
            </div>
        </form>
    )
}