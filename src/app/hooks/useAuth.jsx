import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify' // Продолжаем создавать Sign Up
import axios from 'axios'
import userService from '../services/user.service'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const TOKEN_KEY = 'jwt-token' // Продолжаем создавать Sign Up
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

const AuthProvider = ({ children }) => {
    // Продолжаем создавать Sign Up
    const [currentUser, setUser] = useState({})
    const [error, setError] = useState(null)
    function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
        const expiresDate = new Date().getTime() + expiresIn * 1000
        localStorage.setItem(TOKEN_KEY, idToken)
        localStorage.setItem(REFRESH_KEY, refreshToken)
        localStorage.setItem(EXPIRES_KEY, expiresDate)
    }
    async function singUp({ email, password, ...rest }) {
        const key = ''
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            console.log('data', data)
            setTokens(data)
            await createUser({ _id: data.localId, email, ...rest })
        } catch (error) {
            errorCatcher(error)
        }
    }
    // Продолжаем создавать Sign Up
    async function createUser(data) {
        try {
            const { content } = userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    // Продолжаем создавать Sign Up
    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    return (
        <AuthContext.Provider value={{ singUp, currentUser }}>
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
