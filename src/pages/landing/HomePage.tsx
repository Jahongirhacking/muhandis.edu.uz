import { CaretRightOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Divider, Flex, Image, Typography } from "antd";
import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";
import { FacebookIcon, InstagramIcon, TelegramIcon } from "../../assets/icons";
import BallsScene from "./BallsScene";
import FirstStepCard from "./components/FirstStepCard";
import SecondStepCard from "./components/SecondStepCard";
import ThirdStepCard from "./components/ThirdStepCard";
import './style.scss';

const Logo = () => (
    <Flex className="logo main-logo" gap={8} align="center">
        <Image loading="lazy" src="/icon.svg" preview={false} width={32} alt="logo" />
        <Typography.Title level={2} style={{ margin: 0 }}>Muhandis edu</Typography.Title>
    </Flex>
)

const HomePage = () => {
    // const [isExploding, setIsExploding] = useState(false);
    const prizeRef = useRef<HTMLDivElement | null>(null);
    const [isCarActivated, setIsCarActivated] = useState(false);

    const { width, height } = useWindowSize();

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) {
    //                 setIsExploding(true);
    //                 // setTimeout(() => setIsExploding(false), 15000);
    //             }
    //         },
    //         { threshold: 0.5 } // Adjust this to trigger earlier/later
    //     );

    //     if (prizeRef.current) {
    //         observer.observe(prizeRef.current);
    //     }

    //     return () => {
    //         if (prizeRef.current) {
    //             // eslint-disable-next-line react-hooks/exhaustive-deps
    //             observer.unobserve(prizeRef.current);
    //         }
    //     };
    // }, []);

    return (
        <Flex vertical className="home-page">
            {/* Header section */}
            <Flex className="header" justify="center" align="center">
                <Flex className="padding-box" gap={12} justify='space-between' align="center">
                    <Logo />
                    <Button type='primary' className="main-btn primary-btn">Ro‘yxatdan o‘tish</Button>
                </Flex>
            </Flex>

            {/* Hero section*/}
            <Flex vertical className="video-container">
                <BallsScene />
                <Flex vertical gap={12} className="video-text-content padding-box">
                    <Flex vertical className="view-video-btn">
                        <video autoPlay loop muted playsInline className="view-video-btn__background-video">
                            <source src="/videos/bg-1.mp4" type="video/mp4" />
                        </video>
                        <Button icon={<CaretRightOutlined />} color="default" variant="filled">Promo videoni ko’rish</Button>
                    </Flex>
                    <Typography.Title level={1} className="title-text" data-aos-offset="-500" style={{ margin: 0, marginTop: 86 }} data-aos="fade-up">
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
            <Flex vertical className="specialities" align="center">
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
                                <Card key={index} className="speciality-card scalable-card" data-aos={spec.animation || 'fade-up'} style={{ marginTop: index * 160 }}>
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

            {/* Prizes section */}
            <Flex vertical className="prizes" align="center" style={{ position: 'relative' }} ref={prizeRef}>
                {/* {isExploding && ( */}
                <Confetti
                    width={width}
                    height={3 * height}
                    // recycle={false}
                    numberOfPieces={Math.floor(width / 25)}
                    tweenDuration={20000}
                />
                {/* )} */}
                <Flex vertical className="padding-box" align="center" gap={42}>
                    <Typography.Title level={1} className="prizes-title title-text" data-aos="fade-up" data-aos-duration="2000">Sovrinlar</Typography.Title>
                    <Card className="main-prize-card scalable-card" style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-duration="3000">
                        <Flex vertical className="card-content" gap={64}>
                            <Flex className="badge-container" align="center" justify="center" gap={24} wrap>
                                <Image src="/icons/badge_1.svg" preview={false} alt="1-o'rin" data-aos="fade-up" data-aos-duration="2000" />
                                <Flex vertical gap={8} className="prize-title">
                                    <Typography.Title level={1} data-aos="fade-up" data-aos-duration="2000" className="title-text">1-O‘RIN</Typography.Title>
                                    <Typography.Title level={2} className="title-text" data-aos="fade-up" data-aos-duration="3000">Elektromobil</Typography.Title>
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
                                        <Image src="/icons/badge_2.svg" preview={false} alt="2-o'rin" />
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
                                            <Image src="/icons/badge_3.svg" preview={false} alt="3-o'rin" />
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
                                        <Image src="/icons/badge_4.svg" preview={false} alt="eng yaxshi" />
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

            {/* participants section */}
            <Flex className="participants">
                <Typography.Title level={1} className="title-text">
                    Tanlovda <span className="main-text">kimlar qatnasha oladi?</span>
                </Typography.Title>
            </Flex>

            {/* Steps section */}
            <Flex vertical className="steps" align="center">
                <Flex vertical className="padding-box" gap={40} align="center">
                    <Flex vertical gap={24} className="steps-title" data-aos="fade-up">
                        <Typography.Title level={2} className="title-text">Tanlovda ishtirok etish bosqichlari</Typography.Title>
                        <Typography.Text>Har bir ishtirokchi tanlovning faqatgina bir yoʻnalishida ishtirok etishi mumkin</Typography.Text>
                    </Flex>
                    <Flex vertical className="steps-container" gap={120}>
                        {/* 1ST STEP */}
                        <Flex vertical className="step-item first-item" gap={40}>
                            <Flex vertical className="step-info" gap={16} data-aos="fade-up">
                                <Typography.Title level={3} className="title-text">1-bosqich</Typography.Title>
                                <Typography.Text><strong>Texnik ekspertiza</strong> kelib tushgan hujjatlarning Vazirlik tomonidan tasdiqlangan talablarga muvofiqligini, shuningdek, loyiha hujjatlariga koʻra taqdim etilgan maʼlumotlarni tahlil qilishda xatolarni aniqlash maqsadida amalga oshiriladi.</Typography.Text>
                            </Flex>
                            <ul data-aos="fade-up">
                                <li>
                                    <Typography.Text>- arizaga ilova qilingan shakllarning toʻliqligi va toʻgʻriligini, zarur imzo, muhr va shtamplarning mavjudligini tekshirish;</Typography.Text>
                                </li>
                                <li>
                                    <Typography.Text>- ariza hujjatlarida koʻrsatilgan maʼlumotlarni tekshirish, texnik xatolar va noaniqliklar yoʻqligini tekshirish.</Typography.Text>
                                </li>
                            </ul>
                            <Flex vertical className="step-main" gap={32}>
                                <Typography.Text data-aos="fade-up">Tanlov quyidagi <strong>3 ta kategoriyaning har birida 3 ta yoʻnalishda oʻtkaziladi</strong></Typography.Text>
                                <Flex className="step-cards" gap={32} wrap>
                                    <FirstStepCard
                                        img="/images/step1_1.svg"
                                        name="Talabalar"
                                        info="Bakalavriat hamda magistratura bosqichida tahsil olayotgan talabalar"
                                        data-aos="fade-up-right"
                                    />
                                    <FirstStepCard
                                        img="/images/step1_2.svg"
                                        name="Amaliyotchi muhandislar"
                                        info="Oliy ta’lim tashkilotlarida faoliyat yurituvchi professor-o‘qituvchilar"
                                        data-aos="fade-up"
                                    />
                                    <FirstStepCard
                                        img="/images/step1_3.svg"
                                        name="O‘qituvchilar va professorlar"
                                        info="Doktorantlar, tadqiqotchilar, sanoat va texnopark mutaxassislari ishtirok etadi"
                                        data-aos="fade-up-left"
                                    />
                                </Flex>
                            </Flex>
                            <Link to={'#'} data-aos="fade-up">
                                <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                            </Link>
                        </Flex>

                        {/* 2ND STEP */}
                        <Flex vertical className="step-item second-item" gap={40}>
                            <Flex vertical className="step-info" gap={16} data-aos="fade-up">
                                <Typography.Title level={3} className="title-text">2-bosqich</Typography.Title>
                            </Flex>

                            <Flex vertical className="step-main" gap={32}>
                                <Typography.Text data-aos="fade-up"><strong>Saralash bosqichi</strong> - quyidagi <strong>yoʻnalishlarning har biridan 10 nafardan</strong> eng yuqori natijaga erishgan ishtirokchilar yakuniy bosqichga oʻtkaziladi.</Typography.Text>
                                <Flex className="step-cards" gap={32} wrap>
                                    <SecondStepCard
                                        img="/images/idea.svg"
                                        name="Eng yaxshi g’oya"
                                        data-aos="fade-up-right"
                                    />
                                    <SecondStepCard
                                        img="/images/project.svg"
                                        name="Eng yaxshi loyiha"
                                        data-aos="fade-up"
                                    />
                                    <SecondStepCard
                                        img="/images/invention.svg"
                                        name="Eng yaxshi ixtiro"
                                        data-aos="fade-up-left"
                                    />
                                </Flex>
                            </Flex>

                            <Flex vertical gap={24} className="step-details" data-aos="fade-up">
                                <Flex vertical gap={24} className="details-item">
                                    <Typography.Title level={4}>Dastlabki saralash bosqichi quyidagi baholash mezonlari asosida oʻtkaziladi</Typography.Title>
                                    <ul>
                                        <li><Typography.Text>gʻoya, loyiha va ixtirolar <strong>mazmuniy jihatdan toʻliq yoritib berilganligi – 20 ballgacha;</strong></Typography.Text></li>
                                        <li><Typography.Text>gʻoya, loyiha va ixtirolarga oid <strong>texnik chizmalar, konseptual grafikalar yoki modellar taqdim etilganligi – 10 ballgacha;</strong></Typography.Text></li>
                                        <li><Typography.Text>taklif etilayotgan gʻoya, loyiha va ixtirolarning <strong>dolzarbligi, amalga oshirish imkoniyatlari tahliliy maʼlumotlar asosida yoritib berilganligi – 20 ballgacha;</strong></Typography.Text></li>
                                        <li><Typography.Text>taklif etilayotgan gʻoya, loyiha va ixtirolarni amalga oshirish uchun <strong>zarur mablagʻlarni mablagʻlarning aniq va asoslangan hisob-kitob qilinganligi – 10 ballgacha;</strong></Typography.Text></li>
                                        <li><Typography.Text>taklif etilayotgan gʻoya, loyiha va ixtirolarni amalga oshirishning <strong>ijtimoiy-iqtisodiy samaradorligi tahliliy maʼlumotlar asosida yoritib berilganligi – 20 ballgacha;</strong></Typography.Text></li>
                                        <li><Typography.Text>taklif etilayotgan gʻoya, loyiha va ixtirolarning <strong>zamonaviyligi, raqobatbardoshligi, amaliyotga joriy etish ehtimoli va texnik tayyorligi – 20 ballgacha.</strong></Typography.Text></li>
                                    </ul>
                                </Flex>
                                <Flex vertical className="details-item" gap={24}>
                                    <Typography.Text>Ishchi guruh tomonidan gʻoya, loyiha va ixtirolarning <strong>yakuniy ballari Ishchi guruh aʼzolari ballarining oʻrtacha arifmetik qiymati bilan belgilanadi;</strong></Typography.Text>
                                    <Typography.Text>Ikki yoki undan ortiq ishtirokchilarning <strong>yakuniy ballari bir xil boʻlgan hollarda</strong> gʻoliblar Tanlov komissiyasi aʼzolari tomonidan <strong>ovoz berish</strong> yoʻli bilan aniqlanadi;</Typography.Text>
                                </Flex>
                            </Flex>

                            <Link to={'#'} style={{ marginTop: 16 }} data-aos="fade-up">
                                <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                            </Link>
                        </Flex>

                        {/* 3RD STEP */}
                        <Flex vertical className="step-item third-item" gap={40}>
                            <Flex vertical className="step-info" gap={16} data-aos="fade-up">
                                <Typography.Title level={3} className="title-text">3-bosqich</Typography.Title>
                            </Flex>

                            <Flex vertical className="step-main" gap={32}>
                                <Typography.Text data-aos="fade-up"><strong>Baholash va gʻoliblarni aniqlash</strong> - tanlov doirasida taqdim etilgan gʻoya, loyiha, ixtirolar shakliy, mazmuniy, texnik, iqtisodiy va amaliy jihatdan asoslanganligi boʻyicha dastlabki saralash bosqichidan oʻtkazuvchi hamda yakuniy bosqichga yoʻnaltirish maqsadida tegishli vazirliklar, idoralar hamda tarmoq korxonalari vakillaridan tuziladigan mutaxassislar tarkibi.</Typography.Text>
                                <Flex vertical className="step-cards" gap={32}>
                                    <Flex gap={32} wrap>
                                        <ThirdStepCard index={1} img="/images/step3_1.svg" data-aos="fade-right">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                        <ThirdStepCard index={2} img="/images/step3_2.svg" data-aos="fade-left">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                    </Flex>
                                    <Flex gap={32} wrap>
                                        <ThirdStepCard index={3} img="/images/step3_3.svg" data-aos="fade-right">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                        <ThirdStepCard index={4} img="/images/step3_4.svg" data-aos="fade-left">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex vertical gap={24} className="step-details" data-aos="fade-up">
                                <Flex vertical gap={24} className="details-item">
                                    <Typography.Text>Shuningdek, Tanlov komissiyasi tavsiyasi va Tashkiliy qoʻmita qaroriga muvofiq <strong>“Barqaror rivojlanish uchun eng yaxshi gʻoya/loyiha/ixtiro”</strong> nominatsiyasida gʻolib deb topilgan yana <strong>bir nafar ishtirokchisi ham</strong> rivojlangan <span className="important">xorijiy davlatlarga stajirovkalarga yuboriladi.</span></Typography.Text>
                                    <Typography.Text>Ushbu nominatsiya gʻolibi <strong>ekologiya va atrof-muhitni asrash boʻyicha muhandislik ishlanmalari (gʻoya/loyiha/ixtiro)</strong> orasidan aniqlanadi. Bunda, har bir yoʻnalishda dastlabki uchta oʻrinlarni egallagan <strong>gʻoliblardan soʻng eng yuqori ball toʻplagan bir nafar ishtirokchi gʻolib</strong> deb topiladi.</Typography.Text>
                                </Flex>
                                <Flex vertical className="details-item" gap={24}>
                                    <Typography.Text><strong>Tanlov komissiyasi - tanlov doirasida taqdim etilgan gʻoyalar, loyihalar va ixtirolarni koʻrib chiqish, baholash va gʻoliblarni aniqlash maqsadida tegishli vazirliklar, idoralar, tarmoq korxonalari hamda xorijiy tashkilotlar vakillaridan tuziladigan komissiya tarkibi.</strong></Typography.Text>
                                </Flex>
                            </Flex>

                            <Link to={'#'} style={{ marginTop: 24 }} data-aos="fade-up">
                                <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* FAQ section */}
            <Flex vertical className="faq" align="center" data-aos="fade-up">
                <Flex vertical className="padding-box" gap={72} align="center">
                    <Typography.Title level={1} className="title-text">Eng ko‘p beriladigan savollar</Typography.Title>
                    <Collapse
                        expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
                        expandIconPosition="end"
                        items={[
                            { key: 1, label: 'Tanlov nechta bosqichdan iborat?', children: 'Lorem Ipsum' },
                            { key: 2, label: 'Har bir bosqich uchun qanday muddatlar belgilangan?', children: 'Lorem Ipsum' },
                            { key: 3, label: 'Ariza topshirishda muammo yuzaga kelsa, kimga murojaat qilish mumkin?', children: 'Lorem Ipsum' },
                            { key: 4, label: 'Tashkilotchilar bilan qanday bog‘lanish mumkin?', children: 'Lorem Ipsum' },
                            { key: 5, label: 'Taqdim etilgan loyihalarning mualliflik huquqi qanday himoyalanadi?', children: 'Lorem Ipsum' },
                        ]}
                    />
                </Flex>
            </Flex>

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
                                    <li><Button type="text" icon={<Image loading="lazy" preview={false} src={InstagramIcon} />} href="#">Instagram</Button></li>
                                    <li><Button type="text" icon={<Image loading="lazy" preview={false} src={TelegramIcon} />} href="#">Telegram</Button></li>
                                    <li><Button type="text" icon={<Image loading="lazy" preview={false} src={FacebookIcon} />} href="#">Facebook</Button></li>
                                </ul>
                            </Flex>
                            <Flex vertical gap={24}>
                                <Typography.Title level={3}>Bog’lanish</Typography.Title>
                                <ul>
                                    <li>Ishonch telefoni: <a href="tel:1006">1006</a></li>
                                    <li><a href="#">100095, Toshkent shahri, 2-Chimboy k, 96-uy</a></li>
                                    <li><a href="#">Telegram bot</a></li>
                                </ul>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Divider style={{ margin: 0, marginTop: 25 }} />
                    <Typography.Text style={{ marginLeft: 'auto' }}>
                        <strong>Ishlab chiqaruvchi:</strong> Raqamli ta'lim texnologiyalarini rivojlantirish markazi
                    </Typography.Text>
                </Flex>
            </footer>
        </Flex>
    )
}

export default HomePage