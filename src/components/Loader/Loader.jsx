import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
        zIndex: 9999,
        margin: 0,
        padding: 0,
      }}>
      <PuffLoader color="#FF7F00" size={80} />
    </div>
  );
};

export default Loader;
