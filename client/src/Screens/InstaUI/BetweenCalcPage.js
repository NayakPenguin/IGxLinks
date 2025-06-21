import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../Images/logo-main.png";
import { LinearProgress } from "@material-ui/core";

const BetweenCalcPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [status, setStatus] = useState("Checking authentication...");
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            try {
                const fetchUser = async () => {
                    try {
                        const res = await fetch(`${API_URL}/auth/me`, {
                            credentials: "include",
                        });

                        const user = await res.json();
                        // // console.log("Logged-in user:", user);
                        return user;

                    } catch (error) {
                        console.error("Error fetching user:", error);
                        return null;
                    }
                };

                const data = await fetchUser();

                if (!data?.email) {
                    return navigate('/login');
                }

                const usernameCheck = await axios.get(`${API_URL}/usernames/check/${data.email}`, {
                    withCredentials: true
                });

                if (usernameCheck.data.registered) {
                    setStatus("Creating your dashboard...");
                    setFadeOut(true);
                    setTimeout(() => {
                        navigate('/page/create');
                    }, 5000); // Wait 5s before redirect
                } else {
                    navigate('/basic-info');
                }

            } catch (error) {
                console.error("Auth check error:", error);
                navigate('/login');
            }
        };

        checkAuthAndRedirect();
    }, [navigate, API_URL]);

    return (
        <Container fadeOut={fadeOut}>
            <div className="main-content">
                {
                    status == "Checking authentication..." ? <p>{status}</p> : <h1>{status}</h1>
                }
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    zIndex: 9999
                }}>
                    <LinearProgress />
                </div>
            </div>
        </Container>
    );
};

export default BetweenCalcPage;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background-color: ${({ fadeOut }) => (fadeOut ? 'black' : 'white')};
  color: ${({ fadeOut }) => (fadeOut ? 'white' : 'black')};
  transition: background-color 2s cubic-bezier(1,-0.08, 0.74, 0.44), color 2s cubic-bezier(1,-0.08, 0.74, 0.44);

  display: flex;
  justify-content: center;

  .main-content {
    text-align: center;
    padding: 50px;

    p{
        color: #333;
        font-size: 0.85rem;
        font-weight: 500;
    }

    h1 {
      font-size: 0.85rem;
        font-weight: 500;
    }
  }
`;
