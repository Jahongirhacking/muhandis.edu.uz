import { Flex } from "antd"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import CustomDrawer from "../components/CustomDrawer"
import Navbar from "../components/Navbar"
import { useLazyGetDoctorateQuery, useLazyGetWorkplaceListQuery } from "../services/applicant"
import { useLazyGetMeQuery, useLazyGetPhotoQuery } from "../services/user"
import { setPhoto } from "../store/slices/userSlice"
import { RootState } from "../store/store"
import { getLocalStorage, localStorageNames } from "../utils/storageUtils"
import "./DashboardLayout.scss"

const DashboardLayout = () => {
    const profile = useSelector((store: RootState) => store.user?.profile);
    const [getMe] = useLazyGetMeQuery();
    const [getPhoto] = useLazyGetPhotoQuery();
    const [getWorkplace] = useLazyGetWorkplaceListQuery();
    const [getDoctorate] = useLazyGetDoctorateQuery();
    const hasFetched = useRef(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location.pathname]); // Runs when the route changes

    useEffect(() => {
        if (!hasFetched.current) {
            getMe();
            hasFetched.current = true;
        }
    }, [getMe])

    useEffect(() => {
        if (!getLocalStorage(localStorageNames.photo) && profile?.pinfl) {
            ((async () => {
                const { data } = await getPhoto({ pinfl: profile.pinfl! });
                const photo = data?.photo;
                if (photo) {
                    dispatch(setPhoto(photo));
                }
            })())
        }
    }, [getPhoto, profile?.pinfl, dispatch])

    useEffect(() => {
        getWorkplace();
    }, [getWorkplace])


    useEffect(() => {
        getDoctorate();
    }, [getDoctorate])

    return (
        <Flex vertical className="dashboard-layout">
            <Flex className="dashboard-layout-main">
                <Flex className="dashboard-layout-navbar">
                    <Navbar />
                </Flex>
                <Flex vertical className="dashboard-layout-content-wrapper">
                    <Flex vertical className="dashboard-layout-content" ref={contentRef}>
                        <Outlet />
                    </Flex>
                </Flex>
            </Flex>
            <CustomDrawer className="dashboard-drawer" />
        </Flex>
    )
}

export default DashboardLayout