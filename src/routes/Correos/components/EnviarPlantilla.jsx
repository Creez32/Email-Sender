import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnviarPlantilla.css';

export default function EnviarPlantilla() {
    const navigate = useNavigate();
    const [destinatario, setDestinatario] = useState('');

    const handleEnviar = () => {
        if (!destinatario.trim()) {
            alert('Por favor ingresa un mail o CUIT válido.');
            return;
        }
        // Aquí iría la lógica real de envío
        alert(`Plantilla enviada a: ${destinatario}`);
    };

    return (
        <div className="enviar-container">
            <h2>Enviar Plantilla</h2>
            <input
                type="text"
                placeholder="Ingresar email o CUIT"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
            />
            <button className="btn-enviar" onClick={handleEnviar}>
                Enviar
            </button>

            <button className="btn-volver" onClick={() => navigate('/Correos')}>
                Volver
            </button>
        </div>
    );
}
