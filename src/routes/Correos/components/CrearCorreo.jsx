import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearCorreo.css';

export default function CrearCorreo() {
    const navigate = useNavigate();

    // estado para múltiples destinatarios (array) y input temporal
    const [recipients, setRecipients] = useState([]);
    const [recipientInput, setRecipientInput] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const inputRef = useRef(null);

    // validadores
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;

    const isValidRecipient = (value) => {
        return emailRegex.test(value) || cuitRegex.test(value);
    };

    // agrega uno o varios destinatarios a partir de un texto separado por comas
    const addRecipientsFromText = (text) => {
        const parts = text
            .split(',')
            .map((p) => p.trim())
            .filter(Boolean);

        const invalid = [];
        const newRecipients = [...recipients];

        parts.forEach((p) => {
            if (!isValidRecipient(p)) {
                invalid.push(p);
            } else {
                if (!newRecipients.includes(p)) newRecipients.push(p);
            }
        });

        setRecipients(newRecipients);
        return { added: newRecipients, invalid };
    };

    // tecla Enter o coma -> agregar
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (!recipientInput.trim()) return;
            const { invalid } = addRecipientsFromText(recipientInput);
            if (invalid.length) {
                alert('Destinatarios inválidos: ' + invalid.join(', '));
            }
            setRecipientInput('');
        }
    };

    // pegar múltiples destinatarios (soporta pegar "a@b.com, c@d.com")
    const handlePaste = (e) => {
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        if (paste.includes(',')) {
            e.preventDefault();
            const { invalid } = addRecipientsFromText(paste);
            if (invalid.length) alert('Destinatarios inválidos: ' + invalid.join(', '));
            setRecipientInput('');
        }
    };

    const removeRecipient = (idx) => {
        setRecipients(recipients.filter((_, i) => i !== idx));
    };

    const handleEnviar = () => {
        // si queda texto en el input, intentamos agregarlo
        if (recipientInput.trim()) {
            const { invalid } = addRecipientsFromText(recipientInput);
            if (invalid.length) {
                alert('Destinatarios inválidos: ' + invalid.join(', '));
                return;
            }
            setRecipientInput('');
        }

        if (recipients.length === 0) {
            alert('Agrega al menos un destinatario (email o CUIT).');
            return;
        }
        if (!asunto.trim()) {
            alert('Completa el asunto.');
            return;
        }
        if (!mensaje.trim()) {
            alert('Completa el mensaje.');
            return;
        }

        // aquí iría la lógica real de envío (API). Ahora simulamos:
        alert(
            `Correo enviado a ${recipients.length} destinatario(s):\n\n${recipients.join(
                ', '
            )}\n\nAsunto: ${asunto}`
        );

        // reset
        setRecipients([]);
        setAsunto('');
        setMensaje('');
    };

    return (
        <main className='Correos'>
            <div className="crear-container">

                <h2>Crear Nuevo Correo</h2>

                <label className="label">Destinatarios</label>
                <div
                    className="recipients-input"
                    onClick={() => inputRef.current && inputRef.current.focus()}
                >
                    {recipients.map((r, idx) => (
                        <span className="recipient-chip" key={r + idx}>
                            {r}
                            <button
                                type="button"
                                className="remove-recipient"
                                onClick={() => removeRecipient(idx)}
                                aria-label={`Eliminar ${r}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}

                    <input
                        ref={inputRef}
                        className="recipient-text-input"
                        value={recipientInput}
                        onChange={(e) => setRecipientInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder="Agregar destinatario y presiona Enter (puedes pegar varios separados por ',')"
                    />
                </div>

                <label className="label">Asunto</label>
                <input
                    type="text"
                    placeholder="Asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                />

                <label className="label">Mensaje</label>
                <textarea
                    placeholder="Escribe tu mensaje aquí..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                ></textarea>

                <div className="buttons-row">
                    <button className="btn-enviar" onClick={handleEnviar}>
                        Enviar
                    </button>
                    <button className="btn-volver" onClick={() => navigate('/Correos')}>
                        Volver
                    </button>
                </div>
            </div>
        </main>
    );
}
