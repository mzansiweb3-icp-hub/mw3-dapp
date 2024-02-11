import React, { useEffect } from 'react'
import { Footer, Navbar } from '../landing'
import Form from './Form'
import { useAuth } from '../../hooks/Context';
import { useNavigate } from 'react-router-dom';

const Register = ({setIsRegistered, isRegistered}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
  
    }
    if (isAuthenticated && isRegistered) {
      navigate("/home");
    }
  }, [isAuthenticated, isRegistered]);
  return (
    <div className="font-Poppins bg-Solitude">
        <Navbar/>
        <Form  {...{setIsRegistered}}/>
        <Footer />
      </div>
  )
}

export default Register