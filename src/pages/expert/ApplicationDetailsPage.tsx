import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Flex, Input, Select, Skeleton, Table, Tabs, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DocumentViewer from "../../components/DocumentViewer";
import { useGetApplicationDetailsQuery } from "../../services/inspector";
import { ExampleFileFieldNameChoices, getExampleFileName } from "../../services/types";
import { RootState } from "../../store/store";

const ApplicationDetailsPage = () => {
    const { id } = useParams();
    const { currentAdmission, profile } = useSelector((store: RootState) => store.user);
    const requiredFiles = [
        ExampleFileFieldNameChoices.APPEAL_FILE,
        ExampleFileFieldNameChoices.TABLE1_FILE,
        ExampleFileFieldNameChoices.TABLE2_FILE,
        ExampleFileFieldNameChoices.TABLE2_1_FILE,
        ExampleFileFieldNameChoices.TABLE2_2_FILE,
        ExampleFileFieldNameChoices.TABLE3_FILE,
        ...(profile.check_type === 'project' ? [ExampleFileFieldNameChoices.CALENDAR_PLAN_FILE] : []),
        ExampleFileFieldNameChoices.VIDEO_CLIP_FILE,
        ExampleFileFieldNameChoices.PRESENTATION_FILE
    ];
    const { data: applicationDetials, isLoading } = useGetApplicationDetailsQuery({ id: Number(id), admission_id: currentAdmission?.id || 0 }, { skip: !(currentAdmission && currentAdmission?.id) });
    const [checkedFiles, setCheckedFiles] = useState<{ [key: string]: { is_exists: boolean | null, rejected_reason: string } }>(requiredFiles.reduce((acc, curr) => ({ ...acc, [curr]: { is_exists: null, rejected_reason: '' } }), {}))

    if (isLoading) return <Skeleton />
    if (!applicationDetials) return <Empty description="Ariza ma'lumotlari topilmadi" />

    return (
        <Flex vertical className="application-details">
            <Flex className="application-container" gap={12}>
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
                <Flex vertical gap={12} className="check-box">
                    <Flex gap={12} justify="space-between" align="center">
                        <Typography.Title level={4} style={{ margin: 0 }}>Tekshirish</Typography.Title>
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            disabled={Object.keys(checkedFiles).reduce((acc, curr) => (
                                acc ||
                                checkedFiles[curr].is_exists === null ||
                                (checkedFiles[curr].is_exists === false && !checkedFiles[curr].rejected_reason)
                            ), false)}
                        >Tasdiqlash</Button>
                    </Flex>
                    <Divider style={{ margin: 0 }} />
                    <Flex vertical gap={8}>
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
                                    dataIndex: 'id'
                                },
                                {
                                    key: 'name',
                                    title: 'Nomi',
                                    dataIndex: 'name'
                                },
                                {
                                    key: 'actions',
                                    title: "Amallar",
                                    render: (_, record) => (
                                        <Flex vertical>
                                            <Select
                                                style={{ width: 100 }}
                                                placeholder="Tanlang"
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
                                                        placeholder="Rad etish sababini yozing"
                                                        onChange={({ target: { value } }) => {
                                                            setCheckedFiles(prev => ({
                                                                ...prev,
                                                                [record.key]: {
                                                                    is_exists: prev[record.key].is_exists,
                                                                    rejected_reason: value
                                                                }
                                                            }))
                                                        }}
                                                    />
                                                )
                                            }
                                        </Flex>
                                    )
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