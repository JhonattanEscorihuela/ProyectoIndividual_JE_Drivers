import { NavLink } from 'react-router-dom'
import './navbar.styles.css'



function Navbar({ handleChange, handleSubmit }) {


  return (
    <div>


      <div className='navDrivers'>
        
          <img
            src="https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png"
            alt="Rick and Morty logo"
            width="5%"
          />
        
        <NavLink to={'/create'} >
          <span className='search-driver-button'>Form Page</span>
        </NavLink>
        <div  >
          <form onChange={handleChange} >
            <input
              placeholder='Busqueda'
              type='search' />
            <button
              className="search-driver-button"
              type='submit'
              onClick={handleSubmit}>
              Buscar
            </button>
          </form>
        </div>

        <NavLink to={'/'} >
          <span className='search-driver-button'>Logout</span>
        </NavLink>

      </div>

    </div>
  )
}

export default Navbar