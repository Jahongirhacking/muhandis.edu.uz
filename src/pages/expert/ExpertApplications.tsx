import { EyeOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyGetAdmissionQuery } from "../../services/classifier";
import { useGetApplicationsQuery } from "../../services/inspector";
import { ApplicationSubmitAsChoice, getRoleName } from "../../services/types";
import { RootState } from "../../store/store";

const ExpertApplications = () => {
    const { currentAdmission } = useSelector((store: RootState) => store.user);
    const { data } = useGetApplicationsQuery({ admission_id: currentAdmission?.id || 0 }, { skip: !(currentAdmission && currentAdmission?.id) });
    const [getAdmission] = useLazyGetAdmissionQuery();
    const navigate = useNavigate();

    useEffect(() => {
        getAdmission();
    }, [getAdmission])

    return (
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
                }
            ]}
            rowKey={'id'}
        />
    )
}

export default ExpertApplications