// src/routes/Plantillas/Plantillas.jsx
import React, { useEffect, useState } from "react";
import "./Plantillas.css";
import CrearPlantillas from "./components/crearplantillas";

export default function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [plantillaActiva, setPlantillaActiva] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_PRODUCTION_URL || "http://localhost:3000";

  // Cargar plantillas desde backend
  const fetchPlantillas = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/email/api/plantillas`);
      if (!res.ok) throw new Error("Error al cargar plantillas");
      const result = await res.json();
      setPlantillas(result.data || []);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar las plantillas desde el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlantillas();
  }, [API_BASE_URL]);

  const abrirModalCrear = () => {
    setPlantillaActiva(null);
    setModalOpen(true);
  };

  const abrirModalEditar = (plantilla) => {
    setPlantillaActiva(plantilla);
    setModalOpen(true);
  };

  const eliminarPlantilla = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta plantilla?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/email/api/plantillas/eliminar/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar plantilla");
      setPlantillas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la plantilla");
    }
  };

  const actualizarLista = (plantillaGuardada) => {
    if (!plantillaGuardada?.id) return;

    setPlantillas((prev) => {
      const existe = prev.find((p) => p.id === plantillaGuardada.id);
      if (existe) {
        // Editando: reemplazar la existente
        return prev.map((p) => (p.id === plantillaGuardada.id ? plantillaGuardada : p));
      } else {
        // Creando nueva: agregar al final
        return [...prev, plantillaGuardada];
      }
    });
  };

  return (
    <main className="plantillashome">
      <div className="plantillas-container">
        <h1>Mis Plantillas</h1>

        <button className="btn-crear" onClick={abrirModalCrear}>
          + Crear Plantilla
        </button>

        {loading ? (
          <p>Cargando plantillas...</p>
        ) : plantillas.length === 0 ? (
          <div className="sin-plantillas">
            <p>No tienes plantillas creadas.</p>
          </div>
        ) : (
          <div className="lista-plantillas">
            {plantillas.map((p) => (
              <div key={p.id} className="card-plantilla">
                <div className="card-content" onClick={() => abrirModalEditar(p)}>
                  <h3>{p.nombrePlantilla || "Sin nombre"}</h3>
                  <p><strong>Tipo:</strong> {p.tipoMensaje || "-"}</p>
                  <p><strong>Categoría:</strong> {p.categoria || "-"}</p>
                  <div className="preview">{p.mensaje ? p.mensaje.slice(0, 80) + "..." : "Sin contenido"}</div>
                </div>
                <button className="btn-eliminar" onClick={() => eliminarPlantilla(p.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>

{modalOpen && (
  <CrearPlantillas
    plantilla={plantillaActiva}
    onClose={() => setModalOpen(false)}
    onGuardar={() => {
      fetchPlantillas(); // recarga la lista completa desde backend
      setModalOpen(false); // cerrar modal
    }}
  />
)}
    </main>
  );
}
