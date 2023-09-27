import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { createDriver, getTeams } from '../../redux/actions';

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
    escuderias: [], // Array para almacenar las escuderías seleccionadas
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
      escuderias: selectedEscuderias,
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
      escuderias: [],
    });
  };

  

  

  return (
    <div>
      <h2>Crear Nuevo Driver</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="nacionalidad">Nacionalidad:</label>
          <input type="text" id="nacionalidad" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input type="text" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento:</label>
          <input type="date" id="fecha_de_nacimiento" name="fecha_de_nacimiento" value={formData.fecha_de_nacimiento} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="escuderias">Escuderías:</label>
          <select multiple id="escuderias" name="escuderias" value={formData.escuderias} onChange={handleEscuderiasChange}>
            {allTeams?.map((team, index) => ( 
              <option key={index} value={team.value}>
                {team}
              </option>
            ))}
          </select>

        </div>
        <div>
          <button type="submit">Crear Driver</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
