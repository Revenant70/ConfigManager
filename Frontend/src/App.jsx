import { Routes, Route, Navigate} from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/auth" />}></Route>
        <Route path="/configs" />
        <Route path="/profile" />
        <Route path="/signup" />
        <Route path="/forgotpassword" />
        <Route path="/changeuserpassword" />
      </Routes>
      
    </>
  )
}

export default App
