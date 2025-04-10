import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Descriptions, Divider, Empty, Flex, Input, Select, Skeleton, Switch, Table, Tabs, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DocumentViewer from "../../components/DocumentViewer";
import { useGetApplicationDetailsQuery, usePutConclusionMutation } from "../../services/inspector";
import { ExampleFileFieldNameChoices, getApplicationChoiceName, getExampleFileName, getRoleName } from "../../services/types";
import { RootState } from "../../store/store";

interface ICheckedFile { [key: string]: { is_exists: boolean | null, rejected_reason: string } }

const checkObjectKeys = (obj: object) => {
    if (!obj || Object.keys(obj).length === 0) return false;
    return true;
}

const ApplicationDetailsPage = () => {
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
    const { data: applicationDetials, isLoading } = useGetApplicationDetailsQuery({ id: Number(id), admission_id: currentAdmission?.id || 0 }, { skip: !(currentAdmission && currentAdmission?.id) });
    const [checkedFiles, setCheckedFiles] = useState<ICheckedFile>({})
    const [rejectWithException, setRejectWithException] = useState(false);
    const [rejectedReason, setRejectedReason] = useState('');
    const [putConclusion] = usePutConclusionMutation();
    const conclusionRefs = useRef<{ [key: string]: string }>({});

    const handleReject = async () => {
        try {
            console.log('bye');
        } catch (err) {
            console.error(err);
        }
    }

    const handlePass = async () => {
        try {
            console.log('hello');
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (!isLoading && applicationDetials) {
            const conclusion = applicationDetials.expert_conclusion;
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
    }, [applicationDetials, isLoading, requiredFiles]);

    useEffect(() => {
        if (checkObjectKeys(checkedFiles) && currentAdmission?.id && !isLoading) {
            putConclusion({ id: Number(id), expert_conclusion: checkedFiles, admission_id: currentAdmission?.id || 0 });
        }
    }, [checkedFiles, putConclusion, id, currentAdmission, isLoading]);

    if (isLoading || !checkObjectKeys(checkedFiles)) return <Skeleton />
    if (!applicationDetials) return <Empty description="Ariza ma'lumotlari topilmadi" />

    const isConfirmButtonDisabled = (rejectWithException && !rejectedReason) || Object.keys(checkedFiles).reduce((acc, curr) => (
        acc ||
        checkedFiles[curr].is_exists === null ||
        (checkedFiles[curr].is_exists === false && !checkedFiles[curr].rejected_reason)
    ), false);

    const isConfirmButtonPass = !rejectWithException && Object.keys(checkedFiles).reduce((acc, curr) => (
        acc &&
        !!checkedFiles[curr].is_exists
    ), true)

    return (
        <Flex vertical className="application-details" gap={24}>
            <Flex className="application-container" gap={12}>
                <Flex vertical gap={24} className="main-details">
                    <Descriptions
                        bordered
                        size="small"
                        layout="vertical"
                        items={[
                            { key: 'id', label: 'Ariza raqami', children: id },
                            { key: 'type', label: 'Ariza turi', children: getApplicationChoiceName(applicationDetials?.application_type) },
                            { key: 'submit_as', label: "Arizachi kasbi", children: getRoleName(applicationDetials?.submit_as) },
                            { key: 'name', label: "Nomi", children: applicationDetials?.name },
                            { key: 'short_description', label: "Qisqa ma'lumot", children: applicationDetials?.short_description },
                            { key: 'category', label: "Kategoriya", children: applicationDetials?.category },
                            { key: 'problem_and_solution', label: "Muammo va yechim", children: applicationDetials?.problem_and_solution },
                        ]}
                    />
                    <Tabs
                        type="card"
                        items={
                            requiredFiles.map(file => ({
                                key: file,
                                children: <DocumentViewer fileUrl={applicationDetials[file as ExampleFileFieldNameChoices] || ''} />,
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
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            disabled={isConfirmButtonDisabled}
                            variant="solid"
                            color={!isConfirmButtonDisabled ? (isConfirmButtonPass ? "green" : "red") : 'primary'}
                            onClick={isConfirmButtonPass ? handlePass : handleReject}
                        >
                            {isConfirmButtonDisabled ? 'Tasdiqlash' : isConfirmButtonPass ? "Qabul qilish" : 'Rad etish'}
                        </Button>
                    </Flex>
                    <Divider style={{ margin: 0 }} />
                    <Flex vertical gap={8} className="result-table">
                        <Flex vertical gap={12}>
                            <Flex gap={8}>
                                <Typography.Text>Istisno bilan rad etish</Typography.Text>
                                <Switch value={rejectWithException} onChange={(value) => setRejectWithException(value)} style={{ width: 'fit-content' }} />
                            </Flex>
                            {
                                rejectWithException && (
                                    <Input.TextArea
                                        placeholder="Rad etish sababini yozing"
                                        value={rejectedReason}
                                        onChange={({ target: { value } }) => setRejectedReason(value)}
                                    />
                                )
                            }
                        </Flex>
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
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ApplicationDetailsPage