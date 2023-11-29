import React, { useState } from 'react';

function FormRegistroUnidades() {

  const [formData, setFormData] = useState({
    piso: '',
    numero: '',
    codigoEdificio: '', // Cambié 'codigo' a 'codigoEdificio' para que coincida con el nombre en el estado
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = () => {
    fetch(`http://localhost:8080/unidades/agregarUnidad?codigo=${formData.codigoEdificio}&piso=${formData.piso}&numero=${formData.numero}`, {
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
      <h2>Registrar Unidad</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Piso: <input type="text" name="piso" value={formData.piso} onChange={handleInputChange} /></label>
        </div>
        <div>
          <label>Numero: <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} /></label>
        </div>
        <div>
          <label>Codigo Edificio: <input type="text" name="codigoEdificio" value={formData.codigoEdificio} onChange={handleInputChange} /></label>
        </div>
      </form>
      <button onClick={handleCreate}>Ingresar Nueva Unidad</button>
    </div>
  );
}

export default FormRegistroUnidades;
