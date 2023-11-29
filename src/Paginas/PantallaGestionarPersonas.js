import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import EstiloGestionarPersona from '../Estilos/EstiloGestionarPersona.css';
import FormularioRegistroPersona from './FormRegistroPersona';
import FormularioDetallePersona from './FormDetallePersona';

function GestionPersona() {
    const [searchId, setSearchId] = useState('');
    const [searchCodigo, setsearchCodigo] = useState('');
    const [searchPiso, setsearchPiso] = useState('');
    const [searchNumero, setsearchNumero] = useState('');
    const [registroModalIsOpen, setRegistroModalIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('Registre una persona');
    const [nombre_btn, setNombre_btn] = useState('Registrar Persona');
    const [habilitado, setHabilitado] = useState(true);

    const fetchUsers = () => {
        fetch('http://localhost:8080/personas/listarPersonas')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error('Error al obtener los usuarios', error);
            });
    };

    useEffect(fetchUsers, []);

    const handleUserClick = (user) => {
        console.log(user);
        setRegistroModalIsOpen(false);
        setSelectedUser(user);
        setModalIsOpen(true);
    };

    const handleBuscar = () => {
        fetch(`http://localhost:8080/personas/buscarPersona/${searchId}`, {
            method: 'GET'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La persona con el documento no existe');
            }
            return response.json();
        })
        .then((data) => {
            setSelectedUser(data);
            setUsers([data]);
            setModalIsOpen(true);
            setErrorMessage('');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('ID de persona inválido o inexistente');
        });
    }    

    const closeModal = () => {
        setModalIsOpen(false);
        fetchUsers(); // Fetch the complete list of users again when the modal is closed
    }

    const handledueniosporunidad = () => {
        fetch(`http://localhost:8080/unidades/dueniosPorUnidad?codigo=${searchCodigo}&piso=${searchPiso}&numero=${searchNumero}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La unidad no existe');
            }
            return response.json();
        })
        .then((data) => {
            if(data.length === 0){
                setErrorMessage('La unidad no tiene dueños');
            }
            else{
                console.log('Success:', data);
                setSelectedUser(data);
                setUsers([data]);
                setModalIsOpen(true);
                setErrorMessage('');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleinquilinosporunidad = () => {
        fetch(`http://localhost:8080/unidades/inquilinosPorUnidad?codigo=${searchCodigo}&piso=${searchPiso}&numero=${searchNumero}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La unidad no existe');
            }
            return response.json();
        })
        .then((data) => {
            if(data.length === 0){
                setErrorMessage('La unidad no tiene inquilinos');
            }
            else{
                    
                console.log('Success:', data);
                setSelectedUser(data);
                setUsers([data]);
                setModalIsOpen(true);
                setErrorMessage('');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleDelete = () => {
        if (selectedUser && selectedUser.documento) {
            fetch(`http://localhost:8080/personas/eliminarPersona/${selectedUser.documento}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al eliminar la persona');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                closeModal(); // Close the modal and fetch the complete list of users again when a user is deleted
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            console.error('Ningún usuario seleccionado o usuario seleccionado no tiene id');
        }
    }

    const handleOpenRegistroModal = () => {
        setRegistroModalIsOpen(true);
    };    

    return(
        <div className="gestion-persona">
            <h1 className="gestion-persona-header">Lista de Personas</h1>
            <div className="gestion-persona-container">
                <input 
                    type="text" 
                    placeholder="Buscar por ID" 
                    value={searchId} 
                    onChange={e => setSearchId(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="codigo de la unidad" 
                    value={searchCodigo} 
                    onChange={e => setsearchCodigo(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="piso de la unidad" 
                    value={searchPiso} 
                    onChange={e => setsearchPiso(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="numero de la unidad" 
                    value={searchNumero} 
                    onChange={e => setsearchNumero(e.target.value)} 
                />
                <button onClick={handleBuscar}>Buscar</button>
                <button onClick={handledueniosporunidad}>Buscar Dueños por Unidad</button>
                <button onClick={handleinquilinosporunidad}>Buscar Inquilinos por Unidad</button>
                {errorMessage && <p>{errorMessage}</p>}
                <ul>
                    {users.map((user) => 
                        <li key={user.documento} onClick={() => handleUserClick(user)}>
                            {user.nombre}
                        </li>
                    )}
                </ul>

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {selectedUser && (
                        <FormularioDetallePersona
                            selectedUser={selectedUser}
                            handleDelete={handleDelete}
                            habilitado={habilitado}
                            showDeleteButton={true}
                        />
                    )}
                </Modal>
            </div>
            <button onClick={handleOpenRegistroModal}>Registrar Persona</button>
            <Modal isOpen={registroModalIsOpen} onRequestClose={() => setRegistroModalIsOpen(false)}>
                <FormularioRegistroPersona title={title} nombre_btn={nombre_btn} habilitado={habilitado} />
                <button onClick={() => setRegistroModalIsOpen(false)}>Cerrar</button>
            </Modal>
        </div>
    )
}

export default GestionPersona;