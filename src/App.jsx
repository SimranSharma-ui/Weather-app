import { BrowserRouter,Routes,Route } from "react-router-dom"
import Form from "./componant/Form"
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/Weather" element={<Form/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
        