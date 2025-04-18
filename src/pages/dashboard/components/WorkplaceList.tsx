import { LoadingOutlined } from "@ant-design/icons"
import { Button, Card, Empty, Flex, message, Switch, Typography } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { UpdateIcon } from "../../../assets/icons"
import CardSkeleton from "../../../components/Skeletons/CardSkeleton"
import { useGetWorkplaceExistsInHemisMutation, useGetWorkplaceReloadMutation, useLazyGetWorkplaceSelectQuery } from "../../../services/applicant"
import { IWorkplace } from "../../../services/applicant/types"
import { RootState } from "../../../store/store"

const WorkplaceList = () => {
    const { workplaceList } = useSelector((store: RootState) => store.user);
    const [reloadWorkplaceList, { isLoading: isLoadingWorkplace }] = useGetWorkplaceReloadMutation();
    const [selectedList, setSelectedList] = useState<Pick<IWorkplace, 'id' | 'is_selected'>[]>([]);
    const [selectWorkplace] = useLazyGetWorkplaceSelectQuery();
    const [getWorkplaceExistsInHemis] = useGetWorkplaceExistsInHemisMutation();

    useEffect(() => {
        if (workplaceList?.length) {
            setSelectedList(
                workplaceList?.map(el => ({ id: el?.id, is_selected: el?.is_selected }))
            )
        }
    }, [workplaceList])

    const handleSelect = async (id: IWorkplace['id']) => {
        try {
            await selectWorkplace({ id }).unwrap();
            setSelectedList(prev => prev.map(el => ({
                id: el?.id,
                is_selected: el?.id === id,
            })))
            message.success("Tanlagan ish ma'lumotingiz asosiyga o'tkazildi");
        } catch (err) {
            console.error(err);
            message.error("Asosiy ish joyiga o'tkazishda xatolik")
        }
    }

    const handleReloadWorkplace = async () => {
        try {
            const { success } = await reloadWorkplaceList().unwrap();
            if (success) {
                message.success("Muvaffaqiyatli yangilandi");
            } else {
                message.warning("Mehnat ma'lumot topilmadi, qaytadan urinib ko'ring");
            }
        } catch (err) {
            console.error(err);
            message.error("Yangilashda xatolik")
        }
    }

    const handleExistsInHemis = async (id: IWorkplace['id']) => {
        try {
            const { success } = await getWorkplaceExistsInHemis({ id }).unwrap();
            if (success) {
                message.success("Ish joyingiz Hemis tizimidan topildi")
            } else {
                message.warning("Ish joyingiz Hemis tizimidan topilmadi");
            }
        } catch (err) {
            console.error(err);
            message.error("Hemis tizimida tekshirishda xatolik");
        }
    }

    return (
        <Flex vertical>
            {
                !workplaceList ? (
                    <CardSkeleton />
                ) : (
                    <>
                        <Card
                            className="workplace-card"
                            title="Mehnat ma’lumoti"
                            extra={(
                                <Button
                                    disabled={isLoadingWorkplace}
                                    type="primary"
                                    icon={isLoadingWorkplace ? <LoadingOutlined /> : <UpdateIcon />}
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
                                                <Switch
                                                    disabled={selectedList.find(el => el?.id === workplaceList[0]?.id)?.is_selected}
                                                    onClick={() => handleSelect(workplaceList[0].id)}
                                                    value={selectedList.find(el => el?.id === workplaceList[0]?.id)?.is_selected}
                                                />
                                                <Typography.Text>Asosiy qilib tanlash</Typography.Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={12} justify="space-between" align="center" wrap>
                                            <Flex vertical gap={4}>
                                                <Typography.Text>Hemis tizimida mavjudligi</Typography.Text>
                                                <Typography.Text strong>{workplaceList[0]?.exists_in_hemis ? 'Mavjud' : 'Mavjud emas'}</Typography.Text>
                                            </Flex>
                                            {
                                                workplaceList[0]?.id && (
                                                    <Button
                                                        icon={<UpdateIcon />}
                                                        type='primary'
                                                        onClick={() => handleExistsInHemis(workplaceList[0]?.id)}
                                                    >
                                                        <span style={{ color: '#fff' }}>Tekshirish</span>
                                                    </Button>
                                                )
                                            }
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
                                            <Typography.Text strong>{workplace?.organization}</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Bo'lim</Typography.Text>
                                            <Typography.Text strong>{workplace?.department}</Typography.Text>
                                        </Flex>
                                        <Flex vertical gap={4}>
                                            <Typography.Text>Lavozim</Typography.Text>
                                            <Typography.Text strong>{workplace?.position}</Typography.Text>
                                        </Flex>
                                        <Flex gap={12} justify="space-between" align="center" wrap>
                                            <Flex vertical gap={4}>
                                                <Typography.Text>Mehnat davri</Typography.Text>
                                                <Typography.Text strong>{moment(workplace?.begin_date, "YYYY-MM-DD").format("DD.MM.YYYY")} - hozirgacha</Typography.Text>
                                            </Flex>
                                            <Flex gap={6} align="center">
                                                <Switch
                                                    disabled={selectedList.find(el => el?.id === workplace?.id)?.is_selected}
                                                    onClick={() => handleSelect(workplace?.id)}
                                                    value={selectedList.find(el => el?.id === workplace?.id)?.is_selected}
                                                />
                                                <Typography.Text>Asosiy qilib tanlash</Typography.Text>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={12} justify="space-between" align="center" wrap>
                                            <Flex vertical gap={4}>
                                                <Typography.Text>Hemis tizimida mavjudligi</Typography.Text>
                                                <Typography.Text strong>{workplace?.exists_in_hemis ? 'Mavjud' : 'Mavjud emas'}</Typography.Text>
                                            </Flex>
                                            {
                                                workplace?.id && (
                                                    <Button
                                                        icon={<UpdateIcon />}
                                                        type='primary'
                                                        onClick={() => handleExistsInHemis(workplace?.id)}
                                                    >
                                                        <span style={{ color: '#fff' }}>Tekshirish</span>
                                                    </Button>
                                                )
                                            }
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
