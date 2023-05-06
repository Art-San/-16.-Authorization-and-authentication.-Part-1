import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// Auth Provider, создали базу, в следующем уроке реализуем метод для входа в систему

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    return <AuthContext.Provider>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
