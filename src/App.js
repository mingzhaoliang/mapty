import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import MyLocation from './components/MyLocation';
import Loading from './components/Loading';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataActions } from './store/data-slice';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem('workouts') || "[]";
    dispatch(dataActions.updateWorkouts(JSON.parse(data)));
  }, [])

  return (
    <div className='flex'>
      <Sidebar />
      <Map />
      <MyLocation />
      <Loading />
    </div>
  );
}

export default App;
