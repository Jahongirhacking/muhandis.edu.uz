import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Role } from "../../services/types";
import { login } from "../../store/slices/userSlice";
import { getLocalStorage, localStorageNames } from "../../utils/storageUtils";

const CallbackPage = () => {
    const token = Cookies.get("token") || getLocalStorage(localStorageNames.token);
    const role = (Cookies.get('role') || getLocalStorage(localStorageNames.role)) as Role;
    const dispatch = useDispatch();
    localStorage.removeItem(localStorageNames.photo);

    if (token && role) {
        dispatch(login({ token, role }))
        // student
        if (role === Role.Applicant) return <Navigate to={'/dashboard/main'} replace />
        // inspector
        if (role === Role.Inspector) return <Navigate to={'/admin'} replace />
        // ministry
        if (role === Role.Ministry) return <Navigate to={'/ministry'} replace />
    }

    return (
        <Navigate to={'/error'} replace />
    )
}

export default CallbackPage