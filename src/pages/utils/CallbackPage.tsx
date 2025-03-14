import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "../../services/types";
import { login } from "../../store/slices/userSlice";

const CallbackPage = () => {
    const token = Cookies.get("token");
    const role = Cookies.get('role') as Role;
    const dispatch = useDispatch();

    if (token && role) {
        dispatch(login({ token, role }))
        return <Navigate to={'/dashboard/main'} replace />
    }

    return (
        <Navigate to={'/error'} replace />
    )
}

export default CallbackPage