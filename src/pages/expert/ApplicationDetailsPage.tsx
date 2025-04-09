import { Flex, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PdfViewer from "../../components/PdfViwer";
import { useGetApplicationDetailsQuery } from "../../services/inspector";
import { RootState } from "../../store/store";

const ApplicationDetailsPage = () => {
    const { id } = useParams();
    const { currentAdmission } = useSelector((store: RootState) => store.user);
    const { data } = useGetApplicationDetailsQuery({ id: Number(id), admission_id: currentAdmission?.id || 0 }, { skip: !(currentAdmission && currentAdmission?.id) });

    return (
        <Flex vertical className="application-details">
            <Flex className="application-container">
                <Tabs
                    type="card"
                    items={[
                        { label: 'Hello', key: 'hello', children: (<PdfViewer fileUrl={data?.table1_file} />) },
                        { label: 'Hi', key: 'hi', children: (<PdfViewer fileUrl={data?.table2_file} />) }
                    ]}
                />
            </Flex>
        </Flex>
    )
}

export default ApplicationDetailsPage