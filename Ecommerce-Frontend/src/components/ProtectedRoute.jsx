import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

export function ProtectedRoute({children}) {
    const {user} = useAuth();
    if (!user) return <Navigate to="/signIn" replace/>
    return children
}