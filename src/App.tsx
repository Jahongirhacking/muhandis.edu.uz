import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MainRouter from "./routes";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [])

  if (!isReady) return <LoadingOutlined />

  return <MainRouter />
}

export default App
