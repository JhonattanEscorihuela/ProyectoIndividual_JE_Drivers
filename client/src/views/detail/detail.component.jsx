import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getById } from '../../redux/actions';
import { NavLink, useParams } from 'react-router-dom';
import './detail.styles.css';
import React, { useState } from 'react';


function Detail() {
  let { id } = useParams();
  let [expanded, setExpanded] = useState(false); // Estado para controlar la expansión de la descripción
  let driver = useSelector((state) => state.driverById);
  let dispatch = useDispatch();

  if (isNaN(id)) {
    driver = [driver];
  }

  useEffect(() => {
    dispatch(getById(id));
  }, [id, dispatch]);

  // Función para manejar el clic en el botón "Saber más"
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  return (
    <div className="detail-container">
      <NavLink to={'/drivers'} >
          <span>Drivers</span>
        </NavLink>
      {driver?.map((driv) => (
        <div key={driv.id || parseInt(driv.driver_id)} className="detail-content">
          <div className="detail-info">
            <h2>Id: {driv.id || driv.driver_id}</h2>
            <h2>Nombre: {driv.nombre}</h2>
            <h2>Apellido: {driv.apellido}</h2>
            <h2>Nacionalidad: {driv.nacionalidad}</h2>
            <h2>Fecha de Nacimiento: {driv.fecha_de_nacimiento}</h2>
            <h2>Escuderías: {driv.teams}</h2>
            {/* Controla la visibilidad de la descripción en función del estado "expanded" */}
            <p>{expanded ? driv.descripcion : driv.descripcion?.slice(0, 200) + '...'}</p>
            {/* Muestra el botón "Saber más" si la descripción está recortada */}
            {driv.descripcion?.length > 200 && (
              <button className="detail-more-button" onClick={handleExpandClick}>
                {expanded ? 'Leer menos' : 'Saber más'}
              </button>
            )}
          </div>

          <div className="detail-image">
            <img src={driv.imagen} alt="Driver" width={500} height={500} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Detail;
