import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, message, Typography } from "antd";
import { UpdateIcon } from "../../../assets/icons";
import CardSkeleton from "../../../components/Skeletons/CardSkeleton";
import { useGetStudentListQuery, useGetStudentReloadMutation } from "../../../services/applicant";

const StudentList = () => {
    const { data: dataStudent, isLoading: isLoadingStudent, isSuccess: isSuccessStudent } = useGetStudentListQuery();
    const [reloadStudentList, { isLoading: isLoadingStudentList }] = useGetStudentReloadMutation();

    const currentDataStudent = dataStudent && dataStudent.length > 0 ? dataStudent[0] : null;

    const handleReloadStudent = async () => {
        try {
            const { success } = await reloadStudentList().unwrap();
            if (success) {
                message.success("Muvaffaqiyatli yangilandi");
            } else {
                message.warning("Talaba ma'lumoti topilmadi, qaytadan urinib ko'ring");
            }
        } catch (err) {
            console.error(err);
            message.error("Yangilashda xatolik")
        }
    }

    return (
        <>
            {
                isLoadingStudent ? (
                    <CardSkeleton />
                ) : (
                    <Card
                        className="education-card"
                        title="Ta’lim ma’lumoti"
                        extra={(
                            <Button
                                disabled={isLoadingStudentList}
                                type="primary"
                                icon={isLoadingStudentList ? <LoadingOutlined /> : <UpdateIcon />}
                                onClick={handleReloadStudent}
                            >
                                Yangilash
                            </Button>
                        )}
                    >
                        {
                            isSuccessStudent && currentDataStudent ? (
                                <Flex vertical gap={12}>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>O‘quv muassasasi nomi</Typography.Text>
                                        <Typography.Text strong>{currentDataStudent?.university?.name_uz || currentDataStudent?.university?.name_ru || currentDataStudent?.university?.name_en}</Typography.Text>
                                    </Flex>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>Mutaxasisslik</Typography.Text>
                                        <Typography.Text strong>{currentDataStudent?.speciality}</Typography.Text>
                                    </Flex>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>Daraja</Typography.Text>
                                        <Typography.Text strong>{currentDataStudent?.education_type}</Typography.Text>
                                    </Flex>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>Ta’lim bosqichi</Typography.Text>
                                        <Typography.Text strong>{currentDataStudent?.course}-kurs</Typography.Text>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Empty description="Ta’lim ma’lumoti topilmadi" />
                            )
                        }
                    </Card>
                )
            }
        </>
    )
}

export default StudentList