import ConfigLayout from "./ConfigLayout";
import Sidebar from "./Sidebar";

export default function Configs() {
  return (
    <>
  <div className="flex flex-row justify-end bg-[#1b1b1f] min-h-screen">
    <Sidebar />
    <div className="flex flex-col overflow-x-auto w-10/12 p-4">
      <div className="flex justify-end items-center flex-grow">
          <ConfigLayout />
      </div>
    </div>
  </div>
</>
  );
}
