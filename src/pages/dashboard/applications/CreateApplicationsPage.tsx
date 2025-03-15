import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Flex, Progress, Typography } from "antd"
import { useState } from "react"
import { Link } from "react-router-dom"
import ControlledFlow from "../../../components/ControlledFlow"
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"

const CreateApplicationsPage = () => {
    const [data, setData] = useState<object>({});
    const [current, setCurrent] = useState<number>(0);

    return (
        <>
            <Flex gap={16} align="center">
                <Link to={"/dashboard/applications"}>
                    <Button icon={<ArrowLeftOutlined />} shape="circle" />
                </Link>
                <Typography.Title level={2} style={{ margin: 0 }}>Ariza topshirish</Typography.Title>
                <Flex gap={16} align="center" style={{ marginLeft: 16 }}>
                    <Progress type="circle" size="small" percent={current / 2 * 100} />
                    <Flex vertical>
                        <Typography.Text strong>Qadam 1</Typography.Text>
                        <Typography.Text>Ariza ma’lumotlari</Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex vertical className="create-application applications-main">
                <ControlledFlow
                    {...{ current, setCurrent, data, setData }}
                >
                    <Step1 />
                    <Step2 />
                </ControlledFlow>

            </Flex>

        </>
    )
}

export default CreateApplicationsPage