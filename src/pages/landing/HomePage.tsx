import { Button, Card, Flex, Image, Tag, Typography } from "antd"
import './style.scss'

const HomePage = () => {
    return (
        <Flex vertical className="home-page">
            {/* Header section */}
            <Flex className="header" justify="center" align="center">
                <Flex className="padding-box" gap={12} justify='space-between' align="center">
                    <Flex className="logo" gap={8} align="center">
                        <Image src="/icon.svg" preview={false} width={32} alt="logo" />
                        <Typography.Title level={2} style={{ margin: 0 }}>Muhandis edu</Typography.Title>
                    </Flex>
                    <Button type='primary' className="main-btn primary-btn">Ro‘yxatdan o‘tish</Button>
                </Flex>
            </Flex>
            {/* Hero section*/}
            <Flex vertical className="video-container">
                <video autoPlay loop muted playsInline className="background-video">
                    <source src="/videos/intro.mp4" type="video/mp4" />
                    Brauzeringiz ushbu video formatini tanimadi
                </video>
                <div className="video-overlay"></div>
                <Flex vertical gap={24} className="video-text-content padding-box">
                    <Typography.Title level={1} className="title-text" style={{ margin: 0 }}>
                        Muhandislik yo‘nalishlari bo‘yicha respublika tanlovi
                    </Typography.Title>
                    <Typography.Text>
                        Agar siz muhandislikka qiziqsangiz va innovatsion fikrlaringiz bo‘lsa, bu tanlov siz uchun ajoyib imkoniyat!
                    </Typography.Text>
                </Flex>
            </Flex>
            {/* Specialities section*/}
            <Flex vertical className="specialities" align="center">
                <Flex vertical className="padding-box" gap={56}>
                    <Flex vertical className="content">
                        <Typography.Title className="title-text">Tanlovning yo‘nalishlari</Typography.Title>
                        <Typography.Text>
                            <span className="light">Tanlov quyidagi  </span>
                            <span className="dark">3 ta yoʻnalishda oʻtkaziladi</span>
                        </Typography.Text>
                    </Flex>
                    <Flex gap={32} className="speciality-cards" align="center" justify='center' wrap>
                        {
                            [
                                { label: "Eng yaxshi g’oya", icon: "./images/idea.svg" },
                                { label: "Eng yaxshi loyiha", icon: "./images/project.svg" },
                                { label: "Eng yaxshi ixtiro", icon: "./images/invention.svg" }
                            ].map((spec, index) => (
                                <Card key={index} className="speciality-card">
                                    <Flex vertical align="center" justify="center" gap={48}>
                                        <Image src={spec.icon} preview={false} alt={spec.label} />
                                        <Tag>{spec.label}</Tag>
                                    </Flex>
                                </Card>
                            ))
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default HomePage