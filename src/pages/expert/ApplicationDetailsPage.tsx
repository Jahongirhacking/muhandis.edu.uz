import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

const ApplicationDetailsPage = () => {
    const { id } = useParams();

    return (
        <Flex vertical className="application-detail">
            <Typography.Title>{id}</Typography.Title>
        </Flex>
    )
}

export default ApplicationDetailsPage