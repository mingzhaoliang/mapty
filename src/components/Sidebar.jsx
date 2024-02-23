import WorkoutForm from "./WorkoutForm";

export default function Sidebar() {
    return (
        <div className="h-screen flex flex-col basis-[30rem] bg-[#2d3439] pt-12 px-8 pb-16">
            <img src="/icons/logo.png" alt="Logo" draggable="false" className="h-[4rem] self-center mb-12" />
            <WorkoutForm />
        </div>
    )
}