import React, { useEffect, useState } from "react";

function FormularioRegistroPersona({ habilitado, title, nombre_btn, cond }) {
    const [edificios, setEdificios] = useState([]);

    const [formData, setFormData] = useState({
        documento: "",
        nombre: "",
        mail: null,
        contrasenia: null,
        duenio_o_inquilino: "",
        propiedades: [
            {
                edificio: "",
                piso: "",
                numero_unidad: "",
            },
        ],
    });

    useEffect(() => {
        fetch(`http://localhost:8080/edificios/listarEdificios`)
            .then((response) => response.json())
            .then((data) => {
                console.log("edificios");
                console.log(data);
                setEdificios(data);
            })
            .catch((error) => {
                alert(
                    "Hubo un problema con la operación fetch edificios: " +
                        error.message
                );
            });
    }, []);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (["edificio", "piso", "numero_unidad"].includes(name)) {
            //imprimir en consola el valor que esta tomando la variable "edificio"
            console.log("edifici222o");
            console.log(value);
            console.log(`Campo ${name} seleccionado en el índice ${index}:`, value);
            let propiedades = [...formData.propiedades];
            propiedades[index][name] = value;
            setFormData({ ...formData, propiedades });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAgregarPropiedad = () => {
        setFormData({
            ...formData,
            propiedades: [
                ...formData.propiedades,
                {
                    edificio: "",
                    piso: "",
                    numero_unidad: "",
                },
            ],
        });
    };

    const handleEliminarPropiedad = (index) => {
        const list = [...formData.propiedades];
        list.splice(index, 1);
        setFormData({
            ...formData,
            propiedades: list,
        });
    };

    const handleButton = async (e) => {
        e.preventDefault();

        const DataPersonaEnviar = {
            documento: formData.documento,
            nombre: formData.nombre,
            mail: formData.mail,
            contrasenia: formData.contrasenia,
        };

        try {
            const personaResponse = await fetch(
                "http://localhost:8080/personas/agregarPersona",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(DataPersonaEnviar),
                }
            );

            const personaData = await personaResponse.json();
            console.log(personaData);

            for (const propiedad of formData.propiedades) {
                if (formData.duenio_o_inquilino === "true") {
                    // El usuario seleccionó que es dueño
                    const duenioUnidadResponse = await fetch(
                        `http://localhost:8080/unidades/agregarDuenioUnidad?codigo=${propiedad.edificio}&piso=${propiedad.piso}&numero=${propiedad.numero_unidad}&documento=${formData.documento}`,
                        {
                            method: "PUT",
                        }
                    );

                    const duenioUnidadData = await duenioUnidadResponse.json();
                    console.log(duenioUnidadData);
                } 
                else if (formData.duenio_o_inquilino === "false") {
                    // El usuario seleccionó que es inquilino
                    const inquilinoUnidadResponse = await fetch(
                        `http://localhost:8080/unidades/agregarInquilinoUnidad?codigo=${propiedad.edificio}&piso=${propiedad.piso}&numero=${propiedad.numero_unidad}&documento=${formData.documento}`,
                        {
                            method: "PUT",
                        }
                    );

                    const inquilinoUnidadData = await inquilinoUnidadResponse.json();
                    console.log(inquilinoUnidadData);
                }
            }

            alert("Persona registrada con éxito");

            // Reinicia el formulario
            setFormData({
                documento: "",
                nombre: "",
                mail: null,
                contrasenia: null,
                propiedades: [
                    {
                        edificio: "",
                        piso: "",
                        numero_unidad: "",
                    },
                ],
            });
        } catch (error) {
            alert("Hubo un problema con la operación fetch: " + error.message);
        }
    };

    const handlePropiedadInput = (event, index, propertyName) => {
        let propiedades = [...formData.propiedades];
        propiedades[index][propertyName] = event.target.value;
        setFormData({ ...formData, propiedades });
    };

    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={handleButton}>
                <div>
                    <label>Documento: </label>
                    <input
                        type="text"
                        id="documento"
                        name="documento"
                        value={formData.documento}
                        onChange={handleInputChange}
                    />
                </div>
                { habilitado ? (
                    <div>
                        <label>Nombre: </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                ) : (
                    console.log("No se muestra el campo nombre")
                )}
                { habilitado ?(
                    <div>
                        <label>¿Dueño o Inquilino?</label>
                        <select
                            id="duenio_o_inquilino"
                            name="duenio_o_inquilino"
                            value={formData.duenio_o_inquilino}
                            onChange={handleInputChange}>
                            <option value="">------</option>
                            <option value="true" cond="true">Dueño</option>
                            <option value="false" cond="false">Inquilino</option>
                        </select>
                    </div>
                ) : (
                    console.log("No se muestra el campo dueño o inquilino")
                )}
                {(formData.duenio_o_inquilino === "true" || cond === "true") && (
                    <div>
                        {formData.propiedades.map((propiedad, index) => (
                            <div key={index}>
                                <div>
                                    <label>Edificio</label>
                                    <select
                                        id="edificio"
                                        name="edificio"
                                        value={propiedad.edificio.id}
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        onInput={(event) =>
                                            handlePropiedadInput(
                                                event,
                                                index,
                                                "edificio"
                                            )
                                        }>
                                        {edificios.map((edificio) => (
                                            <option
                                                key={edificio.codigo}
                                                value={edificio.codigo}>
                                                {edificio.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Piso</label>
                                    <input
                                        id="piso"
                                        name="piso"
                                        value={propiedad.piso}
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        onInput={(event) =>
                                            handlePropiedadInput(
                                                event,
                                                index,
                                                "piso"
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Unidad</label>
                                    <input
                                        id="numero_unidad"
                                        name="numero_unidad"
                                        value={propiedad.numero_unidad}
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        onInput={(event) =>
                                            handlePropiedadInput(
                                                event,
                                                index,
                                                "numero_unidad"
                                            )
                                        }
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleEliminarPropiedad(index)}>
                                    Eliminar propiedad
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAgregarPropiedad}>
                            Agregar propiedad
                        </button>
                    </div>
                )}
               {(formData.duenio_o_inquilino === "false" || cond === "false") && (
                    <div>
                        {formData.propiedades.map((propiedad, index) => (
                            <div key={index}>
                                <div>
                                    <label>Edificio</label>
                                    <select
                                        id="edificio"
                                        name="edificio"
                                        value={propiedad.edificio.id}
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        onInput={(event) =>
                                            handlePropiedadInput(
                                                event,
                                                index,
                                                "edificio"
                                            )
                                        }>
                                        {edificios.map((edificio) => (
                                            <option
                                                key={edificio.codigo}
                                                value={edificio.codigo}>
                                                {edificio.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Piso</label>
                                    <input
                                        id="piso"
                                        name="piso"
                                        value={propiedad.piso}
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        onInput={(event) =>
                                            handlePropiedadInput(
                                                event,
                                                index,
                                                "piso"
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Unidad</label>
                                    <input
                                        id="numero_unidad"
                                        name="numero_unidad"
                                        value={propiedad.numero_unidad}
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        onInput={(event) =>
                                            handlePropiedadInput(
                                                event,
                                                index,
                                                "numero_unidad"
                                            )
                                        }
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleEliminarPropiedad(index)}>
                                    Eliminar propiedad
                                </button>
                            </div>
                        ))}
                    </div>
                )}      
                <button type="submit">{nombre_btn}</button>
            </form>
        </div>
    );
}

export default FormularioRegistroPersona;