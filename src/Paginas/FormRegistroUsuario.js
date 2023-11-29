import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function FormularioRegistroUsuario(){

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        documento: '',
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

    const handleButton = (e) => {
        e.preventDefault();
        alert(formData.usuario);
        try{
            fetch(`http://localhost:8080/personas/registrarUsuario?documento=${formData.documento}&mail=${formData.usuario}&password=${formData.password}`, {
                method: 'PUT'
            }).then(response => {
                if(response.ok){
                    alert('Usuario Registrado');
                    navigate('/PantallaIngreso');
                }else{
                    alert('Error al registrar usuario');
                }
            });
        }
        catch(error){
            alert(error);
        }
    }

    return(
        <div>
        <h1>Registrarse</h1>
        <form onSubmit={handleButton}>
            <div>
                <label>Documento: </label>
                <input type='text'
                       id='documento' 
                       name='documento'
                       value={formData.documento}
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Usuario (Email): </label>
                <input type='text' 
                       id='usuario'
                       name='usuario'
                       value={formData.usuario} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Password: </label>
                <input type='password' 
                       id='password'
                       name='password'
                       value={formData.password} 
                       onChange={handleInputChange}/>
            </div>
            <button type='submit'>Registrar Usuario</button>
        </form>
    </div>
    )
}

export default FormularioRegistroUsuario;