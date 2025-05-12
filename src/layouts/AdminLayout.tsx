import { BankOutlined, CheckCircleFilled, CloseCircleFilled, ExperimentOutlined, FileTextFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Flex, Menu, MenuProps, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"
import Logo from "../components/Logo"
import { ApplicationStatusChoice, ApplicationSubmitAsChoice, getApplicationChoiceName, getRoleName, Role } from "../services/types"
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
    const SPLIT_SIGN = '-';

    const getToken = (...keys: string[]): string => keys.join(SPLIT_SIGN);

    const handleChangeMenuKey: MenuProps['onClick'] = (e) => {
        const newParams = new URLSearchParams(searchParams);
        if (role === Role.Comission) {
            const [hasGrade, submitAsChoice] = e.key.split(SPLIT_SIGN);
            newParams.set(SearchParams.HasGrade, hasGrade);
            newParams.set(SearchParams.SubmitAsChoice, submitAsChoice);
            navigate(`/${role}/applications?${newParams.toString()}`);
            return;
        }
        if (e.key === String(ApplicationStatusChoice.SENT) || role === Role.Ministry) navigate(`/${role}/applications`);
        else {
            newParams.set(SearchParams.ApplicationStatus, e.key);
            navigate(`/${role}/applications?${newParams.toString()}`);
        }
    }

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

    return (
        <Flex vertical className="expert-layout">
            <Flex className="expert-header" justify="space-between" align="center">
                <Logo />
                <Flex gap={8} align="center">
                    <Dropdown trigger={['click']} menu={{
                        items: [
                            { label: <Button variant="text" color="danger" icon={<LogoutOutlined />} onClick={() => dispatch(logout())}>Chiqish</Button>, key: 'logout' }
                        ]
                    }}>
                        <Avatar size={50} shape="circle" src={base64ToNormalImage(photo)} style={{ cursor: 'pointer' }}>
                            {profile?.last_name?.slice(0, 1)}{profile?.first_name?.slice(0, 1)}
                        </Avatar>
                    </Dropdown>
                    <Flex vertical gap={4}>
                        <Typography.Text strong>{profile?.last_name} {profile?.first_name?.slice(0, 1)}.</Typography.Text>
                        <Typography.Text>
                            {
                                role === Role.Expert ? (
                                    `Ekspert: ${getApplicationChoiceName(profile?.check_type || 'none')}`
                                ) : role === Role.Ministry ? (
                                    "Vazirlik xodimi"
                                ) : "Komissiya kotibi"
                            }
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex className="expert-layout-main">
                {
                    role !== Role.Ministry && (
                        <Flex className="expert-navbar" vertical justify="space-between">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={role === Role.Comission ? [] : [searchParams.get(SearchParams.ApplicationStatus) || '1']}
                                openKeys={["has-grade", "no-grade"]}
                                onClick={handleChangeMenuKey}
                                items={[...(role === Role.Expert ? [
                                    { key: ApplicationStatusChoice.SENT, label: 'Yangi arizalar', icon: <FileTextFilled style={{ color: '#1677ff' }} /> },
                                    { key: ApplicationStatusChoice.PASSED, label: 'Qabul qilingan arizalar', icon: <CheckCircleFilled style={{ color: '#00d500' }} /> },
                                    { key: ApplicationStatusChoice.REJECTED, label: 'Rad etilgan arizalar', icon: <CloseCircleFilled style={{ color: 'red' }} /> },
                                ] : role === Role.Comission ? [
                                    {
                                        key: "no-grade",
                                        label: "Arizalar",
                                        icon: <FileTextFilled style={{ color: '#1677ff' }} />,
                                        children: [
                                            { key: getToken("false", ApplicationSubmitAsChoice.STUDENT), label: getRoleName(ApplicationSubmitAsChoice.STUDENT), icon: <UserOutlined /> },
                                            { key: getToken("false", ApplicationSubmitAsChoice.PROFESSOR_TEACHER), label: getRoleName(ApplicationSubmitAsChoice.PROFESSOR_TEACHER), icon: <BankOutlined /> },
                                            { key: getToken("false", ApplicationSubmitAsChoice.PRACTICAL_ENGINEER), label: getRoleName(ApplicationSubmitAsChoice.PRACTICAL_ENGINEER), icon: <ExperimentOutlined /> },
                                        ]
                                    },
                                    {
                                        key: "has-grade",
                                        label: "Ko'rib chiqilgan arizalar",
                                        icon: <CheckCircleFilled style={{ color: '#00d500' }} />,
                                        children: [
                                            { key: getToken("true", ApplicationSubmitAsChoice.STUDENT), label: getRoleName(ApplicationSubmitAsChoice.STUDENT), icon: <UserOutlined /> },
                                            { key: getToken("true", ApplicationSubmitAsChoice.PROFESSOR_TEACHER), label: getRoleName(ApplicationSubmitAsChoice.PROFESSOR_TEACHER), icon: <BankOutlined /> },
                                            { key: getToken("true", ApplicationSubmitAsChoice.PRACTICAL_ENGINEER), label: getRoleName(ApplicationSubmitAsChoice.PRACTICAL_ENGINEER), icon: <ExperimentOutlined /> },
                                        ]
                                    }
                                ] : [])]}
                            />
                            <Button variant="text" color="danger" icon={<LogoutOutlined />} onClick={() => dispatch(logout())}>Chiqish</Button>
                        </Flex>
                    )
                }
                <Flex vertical className={`expert-layout-content ${role}-content`} align="center">
                    <Outlet context={{ role }} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default AdminLayout