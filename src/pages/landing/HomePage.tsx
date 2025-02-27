import { Button, Card, Flex, Image, Tag, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Link } from "react-router-dom";
import FirstStepCard from "./components/FirstStepCard";
import SecondStepCard from "./components/SecondStepCard";
import ThirdStepCard from "./components/ThirdStepCard";
import './style.scss';

const HomePage = () => {
    const [isExploding, setIsExploding] = useState(false);
    const prizeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsExploding(true);
                    setTimeout(() => setIsExploding(false), 3000); // Reset after 3s
                }
            },
            { threshold: 0.5 } // Adjust this to trigger earlier/later
        );

        if (prizeRef.current) {
            observer.observe(prizeRef.current);
        }

        return () => {
            if (prizeRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(prizeRef.current);
            }
        };
    }, []);

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
                            Tanlov quyidagi <strong>3 ta yoʻnalishda oʻtkaziladi</strong>
                        </Typography.Text>
                    </Flex>
                    <Flex gap={32} className="speciality-cards" align="center" justify='center' wrap>
                        {
                            [
                                { label: "Eng yaxshi g’oya", icon: "./images/idea.svg" },
                                { label: "Eng yaxshi loyiha", icon: "./images/project.svg" },
                                { label: "Eng yaxshi ixtiro", icon: "./images/invention.svg" }
                            ].map((spec, index) => (
                                <Card key={index} className="speciality-card scalable-card">
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

            {/* Prizes section */}
            <Flex vertical className="prizes" align="center" ref={prizeRef}>
                {isExploding && (
                    <ConfettiExplosion force={0.8} duration={2500} particleCount={200} width={window.innerWidth} />
                )}
                <Flex vertical className="padding-box" align="center" gap={40}>
                    <Card className="main-prize-card" style={{ textAlign: 'center' }}>
                        <Flex vertical className="card-content" gap={64}>
                            <Flex vertical gap={40} className="prize-title">
                                <Typography.Title level={2} className="title-text">Ilm, innovatsiya va yutuqlaringizni munosib rag‘batlantiramiz!</Typography.Title>
                                <Typography.Title level={1}>1-O‘RIN</Typography.Title>
                            </Flex>
                            <Flex vertical gap={40} className="prize-content" align='center'>
                                <Image src="/images/prize_1.svg" preview={false} alt="1-sovrin rasmi" />
                                <Flex vertical className="prize-info" gap={16} align="center">
                                    <Typography.Title level={1} className="title-text">Elektromobil</Typography.Title>
                                    <Flex vertical gap={12}>
                                        <Typography.Text>
                                            Birinchi o‘rinni egallagan jami <strong>9 nafar g‘oliblar</strong> elektromobil (bazaviy hisoblash miqdorining 700 baravaridan oshmagan qiymatdagi elektromobil) bilan taqdirlanadi
                                        </Typography.Text>
                                        <Typography.Text className="spoiler">
                                            elektromobil aynan suratdagiday bo‘lmasligi mumkin
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Flex gap={32} className="prize-card-container" justify="center" wrap>
                        <Card className="prize-card scalable-card">
                            <Flex vertical gap={32}>
                                <Flex vertical gap={32}>
                                    <Flex vertical gap={16}>
                                        <Typography.Title level={2}>2-O‘RIN</Typography.Title>
                                        <Typography.Title level={3}>Rivojlangan davlatlarga malaka oshirish</Typography.Title>
                                    </Flex>
                                    <Image src="/images/prize_2.svg" preview={false} alt="2-sovrin rasmi" />
                                </Flex>
                                <Typography.Text className="prize-info">
                                    <strong>Ikkinchi o‘rinni egallagan jami 9 nafar</strong> g‘oliblar hamda 1 nafar “Barqaror rivojlanish uchun eng yaxshi g‘oya/loyiha/ixtiro” nominatsiyasi g‘olibi rivojlangan davlatlarga <strong>120 kundan</strong> ortiq bo‘lmagan muddatga stajirovkaga yuboriladi
                                </Typography.Text>
                            </Flex>
                        </Card>
                        <Card className="prize-card scalable-card">
                            <Flex vertical gap={32}>
                                <Flex vertical gap={32}>
                                    <Flex vertical gap={16}>
                                        <Typography.Title level={2}>3-O‘RIN</Typography.Title>
                                        <Typography.Title level={3}>Bir martalik pul mukofotlari</Typography.Title>
                                    </Flex>
                                    <Image src="/images/prize_3.svg" preview={false} alt="3-sovrin rasmi" style={{ marginTop: '38px' }} />
                                </Flex>
                                <Typography.Text className="prize-info">
                                    <strong>Uchinchi o‘rinni egallagan jami 9 nafar</strong> g‘oliblarga bazaviy hisoblash miqdorining <strong>100 baravari</strong> miqdorida bir martalik pul mukofotlari bilan taqdirlanadi
                                </Typography.Text>
                            </Flex>
                        </Card>
                    </Flex>
                    <Link to={'#'}>
                        <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                    </Link>
                </Flex>
            </Flex>

            {/* Steps section */}
            <Flex vertical className="steps" align="center">
                <Flex vertical className="padding-box" gap={40} align="center">
                    <Flex vertical gap={24} className="steps-title">
                        <Typography.Title level={2} className="title-text">Tanlovda ishtirok etish bosqichlari</Typography.Title>
                        <Typography.Text>Har bir ishtirokchi tanlovning faqatgina bir yoʻnalishida ishtirok etishi mumkin</Typography.Text>
                    </Flex>
                    <Flex vertical className="steps-container" gap={120}>
                        {/* 1ST STEP */}
                        <Flex vertical className="step-item" gap={40}>
                            <Flex vertical className="step-info" gap={16}>
                                <Typography.Title level={3} className="title-text">1-bosqich</Typography.Title>
                                <Typography.Text><strong>Texnik ekspertiza</strong> kelib tushgan hujjatlarning Vazirlik tomonidan tasdiqlangan talablarga muvofiqligini, shuningdek, loyiha hujjatlariga koʻra taqdim etilgan maʼlumotlarni tahlil qilishda xatolarni aniqlash maqsadida amalga oshiriladi.</Typography.Text>
                            </Flex>
                            <ul>
                                <li>
                                    <Typography.Text>- arizaga ilova qilingan shakllarning toʻliqligi va toʻgʻriligini, zarur imzo, muhr va shtamplarning mavjudligini tekshirish;</Typography.Text>
                                </li>
                                <li>
                                    <Typography.Text>- ariza hujjatlarida koʻrsatilgan maʼlumotlarni tekshirish, texnik xatolar va noaniqliklar yoʻqligini tekshirish.</Typography.Text>
                                </li>
                            </ul>
                            <Flex vertical className="step-main" gap={32}>
                                <Typography.Text>Tanlov quyidagi <strong>3 ta kategoriyaning har birida 3 ta yoʻnalishda oʻtkaziladi</strong></Typography.Text>
                                <Flex className="step-cards" gap={32} wrap>
                                    <FirstStepCard
                                        img="/images/step1_1.svg"
                                        name="Talabalar"
                                        info="Bakalavriat hamda magistratura bosqichida tahsil olayotgan talabalar"
                                    />
                                    <FirstStepCard
                                        img="/images/step1_2.svg"
                                        name="Amaliyotchi muhandislar"
                                        info="Oliy ta’lim tashkilotlarida faoliyat yurituvchi professor-o‘qituvchilar"
                                    />
                                    <FirstStepCard
                                        img="/images/step1_3.svg"
                                        name="O‘qituvchilar va professorlar"
                                        info="Doktorantlar, tadqiqotchilar, sanoat va texnopark mutaxassislari ishtirok etadi"
                                    />
                                </Flex>
                            </Flex>
                            <Link to={'#'}>
                                <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                            </Link>
                        </Flex>

                        {/* 2ND STEP */}
                        <Flex vertical className="step-item" gap={40}>
                            <Flex vertical className="step-info" gap={16}>
                                <Typography.Title level={3} className="title-text">2-bosqich</Typography.Title>
                            </Flex>

                            <Flex vertical className="step-main" gap={32}>
                                <Typography.Text><strong>Saralash bosqichi</strong> - quyidagi <strong>yoʻnalishlarning har biridan 10 nafardan</strong> eng yuqori natijaga erishgan ishtirokchilar yakuniy bosqichga oʻtkaziladi.</Typography.Text>
                                <Flex className="step-cards" gap={32} wrap>
                                    <SecondStepCard
                                        img="/images/idea.svg"
                                        name="Eng yaxshi g’oya"
                                    />
                                    <SecondStepCard
                                        img="/images/project.svg"
                                        name="Eng yaxshi loyiha"
                                    />
                                    <SecondStepCard
                                        img="/images/invention.svg"
                                        name="Eng yaxshi ixtiro"
                                    />
                                </Flex>
                            </Flex>

                            <Flex vertical gap={24} className="step-details">
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

                            <Link to={'#'} style={{ marginTop: 16 }}>
                                <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                            </Link>
                        </Flex>

                        {/* 3RD STEP */}
                        <Flex vertical className="step-item" gap={40}>
                            <Flex vertical className="step-info" gap={16}>
                                <Typography.Title level={3} className="title-text">3-bosqich</Typography.Title>
                            </Flex>

                            <Flex vertical className="step-main" gap={32}>
                                <Typography.Text><strong>Baholash va gʻoliblarni aniqlash</strong> - tanlov doirasida taqdim etilgan gʻoya, loyiha, ixtirolar shakliy, mazmuniy, texnik, iqtisodiy va amaliy jihatdan asoslanganligi boʻyicha dastlabki saralash bosqichidan oʻtkazuvchi hamda yakuniy bosqichga yoʻnaltirish maqsadida tegishli vazirliklar, idoralar hamda tarmoq korxonalari vakillaridan tuziladigan mutaxassislar tarkibi.</Typography.Text>
                                <Flex vertical className="step-cards" gap={32}>
                                    <Flex gap={32} wrap>
                                        <ThirdStepCard index={1} img="/images/step3_1.svg">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                        <ThirdStepCard index={2} img="/images/step3_2.svg">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                    </Flex>
                                    <Flex gap={32} wrap>
                                        <ThirdStepCard index={3} img="/images/step3_3.svg">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                        <ThirdStepCard index={4} img="/images/step3_4.svg">
                                            <Typography.Text>Tanlovning yakuniy bosqichida Tanlov ishtirokchilari Tanlov komissiyasi oldida oʻz gʻoya, loyiha va ixtirolarining <strong>taqdimot (prezentatsiya)</strong> koʻrinishida himoyasini oʻtkazadilar.</Typography.Text>
                                        </ThirdStepCard>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex vertical gap={24} className="step-details">
                                <Flex vertical gap={24} className="details-item">
                                    <Typography.Text>Shuningdek, Tanlov komissiyasi tavsiyasi va Tashkiliy qoʻmita qaroriga muvofiq <strong>“Barqaror rivojlanish uchun eng yaxshi gʻoya/loyiha/ixtiro”</strong> nominatsiyasida gʻolib deb topilgan yana <strong>bir nafar ishtirokchisi ham</strong> rivojlangan <span className="important">xorijiy davlatlarga stajirovkalarga yuboriladi.</span></Typography.Text>
                                    <Typography.Text>Ushbu nominatsiya gʻolibi <strong>ekologiya va atrof-muhitni asrash boʻyicha muhandislik ishlanmalari (gʻoya/loyiha/ixtiro)</strong> orasidan aniqlanadi. Bunda, har bir yoʻnalishda dastlabki uchta oʻrinlarni egallagan <strong>gʻoliblardan soʻng eng yuqori ball toʻplagan bir nafar ishtirokchi gʻolib</strong> deb topiladi.</Typography.Text>
                                </Flex>
                                <Flex vertical className="details-item" gap={24}>
                                    <Typography.Text><strong>Tanlov komissiyasi - tanlov doirasida taqdim etilgan gʻoyalar, loyihalar va ixtirolarni koʻrib chiqish, baholash va gʻoliblarni aniqlash maqsadida tegishli vazirliklar, idoralar, tarmoq korxonalari hamda xorijiy tashkilotlar vakillaridan tuziladigan komissiya tarkibi.</strong></Typography.Text>
                                </Flex>
                            </Flex>

                            <Link to={'#'} style={{ marginTop: 24 }}>
                                <Button type="primary" className="main-btn primary-btn">Ariza topshirish</Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default HomePage