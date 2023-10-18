import React, {useState} from "react";

function FormularioReclamo(){

    const [formData, setFormData] = useState({
        //id: '', // id del reclamo
        documento: '', // documento del usuario
        codigo: '', // codigo del edificio
        ubicacion: '', 
        descripcion: '',
        unidad: '', // unidad a reclamar
        //estado: '', // estado del reclamo
        imagenes: ''
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
        alert(formData.documento);
    }

    return(
        <div>
        <h1>Haga su reclamo</h1>
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
                <label>Unidad: </label>
                <input type='text' 
                       id='unidad'
                       name='unidad'
                       value={formData.unidad} 
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label>Imagenes: </label>
                <input type='text' 
                       id='imagenes'
                       name='imagenes'
                       value={formData.imagenes} 
                       onChange={handleInputChange}/>
            </div>
            <button type='submit'>Registrar reclamo</button>
        </form>
    </div>
    )
}

export default FormularioReclamo;