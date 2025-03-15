import { Button, Card, Empty, Flex, message, Switch, Typography } from "antd"
import moment from "moment"
import { useSelector } from "react-redux"
import { UpdateIcon } from "../../../assets/icons"
import CardSkeleton from "../../../components/Skeletons/CardSkeleton"
import { useLazyGetWorkplaceListQuery, useLazyGetWorkplaceReloadQuery } from "../../../services/applicant"
import { RootState } from "../../../store/store"

const WorkplaceList = () => {
    const { workplaceList } = useSelector((store: RootState) => store.user);

    const [getWorkplace, { isLoading: isLoadingWorkplace }] = useLazyGetWorkplaceListQuery();
    const [reloadWorkplaceList] = useLazyGetWorkplaceReloadQuery();

    const handleReloadWorkplace = async () => {
        const { data } = await reloadWorkplaceList();
        if (data?.success) {
            message.success(data?.message);
        } else {
            message.warning(data?.message);
        }
        await getWorkplace();
    }

    return (
        <Flex vertical>
            {
                isLoadingWorkplace ? (
                    <CardSkeleton />
                ) : (
                    <>
                        <Card
                            className="workplace-card"
                            title="Mehnat ma’lumoti"
                            extra={(
                                <Button
                                    type="primary"
                                    icon={<UpdateIcon />}
                                    onClick={handleReloadWorkplace}
                                >
                                    Yangilash
                                </Button>
                            )}
                            key={(workplaceList && workplaceList[0]?.id) || 0}
                        >
                            {
                                workplaceList?.length ? (
                                    <Flex vertical gap={12}>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Tashkilot nomi</Typography.Text>
                                            <Typography.Text strong>{workplaceList[0]?.organization}</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Bo'lim</Typography.Text>
                                            <Typography.Text strong>{workplaceList[0]?.department}</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Lavozim</Typography.Text>
                                            <Typography.Text strong>{workplaceList[0]?.position}</Typography.Text>
                                        </Flex>
                                        <Flex gap={12} justify="space-between" align="center" wrap>
                                            <Flex vertical gap={4}>
                                                <Typography.Text>Mehnat davri</Typography.Text>
                                                <Typography.Text strong>{moment(workplaceList[0]?.begin_date, "YYYY-MM-DD").format("DD.MM.YYYY")} - hozirgacha</Typography.Text>
                                            </Flex>
                                            <Flex gap={6} align="center">
                                                <Switch />
                                                <Typography.Text>Asosiy qilib tanlash</Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                ) : (
                                    <Empty description="Mehnat ma’lumoti topilmadi" />
                                )
                            }
                        </Card>
                        {
                            workplaceList && workplaceList?.slice(1)?.map(workplace => (
                                <Card className="workplace-card selected" key={workplace?.id}>
                                    <Flex vertical gap={12}>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Tashkilot nomi</Typography.Text>
                                            <Typography.Text strong>Raqamli ta'lim texnologiyalarini rivojlantirish markazi" davlat muassasasi</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Bo'lim</Typography.Text>
                                            <Typography.Text strong>Axborot tizimlarini loyihalashtirish va ishlab chiqish bo‘limi</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Lavozim</Typography.Text>
                                            <Typography.Text strong>Bosh mutaxassis</Typography.Text>
                                        </Flex>
                                        <Flex gap={12} justify="space-between" align="center" wrap>
                                            <Flex vertical gap={4}>
                                                <Typography.Text>Mehnat davri</Typography.Text>
                                                <Typography.Text strong>2023-07-13 - hozirgacha</Typography.Text>
                                            </Flex>
                                            <Flex gap={6} align="center">
                                                <Switch />
                                                <Typography.Text>Asosiy qilib tanlash</Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }
                    </>
                )
            }
        </Flex>
    )
}

export default WorkplaceList