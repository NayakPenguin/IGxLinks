import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../Images/logo-main.png";

const BetweenCalcPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [status, setStatus] = useState("Checking authentication...");

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // 1. Check session status
        const { data } = await axios.get(`${API_URL}/auth/check-session`, {
          withCredentials: true
        });

        if (!data.id) {
          return navigate('/login');
        }

        // 2. Check username registration
        const usernameCheck = await axios.get(`${API_URL}/usernames/check/${data.email}`, {
          withCredentials: true
        });

        // 3. Redirect based on registration status
        navigate(usernameCheck.data.registered ? '/page/create' : '/basic-info');
        
      } catch (error) {
        console.error("Auth check error:", error);
        navigate('/login');
      }
    };

    checkAuthAndRedirect();
  }, [navigate, API_URL]);

  return (
    <Container>
      <div className="main-content">
        <img src={logo} alt="Logo" className="logo" />
        <p>{status}</p>
      </div>
    </Container>
  );
};


export default BetweenCalcPage;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background-color: white;

  display: flex;
  justify-content: center;

  .main-content{
    width: 100%;
    max-width: 500px;

    height: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p{
        color: black;
        font-size: 0.85rem;
        font-weight: 500;
    }
  }
`