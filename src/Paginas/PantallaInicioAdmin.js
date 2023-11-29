import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import FormularioIngreso from "./FormIngreso";
import EstiloInicioAdmin from '../Estilos/EstiloInicioAdmin.css';

function PantallaInicioAdmin() {
    const {currentUser} = useAuth();

    console.log(currentUser);

    const navigate = useNavigate();

    const handleGestionarPersonas = (e) => {
        e.preventDefault();
        navigate('/PantallaGestionarPersonas');
    }

    const handleGestionarEdificios = (e) => {
        e.preventDefault();
        navigate('/PantallaGestionarEdificios');
    }

    const handleGestionarUnidades = (e) => {
        e.preventDefault();
        navigate('/PantallaGestionarUnidades');
    }

    const handleGestionarReclamos = (e) => {
        e.preventDefault();
        navigate('/PantallaGestionarReclamos', { state: { isAdmin: true } });
    }
        
    return(
        <div className="menu">
            <h1 className="menu-header">Bienvenido {currentUser.nombre}</h1>
            <div className="menu-container">
                <button onClick={handleGestionarPersonas}>Personas</button>
                <button onClick={handleGestionarEdificios}>Edificios</button>
                <button onClick={handleGestionarUnidades}>Unidades</button>
                <button onClick={handleGestionarReclamos}>Reclamos</button>
            </div>
        </div>
    )
}

export default PantallaInicioAdmin;