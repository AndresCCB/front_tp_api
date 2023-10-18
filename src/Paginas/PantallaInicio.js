import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function PantallaInicio() {
    const navigate = useNavigate();

    const handleHacerReclamo = (e) => {
        e.preventDefault();
        navigate('/FormReclamo');
    }

    const handleBuscarReclamo = (e) => {
        e.preventDefault();
        navigate('/PantallaConsultaReclamo');
    }

    return(
        <div>
            <h1>Bienvenido XXXXXXX</h1>
            <div>
                <button onClick={handleHacerReclamo}>Hacer Reclamo</button>
            </div>
            <div>
                <button onClick={handleBuscarReclamo}>Buscar Reclamo</button>
            </div>
        </div>
    )
}

export default PantallaInicio;