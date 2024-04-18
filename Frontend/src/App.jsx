import Home from "./components/Home"
import Sidebar from "./components/Sidebar"


function App() {

  return (
    <>
      <div className="flex flex-row bg-[#22223B]">
        <Sidebar />
        <Home />
      </div>
    </>
  )
}

export default App
