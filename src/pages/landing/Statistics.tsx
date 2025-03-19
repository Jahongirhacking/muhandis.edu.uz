import { Divider, Flex, Switch, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import Uzbekistan from '../../assets/map';
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import SVGMap from "../../components/SVGMap";
import { useLazyGetRegionStatQuery } from "../../services/classifier";
import { IStat } from "../../services/classifier/types";
import { ApplicationSubmitAsChoice, ApplicationTypeChoice } from "../../services/types";

type PointedLocation = {
    name: null | string;
    count?: number;
};

const Statistics = () => {
    const DEFAULT_REGION_ID = '5';
    const [pointedLocation, setPointedLocation] = useState<PointedLocation>({
        name: null
    });
    const [isRepublic, setIsRepublic] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({
        display: "none",
    });
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_REGION_ID);
    const currentLocationRef = useRef('');
    const [getStat, { data, isFetching }] = useLazyGetRegionStatQuery();

    const getLocationName = (event: React.MouseEvent<SVGPathElement>) => {
        return (event.target as SVGPathElement).getAttribute("name") || "";
    };

    const getLocationId = (event: React.MouseEvent<SVGPathElement>) => {
        return (event.target as SVGPathElement).getAttribute("id") || "";
    };

    const handleLocationMouseOver = (event: React.MouseEvent<SVGPathElement>) => {
        setPointedLocation({
            name: getLocationName(event),
        });
    };

    const handleLocationMouseOut = () => {
        setPointedLocation({ name: null });
        setTooltipStyle({ display: "none" });
    };

    const handleLocationMouseMove = (event: React.MouseEvent<SVGPathElement>) => {
        setTooltipStyle({
            display: "block",
            top: event.clientY - 80,
            left: event.clientX - 100,
        });
    };

    const parseStatData = (stat: IStat[], applicationType: ApplicationTypeChoice): Record<'total' | ApplicationSubmitAsChoice, number> => {
        const total = stat?.reduce((acc, curr) => acc + curr[`${applicationType}_count`], 0);
        const student = stat?.find(el => el?.submit_as === ApplicationSubmitAsChoice.STUDENT);
        const engineer = stat?.find(el => el?.submit_as === ApplicationSubmitAsChoice.PRACTICAL_ENGINEER);
        const teacher = stat?.find(el => el?.submit_as === ApplicationSubmitAsChoice.PROFESSOR_TEACHER);

        return {
            total,
            [ApplicationSubmitAsChoice.STUDENT]: student && student[`${applicationType}_count`] || 0,
            [ApplicationSubmitAsChoice.PRACTICAL_ENGINEER]: engineer && engineer[`${applicationType}_count`] || 0,
            [ApplicationSubmitAsChoice.PROFESSOR_TEACHER]: teacher && teacher[`${applicationType}_count`] || 0
        }
    }

    useEffect(() => {
        if ((selectedLocation !== currentLocationRef.current && !isRepublic) || (isRepublic && !!currentLocationRef.current)) {
            (async () => {
                await getStat({ id: !isRepublic ? selectedLocation : '' });
                if (!isRepublic) {
                    currentLocationRef.current = selectedLocation;
                } else {
                    currentLocationRef.current = ''
                }
            })()
        }
    }, [selectedLocation, getStat, isRepublic]);

    const regionName = Uzbekistan.locations.find(loc => loc.id === selectedLocation)?.name;

    return (
        <Flex vertical className="statistics" id="stats">
            <Flex vertical className="padding-box" align="center" gap={72}>
                <Flex gap={40} align="center" style={{ width: '100%' }} justify="flex-start" data-aos="fade-up">
                    <Typography.Title level={1} className="title-text" style={{ margin: 0 }}>
                        <span className="main-text">Statistik</span> ma’lumotlar
                    </Typography.Title>

                    {/* <video autoPlay loop muted playsInline className="background-video" width={120}>
                        <source src="/videos/speaking_ball.mp4" />
                    </video> */}
                </Flex>

                <Flex className="map" gap={32} wrap data-aos="fade-up" data-aos-duration="2000">
                    <SVGMap
                        className="region_map"
                        locationClassName="region_map__location"
                        map={Uzbekistan}
                        onLocationMouseOver={handleLocationMouseOver}
                        onLocationMouseOut={handleLocationMouseOut}
                        onLocationMouseMove={handleLocationMouseMove}
                        onLocationClick={(e) => {
                            setSelectedLocation(getLocationId(e));
                            setIsRepublic(false);
                        }}
                    />
                    <div className="region_map__tooltip" style={tooltipStyle}>
                        <h3>{pointedLocation.name}</h3>
                    </div>
                    <Flex vertical gap={24} className="stat-board">
                        <Flex gap={12} align="center" justify="space-between" wrap>
                            <Typography.Title level={2} style={{ margin: 0 }} className="selected-location">{isRepublic ? "Respublika miqyosidagi statistika" : regionName}</Typography.Title>
                            <Flex gap={12} align="center">
                                <Typography.Text>Respublika miqyosida</Typography.Text>
                                <Switch onClick={() => setIsRepublic(prev => !prev)} value={isRepublic} />
                            </Flex>
                        </Flex>
                        <Flex gap={17} wrap>
                            {
                                data && !isFetching ? (
                                    [
                                        { title: `"Eng yaxshi g’oya" uchun arizalar soni`, ...parseStatData(data, ApplicationTypeChoice.Idea) },
                                        { title: `"Eng yaxshi loyiha" uchun arizalar soni`, ...parseStatData(data, ApplicationTypeChoice.Project) },
                                        { title: `"Eng yaxshi ixtiro" uchun arizalar soni`, ...parseStatData(data, ApplicationTypeChoice.Invention) },
                                    ].map((elem, index) => (
                                        <Flex vertical gap={24} key={index} className="stat-item">
                                            <Flex vertical gap={12}>
                                                <Typography.Title level={4} className="stat-total">{elem.title}</Typography.Title>
                                                <Typography.Text className="total-num title-text">
                                                    <CountUp end={elem?.total as number} separator=" " />
                                                </Typography.Text>
                                            </Flex>
                                            <Divider style={{ margin: 0 }} />
                                            <Flex vertical gap={12}>
                                                <Typography.Title level={5} className="stat-students">Talabalar</Typography.Title>
                                                <Typography.Text className="students-num stat-num title-text">
                                                    <CountUp end={elem[ApplicationSubmitAsChoice.STUDENT] as number} separator=" " />
                                                </Typography.Text>
                                            </Flex>
                                            <Divider style={{ margin: 0 }} />
                                            <Flex vertical gap={12}>
                                                <Typography.Title level={5} className="stat-engineers">Amaliyotchi muhandislar</Typography.Title>
                                                <Typography.Text className="engineers-num stat-num title-text">
                                                    <CountUp end={elem[ApplicationSubmitAsChoice.PRACTICAL_ENGINEER] as number} separator=" " />
                                                </Typography.Text>
                                            </Flex>
                                            <Divider style={{ margin: 0 }} />
                                            <Flex vertical gap={12}>
                                                <Typography.Title level={5} className="stat-teachers">Professor-o‘qituvchilar</Typography.Title>
                                                <Typography.Text className="teachers-num stat-num title-text">
                                                    <CountUp end={elem[ApplicationSubmitAsChoice.PROFESSOR_TEACHER] as number} separator=" " />
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    ))
                                ) : (
                                    <>
                                        <CardSkeleton className="stat-item" />
                                        <CardSkeleton className="stat-item" />
                                        <CardSkeleton className="stat-item" />
                                    </>
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Statistics