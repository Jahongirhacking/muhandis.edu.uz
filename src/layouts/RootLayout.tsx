import { Flex } from "antd"
import { Outlet } from "react-router-dom"
import './RootLayout.scss'

const RootLayout = () => {
    return (
        <Flex className="root-layout" vertical>
            <Outlet />
        </Flex>
    )
}

export default RootLayout