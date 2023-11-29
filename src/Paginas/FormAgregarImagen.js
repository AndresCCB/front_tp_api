import React, {useState} from "react";
import { useAuth } from '../authContext';

function FormularioRegistroImagen(){

    const [formData, setFormData] = useState({
        codigo: '', // codigo del edificio
        imagenes: '',
        tipo_img: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
                ...formData, [ name ]: value,
            }
        );
    }

    const handleButton = async (e) => {
        e.preventDefault();
        try {
            
            // Agregar la imagen al reclamo utilizando el idReclamo
            const addImgReclamoResponse = await fetch(`http://localhost:8080/reclamos/agregarImagenaReclamo/${formData.codigo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: formData.imagenes,
                    tipo: formData.tipo_img,
                })
            });
    
            if (!addImgReclamoResponse.ok) {
                throw new Error('Error al agregar la imagen al reclamo');
            }
    
            const imgReclamoData = await addImgReclamoResponse.json();
            console.log('Imagen agregada a un reclamo:', imgReclamoData);
    
            alert('Reclamo registrado con éxito');
        } catch (error) {
            alert('Hubo un problema con la operación fetch: ' + error.message);
        }
    };


    return(
        <div>
        <h1> Agregar una Imagen </h1>
        <form onSubmit={handleButton}>
            <div>
                <label>Codigo del reclamo: </label>
                <input type='text' 
                       id='codigo'
                       name='codigo'
                       value={formData.codigo} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>URL Imagen: </label>
                <input type='text' 
                       id='imagenes'
                       name='imagenes'
                       value={formData.imagenes} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Tipo Imagen: </label>
                <input type='text' 
                       id='tipo_img'
                       name='tipo_img'
                       value={formData.tipo_img} 
                       onChange={handleInputChange}/>
            </div>
            <button type='submit'>Registrar Imagen</button>
        </form>
    </div>
    )
}

export default FormularioRegistroImagen;