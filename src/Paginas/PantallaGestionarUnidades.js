import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioDetallePersona from './FormDetallePersona';
import FormularioDetalleUnidad from './FormDetalleUnidad';
import FormularioRegistroDueniooInquilino from './FormRegistroPersona';
import FormularioAgregarUnidad from './FormRegistroUnidades';
import EstiloGestionarUnidad from '../Estilos/EstiloUnidad.css';

function GestionUnidad() {
    const [modalTitle, setModalTitle] = useState('Detalle de la Unidad:');
    const [searchCodigo, setsearchCodigo] = useState('');
    const [searchPiso, setsearchPiso] = useState('');
    const [searchNumero, setsearchNumero] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonPressed, setButtonPressed] = useState('');
    const [nombre_btn, setNombre_btn] = useState('');
    const [inputHabilitado, setInputHabilitado] = useState(true);
    const [condicion, setCondicion] = useState("");

    useEffect(() => {
        console.log('buttonPressed:', buttonPressed);
        fetch('http://localhost:8080/unidades/listarUnidades')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error('Error al obtener los usuarios', error);
            });
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setButtonPressed('unidadView');
        setInputHabilitado(true);
        setModalIsOpen(true);
        console.log(selectedUser);
    }
    
    const handleBuscar = () => {
        fetch(`http://localhost:8080/unidades/buscarUnidad?codigo=${searchCodigo}&piso=${searchPiso}&numero=${searchNumero}`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La unidad no existe');
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

    const handledueniosporunidad = () => { 
        //REVISAR PORQUE TOCA HACER UN CICLO, SON MUCHOS DUENIOS
        fetch(`http://localhost:8080/unidades/dueniosPorUnidad?codigo=${searchCodigo}&piso=${searchPiso}&numero=${searchNumero}`,{
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
                setErrorMessage('');
                setSelectedUser(data);
                setModalIsOpen(true);
                setButtonPressed('duenios');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    };

    const handleinquilinosporunidad = () => {
        //REVISAR PORQUE TOCA HACER UN CICLO, SON MUCHOS INQUILINOS
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
                setErrorMessage('');
                setSelectedUser(data);
                setModalIsOpen(true);
                setButtonPressed('inquilinos');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Informacion de unidad inválido o inexistente');
        });
    };

    const handleDelete = () => {
        fetch(`http://localhost:8080/unidades/eliminarUnidad?identificador=${selectedUser.identificador}`, {
            method: 'DELETE',
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
        fetch(`http://localhost:8080/unidades/transferirUnidad?codigo=${selectedUser.codigo}&piso=${selectedUser.piso}&numero=${selectedUser.numero}&documento=${selectedUser.documento}`, {
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

    const handleAddDuenio = () => {
        setButtonPressed('addDuenio');
        setNombre_btn('Agregar Dueño');
        setModalTitle('Agregar Nuevo Dueño:');
        setCondicion("true");
        setInputHabilitado(false);
        setModalIsOpen(true);
    }

    const handleAddInquilino = () => {
        setButtonPressed('addInquilino');
        setNombre_btn('Agregar Inquilino');
        setModalTitle('Agregar Nuevo Inquilino:');
        setCondicion("false");
        setInputHabilitado(false);
        setModalIsOpen(true);
    }

    const handleAddUnidad = () => {
        setModalIsOpen(true);
        setButtonPressed('addUnidad'); // Asegúrate de establecer el botón presionado correctamente
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setButtonPressed('');
        setNombre_btn('');
        setInputHabilitado(false);
        setModalTitle('Detalle de la Unidad:');
    }

    return(

        <div className="gestion-unidad">
            <h2 className="gestion-unidad-header">Lista de Unidades</h2>
            <div className="gestion-unidad-container"> 
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
                <button onClick={handleBuscar}>Buscar Unidad</button>
                <button onClick={handledueniosporunidad}>Buscar Dueños por Unidad</button>
                <button onClick={handleinquilinosporunidad}>Buscar Inquilinos por Unidad</button>
                {errorMessage && <p>{errorMessage}</p>}
                <ul>
                    {users.map((user) => (
                        <li key={user.id} onClick={() => handleUserClick(user)}>
                            {user.identificador}
                        </li>
                    ))}
                </ul>
                
                <button onClick={handleAddUnidad}>Registrar Unidad</button>
                <button onClick={handleAddDuenio}>Agregar Dueño</button>
                <button onClick={handleAddInquilino}>Agregar Inquilino</button>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                {selectedUser && (
                    buttonPressed === 'addDuenio' || buttonPressed === 'addInquilino' ? (
                        <FormularioRegistroDueniooInquilino  title={modalTitle} nombre_btn={nombre_btn} cond={condicion} habilitado={inputHabilitado} />
                    ) : buttonPressed === 'duenios' || buttonPressed === 'inquilinos' ? (
                        <FormularioDetallePersona selectedUser={selectedUser} handleDelete={handleDelete} showDeleteButton={false} habilitado={inputHabilitado} />
                    ) : buttonPressed === 'unidadView' ? (
                        <FormularioDetalleUnidad selectedUser={selectedUser} handleLiberate={handleLiberate} handleTransfer={handleTransfer} handleDelete={handleDelete} showCreateButton={false} title={modalTitle} habilitado={inputHabilitado} />
                    ) : buttonPressed === 'addUnidad' ? (
                        <FormularioAgregarUnidad />
                    ) : null // Agrega un caso para el nuevo botón 'addUnidad'
                )}
            </Modal>
        </div>
    )
}

export default GestionUnidad;