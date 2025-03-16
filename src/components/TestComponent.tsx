import { UploadFileIcon } from "../assets/icons"
import DownloadFile from "./DownloadFile"

const TestComponent = () => {
    return (
        <DownloadFile
            fileName={"hello"}
            fileUrl={"http://muhandis.edu.uz/media-files/example_files/1_37TvL9r._Ariza.docx"}
            className='template-file'
            icon={<UploadFileIcon />}
            buttonLabel='Namunani yuklab oling'
        />
    )
}

export default TestComponent