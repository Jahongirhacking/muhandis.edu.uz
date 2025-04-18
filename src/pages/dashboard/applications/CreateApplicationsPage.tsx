import { Button, Flex, Progress, Typography } from "antd"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ReturnIcon } from "../../../assets/icons"
import ControlledFlow from "../../../components/ControlledFlow"
import { SearchParams } from "../../../utils/config"
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"

const CreateApplicationsPage = ({ editable = false }: { editable?: boolean }) => {
    const [data, setData] = useState<object>({});
    const [searchParams] = useSearchParams();
    const [current, setCurrent] = useState<number>(Number(searchParams.get(SearchParams.Step) || 1) - 1 || 0);

    return (
        <>
            <Flex gap={16} align="center">
                <Link to={"/dashboard/applications"}>
                    <Button icon={<ReturnIcon />} variant="solid" shape="circle" />
                </Link>
                <Typography.Title level={2} style={{ margin: 0 }}>Ariza yuborish</Typography.Title>
                <Flex gap={16} align="center" style={{ marginLeft: 16 }} className="progress-container">
                    <Progress type="circle" size="small" percent={current / 2 * 100} />
                    <Flex vertical>
                        {
                            current === 0 ? (
                                <>
                                    <Typography.Text strong>Qadam 1</Typography.Text>
                                    <Typography.Text>Ariza ma’lumotlari</Typography.Text>
                                </>
                            ) : (
                                <>
                                    <Typography.Text strong>Qadam 2</Typography.Text>
                                    <Typography.Text>Asosiy materiallar va yuklanadigan hujjatlar</Typography.Text>
                                </>
                            )
                        }

                    </Flex>
                </Flex>
            </Flex>
            <Flex vertical className="create-application applications-main">
                <ControlledFlow
                    {...{ current, setCurrent, data, setData }}
                >
                    <Step1 editable={editable} />
                    <Step2 />
                </ControlledFlow>
            </Flex>

        </>
    )
}

export default CreateApplicationsPage