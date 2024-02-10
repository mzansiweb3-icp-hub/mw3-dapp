import { useNavigate } from "react-router-dom";
import {
    Navbar,
    Home,
    About,
    Teacher,
    Contact,
    Courses,
    Footer,
  } from ".";
import { useEffect } from "react";
import { useAuth } from "../../hooks/Context";
  
const Landing = ({isRegistered}) => {
const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isRegistered === true) {
      navigate("/home");
    }
    if (isAuthenticated === true && isRegistered === false) {
      navigate("/register");
    }
  }, [isRegistered, isAuthenticated]);

    return (
      <div className="font-Poppins bg-Solitude">
        <Navbar />
        <Home />
        <About />
        <Courses />
        <Teacher />
        <Contact />
        <Footer />
      </div>
    );
  }
  
  export default Landing;
  