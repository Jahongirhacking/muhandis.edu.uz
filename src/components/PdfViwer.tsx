const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
    return (
        <iframe
            src={fileUrl}
            width="100%"
            height="600px"
            style={{ border: "none" }}
        />
    )
};

export default PdfViewer;
