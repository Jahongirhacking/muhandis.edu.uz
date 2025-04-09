import { Flex } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLazyGetAdmissionQuery } from "../services/classifier";
import './RootLayout.scss';

const RootLayout = () => {
    const [getAdmission] = useLazyGetAdmissionQuery();

    useEffect(() => {
        getAdmission();
    }, [getAdmission])

    return (
        <Flex className="root-layout" vertical>
            <Outlet />
        </Flex>
    )
}

export default RootLayout