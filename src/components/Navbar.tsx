import { FileTextOutlined, HomeOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ProfileExpandIcon, VerifiedIcon } from '../assets/icons';
import Logo from './Logo';

interface INavbarItem {
    href: string;
    icon: ReactElement;
    title: string;
}

const Navbar = () => {
    const navbar: INavbarItem[] = [
        {
            icon: <HomeOutlined />,
            title: 'Asosiy sahifa',
            href: '/dashboard/main'
        },
        {
            icon: <FileTextOutlined />,
            title: 'Arizalarim',
            href: '/dashboard/applications'
        },
        {
            icon: <NotificationOutlined />,
            title: 'Bildirishnomalar',
            href: '/dashboard/notifications'
        }
    ];

    return (
        <Flex vertical className="dashboard-layout-navbar">
            <Flex vertical gap={39} className="dashboard-layout-navbar-content">
                <Logo />
                <Flex vertical className="dashboard-layout-navbar-links">
                    <Card className='profile-card'>
                        <Flex gap={8} align='center' justify="space-between">
                            <Flex className="profile-card-avatar" align='center'>
                                <Avatar size={64} src="https://i.pravatar.cc/300" shape='square' />
                                <Flex vertical gap={4}>
                                    <Typography.Text strong>John Doe</Typography.Text>
                                    <Flex gap={4}>
                                        <VerifiedIcon />
                                        <Typography.Text type="secondary">Tasdiqlangan</Typography.Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Button variant="outlined" icon={<ProfileExpandIcon />} />
                        </Flex>
                    </Card>
                    <Flex vertical gap={12}>
                        {
                            navbar.map((item, index) => (
                                <Link to={item.href}>
                                    <Button key={index} variant="outlined" icon={item.icon}>{item.title}</Button>
                                </Link>
                            ))
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navbar