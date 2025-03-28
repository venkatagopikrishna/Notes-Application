import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import authStore from "../stores/authStore"

export default function RequireAuth(props) {

    const store = authStore()

    useEffect(() => {

        if (store.loggedIn === null) {
            store.checkAuth();
        }

    }, []);


    if (store.loggedIn === null) {
        return <div>Loading</div>
    }

    if (store.loggedIn === false) {
        return <Navigate to="/login" />
    }

    return (
        <div>{props.children}</div>
    )
}

