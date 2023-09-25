import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Home from './views/home/home.component.jsx'
import Create from './views/create/create.component.jsx'
import Detail from './views/detail/detail.component.jsx'

import './App.css'

function App() {
  

  return (
    <>
      <Routes>
        <Route exact path="/drivers" element={<Home />} />
        <Route path="/drivers/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>

  )
}

export default App
