import { PlusOutlined } from "@ant-design/icons"
import { Button, Empty, Flex, Typography } from "antd"
import { Link } from "react-router-dom"
import { ArchiveIcon, CurrentApplicationsIcon, EmptyIcon } from "../../../assets/icons"

const ViewApplicationsPage = () => {
    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>Ariza topshirish</Typography.Title>
            <Flex vertical gap={24} className="view-application applications-main">
                <Flex gap={12} justify="space-between" style={{ width: "100%" }} wrap>
                    <Flex gap={12} align="center" wrap className="sort-container">
                        <Button variant="outlined" icon={<CurrentApplicationsIcon />}>Arizalar</Button>
                        <Button variant="outlined" icon={<ArchiveIcon />}>Arxiv</Button>
                    </Flex>
                    <Link to="/dashboard/applications/create">
                        <Button className="create-btn" type="primary" icon={<PlusOutlined />}>Ariza yaratish</Button>
                    </Link>
                </Flex>
                <Flex vertical gap={12} className="applications-container">
                    <Empty
                        style={{ margin: "auto" }}
                        image={<EmptyIcon />}
                        // image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={(
                            <Flex vertical gap={12}>
                                <Typography.Text strong>Hozircha sizda ariza yo‘q</Typography.Text>
                                <Typography.Text>Yangi innovatsiyalar sizdan boshlanadi – Arizani jo‘nating!</Typography.Text>
                            </Flex>
                        )}
                    />
                </Flex>
            </Flex>
        </>
    )
}

export default ViewApplicationsPage