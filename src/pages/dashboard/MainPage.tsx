import { Flex, Typography } from "antd"
import CompleteStatus from "../../components/CompleteStatus"
import DoctorateCard from "./components/DoctorateCard"
import MilitaryCard from "./components/MilitaryCard"
import ProfileCard from "./components/ProfileCard"
import StudentList from "./components/StudentList"
import WorkplaceList from "./components/WorkplaceList"

const MainPage = () => {
    return (
        <Flex vertical className="main-page" gap={32}>
            <Typography.Title level={2} style={{ margin: 0 }}>Asosiy sahifa</Typography.Title>
            <CompleteStatus />
            <Flex gap={24} wrap className="card-container">
                <Flex vertical gap={24}>
                    <ProfileCard />
                    <StudentList />
                    <DoctorateCard />
                </Flex>
                <Flex vertical gap={24}>
                    <WorkplaceList />
                    <MilitaryCard />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default MainPage