import { useSelector } from "react-redux";
import WorkoutForm from "./WorkoutForm";
import WorkoutItem from "./WorkoutItem";

export default function Sidebar() {
    const workouts = useSelector(state => state.data.workouts);

    return (
        <div className="h-screen flex flex-col w-4/12 max-w-[460px] min-w-80 bg-[#2d3439] pt-12 px-8 pb-16">
            <img src="/icons/logo.png" alt="Logo" draggable="false" className="h-[4rem] self-center mb-12" />
            <WorkoutForm />
            {workouts && workouts.length > 0 && (
                <ul className="flex flex-col gap-4 overflow-y-auto overflow-x-clip mb-12">
                    {workouts.map(workout => (
                        <WorkoutItem key={workout.id} {...workout} />
                    ))}
                </ul>
            )}
            <p className="mt-auto text-xs text-center text-slate-400">
                &copy; Copyright by
                <a
                    className="transition-all text-slate-500 hover:text-slate-300"
                    target="_blank"
                    href="https://twitter.com/jonasschmedtman"
                > Jonas Schmedtmann</a>. Use for learning or your portfolio. Don't use to teach. Don't claim
                as your own.
            </p>
        </div>
    )
}