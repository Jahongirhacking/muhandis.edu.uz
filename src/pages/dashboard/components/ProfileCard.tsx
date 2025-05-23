import { Avatar, Button, Card, Flex, Typography } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { EditIcon } from '../../../assets/icons';
import CardSkeleton from '../../../components/Skeletons/CardSkeleton';
import { Gender } from '../../../services/types';
import { RootState } from '../../../store/store';
import { DrawerChildTypes, SearchParams } from '../../../utils/config';
import { base64ToNormalImage } from '../../../utils/imageUtils';

const ProfileCard = () => {
    const { profile, photo } = useSelector((store: RootState) => store.user);
    const [searchParams, setSearchParams] = useSearchParams();

    if (!profile?.id) return <CardSkeleton className='profile-card' />

    const handleOpenContactDrawer = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(SearchParams.Drawer, DrawerChildTypes.RequiredContact);
        setSearchParams(newParams);
    }

    return (
        <Card className="profile-card">
            <Flex gap={24} align="flex-start" justify="center" wrap>
                <Avatar
                    shape="square"
                    src={base64ToNormalImage(photo)}
                >
                    {profile?.first_name && profile?.last_name && `${profile?.first_name[0]}${profile?.last_name[0]}`}
                </Avatar>
                <Flex vertical gap={16}>
                    <Typography.Title className="fullname" level={3} style={{ margin: 0 }}>{`${profile?.last_name} ${profile?.first_name} ${profile?.middle_name}`}</Typography.Title>
                    <Flex vertical gap={12}>
                        <Flex vertical gap={4}>
                            <Typography.Text>Jinsi va tug’ilgan yili</Typography.Text>
                            <Typography.Text strong>{profile?.gender === Gender.Male ? "Erkak" : "Ayol"}, {moment().diff(profile?.birth_date, "years")} yosh ({moment(profile?.birth_date, "YYYY-MM-DD").format("DD.MM.YYYY") ?? ''})</Typography.Text>
                        </Flex>
                        <Flex vertical gap={4}>
                            <Typography.Text>JSHSHIR</Typography.Text>
                            <Typography.Text strong>{profile?.pinfl}</Typography.Text>
                        </Flex>
                        <Flex vertical gap={4}>
                            <Typography.Text>Doimiy yashash manzili (viloyat,tuman)</Typography.Text>
                            <Typography.Text strong>{profile?.mip_address}</Typography.Text>
                        </Flex>
                        <Flex className="contact-field" gap={12} align="center" wrap>
                            <Flex vertical gap={4}>
                                <Typography.Text>Telefon raqami</Typography.Text>
                                <Flex gap={4} align='center'>
                                    <Typography.Text
                                        strong
                                        className={`${!profile?.phone_number ? "undefined" : ''}`}
                                    >
                                        {profile?.phone_number || "—"}
                                    </Typography.Text>
                                    <Button
                                        onClick={handleOpenContactDrawer}
                                        type='text'
                                        icon={<EditIcon />}
                                        variant='text'
                                    />
                                </Flex>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Elektron pochta</Typography.Text>
                                <Flex gap={4} align='center'>
                                    <Typography.Text
                                        strong
                                        className={`${!profile?.phone_number ? "undefined" : ''}`}
                                    >
                                        {profile?.email || "—"}
                                    </Typography.Text>
                                    <Button
                                        onClick={handleOpenContactDrawer}
                                        type='text'
                                        icon={<EditIcon />}
                                        variant='text'
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default ProfileCard