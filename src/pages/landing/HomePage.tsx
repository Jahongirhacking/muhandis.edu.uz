import { MenuOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Drawer, Flex, FloatButton, Image, Modal, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import { FacebookIcon, InstagramIcon, TelegramIcon } from "../../assets/icons";
import Logo from "../../components/Logo";
import { RootState } from "../../store/store";
import BallsScene from "./BallsScene";
import Statistics from "./Statistics";
import './style.scss';

const HomePage = () => {
    const prizeRef = useRef<HTMLDivElement | null>(null);
    const [isCarActivated, setIsCarActivated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const token = useSelector((store: RootState) => store.user.token);
    const MAX_NAV_WIDTH = 1420;
    const navigate = useNavigate();

    const { width, height } = useWindowSize();

    const navbar = [
        { title: "Bosh sahifa", href: '#home' },
        { title: "Tanlov yo‘nalishlari", href: '#criteria' },
        { title: "Sovrinlar", href: '#prizes' },
        { title: "Ishtirokchilar", href: '#participants' },
        { title: "Statistika", href: '#stats' },
        // { title: "Yangiliklar", href: '#news' },
        { title: "Nizom", target: "_blank", href: '/documents/final_rules.docx' },
    ];

    const handleLogin = () => {
        if (token) {
            navigate('/auth/callback');
        } else {
            window.location.href = "https://muhandis.edu.uz/api/v1/auth/one-id/";
        }
    }

    useEffect(() => {
        if (width >= MAX_NAV_WIDTH) {
            setIsDrawerOpen(false);
        }
    }, [width])

    return (
        <Flex vertical className="home-page">
            <Modal
                open={isModalOpen}
                closable
                onCancel={() => setIsModalOpen(false)}
                footer={false}
            >
                <Flex vertical gap={12} align="center">
                    <Image loading="lazy" src="/icons/warning.jpg" preview={false} width={240} alt="diqqat" />
                    <Typography.Text>
                        Muhandislik yo‘nalishlari bo‘yicha respublika tanloviga ariza topshirish <strong>16.03.2025</strong> sanasidan boshlanadi.
                    </Typography.Text>
                    <Typography.Text strong>
                        Ariza topshirish uchun namuna fayllarini yuklab oling:
                    </Typography.Text>
                    <Flex vertical gap={8} style={{ textAlign: 'center' }}>
                        <a href="/documents/idea.rar" target="_blank">G'oya uchun namunaviy fayl</a>
                        <a href="/documents/project.rar" target="_blank">Loyiha uchun namunaviy fayl</a>
                        <a href="/documents/invention.rar" target="_blank">Ixtiro uchun namunaviy fayl</a>
                    </Flex>
                </Flex>
            </Modal>

            {/* Mobile nav */}
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} placement="left">
                <Flex vertical gap={24} align="center" justify="center" style={{ width: '100%' }}>
                    {
                        navbar.map((el, index) => (
                            <a href={el.href} key={index} onClick={() => setIsDrawerOpen(false)} target={el.target || ''}>{el.title}</a>
                        ))
                    }
                </Flex>
            </Drawer>

            {/* Header section */}
            <Flex className="header" justify="center" align="center">
                <Flex className="padding-box" gap={12} justify='space-between' align="center">
                    <Logo />
                    <Flex gap={46} align="center">
                        <Flex gap={24} align="center" className="links">
                            {
                                navbar.map((el, index) => (
                                    <a href={el.href} key={index} target={el.target || ''}>{el.title}</a>
                                ))
                            }
                        </Flex>
                        <Flex gap={12} align="center">
                            <Button
                                type='primary'
                                className="main-btn primary-btn"
                                onClick={handleLogin}
                            >
                                Kabinetga o'tish
                            </Button>

                            {
                                width < MAX_NAV_WIDTH && (
                                    <Button
                                        icon={<MenuOutlined />}
                                        className="burger-menu"
                                        onClick={() => { setIsDrawerOpen(prev => !prev) }}
                                    />
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* Hero section*/}
            <Flex vertical className="video-container" id="home">
                <BallsScene />
                <Flex vertical gap={12} className="video-text-content padding-box">
                    {/* <Flex vertical className="view-video-btn">
                        <video autoPlay loop muted playsInline className="view-video-btn__background-video">
                            <source src="/videos/bg-1.mp4" type="video/mp4" />
                        </video>
                        <Button icon={<CaretRightOutlined />} color="default" variant="filled">Promo videoni ko’rish</Button>
                    </Flex> */}
                    <Typography.Title level={1} className="title-text" data-aos-offset="-500" style={{ margin: 0 }} data-aos="fade-up">
                        <span className="main-text">Muhandislik</span> yo‘nalishlari bo‘yicha respublika tanlovi
                    </Typography.Title>
                    <Typography.Text className="info-text" data-aos="fade-up" data-aos-offset="-500">
                        Agar siz muhandislikka qiziqsangiz va innovatsion fikrlaringiz bo‘lsa, bu tanlov siz uchun ajoyib imkoniyat!
                    </Typography.Text>
                </Flex>
                <Flex className="video-box" vertical>
                    <video autoPlay loop muted playsInline className="background-video">
                        <source src="/videos/intro.mp4" type="video/mp4" />
                    </video>
                    <div className="video-overlay" />
                </Flex>
            </Flex>

            {/* Specialities section*/}
            <Flex vertical className="specialities" align="center" id="criteria">
                <Flex vertical className="padding-box" gap={56}>
                    <Flex className="content" gap={30} justify='space-between' wrap>
                        <Typography.Title level={1} className="title-text" data-aos="fade-up">Tanlov <span className="main-text">yo‘nalishlari</span></Typography.Title>
                        <Typography.Text data-aos="fade-up" data-aos-duration="2000">
                            Muhandislik yo‘nalishlari bo‘yicha respublika ko‘rik-tanlovida o‘qituvchilar, talabalar va amaliyotchi muhandislar ishtirok etishi mumkin.
                        </Typography.Text>
                    </Flex>
                    <Flex gap={32} className="speciality-cards" align="center" justify='center' data-aos='fade-up' wrap>
                        {
                            [
                                { label: "Eng yaxshi g’oya", info: "Ilmiy-innovatsion xususiyatga ega bo‘lgan oddiy fikr yoki taklif shaklidagi yangilikni anglatadi. Bu biror muammoni hal qilishga yoki mavjud jarayonni yaxshilashga qaratilgan konseptual yondashuv bo‘lishi lozim. Odatda g‘oya boshlang‘ich bosqichda bo‘ladi va hali rejalashtirish, texnik yechim yoki amaliy qo‘llash darajasiga yetmagan bo‘ladi.", icon: "./images/idea.png", animation: "fade-up-right" },
                                { label: "Eng yaxshi loyiha", info: "G‘oya bosqichidan keyingi daraja bo‘lib, unda g‘oya amalga oshirish uchun aniq rejalashtirilgan va hujjatlashtirilgan shaklda ifodalanadi. Loyihada aniq biznes-reja, maqsadlar, resurslar, vaqt jadvali, bosqichlar va ehtiyojlar belgilab qo‘yiladi. Loyihalar g‘oya asosida quriladi, lekin ular aniq rejalashtirilgan va amalga oshirish uchun aniq yondashuvlarni o‘z ichiga oladi.", icon: "./images/project.png", animation: "fade-up" },
                                { label: "Eng yaxshi ixtiro", info: "Amaliyotda qo‘llanilishi mumkin bo‘lgan yangi, ilgari mavjud bo‘lmagan mahsulot, qurilma yoki texnologiyani yaratishni anglatadi. Ixtirolar odatda maxsus sinovlardan o‘tgan va patentlanadigan obyektlar hisoblanadi. G‘oya va loyihadan keyingi bosqich bo‘lib, real, jismoniy yoki texnik jihatdan aniq shaklga ega. Ixtiro mavjud muammoni hal etuvchi tayyor yechim bo‘lib, undan foydalanish mumkin.", icon: "./images/invention.png", animation: "fade-up-left" }
                            ].map((spec, index) => (
                                <Card key={index} className="speciality-card scalable-card" data-aos={spec.animation || 'fade-up'} style={{ marginTop: width >= 1110 ? index * 160 : 0 }}>
                                    <Flex vertical align="center" justify="center" gap={24}>
                                        <Image loading="lazy" src={spec.icon} preview={false} alt={spec.label} />
                                        <Flex vertical gap={12} align="left">
                                            <Typography.Title level={3} className="title-text main-text">{spec.label}</Typography.Title>
                                            <Typography.Text>{spec.info}</Typography.Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }
                    </Flex>
                </Flex>
            </Flex>


            {/* Video section*/}
            <Flex vertical className="video-section" align="center" id="video">
                <Flex vertical className="padding-box" gap={56}>
                    <Typography.Title level={1} className="title-text" style={{ margin: 0, color: '#fff', textAlign: "center" }}>Muhandislik yo‘nalishlari bo‘yicha respublika tanlovi</Typography.Title>
                    <ReactPlayer
                        playing
                        url={'/videos/video.mp4'}
                        controls
                        light="/images/cover.jpg"
                    // playIcon={<img src="/images/video.png" width={100} />}
                    />
                </Flex>
            </Flex>

            {/* Prizes section */}
            <Flex vertical className="prizes" align="center" style={{ position: 'relative' }} id="prizes" ref={prizeRef}>
                <Confetti
                    width={width}
                    height={3 * height}
                    // recycle={false}
                    numberOfPieces={Math.floor(width / 25)}
                    tweenDuration={20000}
                />
                <Flex vertical className="padding-box" align="center" gap={42}>
                    <Typography.Title level={1} className="prizes-title title-text" data-aos="fade-up" data-aos-duration="2000">Sovrinlar</Typography.Title>
                    <Card className="main-prize-card scalable-card" style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-duration="3000">
                        <Flex vertical className="card-content" gap={64}>
                            <Flex className="badge-container" align="center" justify="center" gap={24} wrap>
                                <Image src="/icons/badge_1.svg" preview={false} alt="1-o'rin" data-aos="fade-up" data-aos-duration="2000" />
                                <Flex vertical gap={8} className="prize-title">
                                    <Typography.Title level={1} data-aos="fade-up" data-aos-duration="2000" className="title-text">1-O‘RIN</Typography.Title>
                                    <Typography.Title level={2} className="title-text" data-aos="fade-up" data-aos-duration="3000">Elektromobil 9 ta</Typography.Title>
                                </Flex>
                            </Flex>
                            <Flex vertical gap={40} className="prize-content" align='center' data-aos="fade-up" data-aos-duration="3000">
                                <Flex className="image-container" onMouseEnter={() => setIsCarActivated(true)}>
                                    <Image className={`${isCarActivated ? "activated" : ""}`} loading="lazy" src="/images/prize_1.svg" preview={false} alt="1-sovrin rasmi" />
                                </Flex>
                                <Flex vertical className="prize-info" gap={16} align="center">
                                    <Flex vertical gap={12}>
                                        <Typography.Text>
                                            Birinchi o‘rinni egallagan jami <strong>9 nafar g‘oliblar</strong> elektromobil (bazaviy hisoblash miqdorining 700 baravaridan oshmagan qiymatdagi elektromobil) bilan taqdirlanadi
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Flex gap={32} className="prize-card-container" justify="center" wrap>
                        <Card className="prize-card scalable-card" data-aos="fade-right" data-aos-duration="2000">
                            <Flex vertical gap={32} data-aos="fade-up" data-aos-duration="3000">
                                <Flex vertical gap={32}>
                                    <Flex className="badge-container" align="center" justify="center" gap={24}>
                                        <Image loading="lazy" src="/icons/badge_2.svg" preview={false} alt="2-o'rin" />
                                        <Typography.Title level={2} className="title-text">
                                            <span className="main-text">2-O‘RIN</span> Rivojlangan davlatlarga <span className="secondary-text">malaka oshirish</span>
                                        </Typography.Title>
                                    </Flex>
                                    <Image loading="lazy" src="/images/prize_2.svg" preview={false} alt="2-sovrin rasmi" />
                                </Flex>
                                <Typography.Text className="prize-info">
                                    <strong>Ikkinchi o‘rinni egallagan jami 9 nafar</strong> g‘oliblar hamda 1 nafar “Barqaror rivojlanish uchun eng yaxshi g‘oya/loyiha/ixtiro” nominatsiyasi g‘olibi rivojlangan davlatlarga <strong>120 kundan</strong> ortiq bo‘lmagan muddatga stajirovkaga yuboriladi
                                </Typography.Text>
                            </Flex>
                        </Card>
                        <Flex vertical gap={32} className="other-cards">
                            <Card className="money-card prize-card scalable-card" data-aos="fade-left" data-aos-duration="2000">
                                <Flex vertical gap={32} data-aos="fade-up" data-aos-duration="3000">
                                    <Flex vertical gap={32}>
                                        <Flex className="badge-container" align="center" justify="center" gap={24}>
                                            <Image loading="lazy" src="/icons/badge_3.svg" preview={false} alt="3-o'rin" />
                                            <Typography.Title level={2} className="title-text">
                                                <span className="main-text">3-O‘RIN </span>BHM 100 baravari <span className="secondary-text">miqdorida bir martalik</span> pul mufokotlari
                                            </Typography.Title>
                                        </Flex>
                                    </Flex>

                                    <Flex gap={24} wrap align='center' justify="center" className="prize-img">
                                        <Image className="prize-img-3" loading="lazy" src="/images/prize_3.svg" preview={false} alt="3-sovrin rasmi" />
                                        <Typography.Title level={1} style={{ margin: 0 }} className="title-text">100X <span>BHM</span></Typography.Title>
                                    </Flex>
                                    <Typography.Text className="prize-info">
                                        <strong>Uchinchi o‘rinni egallagan jami 9 nafar</strong> g‘oliblarga bazaviy hisoblash miqdorining <strong>100 baravari</strong> miqdorida bir martalik pul mukofotlari bilan taqdirlanadi
                                    </Typography.Text>
                                </Flex>
                            </Card>

                            <Card className="extra-card prize-card scalable-card" data-aos="fade-left" data-aos-duration="2000">
                                <Flex vertical gap={24} data-aos="fade-up" data-aos-duration="3000">
                                    <Flex className="badge-container" align="center" justify="center" gap={24}>
                                        <Image loading="lazy" src="/icons/badge_4.svg" preview={false} alt="eng yaxshi" />
                                        <Typography.Title level={2} className="title-text">
                                            “Barqaror rivojlanish <span className="main-text">uchun eng yaxshi gʻoya/loyiha/ixtiro”</span>
                                        </Typography.Title>
                                    </Flex>
                                    <Typography.Text className="prize-info">
                                        Shuningdek, Tanlov komissiyasi tavsiyasi va Tashkiliy qoʻmita qaroriga muvofiq “Barqaror rivojlanish uchun eng yaxshi gʻoya/loyiha/ixtiro” nominatsiyasida gʻolib deb topilgan yana bir nafar ishtirokchisi ham rivojlangan xorijiy davlatlarga stajirovkalarga yuboriladi.
                                    </Typography.Text>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* Participants section */}
            <Flex vertical className="participants" id="participants">
                <Flex vertical className="padding-box" align="center" gap={42}>
                    <Typography.Title level={1} className="title-text">
                        Tanlovda <span className="main-text">kimlar qatnasha oladi?</span>
                    </Typography.Title>
                    <Flex className="cards-container" justify="center" align="flex-start" gap={32} data-aos="fade-up" wrap>
                        {
                            [
                                { label: "Talabalar", info: "Bakalavriat hamda magistratura bosqichida tahsil olayotgan talabalar", video: "./videos/student.mp4", animation: "fade-up-right" },
                                { label: "Amaliyotchi muhandislar", info: "Doktorantlar, tadqiqotchilar, sanoat va texnopark mutaxassislari ishtirok etadi.", video: "./videos/engineer.mp4", animation: "fade-up" },
                                { label: "Professor-o‘qituvchilar", info: "Oliy ta’lim tashkilotlarida faoliyat yurituvchi professor-o‘qituvchilar", video: "./videos/teacher.mp4", animation: "fade-up-left" }
                            ].map((participant, index) => (
                                <Card key={index} data-aos={participant.animation} className="participant-card scalable-card">
                                    <Flex vertical gap={24}>
                                        <Flex className="video-box" vertical>
                                            <video autoPlay loop muted playsInline className="background-video">
                                                <source src={participant.video} />
                                            </video>
                                        </Flex>
                                        <Flex vertical gap={12}>
                                            <Typography.Title level={2} style={{ margin: 0 }} className="title-text">{participant.label}</Typography.Title>
                                            <Typography.Text>{participant.info}</Typography.Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }
                    </Flex>
                </Flex>
            </Flex>

            {/* Statistics section */}
            <Statistics />

            {/* News */}
            {/* <Flex vertical className="news" id="news">
                <Flex vertical className="padding-box" align="center" gap={42}>
                    <Typography.Title level={1} className="title-text">
                        Yangiliklar
                    </Typography.Title>
                    <Flex className="cards-container" justify="center" align="stretch" gap={32} data-aos="fade-up" wrap>
                        {
                            [
                                { title: "Yosh olimlar va tadqiqotchilar har tomonlama qoʻllab-quvvatlanadi", image: "./images/news/news_1.png", time: "11:30 28.11.2024" },
                                { title: "AQShning “Chemonics International” tashkiloti vakillari bilan uchrashuv", image: "./images/news/news_2.png", time: "11:30 28.11.2024" },
                                { title: "O‘zbekiston va Koreya o‘rtasida qishloq xo‘jaligi texnikalarini ishlab chiqarish bo‘yicha hamkorlik aloqalari mustahkamlanmoqda", image: "./images/news/news_3.png", time: "11:30 28.11.2024" }
                            ].map((news, index) => (
                                <Card key={index} className="news-card scalable-card">
                                    <Flex vertical gap={24} className="card-box">
                                        <Flex className="video-box" vertical>
                                            <Image loading="lazy" src={news.image} />
                                        </Flex>
                                        <Flex vertical gap={12} justify="space-between">
                                            <Typography.Title level={2} style={{ margin: 0 }}>{news.title}</Typography.Title>
                                            <Typography.Text>{news.time}</Typography.Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }
                    </Flex>
                </Flex>
            </Flex> */}

            {/* Rules section */}
            {/* <Flex vertical className="rules" id="rules">
                <Flex vertical className="padding-box" align="center" gap={42}>
                    <Flex gap={8} align="center" justify="space-between" style={{ width: "100%" }} wrap>
                        <Typography.Title level={1} className="title-text" style={{ margin: 0 }}>
                            Nizom
                        </Typography.Title>
                        <Button
                            className="main-btn primary-btn"
                            href="/documents/rules.pdf"
                            icon={<FilePdfOutlined />}
                            type="primary"
                        >
                            Yuklash
                        </Button>
                    </Flex>
                    <PdfViewer fileUrl="https://muhandis.edu.uz/documents/rules.pdf" />
                </Flex>
            </Flex> */}

            {/* Motto section */}
            <Flex vertical className="motto" align="center" justify="center">
                <video autoPlay loop muted playsInline className="background-video">
                    <source src="/videos/universe.mp4" />
                </video>
                <div className="video-overlay overlay-1" />
                <div className="video-overlay overlay-2" />

                <Flex className="padding-box" justify="center" align="center" data-aos="fade-up" data-aos-duration="3000">
                    <Typography.Title level={1} className="title-text">Kelajakni Muhandislar quradi!</Typography.Title>
                </Flex>
            </Flex>

            <FloatButton.BackTop />

            {/* Footer section */}
            <footer className="footer">
                <Flex vertical className="padding-box" gap={17} align="center">
                    <Flex justify='space-between' gap={20} style={{ width: '100%' }} className="footer-main" wrap>
                        <Flex vertical gap={40} className="footer-logo">
                            <Logo />
                            <Typography.Text>Muhandislik yo‘nalishlari bo‘yicha respublika tanlovi</Typography.Text>
                        </Flex>
                        <Flex justify='space-between' gap={20} className="footer-social" wrap>
                            <Flex vertical gap={24}>
                                <Typography.Title level={3}>Biz ijtimoiy tarmoqlarda</Typography.Title>
                                <ul>
                                    <li><Button type="text" icon={<Image loading="lazy" preview={false} src={InstagramIcon} />} href="https://www.instagram.com/edu.uz/" target="_blank">Instagram</Button></li>
                                    <li><Button type="text" icon={<Image loading="lazy" preview={false} src={TelegramIcon} />} href="https://t.me/eduuz" target="_blank">Telegram</Button></li>
                                    <li><Button type="text" icon={<Image loading="lazy" preview={false} src={FacebookIcon} />} href="https://www.facebook.com/eduuzofficial" target="_blank">Facebook</Button></li>
                                </ul>
                            </Flex>
                            <Flex vertical gap={24}>
                                <Typography.Title level={3}>Bog’lanish</Typography.Title>
                                <ul>
                                    <li>Ishonch telefoni: <a href="tel:1006">1006</a></li>
                                    <li><a href="https://maps.app.goo.gl/hvKHFGDdqJfKY4AM7" target="_blank">100174, Toshkent sh., Olmazor tumani, Universitet ko‘chasi, 7-uy</a></li>
                                    <li><a href="mailto:edu@exat.uz" target="_blank">edu@exat.uz</a> | <a href="mailto:devonxona@edu.uz" target="_blank">devonxona@edu.uz</a></li>
                                </ul>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Divider style={{ margin: 0, marginTop: 25 }} />
                    <Typography.Text style={{ marginLeft: 'auto' }}>
                        <strong>Ishlab chiqaruvchi:</strong> <a href="https://e-edu.uz/" target="_blank">Raqamli ta'lim texnologiyalarini rivojlantirish markazi</a>
                    </Typography.Text>
                </Flex>
            </footer>
        </Flex>
    )
}

export default HomePage