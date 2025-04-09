import { EyeOutlined, FileTextFilled } from "@ant-design/icons";
import { Button, Empty, Flex, Input, Select, Skeleton, Switch, Table, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetApplicationsQuery } from "../../services/inspector";
import { ApplicationSubmitAsChoice, getApplicationStatusName, getRoleName } from "../../services/types";
import { RootState } from "../../store/store";
import { SearchParams } from "../../utils/config";

const PAGE_LIMIT = 20;

const ExpertApplications = () => {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState<ApplicationSubmitAsChoice | 'all'>('all');
    const [fromMilitary, setFromMilitary] = useState(false);
    const { currentAdmission } = useSelector((store: RootState) => store.user);
    const { data, isLoading } = useGetApplicationsQuery({
        admission_id: currentAdmission?.id || 0,
        limit: PAGE_LIMIT,
        offset: (currentPage - 1) * PAGE_LIMIT,
        status: Math.max(Number(searchParams.get(SearchParams.ApplicationStatus)), 1),
        from_military: fromMilitary,
        q: searchTerm,
        submit_as: role === 'all' ? undefined : role
    }, { skip: !(currentAdmission && currentAdmission?.id) });
    const navigate = useNavigate();


    return (
        <Flex vertical gap={18}>
            <Flex className="application-controls" gap={12} wrap align='center'>
                <Input.Search
                    placeholder="Qidirish"
                    onSearch={(val) => setSearchTerm(val)}
                    enterButton
                />
                <Select
                    value={role}
                    onChange={(key) => setRole(key)}
                    options={[
                        { label: "Barchasi", value: 'all' },
                        { label: getRoleName(ApplicationSubmitAsChoice.STUDENT), value: ApplicationSubmitAsChoice.STUDENT },
                        { label: getRoleName(ApplicationSubmitAsChoice.PRACTICAL_ENGINEER), value: ApplicationSubmitAsChoice.PRACTICAL_ENGINEER },
                        { label: getRoleName(ApplicationSubmitAsChoice.PROFESSOR_TEACHER), value: ApplicationSubmitAsChoice.PROFESSOR_TEACHER },
                    ]}
                />
                <Flex gap={8}>
                    <Switch value={fromMilitary} onChange={(val) => setFromMilitary(val)} />
                    <Typography.Text>Harbiy ma'lumotga ega</Typography.Text>
                </Flex>
            </Flex>

            {
                !isLoading
                    ? (
                        <Table
                            dataSource={data?.results}
                            columns={[
                                {
                                    key: 'detail',
                                    title: "Ko'rish",
                                    render: (_, record) => (
                                        <Button
                                            type="primary"
                                            icon={<EyeOutlined />}
                                            onClick={() => navigate(`/expert/applications/${record?.id}`)}
                                        />
                                    ),
                                    className: "application_detail"
                                },
                                {
                                    key: "id",
                                    dataIndex: "id",
                                    title: "ID",
                                    className: "application_id"
                                },
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
                                {
                                    key: "user_full_name",
                                    dataIndex: "user_full_name",
                                    title: "F.I.Sh",
                                    className: "user_fullname"
                                },
                                {
                                    key: "status",
                                    dataIndex: "status",
                                    title: "Holati",
                                    render: (status) => status === 1
                                        ? (<Button variant="text" color="blue" icon={<FileTextFilled />}>Yangi</Button>)
                                        : (status === 2)
                                            ? (<Button variant="text" color="green" icon={<FileTextFilled />}>Qabul qilingan</Button>)
                                            : (status === 10)
                                                ? (<Button variant="text" color="red" icon={<FileTextFilled />}>Rad etilgan</Button>)
                                                : getApplicationStatusName(status)
                                },
                            ]}
                            rowKey={'id'}
                            pagination={{
                                current: currentPage,
                                onChange: (page) => setCurrentPage(page),
                                pageSize: PAGE_LIMIT
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

export default ExpertApplications