import { Routes, Route, Navigate} from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/configs" />}></Route>
        <Route path="/home" />
        <Route path="/configs" />
        <Route path="/profile" />
      </Routes>
      
    </>
  )
}

export default App
