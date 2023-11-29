import React, { useState, useEffect } from 'react';

function DetalleUnidad ( { habilitado, selectedUser: initialUser, handleDelete, handleTransfer, handleLiberate, showCreateButton, title } ) {
  
  const [selectedUser, setSelectedUser] = useState(initialUser);

  useEffect(() => {
      setSelectedUser(initialUser);
  }, [initialUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Actualizar el estado considerando la anidación de `value`
    setSelectedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }  

  const handleCreate = () => {
    fetch(`http://localhost:8080/unidades/agregarUnidad?codigo=${selectedUser.edificio.codigo}&piso=${selectedUser.piso}&numero=${selectedUser.numero}`, {
        method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div>
      <h2>{title}</h2>
      {(Array.isArray(selectedUser))  ? (
        Object.entries(selectedUser).map(([key, value]) => (
          <div key={key}>
            { habilitado ? (
              <div>
                <label>Identificador {key}: <input type="text" value={value.identificador} disabled/></label>
              </div>
              ) : (
                console.log('No se muestra el identificador 1')      
              )
            }
            <div>
              <label>Piso {key}: <input type="text" value={value.piso} onChange={handleInputChange} /></label>
            </div>
            <div>
              <label>Numero {key}: <input type="text" value={value.numero}  onChange={handleInputChange} /></label>
            </div>
            { habilitado ?(
              <div>
                <label>Habitado {key}: <input type="text" value={(value.inquilinos.length === 0) ? 'No' : 'Si'} disabled/></label>
              </div>
            ) : (
              console.log('No se muestra el habitado 1')
            )}
            <div>
              <label>Codigo Edificio {key}: <input type="text" value={value.edificio.codigo} onChange={handleInputChange} /></label>
            </div>
            { habilitado ? (
              <div>
                <label>Nombre Edificio {key}: <input type="text" value={value.edificio.nombre} disabled/></label>
              </div>
            ) : (
              console.log('No se muestra el nombre del edificio 1')
            )}
            { habilitado ? (
              <div>
                <label>Documento Dueño {key}: <input type="text" value={value.duenios?.documento } onChange={handleInputChange} /></label>
              </div>
            ) : (
              console.log('No se muestra el documento del dueño 1')
            )}
            <button onClick={handleDelete}>Eliminar Unidad</button>
            <button onClick={handleTransfer}>Transferir Unidad</button>
            <button onClick={handleLiberate}>Liberar Unidad</button>
            <br/>
            <br/>
          </div>
        ))
      ) : (
        <div>
          { habilitado ? (
            <div>
              <label>Identificador: <input type="text" value={selectedUser.identificador} disabled/></label>
            </div>
            ) : (
              console.log('No se muestra el identificador')      
            )
          }
          <div>
            <label>Piso: <input type="text" value={selectedUser.piso} onChange={handleInputChange} /></label>
          </div>
          <div>
            <label>Numero: <input type="text" value={selectedUser.numero} onChange={handleInputChange} /></label>
          </div>
          { habilitado ?(
            <div>
              <label>Habitado: <input type="text" value={(selectedUser.inquilinos.length === 0) ? 'No' : 'Si'} disabled/></label>
            </div>
          ) : (
            console.log('No se muestra el habitado')
          )}
          <div>
            <label>Codigo Edificio: <input type="text" value={selectedUser.edificio.codigo} onChange={handleInputChange} /></label>
          </div>
          { habilitado ? (
            <div>
              <label>Nombre Edificio: <input type="text" value={selectedUser.edificio.nombre} disabled/></label>
            </div>
          ) : (
            console.log('No se muestra el nombre del edificio')
          )}
          { habilitado ? (
            <div>
              <label>Documento Dueño: <input type="text" value={selectedUser.duenios[0]?.documento} /></label>
            </div>
          ) : (
            
            console.log(selectedUser)
          )}
          <button onClick={handleDelete}>Eliminar Unidad</button>
          <button onClick={handleTransfer}>Transferir Unidad</button>
          <button onClick={handleLiberate}>Liberar Unidad</button>
          <br/>
        </div>
      )}
      {showCreateButton && <button onClick={handleCreate}>Ingresar Nueva Unidad</button>}
    </div>
  );
}

export default DetalleUnidad;