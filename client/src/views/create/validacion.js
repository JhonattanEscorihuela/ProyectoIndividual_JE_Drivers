const expresionNombreApellido = /^(?=.{1,15}$).+/;
const expresionRegular = /^(?=.{1,50}$).+/;
const expresionNacionalidad = /^(?=.{1,35}$).+/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)[0-9a-zA-Z]{6,8}$/;

export function validacion(data) {

    const errors = {};


    if (!/^[a-zA-Z ]+$/.test(data.nombre)) {
        errors.nombre = "El nombre solo debe contener letras y espacios";
    } if (!/^[a-zA-Z ]+$/.test(data.apellido)) {
        errors.apellido = "El apellido solo debe contener letras y espacios";
    } if (!expresionRegular.test(data.descripcion)) errors.descripcion = "La longitud debe ser de menos de 50 caracteres"
    if (data.descripcion?.length < 20) {
        errors.descripcion = "La descripción debe tener al menos 20 caracteres";
    }
    if (!expresionNacionalidad.test(data.nacionalidad)) errors.nacionalidad = "La longitud debe ser de menos de 35 caracteres"


    // if (!regexEmail.test(data.email)) {
    //     errors.email = "Debe ser un email";
    // } else {
    //     errors.email = '';
    // }

    // if (!expresionRegular.test(data.email)) {
    //     errors.email = "La longitud debe ser de menos de 35 caracteres";
    // } else {
    //     errors = {};
    // }
    // if (!regexPassword.test(data.password)) {
    //     errors.password = '';
    // } else {
    //     errors = {};
    // }

    return errors;
}