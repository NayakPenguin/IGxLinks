import React from "react";
import { useState } from 'react';
import styled from 'styled-components';
import PublicIcon from '@material-ui/icons/Public';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';
import CallMadeIcon from '@material-ui/icons/CallMade';

const Publish = () => {
  const [publishStatus, setPublishStatus] = useState(null);
  const [highlightTopBar, setHighlightTopBar] = useState(false);
  const [username, setUsername] = useState("Not-Found");
  

  const API_URL = process.env.REACT_APP_API_URL;

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const publishToDB = async () => {
    if (publishStatus === 'publishing') return;

    setPublishStatus('publishing');

    const localContent = localStorage.getItem("userContentInfo");
    const localBasic = localStorage.getItem("userBasicInfo");

    if (!localContent || !localBasic) {
      console.error("Missing data in localStorage");
      setPublishStatus('error');
      return;
    }

    try {
      const basicData = JSON.parse(localBasic);
      setUsername(basicData.userName);
      const contentData = JSON.parse(localContent);

      await Promise.all([
        api.post('/basic-info/', {
          ...basicData,
          lastUpdated: Date.now()
        }),
        api.post('/advanced-info', {
          localStorageData: { ...contentData },
          lastUpdated: Date.now()
        })
      ]);

      console.log("Both basic and content data published successfully.");
      setPublishStatus('success');

      setTimeout(() => setPublishStatus(null), 5000);
      setHighlightTopBar(true);
      setTimeout(() => setHighlightTopBar(false), 5000);

      // setTimeout(() => window.location.reload(), 5000);
    } catch (error) {
      console.error("Publishing failed:", error.response?.data || error.message);
      setPublishStatus('error');

      setTimeout(() => setPublishStatus(null), 5000);
    }
  };

  return (
    <Container>
      <div
        className={`btn ${publishStatus === 'success' ? 'success' : publishStatus === 'error' ? 'error' : ''}`}
        onClick={publishToDB}
        style={{ pointerEvents: publishStatus === 'publishing' ? 'none' : 'auto' }}
      >
        {publishStatus === 'publishing' ? (
          <>Publishing…</>
        ) : publishStatus === 'success' ? (
          <>Published <CheckCircleOutlineIcon style={{ color: 'green' }} /></>
        ) : publishStatus === 'error' ? (
          <>Error - Try Again <WarningIcon style={{ color: 'red' }} /></>
        ) : (
          <>Push updates <PublicIcon /></>
        )}
      </div>
      {
        highlightTopBar && <div className="pre-top-bar">
          <a href={`/p/${username}`} target="_blank">
            Visit your live public page
            <CallMadeIcon />
          </a>
        </div>
      }
    </Container>
  );
};

export default Publish;

const Container = styled.div`
  position: fixed;
  bottom: 80px;
  width: 100vw;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  z-index: 1002;

  .pre-top-bar{
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 100;

      border-bottom: 1px solid #313231;

      height: 40px;
      width: 100vw;

      display: flex;
      align-items: center;
      justify-content: center;
      
      padding: 0 30px;

      background-color: #92b419;
      /* background-color: #000; */

      a{
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 500;

          color: white;
          text-decoration: none;

          svg{
              font-size: 1rem;
              margin-left: 5px;
          }

      }
  }

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

  .success {
    color: yellowgreen;
    svg{
      fill: yellowgreen;
    }
  }

  .error {
    color: red;
    svg{
      fill: red;
    }
  }
`