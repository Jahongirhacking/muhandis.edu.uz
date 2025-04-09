import { Button, Flex, Typography, Upload } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { DeleteIcon, DownloadFileIcon, UploadFileIcon } from '../../assets/icons';
import { IFile } from '../../pages/dashboard/applications/components/Step2';
import './UploadFile.scss';

export interface IUploadFileProps {
    id: string;
    title: string;
    uploadLabel: string;
    templateUrl?: string;
    fileUrl?: string;
    optimistic?: boolean;
    removable?: boolean;
    comment?: string;
    handleSubmit: (id: string, file: IFile) => Promise<void>
}

export interface UploadFileRef {
    resetFile: () => void;
}


const UploadFile = forwardRef<UploadFileRef, IUploadFileProps>(({ id, title, uploadLabel, templateUrl = "", fileUrl = "", comment = "", optimistic = false, removable = true, handleSubmit }, ref) => {
    const [file, setFile] = useState<IFile | null>();

    const handleUpload = async (file: IFile) => {
        setFile(file);
        await handleSubmit(id, file);
    }

    useImperativeHandle(ref, () => ({
        resetFile: () => {
            setFile(null);
        },
    }));

    return (
        <Flex gap={8} align='stretch' className='upload-file'>
            <Flex vertical gap={16} className={`upload-container ${!templateUrl ? 'only-item' : ''}`}>
                <Typography.Text className='upload-title'>{title}</Typography.Text>
                {
                    comment && (
                        <Typography.Text className='comment' italic>{comment}</Typography.Text>
                    )
                }
                {templateUrl && (
                    <a download href={templateUrl} target='_blank' className='template-file'>
                        <UploadFileIcon />
                        <span>Namunani yuklab oling</span>
                    </a>
                )}
                {
                    (fileUrl || optimistic) && (
                        <Flex gap={4} className='uploaded-file'>
                            {file && optimistic ? (
                                <Typography.Text>{file?.name}</Typography.Text>
                            ) : fileUrl && (
                                <a className='file-url' href={fileUrl} target='_blank'>{fileUrl.split('/')[fileUrl.split('/').length - 1]}</a>
                            )}
                            {
                                fileUrl && removable && (
                                    <Button variant='filled' color='red' icon={<DeleteIcon />} onClick={() => handleUpload(null)} />
                                )
                            }
                        </Flex>
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
                    showUploadList={false}
                    maxCount={1}
                    onRemove={() => { handleUpload(null) }}
                >
                    <Button icon={<DownloadFileIcon />} />
                </Upload>
            </Flex>
        </Flex>
    )
})

export default UploadFile