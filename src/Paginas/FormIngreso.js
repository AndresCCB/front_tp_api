//almacenar algo  clase, funcion hacer renderizado parciales
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function FormularioIngreso() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
                ...formData, [ name ]: value,
            }
        );
    }

    const handleIngreso = (e) => {
        e.preventDefault();
        alert(formData.usuario);
        //navigate('/FormIngresoUsuario');
    }

    const handleRegistrarse = (e) => {
        e.preventDefault();
        navigate('/FormRegistroUsuario');
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleIngreso}>
                <div>
                    <label>Usuario o Email: </label>
                    <input type='text'
                        id='usuario' 
                        name='usuario'
                        value={formData.usuario}
                        onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input type='password' 
                        id='password'
                        name='password'
                        value={formData.password} 
                        onChange={handleInputChange}/>
                </div>
                <button type='submit'>Ingresar</button>
            </form>
            <button onClick={handleRegistrarse}>Registrarse</button>
        </div>
    )
}

export default FormularioIngreso;