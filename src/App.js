
import { Routes, Route } from "react-router-dom"
import StepForm from "./StepForm";
import List from "./List";
import ProgressPage from "./ProgressPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={ <StepForm/> } />
        <Route path="/list" element={ <List/> } />
        <Route path="/progress" element ={<ProgressPage/>} />
        
      </Routes>

  );
}

export default App;
