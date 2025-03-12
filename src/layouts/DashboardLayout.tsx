import { Flex } from "antd"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./DashboardLayout.scss"

const DashboardLayout = () => {
    return (
        <Flex vertical className="dashboard-layout">
            <Flex className="dashboard-layout-main">
                <Flex className="dashboard-layout-navbar">
                    <Navbar />
                </Flex>
                <Flex className="dashboard-layout-content">
                    <Outlet />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DashboardLayout