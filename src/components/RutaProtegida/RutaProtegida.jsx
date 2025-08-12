import { useContext, useEffect } from 'react';
import { LoginContext } from '../../context/SessionContext';
import { Navigate } from 'react-router-dom';

export const RutaProtegida = ({ children }) => {
    const { usuario, tokenLogin, deslogearUsuario } = useContext(LoginContext)

    // Verificación de autenticación
    const isValidLogin = usuario && usuario.token;

    const updateAuthTokenViejo = () => {
        window.localStorage.removeItem('authToken');
    };

    useEffect(() => {
        // Ejecuta la lógica de login/logout solo después del renderizado inicial
        if (!isValidLogin) {
            updateAuthTokenViejo();
            deslogearUsuario();
        }

    }, [isValidLogin, deslogearUsuario, tokenLogin, usuario]);

    // Redirige si no está autenticado
    if (!isValidLogin) {
        return <Navigate to="/login" />;
    }

    return children;
};