import { Button, Flex, message, Typography, Upload } from 'antd';
import { FC } from 'react';
import { DownloadFileIcon, UploadFileIcon } from '../../../../assets/icons';
import { ExampleFileFieldNameChoices } from '../../../../services/types';
import { IFile } from './Step2';

export interface IUploadFileProps {
    id: ExampleFileFieldNameChoices;
    title: string;
    uploadLabel: string;
    templateUrl?: string;
    fileUrl?: string;
    handleSubmit: (id: string, file: IFile) => Promise<void>
}

const UploadFile: FC<IUploadFileProps> = ({ id, title, uploadLabel, templateUrl = "", fileUrl = "", handleSubmit }) => {
    const handleUpload = async (file: IFile) => {
        await handleSubmit(id, file);
        if (!file) {
            message.info("Fayl o'chirildi");
            return;
        }
    }

    return (
        <Flex gap={8} align='stretch' className='upload-file'>
            <Flex vertical gap={16} className={`upload-container ${!templateUrl ? 'only-item' : ''}`}>
                <Typography.Text className='upload-title'>{title}</Typography.Text>
                {templateUrl && (
                    <a href={templateUrl} target='_blank' className='template-file'>
                        <UploadFileIcon />
                        <span>Namunani yuklab oling</span>
                    </a>
                )}
                {
                    fileUrl && (
                        <a className='file-url' href={fileUrl} target='_blank'>{fileUrl.split('/')[fileUrl.split('/').length - 1]}</a>
                    )
                }
            </Flex>
            <Flex vertical gap={8} justify='space-between' className='download'>
                <Typography.Text strong>{uploadLabel}</Typography.Text>
                <Upload
                    name='file'
                    beforeUpload={(file) => {
                        handleUpload(file);
                        return false;
                    }}
                    maxCount={1}
                    onRemove={() => { handleUpload(null) }}
                >
                    <Button icon={<DownloadFileIcon />} />
                </Upload>
            </Flex>
        </Flex>
    )
}

export default UploadFile