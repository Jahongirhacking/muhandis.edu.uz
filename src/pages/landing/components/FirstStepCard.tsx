import { Card, CardProps, Flex, Image, Typography } from "antd";

interface IFirstStepCard extends CardProps {
    img: string;
    name: string;
    info: string;
}

const FirstStepCard = ({ img, name, info, ...props }: IFirstStepCard) => {
    return (
        <Card className="step-card first-step-card scalable-card" {...props}>
            <Flex vertical gap={24} align="center">
                <Image loading="lazy" src={img} preview={false} alt={`${name} rasmi`} />
                <Flex vertical gap={12} className="step-card-info">
                    <Typography.Title level={4}>{name}</Typography.Title>
                    <Typography.Text>{info}</Typography.Text>
                </Flex>
                <Flex vertical gap={24} className="card__specialities">
                    <Flex gap={24}>
                        <Image loading="lazy" src="/images/idea.svg" preview={false} />
                        <Typography.Text>Eng yaxshi g’oya</Typography.Text>
                    </Flex>
                    <Flex gap={24}>
                        <Image loading="lazy" src="/images/project.svg" preview={false} />
                        <Typography.Text>Eng yaxshi loyiha</Typography.Text>
                    </Flex>
                    <Flex gap={24}>
                        <Image loading="lazy" src="/images/invention.svg" preview={false} />
                        <Typography.Text>Eng yaxshi ixtiro</Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default FirstStepCard