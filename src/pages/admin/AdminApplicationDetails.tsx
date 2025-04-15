import { CheckCircleFilled, CloseCircleFilled, DownloadOutlined, FileTextOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Descriptions, Divider, Empty, Flex, Input, message, Modal, Result, Select, Skeleton, Switch, Table, Tabs, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import DocumentViewer from "../../components/DocumentViewer";
import { AdminContext } from "../../layouts/AdminLayout";
import { getGlobalName } from "../../services/applicant/types";
import { useGetApplicationDetailsQuery, useGetUserInfoQuery, usePassApplicationMutation, usePutConclusionMutation, useRejectApplicationMutation } from "../../services/inspector";
import { useGetMinistryApplicationDetailsQuery, useGetMinistryUserInfoQuery } from "../../services/ministry";
import { ApplicationStatusChoice, ExampleFileFieldNameChoices, Gender, getApplicationChoiceName, getExampleFileName, getRoleName, Role } from "../../services/types";
import { RootState } from "../../store/store";

interface ICheckedFile { [key: string]: { is_exists: boolean | null, rejected_reason: string } }

const checkObjectKeys = (obj: object) => {
    if (!obj || Object.keys(obj).length === 0) return false;
    return true;
}

const AdminApplicationDetails = () => {
    const { id } = useParams();
    const { currentAdmission, profile } = useSelector((store: RootState) => store.user);
    const requiredFiles = useMemo(() => {
        return [
            ExampleFileFieldNameChoices.APPEAL_FILE,
            ExampleFileFieldNameChoices.TABLE1_FILE,
            ExampleFileFieldNameChoices.TABLE2_FILE,
            ExampleFileFieldNameChoices.TABLE2_1_FILE,
            ExampleFileFieldNameChoices.TABLE2_2_FILE,
            ExampleFileFieldNameChoices.TABLE3_FILE,
            ...(profile.check_type === 'project' ? [ExampleFileFieldNameChoices.CALENDAR_PLAN_FILE] : []),
            ExampleFileFieldNameChoices.VIDEO_CLIP_FILE,
            ExampleFileFieldNameChoices.PRESENTATION_FILE,
        ];
    }, [profile.check_type]);
    const [checkedFiles, setCheckedFiles] = useState<ICheckedFile>({})
    const [rejectWithException, setRejectWithException] = useState(false);
    const [rejectedReason, setRejectedReason] = useState('');
    const [putConclusion] = usePutConclusionMutation();
    const [rejectApplication] = useRejectApplicationMutation();
    const [passApplication] = usePassApplicationMutation();
    const conclusionRefs = useRef<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const { role: adminRole } = useOutletContext<AdminContext>();

    // Details Query
    const expertDetailsQuery = useGetApplicationDetailsQuery({ id: Number(id), admission_id: currentAdmission?.id || 0 }, { skip: !(currentAdmission && currentAdmission?.id) || adminRole === Role.Ministry });
    const ministryDetailsQuery = useGetMinistryApplicationDetailsQuery({ id: Number(id), admission_id: currentAdmission?.id || 0 }, { skip: !(currentAdmission && currentAdmission?.id) || adminRole !== Role.Ministry });
    const applicationDetails = adminRole === Role.Ministry ? ministryDetailsQuery?.data : expertDetailsQuery?.data;
    const isDetailsLoading = adminRole === Role.Ministry ? ministryDetailsQuery?.isLoading : expertDetailsQuery?.isLoading;

    // Applicant Query
    const expertApplicantQuery = useGetUserInfoQuery({ admission_id: currentAdmission?.id || 0, id: applicationDetails?.user || 0 }, { skip: !(currentAdmission && currentAdmission?.id && applicationDetails && applicationDetails?.user) || adminRole === Role.Ministry });
    const ministryApplicantQuery = useGetMinistryUserInfoQuery({ admission_id: currentAdmission?.id || 0, id: applicationDetails?.user || 0 }, { skip: !(currentAdmission && currentAdmission?.id && applicationDetails && applicationDetails?.user) || adminRole !== Role.Ministry });
    const applicantData = adminRole === Role.Ministry ? ministryApplicantQuery?.data : expertApplicantQuery?.data;
    const isApplicantLoading = adminRole === Role.Ministry ? ministryDetailsQuery?.isLoading : expertDetailsQuery?.isLoading;

    useEffect(() => {
        if (applicationDetails?.rejected_reason) {
            setRejectedReason(applicationDetails?.rejected_reason);
        }
    }, [applicationDetails?.rejected_reason])

    const handleReject = async () => {
        try {
            if (!currentAdmission?.id) throw new Error("current admisson not found");
            await rejectApplication({ id: Number(id), rejected_reason: rejectedReason, admission_id: currentAdmission?.id }).unwrap();
            Modal.warning({
                onCancel: () => navigate('/expert/applications'),
                footer: null,
                icon: null,
                closable: true,
                maskClosable: true,
                content: (
                    <Result
                        status="warning"
                        title="Ushbu ariza muvaffaqiyatli tarzda rad etildi"
                    />
                )
            })
        } catch (err) {
            message.error("Rad etishda xatolik");
            console.error(err);
        }
    }

    const handlePass = async () => {
        try {
            if (!currentAdmission?.id) throw new Error("current admisson not found");
            await passApplication({ id: Number(id), admission_id: currentAdmission?.id }).unwrap();
            Modal.success({
                onCancel: () => navigate('/expert/applications'),
                footer: null,
                icon: null,
                closable: true,
                maskClosable: true,
                content: (
                    <Result
                        status="success"
                        title="Ushbu ariza muvaffaqiyatli tarzda qabul qilindi"
                    />
                )
            })
        } catch (err) {
            message.error("Qabul qilishda xatolik");
            console.error(err);
        }
    }

    useEffect(() => {
        if (!isDetailsLoading && applicationDetails) {
            const conclusion = applicationDetails.expert_conclusion;
            if (checkObjectKeys(conclusion || {})) {
                setCheckedFiles(conclusion as ICheckedFile);
            } else {
                const defaultChecked = requiredFiles.reduce(
                    (acc, curr) => ({
                        ...acc,
                        [curr]: { is_exists: null, rejected_reason: '' },
                    }),
                    {},
                );
                setCheckedFiles(defaultChecked);
            }
        }
    }, [applicationDetails, isDetailsLoading, requiredFiles]);

    useEffect(() => {
        if (!applicationDetails || applicationDetails?.status !== ApplicationStatusChoice.SENT || adminRole === Role.Ministry) return;
        (async () => {
            try {
                if (checkObjectKeys(checkedFiles) && currentAdmission?.id && !isDetailsLoading) {
                    await putConclusion({ id: Number(id), expert_conclusion: checkedFiles, admission_id: currentAdmission?.id || 0 }).unwrap();
                }
            } catch (err) {
                message.error("Ma'lumot yangilashda xatolik");
                console.error(err);
            }
        })()
    }, [checkedFiles, putConclusion, id, currentAdmission, isDetailsLoading, applicationDetails, adminRole]);

    if (isDetailsLoading || !checkObjectKeys(checkedFiles)) return <Skeleton />
    if (!applicationDetails) return <Empty description="Ariza ma'lumotlari topilmadi" />

    const isConfirmButtonPass = !rejectWithException && Object.keys(checkedFiles).reduce((acc, curr) => (
        acc &&
        !!checkedFiles[curr].is_exists
    ), true)

    const isConfirmButtonDisabled = (!isConfirmButtonPass && !rejectedReason) || Object.keys(checkedFiles).reduce((acc, curr) => (
        acc ||
        checkedFiles[curr].is_exists === null ||
        (checkedFiles[curr].is_exists === false && !checkedFiles[curr].rejected_reason)
    ), false);

    const canModify = applicationDetails?.status === ApplicationStatusChoice.SENT && adminRole !== Role.Ministry;

    return (
        <Flex vertical className={`application-details ${adminRole === Role.Ministry ? "ministry-details" : "admin-details"}`} gap={24}>
            <Flex className="application-container" gap={12}>
                <Flex vertical gap={24} className="main-details">
                    {
                        adminRole === Role.Ministry && (
                            <Link to={'/ministry/applications'}>
                                <Button icon={<LeftOutlined />} type="primary">Arizalar bo'limiga qaytish</Button>
                            </Link>
                        )
                    }
                    <Tabs
                        type="card"
                        items={[
                            {
                                key: 'application',
                                label: "Ariza ma'lumoti",
                                children: (
                                    <Descriptions
                                        bordered
                                        size="small"
                                        layout="vertical"
                                        items={[
                                            { key: 'id', label: 'Ariza raqami', children: id },
                                            { key: 'type', label: 'Ariza turi', children: getApplicationChoiceName(applicationDetails?.application_type) },
                                            { key: 'name', label: "Nomi", children: applicationDetails?.name },
                                            { key: 'short_description', label: "Qisqa ma'lumot", children: applicationDetails?.short_description },
                                            { key: 'category', label: "Kategoriya", children: applicationDetails?.category },
                                            { key: 'problem_and_solution', label: "Muammo va yechim", children: applicationDetails?.problem_and_solution },
                                        ]}
                                    />
                                )
                            },
                            {
                                key: "applicant",
                                label: "Arizachi ma'lumoti",
                                children: (
                                    isApplicantLoading ? (
                                        <Skeleton />
                                    ) : (
                                        <Descriptions
                                            bordered
                                            size="small"
                                            layout="vertical"
                                            items={[
                                                { key: 'submit_as', label: "Arizachi roli", children: getRoleName(applicationDetails?.submit_as) },
                                                { key: 'fullname', label: "F.I.SH", children: `${applicantData?.last_name} ${applicantData?.first_name} ${applicantData?.middle_name}` },
                                                { key: 'birthdate', label: "Tug'ilgan sana", children: applicantData?.birth_date },
                                                { key: 'document', label: "Pasport raqami", children: applicantData?.document },
                                                { key: 'gender', label: "Jinsi", children: applicantData?.gender === Gender.Male ? 'Erkak' : "Ayol" },
                                                { key: 'address', label: "Manzil", children: `${getGlobalName(applicantData?.mip_region_data || {})}, ${getGlobalName(applicantData?.mip_district_data || {})}, ${applicantData?.mip_address}` },
                                                { key: 'phone', label: "Telefon raqami", children: applicantData?.phone_number || '-' },
                                                { key: 'email', label: "Email", children: applicantData?.email || '-' },
                                                { key: 'education', label: "O'qish joyi", children: applicantData?.students?.length ? `${getGlobalName(applicantData?.students[0]?.university)} (${applicantData?.students[0]?.course}-kurs)` : 'Topilmadi' },
                                                { key: 'work', label: "Ish joyi", children: applicantData?.workplaces?.find(w => w?.is_selected) ? `${applicantData?.workplaces?.find(w => w?.is_selected)?.organization} (${applicantData?.workplaces?.find(w => w?.is_selected)?.position})` : 'Topilmadi' },
                                                { key: 'military', label: "Harbiy ma'lumot", children: applicantData?.militaries?.length ? <Flex vertical gap={6}>{getGlobalName(applicantData?.militaries[0]?.university)} <Button type="primary" icon={<FileTextOutlined />} target="_blank" href={applicantData?.militaries[0]?.source_file} /></Flex> : "Topilmadi" },
                                            ]}
                                        />
                                    )
                                )
                            }
                        ]}
                    />

                    <Tabs
                        type="card"
                        items={
                            requiredFiles.map(file => ({
                                key: file,
                                children: (
                                    <Flex vertical gap={24}>
                                        <DocumentViewer fileUrl={applicationDetails[file as ExampleFileFieldNameChoices] || ''} />
                                        <Button type="primary" href={applicationDetails[file as ExampleFileFieldNameChoices] || ''} target="_blank" icon={<DownloadOutlined />} download style={{ margin: 'auto' }}>Faylni yuklab olish</Button>
                                    </Flex>
                                ),
                                label: (
                                    <span className={`${file} ${checkedFiles[file].is_exists ? "active" : checkedFiles[file].is_exists === false ? "inactive" : ''}`}>
                                        {getExampleFileName(file)}
                                    </span>
                                ),
                            }))
                        }
                    />
                </Flex>
                <Flex vertical gap={12} className="check-box">
                    <Flex gap={12} justify="space-between" align="center" wrap>
                        <Typography.Title level={4} style={{ margin: 0 }}>Tekshirish</Typography.Title>
                        {
                            canModify && (
                                <Button
                                    type="primary"
                                    icon={isConfirmButtonPass ? <CheckCircleFilled /> : <CloseCircleFilled />}
                                    disabled={isConfirmButtonDisabled}
                                    variant="solid"
                                    color={!isConfirmButtonDisabled ? (isConfirmButtonPass ? "primary" : "red") : 'primary'}
                                    onClick={isConfirmButtonPass ? handlePass : handleReject}
                                >
                                    {isConfirmButtonDisabled ? 'Tasdiqlash' : isConfirmButtonPass ? "Qabul qilish" : 'Rad etish'}
                                </Button>
                            )
                        }
                    </Flex>
                    <Divider style={{ margin: 0 }} />
                    <Flex vertical gap={20} className="result-table">
                        <Table
                            dataSource={requiredFiles.map((file, index) => ({
                                id: index + 1,
                                key: file,
                                name: getExampleFileName(file)
                            }))}
                            columns={[
                                {
                                    key: 'id',
                                    title: '№',
                                    dataIndex: 'id',
                                    className: 'file_id'
                                },
                                {
                                    key: 'name',
                                    title: 'Nomi',
                                    dataIndex: 'name',
                                    className: 'file_name'
                                },
                                {
                                    key: 'actions',
                                    title: "Amallar",
                                    render: (_, record) => (
                                        <Flex vertical gap={8}>
                                            <Select
                                                style={{ width: 100 }}
                                                placeholder="Tanlang"
                                                value={checkedFiles[record?.key]?.is_exists}
                                                options={[
                                                    { label: "✅ Toʻgʻri", value: true },
                                                    { label: "❌ Xato", value: false }
                                                ]}
                                                disabled={!canModify}
                                                onChange={(value) => {
                                                    setCheckedFiles(prev => ({
                                                        ...prev,
                                                        [record.key]: {
                                                            is_exists: value,
                                                            rejected_reason: prev[record.key].rejected_reason
                                                        }
                                                    }))
                                                }}
                                            />
                                            {
                                                checkedFiles[record?.key]?.is_exists === false && (
                                                    <Input.TextArea
                                                        defaultValue={checkedFiles[record?.key]?.rejected_reason}
                                                        placeholder="Rad etish sababini yozing"
                                                        disabled={!canModify}
                                                        onChange={({ target: { value } }) => {
                                                            conclusionRefs.current = { ...conclusionRefs.current, [record?.key]: value };
                                                        }}
                                                        onBlur={() => {
                                                            setCheckedFiles(prev => ({
                                                                ...prev, [record?.key]: {
                                                                    ...prev[record?.key],
                                                                    rejected_reason: conclusionRefs.current[record?.key] || ''
                                                                }
                                                            }))
                                                        }}
                                                    />
                                                )
                                            }
                                        </Flex>
                                    ),
                                    className: 'file_actions'
                                }
                            ]}
                            pagination={false}
                        />
                        <Flex vertical gap={12} className="rejected-reason">
                            {
                                applicationDetails?.status !== ApplicationStatusChoice.PASSED && (
                                    <>
                                        {
                                            Object.keys(checkedFiles).reduce((acc, curr) => (
                                                acc &&
                                                !!checkedFiles[curr].is_exists
                                            ), true) && canModify ? (
                                                <Flex gap={8}>
                                                    <Typography.Text>Istisno bilan rad etish</Typography.Text>
                                                    <Switch value={rejectWithException} onChange={(value) => setRejectWithException(value)} style={{ width: 'fit-content' }} />
                                                </Flex>
                                            ) : (
                                                <Typography.Text strong>Rad etish xulosasi:</Typography.Text>
                                            )
                                        }
                                        {
                                            ((isConfirmButtonPass && rejectWithException) || !isConfirmButtonPass || applicationDetails?.rejected_reason) && (
                                                <Input.TextArea
                                                    placeholder="Rad etish xulosasini yozing"
                                                    value={rejectedReason}
                                                    disabled={!canModify}
                                                    onChange={({ target: { value } }) => setRejectedReason(value)}
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default AdminApplicationDetails