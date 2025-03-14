import { Avatar, Button, Card, Flex, Switch, Typography } from "antd"
import moment from "moment"
import { useSelector } from "react-redux"
import { UpdateIcon } from "../../assets/icons"
import { Gender } from "../../services/types"
import { RootState } from "../../store/store"
import { base64ToNormalImage } from "../../utils/imageUtils"
import { getLocalStorage, localStorageNames } from "../../utils/storageUtils"

const MainPage = () => {
    const profile = useSelector((store: RootState) => store.user?.profile);
    // const {data} = useGetStudentListQuery();

    return (
        <Flex vertical className="main-page" gap={24} style={{ paddingBottom: 40 }}>
            <Typography.Title level={2} style={{ margin: 0 }}>Asosiy sahifa</Typography.Title>
            <Flex gap={24} wrap className="card-container">
                <Flex vertical gap={24}>
                    <Card className="profile-card">
                        <Flex gap={24} align="flex-start" justify="center" wrap>
                            <Avatar
                                shape="square"
                                src={base64ToNormalImage(getLocalStorage(localStorageNames.photo))}
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
                                        <Typography.Text>Doimiy yashash manzili (vIloyat,tuman)</Typography.Text>
                                        <Typography.Text strong>{profile?.mip_address}</Typography.Text>
                                    </Flex>
                                    <Flex className="contact-field" gap={12} align="center" wrap>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Telefon raqami</Typography.Text>
                                            <Typography.Text strong className={`${!profile?.phone_number ? "undefined" : ''}`}>{profile?.phone_number || "—"}</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Elektron pochta</Typography.Text>
                                            <Typography.Text strong className={`${!profile?.phone_number ? "undefined" : ''}`}>{profile?.email || "—"}</Typography.Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Card className="education-card" title="Ta’lim ma’lumoti">
                        <Flex vertical gap={12}>
                            <Flex vertical gap={4}>
                                <Typography.Text>O‘quv muassasasi nomi</Typography.Text>
                                <Typography.Text strong>Toshkent axborot texnologiyalari universiteti</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Mutaxasisslik</Typography.Text>
                                <Typography.Text strong>Kompyuter injiniringi: Kompyuter injiniringi</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Daraja</Typography.Text>
                                <Typography.Text strong>Bakalavr</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Ta’lim bosqichi</Typography.Text>
                                <Typography.Text strong>1-kurs</Typography.Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Flex>
                <Flex vertical>
                    <Card className="workplace-card" title="Mehnat ma’lumoti" extra={<Button type="primary" icon={<UpdateIcon />}>Ma’lumotni yangilash</Button>}>
                        <Flex vertical gap={12}>
                            <Flex vertical gap={4}>
                                <Typography.Text>Tashkilot nomi</Typography.Text>
                                <Typography.Text strong>Raqamli ta'lim texnologiyalarini rivojlantirish markazi" davlat muassasasi</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Bo'lim</Typography.Text>
                                <Typography.Text strong>Axborot tizimlarini loyihalashtirish va ishlab chiqish bo‘limi</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Lavozim</Typography.Text>
                                <Typography.Text strong>Bosh mutaxassis</Typography.Text>
                            </Flex>
                            <Flex gap={12} justify="space-between" align="center" wrap>
                                <Flex vertical gap={4}>
                                    <Typography.Text>Mehnat davri</Typography.Text>
                                    <Typography.Text strong>2023-07-13 - hozirgacha</Typography.Text>
                                </Flex>
                                <Flex gap={6} align="center">
                                    <Switch />
                                    <Typography.Text>Asosiy qilib tanlash</Typography.Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Card className="workplace-card selected">
                        <Flex vertical gap={12}>
                            <Flex vertical gap={4}>
                                <Typography.Text>Tashkilot nomi</Typography.Text>
                                <Typography.Text strong>Raqamli ta'lim texnologiyalarini rivojlantirish markazi" davlat muassasasi</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Bo'lim</Typography.Text>
                                <Typography.Text strong>Axborot tizimlarini loyihalashtirish va ishlab chiqish bo‘limi</Typography.Text>
                            </Flex>
                            <Flex vertical gap={4}>
                                <Typography.Text>Lavozim</Typography.Text>
                                <Typography.Text strong>Bosh mutaxassis</Typography.Text>
                            </Flex>
                            <Flex gap={12} justify="space-between" align="center" wrap>
                                <Flex vertical gap={4}>
                                    <Typography.Text>Mehnat davri</Typography.Text>
                                    <Typography.Text strong>2023-07-13 - hozirgacha</Typography.Text>
                                </Flex>
                                <Flex gap={6} align="center">
                                    <Switch />
                                    <Typography.Text>Asosiy qilib tanlash</Typography.Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default MainPage