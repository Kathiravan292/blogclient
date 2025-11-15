import Home from "./componunt/Home";
import './App.css';
import Routing from "./componunt/Routing"; 
import Navbar from "./componunt/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar/>
      <Routing /> 
      <ToastContainer
       position="top-center"
       autoClose={2000}
       closeOnClick
       pauseOnHover
       draggable
      />
    </>
  );
}

export default App;
