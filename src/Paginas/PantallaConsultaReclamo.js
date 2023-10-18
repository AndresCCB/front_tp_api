import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function PantallaConsultaReclamo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        codigo: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
                ...formData, [ name ]: value,
            }
        );
    }

    const handleBuscar = (e) => {
        e.preventDefault();
        alert(formData.codigo);
        //navigate('/PantallaConsultaReclamo');
    }

    return(
        <div>
            <h1>Buscar Reclamo</h1>
            <form onSubmit={handleBuscar}>
                <div>
                    <label>Ingrese el codigo del reclamo: </label>
                    <input type='text'
                        id='codigo' 
                        name='codigo'
                        value={formData.codigo}
                        onChange={handleInputChange}/>
                </div>
                <button type='submit'>Buscar Reclamo</button>
            </form>
        </div>
    )
}

export default PantallaConsultaReclamo;