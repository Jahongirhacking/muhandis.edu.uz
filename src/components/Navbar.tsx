import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { ApplicationsFilledIcon, ApplicationsIcon, HomeFilledIcon, HomeIcon, LogoutIcon, NotificationFilledIcon, NotificationIcon, VerifiedIcon } from '../assets/icons';
import { logout } from '../store/slices/userSlice';
import { RootState } from '../store/store';
import { base64ToNormalImage } from '../utils/imageUtils';
import CompleteStatus from './CompleteStatus';
import Logo from './Logo';

interface INavbarItem {
    href: string;
    icon: ReactElement;
    activeIcon: ReactElement;
    title: string;
    isActive?: boolean;
}

const Navbar = () => {
    const dispatch = useDispatch();
    const { profile, photo } = useSelector((store: RootState) => store.user);
    const location = useLocation();
    const navbar: INavbarItem[] = [
        {
            icon: <HomeIcon />,
            activeIcon: <HomeFilledIcon />,
            title: 'Asosiy sahifa',
            href: '/dashboard/main',
        },
        {
            icon: <ApplicationsIcon />,
            activeIcon: <ApplicationsFilledIcon />,
            title: 'Arizalarim',
            href: '/dashboard/applications'
        },
        {
            icon: <NotificationIcon />,
            activeIcon: <NotificationFilledIcon />,
            title: 'Bildirishnomalar',
            href: '/dashboard/notifications'
        }
    ].map(item => ({ ...item, isActive: location.pathname.includes(item?.href) }));

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Flex vertical className="navbar">
            <Flex vertical gap={39} className="navbar-content">
                <Logo />
                <Flex vertical gap={32}>
                    <Card className='profile-card'>
                        <Flex gap={8} align='center' justify="space-between">
                            <Flex gap={8} className="profile-card-avatar" align='center'>
                                <Avatar
                                    size={64}
                                    src={base64ToNormalImage(photo)}
                                    shape='square'
                                >
                                    {profile?.first_name && profile?.last_name && `${profile?.first_name[0]}${profile?.last_name[0]}`}
                                </Avatar>
                                <Flex vertical gap={4}>
                                    <Typography.Text strong>{profile?.first_name} {profile?.last_name}</Typography.Text>
                                    <Flex gap={4} align='center' className='status'>
                                        <VerifiedIcon />
                                        <Typography.Text type="secondary">Tasdiqlangan</Typography.Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            {/* <Button variant="outlined" icon={<ProfileExpandIcon />} /> */}
                        </Flex>
                    </Card>
                    <Flex vertical gap={24} justify='space-between' className='navbar-main-wrapper'>
                        <Flex vertical gap={40} className='navbar-main-container'>
                            <Flex vertical gap={12} className="navbar-links">
                                {
                                    navbar.map((item, index) => (
                                        <NavLink to={item.href} key={index}>
                                            <Button type='default' icon={(
                                                <Flex>
                                                    <span className='filled-icon' style={{ display: `${item?.isActive ? "block" : "none"}` }}>{item.activeIcon}</span>
                                                    <span className='outlined-icon' style={{ display: `${!item?.isActive ? "block" : "none"}` }}>{item.icon}</span>
                                                </Flex>
                                            )}>{item.title}</Button>
                                        </NavLink>
                                    ))
                                }
                            </Flex>
                            <CompleteStatus />
                        </Flex>
                        <Button
                            className='logout-btn'
                            type='default'
                            icon={<LogoutIcon />}
                            onClick={handleLogout}
                        >
                            Tizimdan chiqish
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navbar