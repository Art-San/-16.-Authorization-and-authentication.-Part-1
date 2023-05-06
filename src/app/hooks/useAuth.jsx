import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    // Метод Sign Up (Регистрация)
    async function singUp({ email, password }) {
        const key = '' // в кабинете firebase  шестиренка/Project settings/Web API Key
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}` // это endpoint из документации firebase
        const { data } = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        })
        console.log('data', data)
    }
    return (
        <AuthContext.Provider value={{ singUp }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
