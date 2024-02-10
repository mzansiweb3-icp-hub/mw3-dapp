import React, { useEffect } from 'react'
import { Footer, Navbar } from '../landing'
import Form from './Form'
import { useAuth } from '../../hooks/Context';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="font-Poppins bg-Solitude">
        <Navbar/>
        <Form />
        <Footer />
      </div>
  )
}

export default Register