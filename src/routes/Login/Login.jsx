import React, { useContext, useState } from "react";
import "./Login.css";

import { LoginContext } from "../../context/SessionContext";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const { usuario, logearUsuario } = useContext(LoginContext)

    const validateEmail = (email) => {
        // Regex para validar email con dominio válido (.com, .ar, .net, etc.)
        const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError("");

            if (!validateEmail(email)) {
                setError("Por favor, ingresa un correo válido.");
                return;
            }

            if (!password) {
                setError("Por favor, ingresa tu contraseña.");
                return;
            }

            const info = {
                email: email,
                password: password,
            };

            const loggged = await logearUsuario(info)
            if (loggged.usuarios === 0) {
                throw new Error(loggged.msg);
            }

            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    if (usuario && usuario.token) {
        // Redirigir si hay sesión activa
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>

                {/* Campo Email */}
                <label>Email</label>
                <input
                    type="text"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Campo Contraseña con botón de mostrar */}
                <label>Contraseña</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                {/* Mensaje de error */}
                {error && <p className="error-message">{error}</p>}

                {/* Botón de login */}
                <button type="submit" className="login-button">
                    Ingresar
                </button>
            </form>
        </div>
    );
}
