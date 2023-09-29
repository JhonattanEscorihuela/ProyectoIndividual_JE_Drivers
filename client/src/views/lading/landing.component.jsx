import React, { useState } from "react";
import "./landing.styles.css";
import { validacion } from "../../views/create/validacion";

export default function Landing({ login }) {
    let [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    let [errors, setErrors] = useState({});

    let handleChange = (evento) => {
        let property = evento.target.name;
        let value = evento.target.value;
        setUserData({ ...userData, [property]: value });
        setErrors(validacion({ ...userData, [property]: value }));
    };

    let handleSubmit = (evento) => {
        evento.preventDefault();
        login(userData);
    };

    return (
        <div className="containerTotal">
            <div className="containerTotalLanding">
                <form onSubmit={handleSubmit}>
                    <div className="containerLanding">
                        <img
                            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJsZTE5bzc0aGZ4dHI4dmVqanA5cWc2YmxkYzdwaDhmN2xlcDVqciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iJDLBX5GY8niCpZYkR/giphy.gif"
                            alt="Bienvenida"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                    <label htmlFor="email">Email: </label>
                    <input
                        className={
                            errors.email ? "warningLanding" : "succesLandig"
                        }
                        onChange={handleChange}
                        value={userData.email}
                        type="text"
                        name="email"
                        placeholder="Escribe tu correo..."
                    />
                    {errors.email && (
                        <p className="dangerLanding">{errors.email}</p>
                    )}
                    <label htmlFor="password">  Password: </label>
                    <input
                        className={
                            errors.password ? "warningLanding" : "succesLandig"
                        }
                        onChange={handleChange}
                        value={userData.password}
                        type="password" 
                        name="password"
                        placeholder="Escribe tu contraseña..."
                    />
                    {errors.password && (
                        <p className="dangerLanding">{errors.password}</p>
                    )}
                    <button className="botonLanding" type="submit">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
