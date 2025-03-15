import { Flex } from "antd";
import UploadFile from "./UploadFile";

export type IFile = File | null;

const Step2 = () => {
    const handleUploadFile = async (id: string, file: IFile) => {
        console.log(id, file);
    }

    return (
        <Flex className="step-2" vertical gap={72}>
            <Flex gap={24}>
                <UploadFile
                    id="table1_file"
                    title="Ariza (PDF) formatida yuklash"
                    uploadLabel="Faylni yuklang (PDF)"
                    typeChoice={['pdf']}
                    templateUrl="#"
                    handleSubmit={handleUploadFile}
                />
            </Flex>
        </Flex>
    )
}

export default Step2