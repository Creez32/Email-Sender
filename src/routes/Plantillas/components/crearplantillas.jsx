// src/routes/Plantillas/components/crearplantillas.jsx
import React, { useState, useEffect } from "react";
import "./crearplantillas.css";

export default function CrearPlantillas({ plantilla, onClose, onGuardar }) {
  const [nombrePlantilla, setNombrePlantilla] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [categoria, setCategoria] = useState("");

  const API_BASE_URL = import.meta.env.VITE_PRODUCTION_URL || "http://localhost:3000";

  const variablesDisponibles = [
    "CUILAfiliado","CUILTitular","apellnombAfilado","nroAfiliado","parentesco",
    "sexo","edad","estado","GF","planAfiliado","categoria","OSAndes","CUIT",
    "provinciaDom","localidadDom","direccion","celular","mail","lotes","formaPago",
  ];

  // Inicializamos con los datos de la plantilla (si existe)
  useEffect(() => {
    setNombrePlantilla(plantilla?.nombrePlantilla || "");
    setMensaje(plantilla?.mensaje || "");
    setTipoMensaje(plantilla?.tipoMensaje || "");
    setCategoria(plantilla?.categoria || "");
  }, [plantilla]);

  const insertarVariable = (variable) => {
    setMensaje((prev) => prev + ` {${variable}}`);
  };

  const guardarPlantilla = async () => {
    // Validaciones básicas
    if (!nombrePlantilla.trim() || !mensaje.trim()) {
      alert("El nombre y el mensaje de la plantilla son obligatorios.");
      return;
    }

    const datos = { nombrePlantilla, mensaje, tipoMensaje, categoria };

    try {
      let res;
      if (plantilla?.id) {
        // Editar existente
        res = await fetch(`${API_BASE_URL}/email/api/plantillas/editar/${plantilla.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
      } else {
        // Crear nueva
        res = await fetch(`${API_BASE_URL}/email/api/plantillas/crear`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
      }

      if (!res.ok) throw new Error("Error al guardar la plantilla");

      // Intentamos extraer el objeto real de la respuesta
      const result = await res.json();
      const plantillaGuardada = result?.data || result; // depende del backend

      onGuardar(plantillaGuardada); // actualiza lista en el padre
      onClose(); // cerrar modal
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la plantilla. Revisa la consola para más detalles.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="crear-container">
        <h2>{plantilla?.id ? "Editar Plantilla" : "Crear Plantilla"}</h2>

        <label>Nombre de Plantilla</label>
        <input
          type="text"
          value={nombrePlantilla}
          onChange={(e) => setNombrePlantilla(e.target.value)}
        />

        <label>Mensaje</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          maxLength={2000}
        />

        <div className="variables-panel">
          <span>Insertar variable:</span>
          {variablesDisponibles.map((v) => (
            <button key={v} type="button" onClick={() => insertarVariable(v)}>
              {v}
            </button>
          ))}
        </div>

        <label>Tipo de Mensaje</label>
        <input
          type="text"
          value={tipoMensaje}
          onChange={(e) => setTipoMensaje(e.target.value)}
        />

        <label>Categoría</label>
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <div className="acciones">
          <button onClick={onClose} className="btn-volver">
            Cancelar
          </button>
          <button onClick={guardarPlantilla} className="btn-guardar">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
