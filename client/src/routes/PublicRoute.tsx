import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import HttpInterceptor from "../utils/HttpInterceptor"
import AuthContext from "../context/AuthContext"

const PublicRoute = () => {
    const {session, setSession} = useContext(AuthContext)
    const getSession = async () => {
        try {
            const {data} = await HttpInterceptor.get("/auth/session")
            setSession(data)
        } catch (err) {
            setSession(false)
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    if(session === null)
        return null

    if(session === false)
        return <Outlet />

  return <Navigate to='/app/dashboard' />
}

export default PublicRoute