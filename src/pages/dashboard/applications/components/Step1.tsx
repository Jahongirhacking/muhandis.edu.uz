import { Button, Divider, Flex, Form, Input, Radio, Typography } from "antd";
import { useState } from "react";
import { ContinueIcon } from "../../../../assets/icons";
import { roles, specialities } from "../../../../assets/objects";

const Step1 = () => {
    const [selectedRole, setSelectedRole] = useState<number>(0);
    const [selectedSpeciality, setSelectedSpeciality] = useState<number>(0);
    const [form] = Form.useForm();

    const onFinish = () => {
        console.log(form.getFieldsValue());
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            className="step1"
        >
            <Flex vertical gap={32}>
                <Flex gap={24} wrap>
                    {
                        roles.map(role => (
                            <Flex key={role.value} className="select-role" align="flex-start" gap={8} onClick={() => setSelectedRole(role.value)}>
                                <Radio checked={selectedRole === role.value} />
                                <Flex vertical gap={6}>
                                    <Typography.Text strong>{role.label}</Typography.Text>
                                    <Typography.Text>Toshkent Axborot Texnologiyalari Universiteti</Typography.Text>
                                </Flex>
                            </Flex>
                        ))
                    }
                </Flex>
                <Flex vertical gap={24}>
                    <Divider orientation="left" style={{ margin: 0 }}>Tanlov yo‘nalishini tanlang</Divider>
                    <Flex gap={24} wrap>
                        {
                            specialities.map(speciality => (
                                <Flex key={speciality.value} className="select-speciality" align="flex-start" gap={8} onClick={() => setSelectedSpeciality(speciality.value)}>
                                    <Radio checked={selectedSpeciality === speciality.value} />
                                    <Typography.Text strong>{speciality.label}</Typography.Text>
                                </Flex>
                            ))
                        }
                    </Flex>
                </Flex>
                <Flex vertical gap={24} style={{ marginTop: 16 }}>
                    <Divider orientation="left" style={{ margin: 0 }}>Yo‘nalish ma’lumotlarini kiriting</Divider>
                    <Flex gap={24} wrap>
                        <Form.Item
                            name={"name"}
                            layout="vertical"
                            label="Loyiha (go’ya, ixtiro) nomi"
                            required
                            rules={[
                                { required: true, message: "Loyiha nomini kiriting" }
                            ]}
                        >
                            <Input placeholder="Avtonom suv filtrlash tizimi" />
                        </Form.Item>
                        <Form.Item
                            name={'field'}
                            layout="vertical"
                            label="Loyihani (go’ya, ixtiro) qo’llanilish sohasi"
                            required
                            rules={[
                                { required: true, message: "Loyiha sohasini kiriting" }
                            ]}
                        >
                            <Input placeholder="G‘oya muhandislik sohasining qaysi yo‘nalishiga oidligi" />
                        </Form.Item>
                        <Form.Item
                            name={"aim"}
                            layout="vertical"
                            label="Loyihani (go’ya, ixtiro) mazmuni"
                            required
                            rules={[
                                { required: true, message: "Loyiha mazmuni kiriting" }
                            ]}
                        >
                            <Input.TextArea placeholder="G‘oyaning mazmuni qisqacha tushuntirishi" />
                        </Form.Item>
                        <Form.Item
                            name={'solution'}
                            layout="vertical"
                            label="Muammo va yechim"
                            required
                            rules={[
                                { required: true, message: "Muammo va yechim kiriting" }
                            ]}
                        >
                            <Input.TextArea placeholder="G‘oya qanday muammoni hal qiladi va qanday yechim taklif etadi?" />
                        </Form.Item>
                    </Flex>
                </Flex>
                <Button className="continue-btn" htmlType="submit" type="primary" icon={<ContinueIcon />} iconPosition="end" style={{ marginLeft: 'auto' }}>Davom ettirish</Button>
            </Flex >
        </Form>
    )
}

export default Step1