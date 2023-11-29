import React, { useState } from "react";
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import EstiloPantallaInicio from '../Estilos/EstiloInicioAdmin.css';

function PantallaInicio() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    const handleBuscarReclamo = (e) => {
        e.preventDefault();
        navigate('/PantallaGestionarReclamos', { state: { isAdmin: false } });
    }

    const handleAgregarImagen = (e) => {
        e.preventDefault();
        navigate('/FormAgregarImagen');
    }
      

    return(
        <div className="menu">
            <h1 className="menu-header">Bienvenido {currentUser.nombre}</h1>
            <div className="menu-container">
                <button onClick={handleBuscarReclamo}>Reclamos</button>
                
            </div>
        </div>
    )
}

export default PantallaInicio;