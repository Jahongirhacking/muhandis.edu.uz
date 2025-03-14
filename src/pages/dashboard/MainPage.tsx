import { Avatar, Button, Card, Flex, Switch, Typography } from "antd"
import { UpdateIcon } from "../../assets/icons"

const MainPage = () => {
    return (
        <Flex vertical className="main-page">
            <Typography.Title level={2}>Asosiy sahifa</Typography.Title>
            <Flex gap={24} wrap>
                <Flex vertical gap={24}>
                    <Card className="profile-card">
                        <Flex gap={24} align="flex-start" justify="center" wrap>
                            <Avatar shape="square" src={"https://i.pravatar.cc/300"} />
                            <Flex vertical gap={16}>
                                <Typography.Title className="fullname" level={3}>Sardor Rashidov Akmal o‘g’li</Typography.Title>
                                <Flex vertical gap={12}>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>Jinsi va tug’ilgan yili</Typography.Text>
                                        <Typography.Text strong>Erkak, 23 yosh (11.06.1998)</Typography.Text>
                                    </Flex>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>JSHSHIR</Typography.Text>
                                        <Typography.Text strong>1234567891011121314</Typography.Text>
                                    </Flex>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>Doimiy yashash manzili (vIloyat,tuman)</Typography.Text>
                                        <Typography.Text strong>Buxoro,Vobkent</Typography.Text>
                                    </Flex>
                                    <Flex gap={12} justify="space-between" align="center" wrap>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Telefon raqami</Typography.Text>
                                            <Typography.Text strong>+998903718891</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Elektron pochta</Typography.Text>
                                            <Typography.Text strong>abrorreal2000@gmail.com</Typography.Text>
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