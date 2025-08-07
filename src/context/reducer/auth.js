export const initialState = JSON.parse(localStorage.getItem('andesToken')) || {
    token: '',
    usuario: '',
    permisos: ''
}

export const updateUserLocalStorage = (info) => {
    window.localStorage.setItem('andesToken', JSON.stringify(info));
}

export const loginActions = {
    singin: 'LOGIN',
    tokenLogin: 'TOKEN',
    singout: 'LOGOUT'
}

export const authReducer = (state, action) => {

    const { type: actionType, payload: actionPayload } = action;
    const valores = actionPayload;

    // Login
    if (actionType === loginActions.singin) {
        let obj = {
            token: valores.token,
            usuario: valores.usuario,
            permisos: valores.permisos
        }
        updateUserLocalStorage(obj)
        return obj
    }


    //Comprobar Token
    if (actionType === loginActions.tokenLogin) {

        if (valores.token === undefined || valores.token === null) {
            return state
        }

        let obj = {
            token: valores.token,
            usuario: valores.usuario,
            permisos: valores.permisos
        }
        updateUserLocalStorage(obj)
        return obj
    }

    // Logout
    if (actionType === loginActions.singout) {

        updateUserLocalStorage({
            token: '',
            usuario: '',
            permisos: ''
        })

        return initialState
    }

    return state;
}