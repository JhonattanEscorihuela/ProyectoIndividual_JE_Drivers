import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver, getTeams } from '../../redux/actions';
import './create.styles.css';
import { validacion } from './validacion';
import { NavLink } from 'react-router-dom';

function Create({ allTeams }) {
  let dispatch = useDispatch();
  let [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  let [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nacionalidad: '',
    imagen: '',
    fecha_de_nacimiento: '',
    descripcion: '',
    teams: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEscuderiasChange = (e) => {
    const selectedEscuderias = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      teams: selectedEscuderias,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar validaciones
    const errors = validacion(formData);
    setValidationErrors(errors);

    console.log(errors);

    // Verificar si hay errores de validación
    const hasErrors = Object.keys(errors).length > 0;

    if (!hasErrors) {
      // Si no hay errores, crear el conductor
      dispatch(createDriver(formData));
      setFormData({
        nombre: '',
        apellido: '',
        nacionalidad: '',
        imagen: '',
        fecha_de_nacimiento: '',
        descripcion: '',
        teams: [],
      });
    } else {
      // Si hay errores, no crear el conductor y mostrar mensajes de error
      setIsFormValid(false);
    }
  };

  return (
    <div>
      <div className='create-driver-container'>
        <div>
          <NavLink to={'/drivers'}>
            <span className='search-driver-button'>Drivers</span>
          </NavLink>
        </div>

        <h2 className="create-driver-title">Crear Nuevo Driver</h2>
        {!isFormValid && (
          <div className="error-message">
            Por favor, corrige los errores en el formulario.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input className="create-driver-input" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            {validationErrors.nombre && (
              <div className="error-message">{validationErrors.nombre}</div>
            )}
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input className="create-driver-input" type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
            {validationErrors.apellido && (
              <div className="error-message">{validationErrors.apellido}</div>
            )}
          </div>
          <div>
            <label htmlFor="nacionalidad">Nacionalidad:</label>
            <input className="create-driver-input" type="text" id="nacionalidad" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />
            {validationErrors.nacionalidad && (
              <div className="error-message">{validationErrors.nacionalidad}</div>
            )}
          </div>
          <div>
            <label htmlFor="imagen">Imagen:</label>
            <input className="create-driver-input" type="text" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
            {validationErrors.imagen && (
              <div className="error-message">{validationErrors.imagen}</div>
            )}
          </div>
          <div>
            <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento:</label>
            <input className="create-driver-input" type="date" id="fecha_de_nacimiento" name="fecha_de_nacimiento" value={formData.fecha_de_nacimiento} onChange={handleChange} required />
            {validationErrors.fecha_de_nacimiento && (
              <div className="error-message">{validationErrors.fecha_de_nacimiento}</div>
            )}
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <textarea className="create-driver-input" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            {validationErrors.descripcion && (
              <div className="error-message">{validationErrors.descripcion}</div>
            )}
          </div>
          <div>
            <label htmlFor="escuderias">Escuderías:</label>
            <select className="create-driver-select" multiple id="teams" name="teams" value={formData.teams} onChange={handleEscuderiasChange}>
              {allTeams?.map((team, index) => (
                <option key={index} value={team.value}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="create-driver-button" type="submit">Crear Driver</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
