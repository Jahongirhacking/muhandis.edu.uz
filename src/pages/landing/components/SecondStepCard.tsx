import { Card, Flex, Image, Typography } from "antd";

const SecondStepCard = ({ img, name }: { img: string; name: string }) => {
    return (
        <Card className="step-card second-step-card scalable-card">
            <Flex vertical gap={32} align="center">
                <Flex className="card-speciality" gap={24} align="center">
                    <Image loading="lazy" src={img} preview={false} alt={`${name} rasmi`} />
                    <Typography.Text>{name}</Typography.Text>
                </Flex>

                <Flex vertical className="participant-number">
                    <Typography.Title level={1} className="title-text">30</Typography.Title>
                    <Typography.Text strong className="title-text">nafardan</Typography.Text>
                </Flex>

                <Flex vertical gap={24} className="card__participants">
                    <Flex gap={8}>
                        <Typography.Text strong>10</Typography.Text>
                        <Image loading="lazy" src="/images/participant_1.svg" preview={false} />
                        <Typography.Text>Talabalar</Typography.Text>
                    </Flex>
                    <Flex gap={8}>
                        <Typography.Text strong>10</Typography.Text>
                        <Image loading="lazy" src="/images/participant_2.svg" preview={false} />
                        <Typography.Text>Amaliyotchi muhandislar</Typography.Text>
                    </Flex>
                    <Flex gap={8}>
                        <Typography.Text strong>10</Typography.Text>
                        <Image loading="lazy" src="/images/participant_3.svg" preview={false} />
                        <Typography.Text>O‘qituvchilar va professorlar</Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default SecondStepCard