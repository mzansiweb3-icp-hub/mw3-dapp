import React from 'react'
import { useAuth } from '../../../hooks/Context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
     logout();
    navigate("/");
  }


  return (
    
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home