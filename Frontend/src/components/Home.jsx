import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div>Hello Home</div>
      </div>
    </>
  );
}
