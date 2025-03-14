import { Flex } from "antd"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useLazyGetMeQuery, useLazyGetPhotoQuery } from "../services/user"
import { RootState } from "../store/store"
import { getLocalStorage, localStorageNames, setLocalStorage } from "../utils/storageUtils"
import "./DashboardLayout.scss"

const DashboardLayout = () => {
    const profile = useSelector((store: RootState) => store.user?.profile);
    const [getMe] = useLazyGetMeQuery();
    const [getPhoto] = useLazyGetPhotoQuery();
    const hasFetched = useRef(false);
    const dispatch = useDispatch();

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
                    dis
                    setLocalStorage(localStorageNames.photo, photo)
                }
            })())
        }
    }, [getPhoto, profile?.pinfl])

    return (
        <Flex vertical className="dashboard-layout">
            <Flex className="dashboard-layout-main">
                <Flex className="dashboard-layout-navbar">
                    <Navbar />
                </Flex>
                <Flex vertical className="dashboard-layout-content-wrapper">
                    <Flex vertical className="dashboard-layout-content">
                        <Outlet />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DashboardLayout