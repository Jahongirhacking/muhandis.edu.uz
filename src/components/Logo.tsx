import { Flex, Typography } from "antd"
import { Link } from "react-router-dom"
import { LogoIcon } from "../assets/icons"

const Logo = () => {
    return (
        <Link to={'/'}>
            <Flex className="logo main-logo" gap={8} align="center">
                <LogoIcon />
                <Typography.Title level={2} style={{ margin: 0 }}>Muhandis.edu.uz</Typography.Title>
            </Flex>
        </Link>
    )
}

export default Logo