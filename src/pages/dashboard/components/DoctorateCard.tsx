import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Flex, message, Typography } from "antd";
import { useSelector } from "react-redux";
import { UpdateIcon } from "../../../assets/icons";
import { useReloadDoctorateMutation } from "../../../services/applicant";
import { RootState } from "../../../store/store";

const DoctorateCard = () => {
    const [reloadDoctorate, { isLoading: isLoadingDoctorate }] = useReloadDoctorateMutation();

    const currentDoctorate = useSelector((store: RootState) => store?.user?.currentDoctorate);

    const handleReloadDoctorate = async () => {
        try {
            const { success } = await reloadDoctorate().unwrap();
            if (success) {
                message.success("Muvaffaqiyatli yangilandi");
            } else {
                message.warning("Doktorantura ma'lumoti topilmadi, qaytadan urinib ko'ring");
            }
        } catch (err) {
            console.error(err);
            message.error("Yangilashda xatolik")
        }
    }

    return (
        <>
            {
                <Card
                    className="doctorate-card"
                    title="Doktorantura ma’lumoti"
                    extra={(
                        <Button
                            disabled={isLoadingDoctorate}
                            type="primary"
                            icon={isLoadingDoctorate ? <LoadingOutlined /> : <UpdateIcon />}
                            onClick={handleReloadDoctorate}
                        >
                            Yangilash
                        </Button>
                    )}
                >
                    {
                        currentDoctorate ? (
                            <Flex vertical gap={12}>
                                <Flex vertical gap={4}>
                                    <Typography.Text>Tashkilot nomi</Typography.Text>
                                    <Typography.Text strong>{currentDoctorate?.organization_name}</Typography.Text>
                                </Flex>
                                <Flex vertical gap={4}>
                                    <Typography.Text>Yo'nalish</Typography.Text>
                                    <Typography.Text strong>{currentDoctorate?.direction}</Typography.Text>
                                </Flex>
                                <Flex vertical gap={4}>
                                    <Typography.Text>Doktorantura turi</Typography.Text>
                                    <Typography.Text strong>{currentDoctorate?.doctorate_type}</Typography.Text>
                                </Flex>
                                <Flex vertical gap={4}>
                                    <Typography.Text>Doktorantura bosqichi</Typography.Text>
                                    <Typography.Text strong>{currentDoctorate?.course}-kurs</Typography.Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <Empty description="Doktorantura ma’lumoti topilmadi" />
                        )
                    }
                </Card>
            }
        </>
    )
}

export default DoctorateCard