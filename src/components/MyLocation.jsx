import { useDispatch } from 'react-redux';
import { mapActions } from '../store/map-slice';

export default function MyLocation() {
    const dispatch = useDispatch();

    const getLocationHandler = () => {
        dispatch(mapActions.setRelocate(true));
    };

    return (
        <div className="absolute top-4 right-4 z-[1000] bg-white p-1 rounded shadow-md cursor-pointer" onClick={getLocationHandler}>
            <img src="/icons/my-location.png" alt="My location" draggable="false" />
        </div>
    )
}