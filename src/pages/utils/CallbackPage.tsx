import { Flex } from "antd";
import Cookies from "js-cookie";

const CallbackPage = () => {
    console.log(Cookies.get("token"), Cookies.get('role'));
    return (
        <Flex vertical>
            Hello
        </Flex>
    )
}

export default CallbackPage