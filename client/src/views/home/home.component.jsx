import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getDrivers, filterByTeam, filterByOrigin, sortDrivers, getTeams } from '../../redux/actions';

import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css';

function Home({ allTeams }) {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const [searchString, setSearchString] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(''); // Nuevo estado para el equipo seleccionado
  const [selectedOrigin, setSelectedOrigin] = useState(''); // Nuevo estado para el origen seleccionado
  const [sortOption, setSortOption] = useState(''); // Nuevo estado para la opción de ordenamiento

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);



  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }

  // Función para manejar cambios en el selector de equipo
  function handleTeamChange(e) {
    setSelectedTeam(e.target.value);
    dispatch(filterByTeam(e.target.value));
    console.log(filterByTeam(e.target.value));
  }

  // Función para manejar cambios en el selector de origen
  function handleOriginChange(e) {
    setSelectedOrigin(e.target.value);
    dispatch(filterByOrigin(e.target.value));
  }

  // Función para manejar cambios en el selector de ordenamiento
  function handleSortChange(e) {
    setSortOption(e.target.value);
    dispatch(sortDrivers(e.target.value));
  }


  return (
    <div className="home">
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

      {/* Agregar selectores para filtrar y ordenar */}
      <div className="filter-options">
        <label htmlFor="teamFilter">Filtrar por equipo:</label>
        <select id="teamFilter" onChange={handleTeamChange} value={selectedTeam}>
          <option value="">Todos los equipos</option>
          {allTeams?.map((team, index) => (
            <option key={index} value={team.value}>
              {team}
            </option>
          ))}
        </select>

        <label htmlFor="originFilter">Filtrar por origen:</label>
        <select id="originFilter" onChange={handleOriginChange} value={selectedOrigin}>
          <option value="">Todos los orígenes</option>
          <option value="API">API</option>
          <option value="DB">Base de datos</option>
        </select>

        <label htmlFor="sortOrder">Ordenar por:</label>
        <select id="sortOrder" onChange={handleSortChange} value={sortOption}>
          <option value="">Sin orden</option>
          <option value="alphabeticalAsc">Nombre A-Z</option>
          <option value="alphabeticalDesc">Nombre Z-A</option>
          <option value="birthYearAsc">Año de nacimiento ascendente</option>
          <option value="birthYearDesc">Año de nacimiento descendente</option>
        </select>
      </div>

      <Cards allDrivers={allDrivers} />
    </div>
  );
}

export default Home;
