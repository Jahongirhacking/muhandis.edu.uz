import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Empty, Flex, message, Tag, Typography } from "antd"
import moment from "moment"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ArchiveIcon, CurrentApplicationsIcon, EditIcon, EmptyIcon } from "../../../assets/icons"
import CardSkeleton from "../../../components/Skeletons/CardSkeleton"
import { useGetApplicationListQuery } from "../../../services/applicant"
import { ApplicationStatusChoice, getApplicationChoiceName, getApplicationStatusName } from "../../../services/types"
import { RootState } from "../../../store/store"

const ViewApplicationsPage = () => {
    const { data: applicationsData, isLoading } = useGetApplicationListQuery();
    const { currentAdmission, profile } = useSelector((store: RootState) => store.user);
    const [isCurrent, setIsCurrent] = useState(true);
    const isMessageSeen = useRef(false);

    const hasPermissionToCreate = !(applicationsData && currentAdmission && applicationsData.find(el => el?.admission === currentAdmission?.id)) && profile && moment().diff(profile?.birth_date, "years") <= 40;

    const realData = applicationsData?.filter(el => isCurrent
        ? el.admission === currentAdmission?.id
        : el.admission !== currentAdmission?.id
    );

    if (!hasPermissionToCreate) {
        if (!isMessageSeen.current && profile && moment().diff(profile?.birth_date, "years") > 40) {
            message.warning("Ariza yaratish uchun chegara 40 yoshgacha etib belgilangan");
            isMessageSeen.current = true;
        }
    }

    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>Ariza topshirish</Typography.Title>
            <Flex vertical gap={24} className="view-application applications-main">
                <Flex gap={24} justify="space-between" style={{ width: "100%" }} wrap>
                    <Flex gap={12} align="center" wrap className="sort-container">
                        <Button variant="outlined" icon={<CurrentApplicationsIcon />} className={isCurrent ? 'active' : ''} onClick={() => setIsCurrent(true)}>Arizalar</Button>
                        <Button variant="outlined" icon={<ArchiveIcon />} className={!isCurrent ? 'active' : ''} onClick={() => setIsCurrent(false)}>Arxiv</Button>
                    </Flex>
                    {
                        hasPermissionToCreate && (
                            <Link to={`${hasPermissionToCreate ? "/dashboard/applications/create" : ''}`} style={{ marginLeft: 'auto' }}>
                                <Button disabled={!hasPermissionToCreate} className="create-btn" type="primary" icon={<PlusOutlined />}>Ariza yaratish</Button>
                            </Link>
                        )
                    }
                </Flex>
                <Flex vertical gap={12} className="applications-container">
                    {
                        isLoading ? <CardSkeleton />
                            : realData?.length
                                ? realData?.map(application => (
                                    <Card
                                        key={application?.id}
                                        className="application-card"
                                        title={`Ariza ID: ${application?.id}`}
                                        extra={(
                                            <Tag icon={<CurrentApplicationsIcon />} className={`status-${application?.status || '0'}`}>
                                                {getApplicationStatusName(application?.status)}
                                            </Tag>
                                        )}
                                    >
                                        <Flex vertical gap={24} className="application-info">
                                            <Flex vertical gap={4}>
                                                <Typography.Text>{getApplicationChoiceName(application?.application_type)} nomi</Typography.Text>
                                                <Typography.Text strong>{application?.name}</Typography.Text>
                                            </Flex>
                                            <Flex vertical gap={4}>
                                                <Typography.Text>{getApplicationChoiceName(application?.application_type)} maqsadi</Typography.Text>
                                                <Typography.Text strong>{application?.short_description}</Typography.Text>
                                            </Flex>
                                            <Flex gap={32} justify="space-between" align="center" wrap>
                                                <Flex vertical gap={4}>
                                                    <Typography.Text>{getApplicationChoiceName(application?.application_type)} qo’llanilish sohasi</Typography.Text>
                                                    <Typography.Text strong>{application?.category}</Typography.Text>
                                                </Flex>
                                                {
                                                    moment().isBefore(moment(currentAdmission?.applicant_can_modify_until)) &&
                                                    isCurrent &&
                                                    (application?.status === ApplicationStatusChoice.CREATED ||
                                                        application?.status === ApplicationStatusChoice.REJECTED) && (
                                                        <Flex gap={8} wrap>
                                                            <Link to={"/dashboard/applications/edit"}>
                                                                <Button icon={<EditIcon />} variant="text" color="primary">Tahrirlash</Button>
                                                            </Link>
                                                        </Flex>
                                                    )
                                                }
                                            </Flex>
                                        </Flex>
                                    </Card>
                                ))
                                : (
                                    <Empty
                                        style={{ margin: "auto" }}
                                        image={<EmptyIcon />}
                                        // image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={(
                                            <Flex vertical gap={12}>
                                                <Typography.Text strong>Hozircha sizda ariza yo‘q</Typography.Text>
                                                <Typography.Text>Yangi innovatsiyalar sizdan boshlanadi – Arizani jo‘nating!</Typography.Text>
                                            </Flex>
                                        )}
                                    />
                                )
                    }

                </Flex>
            </Flex >
        </>
    )
}

export default ViewApplicationsPage