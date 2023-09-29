const expresionNombreApellido = /^(?=.{1,15}$).+/;
const expresionRegular = /^(?=.{1,50}$).+/;
const expresionNacionalidad = /^(?=.{1,35}$).+/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)[0-9a-zA-Z]{6,10}$/;

export function validacion(data) {

    const errors = {}

    if (!expresionNombreApellido.test(data.nombre)) errors.nombre = "La longitud debe ser de menos de 15 caracteres";
    if (!expresionNombreApellido.test(data.apellido)) errors.apellido = "La longitud debe ser de menos de 15 caracteres"
    if (!expresionRegular.test(data.descripcion)) errors.descripcion = "La longitud debe ser de menos de 50 caracteres"
    if (!expresionNacionalidad.test(data.nacionalidad)) errors.nacionalidad = "La longitud debe ser de menos de 35 caracteres"
    if (!regexEmail.test(data.email)) errors.email = "Debe ser un email";
    if (!expresionRegular.test(data.email)) errors.email = "La longitud debe ser de menos de 35 caracteres"
    if (!regexPassword.test(data.password)) errors.password = "La contraseña debe tener al menos un número y entre 6 a 10 caracteres";

    return errors;
}