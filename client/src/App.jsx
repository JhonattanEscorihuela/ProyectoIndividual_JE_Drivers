import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


import Home from './views/home/home.component.jsx'
import Create from './views/create/create.component.jsx'
import Detail from './views/detail/detail.component.jsx'
import Landing from './views/lading/landing.component.jsx';



import './App.css'



function App() {

  let allTeams = useSelector((state) => state.teams);

  let EMAIL = "jhonattan1410@gmail.com";
  let PASSWORD = 'pass1234';
  let [access, setAccess] = useState(false)

  let navigate = useNavigate()

  let login = ({ email, password }) => {
    if (email === EMAIL && password === PASSWORD) {
      setAccess(true)
      navigate('/create')
      navigate('/drivers')
    }
    else alert('Usuario o contraseña incorrecta')
  }

  useEffect(() => {
    !access && navigate('/');
  }, [access]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing login={login} />} />
        <Route exact path="/drivers" element={<Home allTeams={allTeams} />} />
        <Route path="/drivers/:id" element={<Detail />} />
        <Route path="/create" element={<Create allTeams={allTeams} />} />
      </Routes>
    </>

  )
}

export default App
