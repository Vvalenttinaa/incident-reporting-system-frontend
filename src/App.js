import Navbar from './components/Header/Navbar';
import Adding from './pages/Adding';
import Viewing from './pages/Viewing';
import Requesting from './pages/Requesting';
import Home from './pages/Home';
import {Route, Routes} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Analysis from './pages/Analysis';
import DangerDetector from './components/DangerDetector';
import MapRejected from './components/Maps/MapRejected';
import MapView from './components/Maps/MapView';


function App() {
  const [userRole, setUserRole] = useState('user');

  useEffect(()=> {
    console.log(userRole);
  }, []);

  return (
    <>
    <Navbar userRole={userRole}/>
    <div className='container'>
      <Routes>
        <Route path="/" element={<MapView/>} />
        <Route path="/viewing" element={<Viewing/>} />
        <Route path="/adding" element={<Adding/>} />
        <Route path="/requesting" element={<Requesting/>}/>
        <Route path="/login" element={<Login setUserRole={setUserRole}/>}/>
        <Route path="/analysing" element={<Analysis/>}/>
        <Route path="/danger" element={<DangerDetector/>}/>
      </Routes>
    </div>
    </>
  );
  

    

}

export default App;
