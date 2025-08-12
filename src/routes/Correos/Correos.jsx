import React from "react";
import { useNavigate } from "react-router-dom";
import "./Correos.css";

export default function Correos() {
  const navigate = useNavigate();

  return (
    <div className="correos-container">
      <h1>Gestión de Correos</h1>
      <div className="correos-buttons">
        <button
          className="btn-plantilla"
          onClick={() => navigate("/enviar-plantilla")}
        >
          Enviar Plantilla
        </button>
        <button
          className="btn-nuevo"
          onClick={() => navigate("/crear-correo")}
        >
          Crear nuevo correo
        </button>
      </div>
    </div>
  );
}
