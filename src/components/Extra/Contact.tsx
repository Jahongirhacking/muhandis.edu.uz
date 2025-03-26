import { Flex, Typography } from "antd"

const ContactInfo = () => {
    return (
        <Flex vertical gap={12} className="contact-info">
            <Typography.Text>Tanlov tartib qoidalari to'g'risidagi savollar uchun <a href='tel:+998555200808'>(55) 520-08-08</a>,  Ichki raqam: (357),  <a href='tel:+998900650509'>(90) 065-05-09</a></Typography.Text>
            <Typography.Text>Ariza yuborish bilan bog'liq texnik savollar uchun <a href='tel:+998712031319'>+998 71 203 13 19</a></Typography.Text>
        </Flex>
    )
}

export default ContactInfo
