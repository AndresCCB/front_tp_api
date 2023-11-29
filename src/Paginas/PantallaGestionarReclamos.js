import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import FormularioRegistrarReclamo from "./FormRegistroReclamo";
import DetalleReclamo from "./FormDetalleReclamo";
import EstiloGestionarReclamo from '../Estilos/EstiloGestionarReclamo.css';

function GestionReclamo( { location } ){

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pressedButton, setPressedButton] = useState('');
    const isAdmin = location?.state?.isAdmin || false;
    console.log(isAdmin);


    useEffect(() => {
        fetch('http://localhost:8080/reclamos/listarReclamos')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error('Error al obtener los reclamos', error);
            });
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setPressedButton('');
        setModalIsOpen(true);
    }

    const handleDelete = () => {
        fetch(`http://localhost:8080/unidades/eliminarUnidad?identificador=${selectedUser.identificador}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setModalIsOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleTransfer = () => {
        fetch(`http://localhost:8080/unidades/transferirUnidad?codigo&piso&numero&documento`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setModalIsOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleLiberate = () => {
        fetch(`http://localhost:8080/unidades/liberarUnidad?codigo=${selectedUser.codigo}&piso=${selectedUser.piso}&numero=${selectedUser.numero}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setModalIsOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleHacerReclamo = (e) => {
        e.preventDefault();
        setPressedButton('Create');
        setModalIsOpen(true);
    }

    const handleBuscarReclamo = (e) => {
        e.preventDefault();
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setPressedButton('');
    }

    return(
        <div className="gestion-reclamo">
            <h2 className="gestion-reclamo-header">Lista Reclamos:</h2>
            <div className="gestion-reclamo-container">            
                <ul>
                    {users.map((user) => (
                        <li key={user.idReclamo} onClick={() => handleUserClick(user)}>
                            {user.descripcion}
                        </li>
                    ))}
                </ul>
                <div>
                    {isAdmin === false ? ( 
                        
                        <button onClick={handleHacerReclamo}>Hacer Reclamo</button>
                        
                        ) : (

                            <div></div>

                        )
                    }
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>

                        {pressedButton === 'Create' ? (
                            <FormularioRegistrarReclamo />
                        ) : (
                            <DetalleReclamo selectedUser={selectedUser} />
                        )}
                        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
                    </Modal>
                </div>
                <div>
                    <button onClick={handleBuscarReclamo}>Buscar Reclamo</button>
                </div>
            </div>
        </div>
    )
}

export default GestionReclamo;