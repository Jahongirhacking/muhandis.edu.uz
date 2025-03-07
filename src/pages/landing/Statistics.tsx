import { Divider, Flex, Select, Switch, Typography } from "antd";
import { useState } from "react";
import { SVGMap } from 'react-svg-map';
import Uzbekistan from '../../assets/map';

type PointedLocation = {
    name: null | string;
    count?: number;
};

interface IEvent {
    target: { attributes: { name: { value: string } } };
}

const Statistics = () => {
    const [pointedLocation, setPointedLocation] = useState<PointedLocation>({
        name: null
    });
    const [selectedLocation, setSelectedLocation] = useState('Toshkent shahri');
    const [tooltipStyle, setTooltipStyle] = useState({
        display: "none",
    });

    const getLocationName = (event: IEvent) => {
        return event.target.attributes.name.value;
    }

    const handleLocationMouseOver = (event: IEvent) => {
        const pointedLocation = getLocationName(event);
        setPointedLocation({
            name: pointedLocation,
        });
    };

    function handleLocationMouseOut() {
        setPointedLocation({ name: null });
        setTooltipStyle({ display: "none" });
    }

    function handleLocationMouseMove(event: {
        clientY: number;
        clientX: number;
    }) {
        const tooltipStyle = {
            display: "block",
            top: event.clientY - 80,
            left: event.clientX - 100,
        };
        setTooltipStyle(tooltipStyle);
    }

    return (
        <Flex vertical className="statistics" id="stats">
            <Flex vertical className="padding-box" align="center" gap={72}>
                <Flex gap={40} align="center" style={{ width: '100%' }} justify="flex-start" data-aos="fade-up">
                    <Typography.Title level={1} className="title-text" style={{ margin: 0 }}>
                        <span className="main-text">Statistik</span> ma’lumotlar
                    </Typography.Title>

                    <video autoPlay loop muted playsInline className="background-video" width={120}>
                        <source src="/videos/speaking_ball.mp4" />
                    </video>
                </Flex>

                <Flex className="map" gap={32} wrap data-aos="fade-up" data-aos-duration="2000">
                    <SVGMap
                        className="region_map"
                        locationClassName="region_map__location"
                        map={Uzbekistan}
                        onLocationMouseOver={handleLocationMouseOver}
                        onLocationMouseOut={handleLocationMouseOut}
                        onLocationMouseMove={handleLocationMouseMove}
                        onLocationClick={(e) => setSelectedLocation(getLocationName(e))}
                    />
                    <div className="region_map__tooltip" style={tooltipStyle}>
                        <h3>{pointedLocation.name}</h3>
                    </div>
                    <Flex vertical gap={24} className="stat-board">
                        <Flex gap={12} align="center" justify="space-between" wrap>
                            <Typography.Title level={2} style={{ margin: 0 }} className="selected-location">{selectedLocation}</Typography.Title>
                            <Flex gap={12} align="center">
                                <Typography.Text>O‘zbekiston Respublikasi</Typography.Text>
                                <Switch />
                            </Flex>
                        </Flex>
                        <Flex vertical gap={8}>
                            <Typography.Text>Oliy ta’lim muassasasini tanlang</Typography.Text>
                            <Select placeholder={`${selectedLocation}dan oliy ta’lim muassasini tanlang`} />
                        </Flex>
                        <Flex gap={17} wrap>
                            {
                                [
                                    { title: 'Eng yaxshi g’oya arizalar soni', total: 6000, students: 3000, engineers: 2000, teachers: 1000 },
                                    { title: 'Eng yaxshi loyiha arizalar soni', total: 6000, students: 3000, engineers: 2000, teachers: 1000 },
                                    { title: 'Eng yaxshi ixtiro arizalar soni', total: 6000, students: 3000, engineers: 2000, teachers: 1000 },
                                ].map((elem, index) => (
                                    <Flex vertical gap={24} key={index} className="stat-item">
                                        <Flex vertical gap={12}>
                                            <Typography.Title level={4} className="stat-total">{elem.title}</Typography.Title>
                                            <Typography.Text className="total-num title-text">{elem.total} ta</Typography.Text>
                                        </Flex>
                                        <Divider style={{ margin: 0 }} />
                                        <Flex vertical gap={12}>
                                            <Typography.Title level={5} className="stat-students">Talabalar</Typography.Title>
                                            <Typography.Text className="students-num stat-num title-text">{elem.students} ta</Typography.Text>
                                        </Flex>
                                        <Divider style={{ margin: 0 }} />
                                        <Flex vertical gap={12}>
                                            <Typography.Title level={5} className="stat-engineers">Amaliyotchi muhandislar</Typography.Title>
                                            <Typography.Text className="engineers-num stat-num title-text">{elem.engineers} ta</Typography.Text>
                                        </Flex>
                                        <Divider style={{ margin: 0 }} />
                                        <Flex vertical gap={12}>
                                            <Typography.Title level={5} className="stat-teachers">O‘qituvchilar va professorlar</Typography.Title>
                                            <Typography.Text className="teachers-num stat-num title-text">{elem.teachers} ta</Typography.Text>
                                        </Flex>
                                    </Flex>
                                ))
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Statistics