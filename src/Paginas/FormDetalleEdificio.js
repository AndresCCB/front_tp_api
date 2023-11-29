import React, { useState, useEffect } from 'react';

function DetalleEdificio ( { habilitado, selectedUser: initialUser, handleDelete, showCreateButton, title } ) {
    
    const [selectedUser, setSelectedUser] = useState(initialUser);

    useEffect(() => {
        setSelectedUser(initialUser);
    }, [initialUser]);

    const handleInputChange = (event) => {
        setSelectedUser({
            ...selectedUser,
            [event.target.name]: event.target.value
        });
    }

    const handleCreate = () => {
        fetch('http://localhost:8080/edificios/agregarEdificio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedUser),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return(
        <div>
            <h2> {title} </h2>
            <div>
                <label>Nombre: <input type="text" name="nombre" value={selectedUser.nombre} onChange={handleInputChange} /></label>
            </div>
            <div>
                <label>Direccion: <input type="text" name="direccion" value={selectedUser.direccion} onChange={handleInputChange} /></label>
            </div>
            {showCreateButton && <button onClick={handleCreate}>Registrar Edificio</button>}
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    )

}

export default DetalleEdificio;