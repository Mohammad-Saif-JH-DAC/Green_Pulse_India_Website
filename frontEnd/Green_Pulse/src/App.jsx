
import { About } from "./Components/About";
import { Home } from "./Components/Home";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Events } from "./Events";
import { Contact } from "./Components/Contact";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./Components/Footer";
import { Gallery } from "./Components/Gallery";
import { useEffect } from "react";



function App() {


  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token'); // Clear token
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/About" element={<About />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
