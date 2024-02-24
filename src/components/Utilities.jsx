import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import { useSelector } from "react-redux";
import Modal from "./UI/Modal";

export default function Utilities() {
    const sortRef = useRef();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const lastSortValue = useSelector(state => state.data.lastSortValue);
    const dispatch = useDispatch();


    const sortHandler = () => {
        const sortValue = sortRef.current.value;

        console.log(sortValue, lastSortValue);

        if (sortValue === lastSortValue) {
            dispatch(dataActions.toggleSort());
        } else {
            dispatch(dataActions.resetSort());
        }

        dispatch(dataActions.sortWorkouts(sortValue));
        dispatch(dataActions.setLastSortValue(sortValue));

    };

    const deleteAllHandler = () => {
        setConfirmDelete(true);
    };

    const cancelDeleteHandler = () => {
        setConfirmDelete(false);
    };

    const confirmedDeleteHandler = () => {
        dispatch(dataActions.updateWorkouts([]));
        localStorage.setItem("workouts", JSON.stringify([]));

        setConfirmDelete(false);
    };

    return (
        <>
            <div className="mb-8 flex justify-between">
                <div className="flex items-center gap-2">
                    <img src="/icons/sort.png" alt="Delete All" draggable="false" className="w-5 h-5 cursor-pointer" onClick={sortHandler} />
                    <select ref={sortRef} name="sort" id="sort" className="outline-none bg-transparent rounded p-0.5 text-sm text-slate-300">
                        <option value="timestamp">Date</option>
                        <option value="distance">Distance</option>
                        <option value="duration">Duration</option>
                        <option value="pace">Pace</option>
                    </select>
                </div>
                <img src="/icons/delete-all.png" alt="Delete All" draggable="false" className="w-5 h-5 cursor-pointer" onClick={deleteAllHandler} />
            </div>
            <Modal open={true && confirmDelete} onClose={cancelDeleteHandler}>
                <div className="flex flex-col items-center gap-10">
                    <h2 className="text-lg text-slate-700">Are you sure you want to delete all workouts?</h2>
                    <div className="flex gap-4">
                        <button className="outline-none bg-emerald-400 border border-emerald-400 text-white px-4 py-2 rounded text-sm font-medium transition-all hover:bg-emerald-500 hover:border-emerald-500" onClick={cancelDeleteHandler}>Cancel</button>
                        <button className="outline-none bg-transparent border border-slate-400 text-slate-700 px-4 py-2 rounded text-sm font-medium transition-all hover:border-slate-700 hover:bg-slate-700 hover:text-slate-100" onClick={confirmedDeleteHandler}>Confirm</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}