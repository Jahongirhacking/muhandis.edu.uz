import { Button, Flex, message, Typography, Upload } from 'antd';
import { FC } from 'react';
import { DownloadFileIcon, UploadFileIcon } from '../../../../assets/icons';
import { IFile } from './Step2';

type IFileType = 'pdf' | 'mp4' | 'pptx'

interface IUploadFileProps {
    id: string;
    typeChoice: IFileType[];
    title: string;
    uploadLabel: string;
    templateUrl: string;
    handleSubmit: (id: string, file: IFile) => Promise<void>
}

const UploadFile: FC<IUploadFileProps> = ({ id, typeChoice, title, uploadLabel, templateUrl, handleSubmit }) => {

    const handleUpload = async (file: IFile) => {
        await handleSubmit(id, file);
        if (!file) {
            message.info("Fayl o'chirildi");
            return;
        }
        const token = file.name.split('.');
        if (typeChoice.includes(token[token.length - 1] as IFileType)) {
            message.success("Muvaffaqiyatli yuklandi");
        } else {
            message.warning(`Fayl formati quyidagi formatda bo'lishi talab etiladi: ${typeChoice.map(el => el.toUpperCase()).join(', ')}`)
        }
        console.log(file);
    }

    return (
        <Flex gap={8} wrap align='stretch' className='upload-file'>
            <Flex vertical gap={8} className='upload-container'>
                <Typography.Text className='upload-title'>{title}</Typography.Text>
                <Upload
                    name='file'
                    beforeUpload={(file) => {
                        handleUpload(file);
                        return false;
                    }}
                    maxCount={1}
                    onRemove={() => { handleUpload(null) }}
                >
                    <Button icon={<UploadFileIcon />} type='link'>{uploadLabel}</Button>
                </Upload>
            </Flex>
            <Flex vertical gap={8} justify='space-between' className='download'>
                <Typography.Text strong>Namunani yuklab oling</Typography.Text>
                <Button icon={<DownloadFileIcon />} href={templateUrl} target='_blank' />
            </Flex>
        </Flex>
    )
}

export default UploadFile