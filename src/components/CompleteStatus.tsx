import { Button, Card, Flex, Progress, Typography } from "antd";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../store/store";
import { DrawerChildTypes, SearchParams } from "../utils/config";

const CompleteStatus = () => {
    const { profile, workplaceList } = useSelector((store: RootState) => store.user);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOpenContactDrawer = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(SearchParams.Drawer, DrawerChildTypes.RequiredContact);
        setSearchParams(newParams);
    }

    const handleOpenWorkplaceDrawer = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(SearchParams.Drawer, DrawerChildTypes.WorkplaceList);
        setSearchParams(newParams);
    }

    const requiredFields = [
        {
            key: 'phone',
            value: !!profile?.phone_number,
            label: "Telefon raqam",
            onClick: handleOpenContactDrawer,
        },
        {
            key: 'email',
            value: !!profile?.email,
            label: "Elektron pochta",
            onClick: handleOpenContactDrawer,
        },
        {
            key: 'workplace',
            value: workplaceList?.reduce((acc, curr) => !!(acc || curr?.is_selected), false),
            label: "Asosiy mehnat ma’lumotini tanlang",
            onClick: handleOpenWorkplaceDrawer,
        }
    ];

    const validatedFieldsNumber = requiredFields.reduce((acc, curr) => acc + Number(curr.value), 0);
    const percent = Number((validatedFieldsNumber / requiredFields.length * 100).toFixed());

    return (
        <Card className="status-card">
            <Flex vertical gap={25}>
                <Typography.Text strong className="title">Ma’lumotlar holati</Typography.Text>
                <Flex vertical gap={35}>
                    <Flex vertical gap={8}>
                        <Typography.Text>To’ldirilish darajasi: <span style={{ color: '#068EFF' }}>{percent}%</span></Typography.Text>
                        <Progress showInfo={false} percent={percent} />
                    </Flex>
                    {
                        requiredFields.length !== validatedFieldsNumber && (
                            <Flex vertical gap={12} className="required">
                                <Typography.Text strong>To’ldirilishi shart</Typography.Text>
                                <Flex vertical gap={8}>
                                    {
                                        requiredFields?.filter(el => !el.value).map(el => (
                                            <Button type="link" onClick={el.onClick} key={el?.key}>
                                                {el.label}
                                            </Button>
                                        ))
                                    }
                                </Flex>
                            </Flex>
                        )
                    }
                </Flex>
            </Flex>
        </Card>
    )
}

export default CompleteStatus