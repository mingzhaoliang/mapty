import { useRef } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import { useSelector } from "react-redux";

export default function Utilities() {
    const sortRef = useRef();
    const dispatch = useDispatch();

    const lastSortValue = useSelector(state => state.data.lastSortValue);

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

    return (
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
            <img src="/icons/delete-all.png" alt="Delete All" draggable="false" className="w-5 h-5 cursor-pointer" />
        </div>
    )
}