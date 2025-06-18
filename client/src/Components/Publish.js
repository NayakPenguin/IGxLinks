import React from "react";
import styled from 'styled-components';
import PublicIcon from '@material-ui/icons/Public';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Publish = ({ userContentInfo }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const publishToDB = async () => {
    const localSaved = localStorage.getItem("userContentInfo");

    try {
      if (!localSaved) {
        console.error("No content data to publish");
        return;
      }

      const response = await api.post('/advanced-info', {
        localStorageData: {
          localSaved 
        }
      });

      console.log("Publish successful:", response.data);
      // Optional: Show success notification or redirect
      // navigate('/success');
    } catch (error) {
      console.error("Publish failed:", error.response?.data || error.message);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <Container>
      <div className="btn" onClick={publishToDB}>
        Push updates
        <PublicIcon />
      </div>
    </Container>
  )
}

export default Publish;

const Container = styled.div`
  position: fixed;
  bottom: 80px;
  width: 100vw;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  z-index: 1002;

  .btn {
    padding: 10px 25px;
    background: rgba(255, 255, 255, 0.1); /* subtle white tint */
    color: white;
    border-radius: 100px;
    font-size: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;

     box-shadow: 
    0 4px 20px rgba(255, 255, 255, 0.05),   /* soft outer glow */
    inset 0 1px 2px rgba(255, 255, 255, 0.2); /* inner edge highlight */

    svg{
        font-size: 1.25rem;
        margin-left: 5px;
        margin-right: -2.5px;
    }
  }
`