import { CheckCircleFilled, CloseCircleFilled, FileTextFilled, LogoutOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Menu, MenuProps, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"
import Logo from "../components/Logo"
import { ApplicationStatusChoice, getApplicationChoiceName, Role } from "../services/types"
import { useLazyGetMeQuery, useLazyGetPhotoQuery } from "../services/user"
import { logout, setPhoto } from "../store/slices/userSlice"
import { RootState } from "../store/store"
import { SearchParams } from "../utils/config"
import { base64ToNormalImage } from "../utils/imageUtils"
import { getLocalStorage, localStorageNames } from "../utils/storageUtils"
import "./AdminLayout.scss"

export interface AdminContext {
    role?: Role
}

const AdminLayout = ({ role = Role.Expert }: AdminContext) => {
    const { profile, photo } = useSelector((store: RootState) => store.user);
    const dispatch = useDispatch();
    const [getPhoto] = useLazyGetPhotoQuery();
    const [getMe] = useLazyGetMeQuery();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (profile?.role === 'applicant') {
            dispatch(logout());
        }
    }, [profile?.role, dispatch])

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
    }, [getPhoto, profile?.pinfl, dispatch]);

    useEffect(() => {
        getMe();
    }, [getMe])

    useEffect(() => {
        if (profile?.role && profile?.role !== role) {
            dispatch(logout());
        }
    }, [profile?.role, role, dispatch]);

    const handleChangeMenuKey: MenuProps['onClick'] = (e) => {
        if (e.key === String(ApplicationStatusChoice.SENT) || role === Role.Ministry) navigate(`/${role}/applications`);
        else {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(SearchParams.ApplicationStatus, e.key);
            navigate(`/${role}/applications?${newParams.toString()}`);
        }
    }

    return (
        <Flex vertical className="expert-layout">
            <Flex className="expert-header" justify="space-between" align="center">
                <Logo />
                <Flex gap={8} align="center">
                    <Avatar size={50} shape="circle" src={base64ToNormalImage(photo)}>
                        {profile?.last_name?.slice(0, 1)}{profile?.first_name?.slice(0, 1)}
                    </Avatar>
                    <Flex vertical gap={4}>
                        <Typography.Text strong>{profile?.last_name} {profile?.first_name?.slice(0, 1)}.</Typography.Text>
                        <Typography.Text>
                            {
                                role === Role.Expert ? (
                                    `Ekspert: ${getApplicationChoiceName(profile?.check_type || 'none')}`
                                ) : role === Role.Ministry ? (
                                    "Vazirlik xodimi"
                                ) : "Admin"
                            }
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex className="expert-layout-main">
                {

                    <Flex className="expert-navbar" vertical justify="space-between">
                        <Menu
                            defaultSelectedKeys={[searchParams.get(SearchParams.ApplicationStatus) || '1']}
                            onClick={handleChangeMenuKey}
                            items={[...(role === Role.Expert ? [
                                { key: '1', label: 'Yangi arizalar', icon: <FileTextFilled style={{ color: '#1677ff' }} /> },
                                { key: '2', label: 'Qabul qilingan arizalar', icon: <CheckCircleFilled style={{ color: '#00d500' }} /> },
                                { key: '10', label: 'Rad etilgan arizalar', icon: <CloseCircleFilled style={{ color: 'red' }} /> },
                            ] : role === Role.Ministry ? [
                                { key: '0', label: "Barcha arizalar", icon: <FileTextFilled style={{ color: '#1677ff' }} /> }
                            ] : [])]}
                        />
                        <Button variant="text" color="danger" icon={<LogoutOutlined />} onClick={() => dispatch(logout())}>Chiqish</Button>
                    </Flex>

                }
                <Flex vertical className="expert-layout-content">
                    <Outlet context={{ role }} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default AdminLayout