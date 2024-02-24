import { useSelector } from "react-redux";
import WorkoutForm from "./WorkoutForm";
import WorkoutItem from "./WorkoutItem";
import Copyright from "./Copyright";
import Utilities from "./Utilities";

export default function Sidebar() {
    const workouts = useSelector(state => state.data.workouts);

    return (
        <div className="h-screen flex flex-col w-4/12 max-w-[460px] min-w-80 bg-[#2d3439] pt-12 px-8 pb-16">
            <img src="/icons/logo.png" alt="Logo" draggable="false" className="h-[4rem] self-center mb-12" />
            <WorkoutForm />
            {workouts && workouts.length > 0 && (
                <ul className="flex flex-col gap-4 overflow-y-auto overflow-x-clip mb-4">
                    {workouts.map(workout => (
                        <WorkoutItem key={workout.id} item={workout} />
                    ))}
                </ul>
            )}
            <Utilities />
            <Copyright />
        </div>
    )
}