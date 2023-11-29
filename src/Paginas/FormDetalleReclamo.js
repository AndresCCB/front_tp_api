import React, {useEffect, useState} from "react";
import { useAuth } from '../authContext';

function DetalleReclamo( {selectedUser} ){

    const {currentUser} = useAuth();
    const [newStatus, setNewStatus] = useState(selectedUser.estado);

    const handleInputChange = (e) => {
    }

    useEffect(() => {
        console.log('selectedUser:', selectedUser);
    } , [selectedUser]);

    const handleButton = async (e) => {
        e.preventDefault();
        try {
            console.log('URL:', `http://localhost:8080/reclamos/cambiarEstadoReclamo/${selectedUser.numero}`);
            console.log('Cuerpo JSON:', JSON.stringify({ estado: newStatus }));

            const changeStatus = await fetch(`http://localhost:8080/reclamos/cambiarEstadoReclamo/${selectedUser.numero}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: newStatus }), // Aquí es donde se convierte el objeto en formato JSON
            });
      
            if (!changeStatus.ok) {
                throw new Error('Error al cambiar el estado del reclamo');
            }
      
            const reclamoData = await changeStatus.json();
            console.log('Reclamo actualizado:', reclamoData);
        } catch (error) {
            console.error('Error al cambiar el estado:', error);
        }
    };

    return(
        <div>
        <h1> Detalle Reclamo: </h1>
        <form onSubmit={handleButton}>
            <div>
                <label>Documento: </label>
                <input type='text'
                       id='documento' 
                       name='documento'
                       value={selectedUser.persona.documento}
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Codigo del edificio: </label>
                <input type='text' 
                       id='codigo'
                       name='codigo'
                       value={selectedUser.edificio.codigo} 
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Ubicación: </label>
                <input type='text' 
                       id='ubicacion'
                       name='ubicacion'
                       value={selectedUser.ubicacion} 
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Descripción: </label>
                <input type='text' 
                       id='descripcion'
                       name='descripcion'
                       value={selectedUser.descripcion} 
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Identificador: </label>
                <input type='text' 
                       id='identificador'
                       name='identificador'
                       value={selectedUser.unidad.identificador} 
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Piso: </label>
                <input type='text' 
                       id='piso'
                       name='piso'
                       value={selectedUser.unidad.piso} 
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Unidad: </label>
                <input type='text' 
                       id='unidad'
                       name='unidad'
                       value={selectedUser.unidad.numero} 
                       onChange={handleInputChange} disabled/>
            </div>
            <div>
                <label>Estado:</label>
                <select
                    id="estado"
                    name="estado"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                >
                    <option value="null">----</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="abierto">Abierto</option>
                    <option value="enProceso">En Proceso</option>
                    <option value="desestimado">Desestimado</option>
                    <option value="anulado">Anulado</option>
                    <option value="terminado">Terminado</option>
                </select>
            </div>
            <button type='submit'>Cambiar Estado</button>
        </form>
    </div>
    )
}

export default DetalleReclamo;