import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver, getTeams } from '../../redux/actions';
import './create.styles.css';


function Create({ allTeams }) {
  let dispatch = useDispatch();



  useEffect(() => {
    // Al montar el componente, despacha la acción para obtener equipos
    dispatch(getTeams());
  }, [dispatch]);



  let [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nacionalidad: '',
    imagen: '',
    fecha_de_nacimiento: '',
    descripcion: '',
    teams: [], // Array para almacenar las escuderías seleccionadas
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

    // Llama a la acción para crear un nuevo driver con los datos del formulario
    dispatch(createDriver(formData));

    // Limpia el formulario después de la creación si es necesario
    setFormData({
      nombre: '',
      apellido: '',
      nacionalidad: '',
      imagen: '',
      fecha_de_nacimiento: '',
      descripcion: '',
      teams: [],
    });
  };





  return (
    <div className='create-driver-container' >
      <h2 className="create-driver-title" >Crear Nuevo Driver</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input className="create-driver-input" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input className="create-driver-input" type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="nacionalidad">Nacionalidad:</label>
          <input className="create-driver-input" type="text" id="nacionalidad" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input className="create-driver-input" type="text" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento:</label>
          <input className="create-driver-input" type="date" id="fecha_de_nacimiento" name="fecha_de_nacimiento" value={formData.fecha_de_nacimiento} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea className="create-driver-input" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
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
  );
}

export default Create;
