import { Flex } from "antd"
import { Outlet } from "react-router-dom"
import "./style.scss"

const ApplicationsPage = () => {
    return (
        <Flex vertical className="applications-page" gap={32}>
            <Outlet />
        </Flex>
    )
}

export default ApplicationsPage