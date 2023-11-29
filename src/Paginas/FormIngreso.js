//almacenar algo  clase, funcion hacer renderizado parciales
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import EstiloPaginaIngreso from '../Estilos/EstiloPaginaIngreso.css';

function FormularioIngreso() {
    
    const {setCurrentUser} = useAuth();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
                ...formData, [ name ]: value,
            }
        );
    }

    const handleIngreso = async (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/personas/validacionIngreso?mail=${formData.mail}&password=${formData.password}`,{
          method: 'GET',
        })
        .then((response) => response.json()).then(async (isValid) => {
          if(isValid){
            fetch(`http://localhost:8080/personas/listarPersonas`,{
              method: 'GET',
            })
            .then((response) => response.json()).then(async (personas) => {
              const user = personas.find(persona => persona.mail === formData.mail);
              setCurrentUser(user); // Establece el usuario actual aquí
              fetch(`http://localhost:8080/personas/esAdmin?mail=${formData.mail}&password=${formData.password}`,{
                method: 'GET',
              })
              .then((response) => response.json()).then(async (isAdmin) => {
                if(isAdmin){
                  navigate('/PantallaInicioAdmin');
                }
                else{
                  navigate('/PantallaInicio');
                }
              })
              .catch((error) => {
                alert('Hubo un problema con la operación fetch: ' + error.message);
              });
            })
            .catch((error) => {
              alert('Hubo un problema con la operación fetch: ' + error.message);
            });
          }
          else{
            alert('Usuario o contraseña incorrecta');
          }
        })
        .catch((error) => {
          alert('Hubo un problema con la operación fetch: ' + error.message);
        });
    }
      
    /*
    const handleIngreso =  async (e) => {
        e.preventDefault();
        try{
            console.log("ingreso a handleIngreso");
            fetch(`http://localhost:8080/personas/validacionIngreso?mail=${formData.mail}&password=${formData.password}`,{
                method: 'GET',
            })
            .then((response) => response.json()).then(async (data) => {
                setCurrentUser(data);
                console.log(data);
                if(data){
                    console.log("ingreso valido");
                    fetch(`http://localhost:8080/personas/esAdmin?mail=${formData.mail}&password=${formData.password}`,{
                        method: 'GET',
                    })
                    .then((response) => response.json()).then(async (isAdmin) => {
                        if(isAdmin){
                            console.log("ingreso admin")
                            navigate('/PantallaInicioAdmin');
                        }
                        else{
                            console.log("ingreso normal")
                            navigate('/PantallaInicio');
                        }
                    })
                    .catch((error) => {
                        alert('Hubo un problema con la operación fetch: ' + error.message);
                    });
                }
                else{
                    console.log("ingreso invalido")
                    alert('Usuario o contraseña incorrecta');
                }
            })
            .catch((error) => {
                alert('Hubo un problema con la operación fetch: ' + error.message);
            });
        }
        catch(error){
            alert('Hubo un problema: ' + error.message);
        }
    }*/
    

    const handleRegistrarse = (e) => {
        e.preventDefault();
        navigate('/FormRegistroUsuario');
    }

    return(
        <div className="login">
            <h1 className="login-header">Login</h1>
            <form className="login-container" onSubmit={handleIngreso}>
                <div>
                    <label>mail o Email: </label>
                    <input type='text'
                        id='mail' 
                        name='mail'
                        value={formData.mail}
                        onChange={handleInputChange}
                        autoComplete="username"/>
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input type='password'
                        id='password'
                        name='password'
                        value={formData.password} 
                        onChange={handleInputChange}
                        autoComplete="current-password"/>

                </div>
                <button type='submit'>Ingresar</button>
                <button className= 'register' onClick={handleRegistrarse}>Registrarse</button>
            </form>
        </div>
    )
}

export default FormularioIngreso;