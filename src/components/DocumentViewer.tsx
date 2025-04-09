import { Empty } from "antd";

const DocumentViewer = ({ fileUrl }: { fileUrl: string | null | undefined }) => {
    if (!fileUrl) return <Empty description="Fayl topilmadi" />;

    return (
        <iframe
            className="document-viewer"
            src={fileUrl}
            title="Document Viewer"
            style={{ border: 'none' }}
        />
    );
};

export default DocumentViewer;
