import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const PdfViewer = ({ fileUrl }: { fileUrl: string | null | undefined }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Viewer
            fileUrl={fileUrl || 'test.pdf'}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={1}
            enableSmoothScroll
        />
    );
};

export default PdfViewer;
