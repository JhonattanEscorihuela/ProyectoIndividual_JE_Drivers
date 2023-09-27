import { Link } from 'react-router-dom';
import './card.styles.css'

function Card({ id, referencia, nombre, apellido, imagen, nacionalidad, teams }) {



  return (

    <div className='container' >
      <div className='imgContainer'>
        <img src={imagen} alt={nombre} />


      </div>
      <div className='card-container' >
        <div >
          <Link to={`/drivers/${id}`}>
            <h3>{nombre} {apellido}</h3>
          </Link>

          <h5>{teams}</h5>

        </div>

      </div>
    </div>
  );
}

export default Card