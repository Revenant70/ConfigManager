import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row bg-[#1b1b1f] min-h-screen">
        <Sidebar />
        <div>Hello Home</div>
      </div>
    </>
  );
}
