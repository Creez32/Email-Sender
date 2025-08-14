import React, { useReducer } from 'react';
import { authReducer, initialState } from './reducer/auth';
import apiConfig from '../utils/apiConfig';
import axios from 'axios';

// Contexto para manejar la sesión del usuario
const LoginContext = React.createContext();

function useLoginReducer() {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const logearUsuario = async (item) => {
        try {
            const baseURL = apiConfig.productionUrl; // Cambia según el entorno
            console.log (baseURL)
            const loginRouter = '/users/login';
            const responseLogin = await axios.post(`${baseURL}${loginRouter}`, item);
            if (responseLogin.status !== 200) {
                throw new Error(responseLogin.data.message || 'Error al iniciar sesión');
            }

            dispatch({ type: 'LOGIN', payload: responseLogin.data });

            return {
                usuarios: 1,
                msg: 'Usuario logueado correctamente',
                data: responseLogin.data
            };

        } catch (error) {
            return {
                usuarios: 0,
                msg: error.message,
                data: []
            }
        }
    }

    const tokenLogin = async (token) => {
        try {
            const baseURL = apiConfig.localUrl; // Cambia según el entorno
            const loginRouter = '/users/tokenLogin';
            const responseToken = await axios.post(`${baseURL}${loginRouter}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (responseToken.status !== 200) {
                throw new Error(responseToken.data.message || 'Error al verificar el token');
            }

            dispatch({ type: 'TOKEN', payload: responseToken.data });
            return {
                usuarios: 1,
                msg: 'Token verificado correctamente',
                data: responseToken.data
            };

        } catch (error) {
            console.error('Error al verificar el token:', error);
            dispatch({ type: 'LOGOUT' });
            return {
                usuarios: 0,
                msg: error.message || 'Error al verificar el token',
                data: []
            }
        }
    }

    const deslogearUsuario = async () => {
        dispatch({ type: 'LOGOUT' });
    }

    return {
        state,
        logearUsuario,
        tokenLogin,
        deslogearUsuario
    };

}


const LoginProvider = ({ children }) => {
    const { state, logearUsuario, tokenLogin, deslogearUsuario } = useLoginReducer();

    return (
        <LoginContext.Provider value={{ usuario: state, logearUsuario, tokenLogin, deslogearUsuario }}>
            {children}
        </LoginContext.Provider>
    );
}

export { LoginContext, LoginProvider };