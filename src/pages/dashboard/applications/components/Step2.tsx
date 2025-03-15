import { Button, Divider, Flex, message, Modal, Skeleton, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ContinueIcon, SuccessIcon } from "../../../../assets/icons";
import { useEditApplicationWithFormDataMutation, useGetApplicationListQuery, useLazySendApplicationQuery } from "../../../../services/applicant";
import { useGetExampleFilesQuery } from "../../../../services/classifier";
import { ApplicationTypeChoice, ExampleFileFieldNameChoices } from "../../../../services/types";
import { RootState } from "../../../../store/store";
import UploadFile, { IUploadFileProps } from "./UploadFile";

export type IFile = File | null;

const Step2 = () => {
    const { currentAdmission } = useSelector((store: RootState) => store.user);
    const [editApplication] = useEditApplicationWithFormDataMutation();
    const { data: applicationsData } = useGetApplicationListQuery();
    const { data: exampleFilesData } = useGetExampleFilesQuery();
    const [sendApplication] = useLazySendApplicationQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const APPLICATIONS_PAGE = '/dashboard/applications';

    const currentApplication = applicationsData && currentAdmission && applicationsData.find(el => el?.admission === currentAdmission?.id);

    const handleUploadFile = async (id: string, file: IFile) => {
        if (!currentApplication?.id) return;
        try {
            const formData = new FormData();
            formData.append(id, file || '');
            await editApplication({ id: currentApplication?.id, formData }).unwrap();
            message.success("Muvaffaqiyatli yuklandi");
        } catch (err) {
            const errObj = err as { data: { [key: string]: string } }
            console.log(errObj);
            message.error(errObj.data[id])
        }
    }

    const handleSubmit = async () => {
        try {
            if (currentApplication?.id) {
                await sendApplication({ id: currentApplication?.id }).unwrap();
                setIsModalOpen(true);
            }
        } catch (err) {
            const errObj = err as { data: { detail: string } };
            console.error(errObj);
            message.error(`Ariza topshirishda xatolik. ${errObj.data.detail}`);
        }
    }

    const requiredUploadFiles: Omit<IUploadFileProps, 'templateUrl' | 'handleSubmit'>[] = [
        {
            id: ExampleFileFieldNameChoices.APPEAL_FILE,
            title: "Ariza (PDF) formatida yuklash",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.TABLE1_FILE,
            title: "G‘oya muallifining ma’lumotnomasi to‘ldirilib, imzolangan holda. 1-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.TABLE2_FILE,
            title: "G‘oya ma’lumotnomasi to‘ldirilib, imzolangan holda. 2-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.TABLE2_1_FILE,
            title: "Zarur mablag‘lar jadvali to‘ldirilib, imzolangan holda. 2.1-jadval ",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.TABLE2_2_FILE,
            title: "Zarur mablag‘lar asosnomasi to‘ldirilib, imzolangan holda. 2.2-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.TABLE3_FILE,
            title: "G‘oya ma’lumotnomasi to‘ldirilib, imzolangan holda. 3-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.VIDEO_CLIP_FILE,
            title: "Videorolik. G‘oya mazmuni, qanday ishlashi bo‘yicha qisqacha videorolik yuklash.",
            uploadLabel: "Faylni yuklang (mp4, FullHD, 1920*1080)",
        },
        ...(currentApplication?.application_type === ApplicationTypeChoice.Invention ||
            currentApplication?.application_type === ApplicationTypeChoice.Project
            ? [
                {
                    id: ExampleFileFieldNameChoices.INDICATOR_METRIC_FILE,
                    title: "Indikator ko‘rsatkichlari",
                    uploadLabel: 'Faylni yuklang (PDF)',
                },
            ]
            : []
        ),
        ...(currentApplication?.application_type === ApplicationTypeChoice.Project
            ? [
                {
                    id: ExampleFileFieldNameChoices.CALENDAR_PLAN_FILE,
                    title: "Kalendar reja",
                    uploadLabel: 'Faylni yuklang (PDF)',
                },
            ]
            : []
        ),
    ]

    const optionalUploadFiles: Omit<IUploadFileProps, 'templateUrl' | 'handleSubmit'>[] = [
        {
            id: ExampleFileFieldNameChoices.TECHNICAL_DOCUMENT_FILE,
            title: "Texnik chizmalar, konseptual grafikalar, modellar, diagrammalar, illyustratsiyalar, guvohnomalar,",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.FOREIGN_PASSPORT_FILE,
            title: "Xorijga chiqish pasportining elektron nusxasi",
            uploadLabel: "Faylni yuklang (PDF)",
        },
        {
            id: ExampleFileFieldNameChoices.EXPERT_CONCLUSION_FILE,
            title: " Ekspert xulosasi yoki fikr-mulohazalar",
            uploadLabel: "Faylni yuklang (PDF)",
        },
    ]

    if (!exampleFilesData || !currentApplication) return <Skeleton />

    const handleCloseModal = () => {
        navigate(APPLICATIONS_PAGE);
    }

    return (
        <Flex className="step-2" vertical gap={40}>
            <Modal
                open={isModalOpen}
                closable
                onCancel={handleCloseModal}
                footer={false}
            >
                <Flex vertical align="center" gap={24}>
                    <SuccessIcon />
                    <Typography.Title level={4} style={{ textAlign: 'center' }}>Arizangiz muvaffaqiyatli topshirildi!</Typography.Title>
                    <Link to={APPLICATIONS_PAGE}>
                        <Button variant="solid" color="cyan">
                            Arizalarim
                        </Button>
                    </Link>
                </Flex>
            </Modal>

            <Flex vertical gap={24}>
                <Divider orientation="left" style={{ margin: 0 }}>Majburiy materiallar va yuklanadigan hujjatlar</Divider>
                <Flex gap={24} wrap className="required-files">
                    {
                        requiredUploadFiles.map(file => (
                            <UploadFile
                                key={file.id}
                                {...file}
                                templateUrl={exampleFilesData.find(el => el?.field_name === file?.id && el?.file_type === currentApplication?.application_type)?.file || ''}
                                fileUrl={currentApplication[file?.id] || ''}
                                handleSubmit={handleUploadFile}
                            />
                        ))
                    }
                </Flex>
            </Flex>

            <Flex vertical gap={24}>
                <Divider orientation="left" style={{ margin: 0 }}>Qo‘shimcha materiallar va yuklanadigan hujjatlar</Divider>
                <Flex gap={24} wrap className="required-files">
                    {
                        optionalUploadFiles.map(file => (
                            <UploadFile
                                key={file.id}
                                {...file}
                                fileUrl={currentApplication[file?.id] || ''}
                                handleSubmit={handleUploadFile}
                            />
                        ))
                    }
                </Flex>
            </Flex>
            <Button
                type="primary"
                icon={<ContinueIcon />}
                style={{ marginLeft: 'auto' }}
                iconPosition={'end'}
                className="continue-btn"
                onClick={handleSubmit}
            >
                Ariza topshirish
            </Button>
        </Flex>
    )
}

export default Step2