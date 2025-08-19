import { useState } from "react";
import { useNavigate } from "react-router-dom";
import consulta from "../../../utils/consulta";
import "./EnviarPlantilla.css";

export default function EnviarPlantilla() {
  const navigate = useNavigate();
  const [cuil, setCuil] = useState("");
  const [afiliado, setAfiliado] = useState(null);
  const [plantillas, setPlantillas] = useState([]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
  const [mensajeFinal, setMensajeFinal] = useState("");
  const [step, setStep] = useState(1); // 1: ingresar CUIL, 2: seleccionar plantilla

  const API_BASE_URL = import.meta.env.VITE_PRODUCTION_URL || "http://localhost:3000";

  // Función para reemplazar variables en la plantilla
  const reemplazarTexto = (texto, data) => {
    return texto.replace(/{(.*?)}/g, (_, key) => {
      return data.hasOwnProperty(key) ? data[key] : "";
    });
  };

  // Paso 1: Buscar afiliado por CUIL
  const handleAceptar = async () => {
    if (!cuil.trim()) {
      alert("Por favor ingresa un CUIL válido.");
      return;
    }
    try {
      const res = await consulta.get(`/email/api/cuiles?afiliado=${cuil}`);
      if (!res || !res.data) {
        alert("No se encontraron datos para el CUIL ingresado.");
        return;
      }
      setAfiliado(res.data);

      // Paso 2: traer plantillas disponibles
      const resPlantillas = await consulta.get(`/email/api/plantillas`);
      setPlantillas(resPlantillas.data || []);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Error al buscar afiliado o plantillas.");
    }
  };

  // Seleccionar plantilla
  const handleSeleccionarPlantilla = (plantilla) => {
    setPlantillaSeleccionada(plantilla);
    const reemplazo = reemplazarTexto(plantilla.mensaje || "", afiliado);
    setMensajeFinal(reemplazo);
  };

  // Enviar plantilla (real al backend)
  const handleEnviar = async () => {
    if (!plantillaSeleccionada) {
      alert("Selecciona una plantilla primero.");
      return;
    }

    try {
      const payload = {
        CUILAfiliado: afiliado.CUILAfiliado,
        direccion: afiliado.direccion,
        idContrato: afiliado.idContrato,
        asunto: plantillaSeleccionada.asunto || "Sin asunto",
        plantilla: plantillaSeleccionada.nombrePlantilla,
        mensaje: mensajeFinal,
      };

      const res = await consulta.post(`/email/api/plantillas/enviar`, payload);

      if (res.status === 200 || res.status === 201) {
        alert("Correo enviado correctamente ✅");
        navigate("/Correos");
      } else {
        alert("No se pudo enviar el correo ❌");
      }
    } catch (err) {
      console.error("Error al enviar correo:", err);
      alert("Ocurrió un error al enviar el correo.");
    }
  };

  return (
    <main className="enviar-container">
      {step === 1 && (
        <div className="step-cuil">
          <h2>Ingresar CUIL del afiliado</h2>
          <input
            type="text"
            placeholder="Número de CUIL"
            value={cuil}
            onChange={(e) => setCuil(e.target.value)}
          />
          <button className="btn-aceptar" onClick={handleAceptar}>
            Aceptar
          </button>
          <button className="btn-volver" onClick={() => navigate("/Correos")}>
            Volver
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step-plantillas">
          <h2>Seleccionar Plantilla</h2>
          <div className="lista-plantillas">
            {plantillas.map((p) => (
              <div
                key={p.id}
                className={`card-plantilla ${
                  plantillaSeleccionada?.id === p.id ? "selected" : ""
                }`}
                onClick={() => handleSeleccionarPlantilla(p)}
              >
                <h3>{p.nombrePlantilla}</h3>
                <p className="preview">{p.mensaje?.slice(0, 80) || ""}...</p>
              </div>
            ))}
          </div>

          {plantillaSeleccionada && (
            <div className="vista-previa">
              <h3>Vista previa:</h3>
              <p>{mensajeFinal}</p>
            </div>
          )}

          <div className="acciones">
            <button className="btn-enviar" onClick={handleEnviar}>
              Enviar
            </button>
            <button
              className="btn-volver"
              onClick={() => {
                setStep(1);
                setAfiliado(null);
                setPlantillas([]);
                setPlantillaSeleccionada(null);
                setMensajeFinal("");
              }}
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
