import { Link } from 'react-router-dom';
import './card.styles.css'

function Card({ id, referencia, nombre, apellido, imagen, nacionalidad, teams }) {

  

  return (
    <div className='card-container' >

      <h2>{nacionalidad}</h2>
      <Link to={`/drivers/${id}`}>
        <h1>{nombre} {apellido}</h1>
      </Link>
      <h2>{teams}</h2>

    </div>
  );
}

export default Card