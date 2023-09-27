const expresionNombreApellido = /^(?=.{1,15}$).+/;
const expresionRegular = /^(?=.{1,50}$).+/;
const expresionNacionalidad = /^(?=.{1,35}$).+/;


export function validacion(data) {

    const errors = {}

    if (!expresionNombreApellido.test(data.nombre)) errors.nombre = "La longitud debe ser de menos de 15 caracteres";
    if (!expresionNombreApellido.test(data.apellido)) errors.apellido = "La longitud debe ser de menos de 15 caracteres"
    if (!expresionRegular.test(data.descripcion)) errors.descripcion = "La longitud debe ser de menos de 50 caracteres"
    if (!expresionNacionalidad.test(data.nacionalidad)) errors.nacionalidad = "La longitud debe ser de menos de 35 caracteres"


    return errors;
}