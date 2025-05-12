import { CheckCircleFilled, CloseCircleFilled, EyeOutlined, FileTextFilled } from "@ant-design/icons";
import { Button, Empty, Flex, Input, Select, Skeleton, Switch, Table, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import ExportToExcel from "../../components/ExportToExcel";
import { AdminContext } from "../../layouts/AdminLayout";
import { getGlobalName, IApplication } from "../../services/applicant/types";
import { useGetMipRegionsQuery } from "../../services/classifier";
import { IMipRegion } from "../../services/classifier/types";
import { useGetApplicationsQuery } from "../../services/inspector";
import { useGetExpertQuery, useGetMinistryApplicationsQuery } from "../../services/ministry";
import { IExpert } from "../../services/ministry/types";
import { ApplicationStatusChoice, ApplicationSubmitAsChoice, ApplicationTypeChoice, getApplicationChoiceName, getApplicationStatusName, getRoleName, Role } from "../../services/types";
import { RootState } from "../../store/store";
import { SearchParams } from "../../utils/config";
import { getLocalStorage, localStorageNames, setLocalStorage } from "../../utils/storageUtils";

const AdminApplications = () => {
    const [searchParams] = useSearchParams();
    const { role: adminRole } = useOutletContext<AdminContext>();
    const APPLICATION_STATUS = Math.max(Number(searchParams.get(SearchParams.ApplicationStatus)), adminRole === Role.Comission ? ApplicationStatusChoice.PASSED : ApplicationStatusChoice.SENT);
    const [pageLimit, setPageLimit] = useState(getLocalStorage(localStorageNames.pageLimit) || 20);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState<ApplicationSubmitAsChoice | 'all'>('all');
    const [fromMilitary, setFromMilitary] = useState<boolean | undefined>();
    const { currentAdmission } = useSelector((store: RootState) => store.user);
    const [applicationStatus, setApplicationStatus] = useState<ApplicationStatusChoice | 'all'>('all');
    const [applicationType, setApplicationType] = useState<ApplicationTypeChoice | 'all'>('all');
    const [selectedRegion, setSelectedRegion] = useState<IMipRegion['id'] | 'all'>('all');
    const [selectedExpert, setSelectedExpert] = useState<IExpert['id'] | 'all'>('all');

    useEffect(() => {
        if (searchParams.has(SearchParams.SubmitAsChoice)) {
            setRole(searchParams.get(SearchParams.SubmitAsChoice) as ApplicationSubmitAsChoice);
        }
    }, [searchParams])

    const navigate = useNavigate();
    const { data: mipRegions, isLoading: isMipRegionsLoading } = useGetMipRegionsQuery(undefined, { skip: adminRole !== Role.Ministry });
    const { data: experts, isLoading: isExpertsLoading } = useGetExpertQuery(undefined, { skip: adminRole !== Role.Ministry });

    const expertQuery = useGetApplicationsQuery({
        admission_id: currentAdmission?.id || 0,
        limit: pageLimit,
        offset: (currentPage - 1) * pageLimit,
        status: APPLICATION_STATUS,
        from_military: fromMilitary,
        q: searchTerm,
        submit_as: role === 'all' ? undefined : role
    }, { skip: !(currentAdmission && currentAdmission?.id) || adminRole === Role.Ministry });

    const expertAllQuery = useGetApplicationsQuery({
        admission_id: currentAdmission?.id || 0,
        limit: 1300,
        status: APPLICATION_STATUS,
        from_military: fromMilitary,
        q: searchTerm,
        submit_as: role === 'all' ? undefined : role
    }, { skip: !(currentAdmission && currentAdmission?.id) || adminRole === Role.Ministry });

    const ministryQuery = useGetMinistryApplicationsQuery({
        admission_id: currentAdmission?.id || 0,
        limit: pageLimit,
        offset: (currentPage - 1) * pageLimit,
        status: applicationStatus === 'all' ? undefined : applicationStatus,
        from_military: fromMilitary,
        q: searchTerm,
        submit_as: role === 'all' ? undefined : role,
        application_type: applicationType === 'all' ? undefined : applicationType,
        mip_region_id: selectedRegion === 'all' ? undefined : selectedRegion,
        expert_id: selectedExpert === 'all' ? undefined : selectedExpert
    }, { skip: !(currentAdmission && currentAdmission?.id) || adminRole !== Role.Ministry })

    const ministryAllQuery = useGetMinistryApplicationsQuery({
        admission_id: currentAdmission?.id || 0,
        limit: 1300,
        status: applicationStatus === 'all' ? undefined : applicationStatus,
        from_military: fromMilitary,
        q: searchTerm,
        submit_as: role === 'all' ? undefined : role,
        application_type: applicationType === 'all' ? undefined : applicationType,
        mip_region_id: selectedRegion === 'all' ? undefined : selectedRegion,
        expert_id: selectedExpert === 'all' ? undefined : selectedExpert
    }, { skip: !(currentAdmission && currentAdmission?.id) || adminRole !== Role.Ministry })

    const data = adminRole === Role.Ministry ? ministryQuery?.data : expertQuery?.data;
    const allData = adminRole === Role.Ministry ? ministryAllQuery?.data : expertAllQuery?.data;
    const isLoading = adminRole === Role.Ministry ? ministryQuery?.isFetching : expertQuery?.isFetching;

    const handleChangePageLimit = (_: number, pageSize: number) => {
        setPageLimit(pageSize);
        setLocalStorage(localStorageNames.pageLimit, pageSize);
    }

    if (moment().isBefore(moment(currentAdmission?.end_at))) return (
        <Empty
            description={`${currentAdmission?.name} - ushbu tanlov uchun arizalarni ko'rib chiqish hali boshlanmagan`}
        />
    )

    return (
        <Flex vertical gap={18} style={{ maxWidth: 1700 }}>
            <Flex className="application-controls" gap={12} wrap align='center'>
                <Input.Search
                    placeholder="Qidirish"
                    onSearch={(val) => setSearchTerm(val)}
                    enterButton
                />
                {
                    adminRole !== Role.Comission && (
                        <Select
                            value={role}
                            onChange={(key) => setRole(key)}
                            options={[
                                { label: "Arizachi roli (Barchasi)", value: 'all' },
                                { label: getRoleName(ApplicationSubmitAsChoice.STUDENT), value: ApplicationSubmitAsChoice.STUDENT },
                                { label: getRoleName(ApplicationSubmitAsChoice.PRACTICAL_ENGINEER), value: ApplicationSubmitAsChoice.PRACTICAL_ENGINEER },
                                { label: getRoleName(ApplicationSubmitAsChoice.PROFESSOR_TEACHER), value: ApplicationSubmitAsChoice.PROFESSOR_TEACHER },
                            ]}
                        />
                    )
                }
                {
                    adminRole === Role.Ministry && (
                        <>
                            <Select
                                value={applicationType}
                                onChange={(key) => setApplicationType(key)}
                                options={[
                                    { label: "Ariza turi (Barchasi)", value: 'all' },
                                    { label: getApplicationChoiceName(ApplicationTypeChoice.Idea), value: ApplicationTypeChoice.Idea },
                                    { label: getApplicationChoiceName(ApplicationTypeChoice.Project), value: ApplicationTypeChoice.Project },
                                    { label: getApplicationChoiceName(ApplicationTypeChoice.Invention), value: ApplicationTypeChoice.Invention },
                                ]}
                            />
                            <Select
                                value={applicationStatus}
                                onChange={(key) => setApplicationStatus(key)}
                                options={[
                                    { label: "Ariza holati (Barchasi)", value: 'all' },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.SENT), value: ApplicationStatusChoice.SENT },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.REJECTED), value: ApplicationStatusChoice.REJECTED },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.PASSED), value: ApplicationStatusChoice.PASSED },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.EVALUATED), value: ApplicationStatusChoice.EVALUATED },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.SELECTED), value: ApplicationStatusChoice.SELECTED },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.PLACE_3), value: ApplicationStatusChoice.PLACE_3 },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.PLACE_2), value: ApplicationStatusChoice.PLACE_2 },
                                    { label: getApplicationStatusName(ApplicationStatusChoice.PLACE_1), value: ApplicationStatusChoice.PLACE_1 },
                                ]}
                            />
                            <Select
                                loading={isMipRegionsLoading}
                                value={selectedRegion}
                                onChange={(key) => setSelectedRegion(key)}
                                options={[
                                    { label: "Viloyat (Barchasi)", value: 'all' },
                                    ...(mipRegions && mipRegions.length
                                        ? mipRegions.map(region => ({ label: getGlobalName(region), value: region?.id }))
                                        : []
                                    )
                                ]}
                            />
                            <Select
                                showSearch
                                filterOption={(input, option) => {
                                    const label = (option?.label ?? '').toString().toLowerCase();
                                    return label.includes(input.toLowerCase());
                                }}
                                loading={isExpertsLoading}
                                value={selectedExpert}
                                onChange={(key) => setSelectedExpert(key)}
                                options={[
                                    { label: "Ekspert (Barchasi)", value: 'all' },
                                    ...(experts && experts.length
                                        ? experts.map(expert => ({ label: `${expert?.last_name || ''} ${expert?.first_name || ''} ${expert?.middle_name || ''}`, value: expert?.id }))
                                        : []
                                    )
                                ]}
                            />
                        </>
                    )
                }
                <Flex gap={8}>
                    <Switch value={fromMilitary} onChange={(val) => setFromMilitary(val)} />
                    <Typography.Text>Harbiy ma'lumotga ega</Typography.Text>
                </Flex>
            </Flex>
            <Flex gap={21} align="center" wrap>
                <Typography.Text>
                    Jami arizalar soni: <strong>{data?.count}</strong>
                </Typography.Text>
                <ExportToExcel data={allData?.results || []} fileName="Arizalar.xlsx" />
            </Flex>
            {
                !isLoading
                    ? (
                        <Table
                            bordered
                            dataSource={data?.results}
                            columns={[
                                ...(
                                    adminRole !== Role.Comission ? [{
                                        key: "id",
                                        dataIndex: "id",
                                        title: "ID",
                                        className: "application_id"
                                    }] : []
                                ),
                                ...(
                                    adminRole === Role.Ministry ? [
                                        {
                                            key: "application_type",
                                            dataIndex: "application_type",
                                            title: "Ariza turi",
                                            className: "application_type",
                                            render: (application_type: IApplication['application_type']) => getApplicationChoiceName(application_type)
                                        }
                                    ] : []
                                ),
                                {
                                    key: "name",
                                    dataIndex: "name",
                                    title: "Nomi",
                                    className: "application_name"
                                },
                                {
                                    key: "submit_as",
                                    dataIndex: "submit_as",
                                    title: "Arizachi kasbi",
                                    render: (role: ApplicationSubmitAsChoice) => getRoleName(role),
                                    className: "user_role"
                                },
                                ...(
                                    adminRole !== Role.Comission ? [{
                                        key: "user_full_name",
                                        dataIndex: "user_full_name",
                                        title: "F.I.Sh",
                                        className: "user_fullname"
                                    }] : []
                                ),
                                {
                                    key: "status",
                                    dataIndex: "status",
                                    title: "Holati",
                                    render: (status) => status === 1
                                        ? (<Button variant="text" color="blue" icon={<FileTextFilled />}>Yangi</Button>)
                                        : (status === 2)
                                            ? (<Button variant="text" color="green" icon={<CheckCircleFilled />}>Qabul qilingan</Button>)
                                            : (status === 10)
                                                ? (<Button variant="text" color="red" icon={<CloseCircleFilled />}>Rad etilgan</Button>)
                                                : getApplicationStatusName(status)
                                },
                                ...(
                                    APPLICATION_STATUS === ApplicationStatusChoice.REJECTED
                                        ? [{
                                            key: 'rejected_reason',
                                            dataIndex: 'rejected_reason',
                                            title: 'Rad etish sababi'
                                        }] : []
                                ),
                                {
                                    key: 'detail',
                                    title: "Ko'rish",
                                    fixed: 'right',
                                    render: (_: unknown, record: IApplication) => (
                                        <Button
                                            type="primary"
                                            icon={<EyeOutlined />}
                                            onClick={() => navigate(
                                                adminRole === Role.Ministry
                                                    ? `/ministry/applications/${record?.id}`
                                                    : `/expert/applications/${record?.id}`
                                            )}
                                        />
                                    ),
                                    className: "application_detail"
                                },
                            ]}
                            rowKey={'id'}
                            pagination={{
                                current: currentPage,
                                position: ['bottomCenter'],
                                onChange: (page) => setCurrentPage(page),
                                pageSize: pageLimit,
                                total: data?.count || 0,
                                pageSizeOptions: [10, 20, 40, 60],
                                onShowSizeChange: handleChangePageLimit
                            }}
                            locale={{
                                emptyText: <Empty description="Ariza topilmadi" />
                            }}
                        />
                    ) : (
                        <Skeleton />
                    )
            }
        </Flex>
    )
}

export default AdminApplications