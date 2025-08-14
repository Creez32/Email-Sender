// src/routes/Plantillas/Plantillas.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plantillas.css";

export default function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const navigate = useNavigate();

  // Cargar plantillas desde localStorage al inicio
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("plantillas")) || [];
    setPlantillas(data);
  }, []);

  // Función para editar una plantilla existente
  const editarPlantilla = (index) => {
    navigate(`/Plantillas/crear?edit=${index}`);
  };

  // Función para eliminar una plantilla
  const eliminarPlantilla = (index) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta plantilla?")) {
      const nuevasPlantillas = [...plantillas];
      nuevasPlantillas.splice(index, 1);
      setPlantillas(nuevasPlantillas);
      localStorage.setItem("plantillas", JSON.stringify(nuevasPlantillas));
    }
  };

  return (
    <main className="plantillashome">
    <div className="plantillas-container">
      <h1>Mis Plantillas</h1>

      {/* Botón crear plantilla */}
      <button
        className="btn-crear"
        onClick={() => navigate("/Plantillas/crear")}
      >
        + Crear Plantilla
      </button>

      {plantillas.length === 0 ? (
        <div className="sin-plantillas">
          <p>No tienes plantillas creadas.</p>
        </div>
      ) : (
        <div className="lista-plantillas">
          {plantillas.map((p, i) => (
            <div key={i} className="card-plantilla">
              <div className="card-content" onClick={() => editarPlantilla(i)}>
                <h3>{p.nombrePlantilla}</h3>
                <p><strong>Tipo:</strong> {p.tipoMensaje}</p>
                <p><strong>Categoría:</strong> {p.categoria}</p>
                <div className="preview">{p.mensaje.slice(0, 80)}...</div>
              </div>

              <button
                className="btn-eliminar"
                onClick={() => eliminarPlantilla(i)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </main>
  );
}
