import React, {useState} from "react";
import { useAuth } from '../authContext';

function FormularioRegistroReclamo(){

    const {currentUser} = useAuth();

    const [formData, setFormData] = useState({
        documento: currentUser.documento , // documento del usuario
        codigo: '', // codigo del edificio
        ubicacion: '', 
        descripcion: "",
        identificador: '', // identificador de la unidad a reclamar
        piso: '', // piso de la unidad a reclamar
        unidad: '', // unidad a reclamar
        estado: 'nuevo', // estado del reclamo
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
            // Agregar el reclamo
            const literal = `http://localhost:8080/reclamos/agregarReclamo?documento=${formData.documento}&codigo=${formData.codigo}&ubicacion=${formData.ubicacion}&descripcion=${formData.descripcion}&identificador=${formData.identificador}&piso=${formData.piso}&numeroUnidad=${formData.unidad}`;
            console.log(literal);
            const addReclamoResponse = await fetch(`http://localhost:8080/reclamos/agregarReclamo?documento=${formData.documento}&codigoEdificio=${formData.codigo}&ubicacion=${formData.ubicacion}&descripcion=${formData.descripcion}&identificador=${formData.identificador}&piso=${formData.piso}&numeroUnidad=${formData.unidad}`, {
                method: 'POST'
            });
            
            if (!addReclamoResponse.ok) {
                throw new Error('Error al registrar Reclamo');
            }
    
            const reclamoData = await addReclamoResponse.json();
            console.log('Reclamo registrado:', reclamoData);
    
            // Capturar el idReclamo
            const idReclamo = reclamoData.numero;
    
            // Agregar la imagen al reclamo utilizando el idReclamo
            const addImgReclamoResponse = await fetch(`http://localhost:8080/reclamos/agregarImagenaReclamo/${idReclamo}`, {
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
        <h1> Crear un Reclamo </h1>
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
                <label>Codigo del edificio: </label>
                <input type='text' 
                       id='codigo'
                       name='codigo'
                       value={formData.codigo} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Ubicación: </label>
                <input type='text' 
                       id='ubicacion'
                       name='ubicacion'
                       value={formData.ubicacion} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Descripción: </label>
                <input type='text' 
                       id='descripcion'
                       name='descripcion'
                       value={formData.descripcion} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Identificador: </label>
                <input type='text' 
                       id='identificador'
                       name='identificador'
                       value={formData.identificador} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Piso: </label>
                <input type='text' 
                       id='piso'
                       name='piso'
                       value={formData.piso} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Unidad: </label>
                <input type='text' 
                       id='unidad'
                       name='unidad'
                       value={formData.unidad} 
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
            <button type='submit'>Registrar reclamo</button>
        </form>
    </div>
    )
}

export default FormularioRegistroReclamo;