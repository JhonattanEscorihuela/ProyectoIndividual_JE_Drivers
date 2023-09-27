import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './views/home/home.component.jsx'
import Create from './views/create/create.component.jsx'
import Detail from './views/detail/detail.component.jsx'

import './App.css'


function App() {

  let allTeams = useSelector((state) => state.teams);

  return (
    <>
      <Routes>
        <Route exact path="/drivers" element={<Home />} />
        <Route path="/drivers/:id" element={<Detail />} />
        <Route path="/create" element={<Create allTeams={allTeams} />} />
      </Routes>
    </>

  )
}

export default App
