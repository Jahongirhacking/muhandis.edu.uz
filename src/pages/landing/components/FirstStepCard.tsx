import { Card, Flex, Image, Typography } from "antd";

const FirstStepCard = ({ img, name, info }: { img: string; name: string; info: string }) => {
    return (
        <Card className="step-card first-step-card scalable-card">
            <Flex vertical gap={24} align="center">
                <Image src={img} preview={false} alt={`${name} rasmi`} />
                <Flex vertical gap={12} className="step-card-info">
                    <Typography.Title level={4}>{name}</Typography.Title>
                    <Typography.Text>{info}</Typography.Text>
                </Flex>
                <Flex vertical gap={24} className="card__specialities">
                    <Flex gap={24}>
                        <Image src="/images/idea.svg" preview={false} />
                        <Typography.Text>Eng yaxshi g’oya</Typography.Text>
                    </Flex>
                    <Flex gap={24}>
                        <Image src="/images/project.svg" preview={false} />
                        <Typography.Text>Eng yaxshi loyiha</Typography.Text>
                    </Flex>
                    <Flex gap={24}>
                        <Image src="/images/invention.svg" preview={false} />
                        <Typography.Text>Eng yaxshi ixtiro</Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default FirstStepCard