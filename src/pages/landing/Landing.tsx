import {
    Navbar,
    Home,
    About,
    Teacher,
    Contact,
    Courses,
    Footer,
  } from ".";
  
const Landing = () => {
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
  