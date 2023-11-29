import React from 'react';

function DetallePersona({ habilitado, selectedUser, handleDelete, showDeleteButton }) {
  return (
    <div className="gestion-persona-detail">
      <h2>Detalle de la persona:</h2>
      {(Array.isArray(selectedUser))  ? (
        Object.entries(selectedUser).map(([key, value]) => (
          <div key={key}>
            <div>
              <label>Nombre {key}: <input type="text" value={value.nombre} /></label>
            </div>
            <div>
              <label>Documento {key}: <input type="text" value={value.documento} /></label>
            </div>
            { habilitado ? (
              <div>
                <label>mail {key}: <input type="text" value={value.mail} /></label>
              </div>
            ) : (
              <div></div>
            )}
            <br/>
          </div>
        ))
      ) : (
        // Si selectedUser no es una lista, es un objeto
        <div>
          <div>
            <label>Nombre: <input type="text" value={selectedUser.nombre} /></label>
          </div>
          <div>
            <label>Documento: <input type="text" value={selectedUser.documento} /></label>
          </div>
          {habilitado ? (
            <div>
              <label>mail: <input type="text" value={selectedUser.mail} /></label>
            </div>
          ) : (
            <div></div>
          )}
          <br/>
        </div>
      )}
      {showDeleteButton && <button onClick={handleDelete} disabled={!selectedUser}>Eliminar</button>}
    </div>
  );
};

export default DetallePersona;
