import React, {useState, useEffect} from "react";
import Modal from 'react-modal'; // Necesitarás instalar este paquete
import FormularioDetalleEdificio from "./FormDetalleEdificio";
import FormularioDetalleUnidad from "./FormDetalleUnidad";
import FormularioDetallePersona from "./FormDetallePersona";
import EstiloGestionarEdificio from '../Estilos/EstiloEdificio.css';

function GestionEdificio(){

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchCodigo, setsearchCodigo] = useState("");
    const [modelTitel, setmodelTitel] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [habilitado, setHabilitado] = useState(false);
    const [buttonPressed, setButtonPressed] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/edificios/listarEdificios')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error('Error al obtener los usuarios', error);
            });
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setmodelTitel("Detalle del Edificio:");
        setModalIsOpen(true);
    }


    const handleDelete = () => {
        fetch(`http://localhost:8080/edificios/eliminarEdificio/${selectedUser.codigo}`, {
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

    const handleBuscar = () => {
        fetch(`http://localhost:8080/edificios/buscarEdificio/${searchCodigo}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('El Edificio no existe');
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
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleBuscarUnidadesxEdificio = () => {
        fetch(`http://localhost:8080/edificios/buscarUnidadesPorEdificio/${searchCodigo}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('El Edificio no existe');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setSelectedUser(data);
            setUsers([data]);
            setModalIsOpen(true);
            setErrorMessage('');
            setButtonPressed('unidades');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleBuscarHabilitadosxEdificio = () => {
        fetch(`http://localhost:8080/edificios/buscarHabilitadosPorEdificio/${searchCodigo}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('El Edificio no existe');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setSelectedUser(data);
            setUsers([data]);
            setModalIsOpen(true);
            setErrorMessage('');
            setButtonPressed('habilitados');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleBuscarDueniosxEdificio = () => {
        fetch(`http://localhost:8080/edificios/buscarDueniosPorEdificio/${searchCodigo}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('El Edificio no existe');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setSelectedUser(data);
            setUsers([data]);
            setModalIsOpen(true);
            setErrorMessage('');
            setButtonPressed('duenios');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleBuscarHabitantesxEdificio = () => {
        fetch(`http://localhost:8080/edificios/buscarHabitantesPorEdificio/${searchCodigo}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('El Edificio no existe');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setSelectedUser(data);
            setUsers([data]);
            setModalIsOpen(true);
            setErrorMessage('');
            setButtonPressed('habitantes');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    }

    const handleCreateBtn = () => {
        const newUser = {
            nombre: '',
            direccion: '',
        };
        setSelectedUser(newUser);
        setmodelTitel("Crear Edificio:");
        setModalIsOpen(true);
        setButtonPressed('crear');
    }


    const closeModal = () => {
        setModalIsOpen(false);
        setmodelTitel('');
        setButtonPressed('');
    }

    return(
        <div className="gestion-edificio">
            <h2 className="gestion-edificio-header">Lista de Edificios</h2>
            <div className="gestion-edificio-container"> 
                <input 
                    type="text" 
                    placeholder="codigo del edificio" 
                    value={searchCodigo} 
                    onChange={e => setsearchCodigo(e.target.value)} 
                />
                <button onClick={handleBuscar}>Buscar Edificio</button>
                <button onClick={handleBuscarDueniosxEdificio}>Buscar Dueños por Edificio</button>
                <button onClick={handleBuscarHabilitadosxEdificio}>Buscar Habilitados por Edificio</button>
                <button onClick={handleBuscarHabitantesxEdificio}>Buscar Habitantes por Edificio</button>
                <button onClick={handleBuscarUnidadesxEdificio}>Buscar Unidades por Edificio</button>
                
                <ul>
                    {users.map((user) => (
                        <li key={user.id} onClick={() => handleUserClick(user)}>
                            {user.nombre}
                        </li>
                    ))}
                </ul>

                <button onClick={handleCreateBtn}>Agregar Edificio</button>

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {selectedUser && (
                        buttonPressed === 'unidades' ? (
                            <FormularioDetalleUnidad
                                selectedUser={selectedUser}
                                handleDelete={handleDelete}
                                showCreateButton={false}
                                title={modelTitel}
                                habilitado={habilitado}
                            />
                        ) : buttonPressed === 'duenios' ? (
                            <FormularioDetallePersona
                                selectedUser={selectedUser}
                                handleDelete={handleDelete}
                                showCreateButton={false}
                                title={modelTitel}
                                habilitado={habilitado}
                            />
                        ) : buttonPressed === 'habitantes' ? (
                            <FormularioDetallePersona
                                selectedUser={selectedUser}
                                handleDelete={handleDelete}
                                showCreateButton={false}
                                title={modelTitel}
                                habilitado={habilitado}
                            />
                        ) : buttonPressed === 'habilitados' ? (
                            <FormularioDetallePersona
                                selectedUser={selectedUser}
                                handleDelete={handleDelete}
                                showCreateButton={false}
                                title={modelTitel}
                                habilitado={habilitado}
                            />
                        ) : buttonPressed === 'crear' ? (
                            <FormularioDetalleEdificio
                                selectedUser={selectedUser}
                                handleDelete={handleDelete}
                                showCreateButton={true}
                                title={modelTitel}
                                habilitado={habilitado}
                            />
                        ) : (
                            <FormularioDetalleEdificio
                                selectedUser={selectedUser}
                                handleDelete={handleDelete}
                                showCreateButton={false}
                                title={modelTitel}
                                habilitado={habilitado}
                            />
                        ))                  
                    }
                </Modal>
            </div>
        </div>

    )
}

export default GestionEdificio;