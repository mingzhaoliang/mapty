import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import MyLocation from './components/MyLocation';
import Loading from './components/Loading';


function App() {

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
