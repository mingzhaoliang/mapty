import { useSelector } from 'react-redux';
import Modal from "./UI/Modal";
import Spinner from "./UI/Spinner";

export default function Loading() {
    const isRelocating = useSelector(state => state.map.relocate);

    return (
        <Modal open={isRelocating} classes="max-w-xs">
            <div className='flex flex-col justify-center items-center gap-8 pointer-events-none'>
                <Spinner />
                <p className='tracking-wide text-center'>Locating to current position.<br />Please wait...</p>
            </div>
        </Modal>
    )
}