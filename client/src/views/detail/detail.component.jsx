import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getById } from '../../redux/actions';
import { useParams } from 'react-router-dom';

import './detail.styles.css'


function Detail() {
  const { id } = useParams();

  let dispatch = useDispatch();
  let driver = useSelector((state) => state.allDrivers);
  driver = driver[0];
  


  useEffect(() => {
    dispatch(getById(id))
  }, [id, dispatch])


  return (
    <>
      <p>Estas en el Detail</p>
      <div>
        <h2>Detalles del Conductor</h2>
        <p>Nombre:{driver.nombre} </p>
        
      </div>
    </>
  )
}

export default Detail