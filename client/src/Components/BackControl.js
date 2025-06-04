import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from "react-router-dom";
import influencerdp from "../Images/influencerdp.png"

const BackControl = () => {
  const navigate = useNavigate();
  
  return (
    <Container onClick={() => navigate("/influencer")}>
        <ArrowBackIcon />
        <img src={influencerdp} alt="" />
        @somyakodan_
    </Container>
  )
}

export default BackControl

const Container = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;

    border-bottom: 1px solid #313231;

    height: 60px;
    width: 100vw;

    display: flex;
    align-items: center;

    font-size: 0.9rem;
    font-weight: 500;

    color: whitesmoke;

    padding: 0 30px;

    svg{
        font-size: 1.25rem;
        margin-right: 15px;
    }

    margin-bottom: 10px;

    background-color: black;

    img{
      height: 60%;
      aspect-ratio: 1/1;
      border-radius: 100%;
      margin-right: 10px;
    }
`