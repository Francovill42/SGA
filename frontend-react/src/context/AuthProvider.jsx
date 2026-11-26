import { useCallback, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import API_URL from "../../config/api"

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const [usuario, setUsuario] = useState(null) // { id, nombre, email, rol }
    const [cargando, setCargando] = useState(true)

    const iniciarSesion = useCallback((nuevoToken, datosUsuario) => {
        localStorage.setItem("token", nuevoToken)
        setToken(nuevoToken)
        setUsuario(datosUsuario)
    }, [])

    const cerrarSesion = useCallback(() => {
        localStorage.removeItem("token")
        setToken(null)
        setUsuario(null)
    }, [])

    useEffect(() => {
        const verificarSesion = async () => {
            const tokenGuardado = localStorage.getItem("token")
            
            if (!tokenGuardado) {
                setToken(null)
                setUsuario(null)
                setCargando(false)
                return
            }
            try {
                const respuesta = await fetch(`${API_URL}/auth/me`, 
                    {headers: {Authorization: `Bearer ${tokenGuardado}`}}
                )
            if (!respuesta.ok) {
                throw new Error("Sesión inválida")
            }
            const datos = await respuesta.json()
            setToken(tokenGuardado)
            setUsuario(datos)
            } catch (error){
                console.error("Error al iniciar sesión", error)
                cerrarSesion()
            } finally {
                setCargando(false)
            }
        }
        verificarSesion()
    }, [cerrarSesion])

    const esAdmin = usuario?.rol === "admin"

    return (
        <AuthContext.Provider
        value={{token, usuario, esAdmin, iniciarSesion, cerrarSesion, cargando}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
