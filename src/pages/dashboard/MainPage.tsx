import { Flex, Typography } from "antd"
import CompleteStatus from "../../components/CompleteStatus"
import ProfileCard from "./components/ProfileCard"
import StudentList from "./components/StudentList"
import WorkplaceList from "./components/WorkplaceList"

const MainPage = () => {
    return (
        <Flex vertical className="main-page" gap={24} style={{ paddingBottom: 40 }}>
            <Typography.Title level={2} style={{ margin: 0 }}>Asosiy sahifa</Typography.Title>
            <Flex gap={24} wrap className="card-container">
                <Flex vertical gap={24}>
                    <ProfileCard />
                    <CompleteStatus />
                    <StudentList />
                </Flex>
                <WorkplaceList />
            </Flex>
        </Flex>
    )
}

export default MainPage