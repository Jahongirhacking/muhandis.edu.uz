import { Flex, message, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useEditApplicationWithFormDataMutation, useGetApplicationListQuery } from "../../../../services/applicant";
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

    const currentApplication = applicationsData && currentAdmission && applicationsData.find(el => el?.admission === currentAdmission?.id);

    const handleUploadFile = async (id: string, file: IFile) => {
        if (!currentApplication?.id) return;
        try {
            const formData = new FormData();
            formData.append(id, file || '');
            await editApplication({ id: currentApplication?.id, formData });
        } catch (err) {
            console.log(err);
            message.error("Fayl yuklashda xatolik")
        }
    }

    const requiredUploadFiles: Omit<IUploadFileProps, 'templateUrl' | 'handleSubmit'>[] = [
        {
            id: ExampleFileFieldNameChoices.APPEAL_FILE,
            title: "Ariza (PDF) formatida yuklash",
            uploadLabel: "Faylni yuklang (PDF)",
            typeChoice: ['pdf'],
        },
        {
            id: ExampleFileFieldNameChoices.TABLE1_FILE,
            title: "G‘oya muallifining ma’lumotnomasi to‘ldirilib, imzolangan holda. 1-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
            typeChoice: ['pdf'],
        },
        {
            id: ExampleFileFieldNameChoices.TABLE2_FILE,
            title: "G‘oya ma’lumotnomasi to‘ldirilib, imzolangan holda. 2-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
            typeChoice: ['pdf'],
        },
        {
            id: ExampleFileFieldNameChoices.TABLE2_1_FILE,
            title: "Zarur mablag‘lar jadvali to‘ldirilib, imzolangan holda. 2.1-jadval ",
            uploadLabel: "Faylni yuklang (PDF)",
            typeChoice: ['pdf'],
        },
        {
            id: ExampleFileFieldNameChoices.TABLE2_2_FILE,
            title: "Zarur mablag‘lar asosnomasi to‘ldirilib, imzolangan holda. 2.2-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
            typeChoice: ['pdf'],
        },
        {
            id: ExampleFileFieldNameChoices.TABLE3_FILE,
            title: "G‘oya ma’lumotnomasi to‘ldirilib, imzolangan holda. 3-jadval",
            uploadLabel: "Faylni yuklang (PDF)",
            typeChoice: ['pdf'],
        },
        {
            id: ExampleFileFieldNameChoices.VIDEO_CLIP_FILE,
            title: "Videorolik. G‘oya mazmuni, qanday ishlashi bo‘yicha qisqacha videorolik yuklash.",
            uploadLabel: "Faylni yuklang (mp4, FullHD, 1920*1080)",
            typeChoice: ['mp4'],
        },
        ...(currentApplication?.application_type === ApplicationTypeChoice.Invention ||
            currentApplication?.application_type === ApplicationTypeChoice.Project
            ? [
                {
                    id: ExampleFileFieldNameChoices.INDICATOR_METRIC_FILE,
                    title: "Indikator ko‘rsatkichlari",
                    uploadLabel: 'Faylni yuklang (PDF)',
                    typeChoice: ['pdf'] as IUploadFileProps['typeChoice'],
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
                    typeChoice: ['pdf'] as IUploadFileProps['typeChoice'],
                },
            ]
            : []
        ),
    ]
    if (!exampleFilesData || !currentApplication) return <Skeleton />

    return (
        <Flex className="step-2" vertical gap={72}>
            <Flex gap={24} wrap className="required-files">
                {
                    requiredUploadFiles.map(file => (
                        <UploadFile
                            key={file.id}
                            {...file}
                            templateUrl={exampleFilesData.find(el => el?.field_name === file?.id && el?.file_type === currentApplication?.application_type)?.file || ''}
                            handleSubmit={handleUploadFile}
                        />
                    ))
                }
            </Flex>
        </Flex>
    )
}

export default Step2