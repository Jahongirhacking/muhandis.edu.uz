import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input, message, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InputMask from "../../../components/Form/InputMask";
import { useUpdateContactMutation } from "../../../services/applicant";
import { useLazyGetMeQuery } from "../../../services/user";
import { RootState } from "../../../store/store";
import { SearchParams } from "../../../utils/config";

const RequiredContact = () => {
    const profile = useSelector((store: RootState) => store.user.profile);
    const [phone, setPhone] = useState(profile?.phone_number || "");
    const [email, setEmail] = useState(profile?.email || "");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [updateContact] = useUpdateContactMutation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [getMe] = useLazyGetMeQuery();

    const handleSubmit = async () => {
        if (profile?.id && isValidEmail && isValidPhone && phone && email) {
            await updateContact({
                id: profile?.id,
                phone_number: phone.split('').filter(el => !isNaN(Number.parseInt(el))).join(""),
                email
            })
            await getMe();
            message.success("Kontakt ma'lumotlari muvaffaqiyatli o'zgartirildi!");
            const newParams = new URLSearchParams(searchParams);
            newParams.delete(SearchParams.Drawer);
            setSearchParams(newParams);
        } else {
            message.warning(`${!isValidEmail || !email ? "Email" : ''} ${(!isValidEmail || !email) && (!isValidPhone || !phone) ? "va" : ''} ${!isValidPhone || !phone ? "Telefon raqam" : ''} to'g'ri formatda kiritilishi shart!`);
        }
    }

    const validatePhone = (value: string) => {
        setPhone(value);
        setIsValidPhone(value === '' || /^\+998\d{9}$/.test(value));
    };

    const validateEmail = (value: string) => {
        setEmail(value);
        setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === ''); // Empty is allowed
    };

    return (
        <Flex vertical gap={32}>
            <Flex vertical gap={12}>
                <Flex vertical gap={3}>
                    <Typography.Text>Telefon raqam</Typography.Text>
                    <InputMask
                        format={['!+', '!9', '!9', '!8', ...('(99) 999 99 99').split('')]}
                        maskChar={[' ', '(', ')']}
                        setValue={validatePhone}
                        placeholder="+998"
                        status={isValidPhone ? '' : 'error'}
                        className='input-mask phone-input'
                    />
                    {!isValidPhone && <Typography.Text style={{ color: 'red' }}>Telefon raqam to'liq emas</Typography.Text>}
                </Flex>
                <Flex vertical gap={3}>
                    <Typography.Text>Email</Typography.Text>
                    <Input
                        value={email}
                        onChange={({ target: { value } }) => validateEmail(value)}
                        status={isValidEmail ? '' : 'error'}
                        placeholder="johndoe@example.com"
                    />
                    {!isValidEmail && <Typography.Text style={{ color: 'red' }}>Email to'liq emas</Typography.Text>}
                </Flex>
            </Flex>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleSubmit}>Qo'shish</Button>
        </Flex >
    )
}

export default RequiredContact