import React, {useState} from "react";

function FormularioRegistro(){

    const [formData, setFormData] = useState({
        documento: '',
        nombre: '',
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
    }

    return(
        <div>
        <h1>Login</h1>
        <form onSubmit={handleButton}>
            <div>
                <label>Documento: </label>
                <input type='text'
                       id='documento' 
                       name='documento'
                       value={formData.usuario}
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Nombre: </label>
                <input type='text' 
                       id='nombre'
                       name='nombre'
                       value={formData.nombre} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Email: </label>
                <input type='text' 
                       id='usuario'
                       name='usuario'
                       value={formData.password} 
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

export default FormularioRegistro;