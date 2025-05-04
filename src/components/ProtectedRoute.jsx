import { useEffect } from "react"
import { useGetUserQuery } from "../redux/api/user.api"
import { Navigate, Outlet } from "react-router-dom"
import ProtectedNavbar from "./ProtectedNavbar"
import Sidebar from "./sidebar/Sidebar"

const ProtectRoute = () => {

    const { isLoading, isSuccess, isError, data } = useGetUserQuery()

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("_PBA_ID", data.data.token)
        }
    }, [isSuccess, data])

    if (isError) {
        return <Navigate to="/login" />
    }

    if (isLoading) {
        return <p>Loading ....</p>
    }


    if (isSuccess) {
        return (
            <div className="flex h-screen">
                <Sidebar />
                <div className="h-screen overflow-y-scroll w-full">
                    <Outlet />
                </div>
            </div>
        )
    }

    return null
}

export default ProtectRoute