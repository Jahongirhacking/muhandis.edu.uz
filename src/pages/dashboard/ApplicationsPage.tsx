import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Flex, Typography } from "antd"

const ApplicationsPage = () => {
    return (
        <Flex vertical className="applications-page">
            <Typography.Title level={2}>Ariza topshirish</Typography.Title>
            <Flex gap={12} justify="space-between" style={{ width: "100%" }}>
                <Flex gap={12} align="center">
                    <Button variant="outlined" icon={<FileDoneOutlined />}>Ariza yuborildi</Button>
                    <Button variant="outlined" icon={<FileDoneOutlined />}>Ariza yuborildi</Button>
                    <Button variant="outlined" icon={<FileDoneOutlined />}>Ariza yuborildi</Button>
                    <Button variant="outlined" icon={<FileDoneOutlined />}>Ariza yuborildi</Button>
                </Flex>
                <Button variant="filled" color="cyan" icon={<PlusOutlined />}>Ariza yuborildi</Button>
            </Flex>
        </Flex>
    )
}

export default ApplicationsPage