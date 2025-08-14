// src/routes/Plantillas/components/crearplantillas.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./crearplantillas.css";

export default function CrearPlantillas() {
  const [searchParams] = useSearchParams();
  const editIndex = searchParams.get("edit");

  const [nombrePlantilla, setNombrePlantilla] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [categoria, setCategoria] = useState("");

  const navigate = useNavigate();

  // Variables dinámicas permitidas
  const variablesDisponibles = [
    "CUILAfiliado",
    "CUILTitular",
    "apellnombAfilado",
    "nroAfiliado",
    "parentesco",
    "sexo",
    "edad",
    "estado",
    "GF",
    "planAfiliado",
    "categoria",
    "OSAndes",
    "CUIT",
    "provinciaDom",
    "localidadDom",
    "direccion",
    "celular",
    "mail",
    "lotes",
    "formaPago"
  ];

  useEffect(() => {
    if (editIndex !== null) {
      const data = JSON.parse(localStorage.getItem("plantillas")) || [];
      const plantilla = data[editIndex];
      if (plantilla) {
        setNombrePlantilla(plantilla.nombrePlantilla);
        setMensaje(plantilla.mensaje);
        setTipoMensaje(plantilla.tipoMensaje);
        setCategoria(plantilla.categoria);
      }
    }
  }, [editIndex]);

  const insertarVariable = (variable) => {
    setMensaje((prev) => prev + ` {${variable}}`);
  };

  const guardarPlantilla = () => {
    const nuevaPlantilla = { nombrePlantilla, mensaje, tipoMensaje, categoria };
    let data = JSON.parse(localStorage.getItem("plantillas")) || [];

    if (editIndex !== null) {
      data[editIndex] = nuevaPlantilla;
    } else {
      data.push(nuevaPlantilla);
    }

    localStorage.setItem("plantillas", JSON.stringify(data));
    navigate("/plantillas");
  };

  return (
    <main className="cplantilla">
      <div className="crear-container">
        <h2>{editIndex !== null ? "Editar Plantilla" : "Crear Plantilla"}</h2>

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
          maxLength={1500}
        />

        {/* Botones para insertar variables dinámicas */}
        <div className="variables-panel">
          <span>Insertar variable:</span>
          {variablesDisponibles.map((variable) => (
            <button
              key={variable}
              type="button"
              onClick={() => insertarVariable(variable)}
            >
              {variable}
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
          <button onClick={() => navigate("/plantillas")} className="btn-volver">
            Volver
          </button>
          <button onClick={guardarPlantilla} className="btn-guardar">
            Guardar Plantilla
          </button>
        </div>
      </div>
    </main>
  );
}

