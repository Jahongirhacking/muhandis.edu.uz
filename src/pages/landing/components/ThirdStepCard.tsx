import { Card, Flex, Image, Typography } from "antd";
import { ReactElement } from "react";

const ThirdStepCard = ({ index, img, children }: { index: number; img: string; children: ReactElement }) => {
    return (
        <Card className="step-card third-step-card scalable-card">
            <Flex vertical gap={24} align="center">
                <Flex className="card-header" gap={24} align="center" justify='space-between'>
                    <Typography.Title level={2}>{index}</Typography.Title>
                    <Image src={img} preview={false} />
                </Flex>
                {children}
            </Flex>
        </Card>
    )
}

export default ThirdStepCard