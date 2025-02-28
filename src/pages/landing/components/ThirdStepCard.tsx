import { Card, CardProps, Flex, Image, Typography } from "antd";
import { ReactElement } from "react";

interface IThirdStepCard extends CardProps {
    index: number;
    img: string;
    children: ReactElement;
}

const ThirdStepCard = ({ index, img, children, ...props }: IThirdStepCard) => {
    return (
        <Card className="step-card third-step-card scalable-card" {...props}>
            <Flex vertical gap={24} align="center">
                <Flex className="card-header" gap={24} align="center" justify='space-between'>
                    <Typography.Title level={2}>{index}</Typography.Title>
                    <Image loading="lazy" src={img} preview={false} />
                </Flex>
                {children}
            </Flex>
        </Card>
    )
}

export default ThirdStepCard