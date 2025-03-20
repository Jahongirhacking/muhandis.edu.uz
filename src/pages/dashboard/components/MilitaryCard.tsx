import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, message, Select, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UploadFile, { UploadFileRef } from "../../../components/Form/UploadFile";
import { useGetMilitaryQuery, usePatchMilitaryMutation, usePostMilitaryMutation } from "../../../services/applicant";
import { IUniversity } from "../../../services/applicant/types";
import { useGetUniversityListQuery } from "../../../services/classifier";
import { RootState } from "../../../store/store";
import { IFile } from "../applications/components/Step2";

const MilitaryCard = () => {
    const [selectedUniversity, setSelectedUniversity] = useState<IUniversity['id']>();
    const [file, setFile] = useState<IFile>();
    const { data: militaryData } = useGetMilitaryQuery();
    const [patchMilitaryData] = usePatchMilitaryMutation();
    const [postMilitaryData] = usePostMilitaryMutation();
    const { data: universityData, isLoading } = useGetUniversityListQuery({ is_military: true, limit: 100 });
    const { currentAdmission, profile } = useSelector((store: RootState) => store?.user);
    const currentMilitaryData = militaryData && militaryData[0];
    const uploadRef = useRef<UploadFileRef>(null);

    const handleFileChange = async (_: string, file: IFile) => {
        if (file === null && currentMilitaryData) {
            const formData = new FormData();
            formData.append("source_file", "");
            await patchMilitaryData({ id: currentMilitaryData?.id, formData }).unwrap();
        }
        setFile(file);
    }

    const handleUniversityChange = (id: IUniversity['id']) => {
        setSelectedUniversity(id);
    }

    const handleSubmit = async () => {
        try {
            if (!file && !selectedUniversity) return;
            const formData = new FormData();
            if (file) formData.append("source_file", file || '');
            if (selectedUniversity) formData.append("university", String(selectedUniversity));
            if (currentMilitaryData) {
                // patch
                await patchMilitaryData({ id: currentMilitaryData?.id, formData }).unwrap();
            } else {
                // check both
                if (!selectedUniversity || !file) return;
                // post
                formData.append('user', String(profile?.id));
                formData.append('admission', String(currentAdmission?.id));
                await postMilitaryData(formData).unwrap();
            }
            message.success("Muvaffaqiyatli yuklandi");
        } catch (err) {
            message.error("Yuklashda xatolik");
            console.error(err);
        } finally {
            uploadRef.current?.resetFile();
        }
    }

    useEffect(() => {
        if (currentMilitaryData) {
            setSelectedUniversity(currentMilitaryData?.university?.id);
        }
    }, [currentMilitaryData])

    return (
        <Card
            className="military-card"
            title="Harbiy ma’lumoti"
        >
            <Flex vertical gap={24}>
                <Flex vertical gap={4}>
                    <Typography.Text>O‘quv muassasasi nomi</Typography.Text>
                    <Select
                        showSearch
                        optionFilterProp="label"
                        loading={isLoading}
                        value={selectedUniversity}
                        onChange={handleUniversityChange}
                        options={universityData?.results?.map(uni => ({
                            key: uni?.code,
                            label: uni?.name_uz || uni?.name_ru || uni?.name_en,
                            value: uni?.id
                        }))}
                    />
                </Flex>
                <UploadFile
                    id="source_file"
                    uploadLabel="Fayl yuklang (PDF)"
                    title="Harbiy ta'lim muassasasida tahsil olayotganligingiz yoki mehnat faoliyatini olib borayotganligingiz to'g'risida ma'lumotnoma yuklang"
                    handleSubmit={handleFileChange}
                    fileUrl={currentMilitaryData?.source_file || ''}
                    optimistic
                    removable={false}
                    ref={uploadRef}
                />
                <Button type="primary" style={{ marginLeft: 'auto' }} onClick={handleSubmit} icon={<PlusOutlined />}>Saqlash</Button>
            </Flex>
        </Card >
    )
}

export default MilitaryCard
