import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { Spin } from "antd";

const Loading = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <SpinLoader />
    </section>
  );
};

export default Loading;
