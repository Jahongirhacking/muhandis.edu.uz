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
        // expert
        if (role === Role.Expert) return <Navigate to={'/expert/applications'} replace />
        // ministry
        if (role === Role.Ministry) return <Navigate to={'/ministry/applications'} replace />
        // comission
        if (role === Role.Comission) return <Navigate to={'/comission/applications'} replace />
    }

    return (
        <Navigate to={'/error'} replace />
    )
}

export default CallbackPage