import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getDrivers } from '../../redux/actions'



import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";

import './home.styles.css';


function Home() {

  let dispatch = useDispatch();
  let allDrivers = useSelector((state) => state.allDrivers);
  let [searchString, setSearchString] = useState("");
  

  //* Filtro con el BackEnd

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString))
  }

  useEffect(() => {
    dispatch(getDrivers())
  }, [dispatch])

  // return (() => {
  //   clearDetail()
  // })

  return (
    <div className="home" >
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allDrivers={allDrivers} />
    </div>
  )
}

export default Home