import { useEffect } from "react"
import { useGetUserQuery } from "../redux/api/user.api"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "./Navbar"




const PublicRoute = () => {

    const { isLoading, isSuccess, isError, data } = useGetUserQuery()

    useEffect(() => {
        if (isSuccess) {
            window.localStorage.setItem("_PBA_ID", data.data.token)
        }
    }, [isSuccess, isError])

    if (isError) {
        return <><Navbar /><Outlet /></>
    }

    else if (isSuccess) {
        return <Navigate to="/dashboard" />
    }

    else if (isLoading) {
        return <p>Loading ....</p>
    }

}

export default PublicRoute