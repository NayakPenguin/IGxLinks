import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'

const Template = () => {
  return (
    <Container>
        <div className="main-content"></div>
    </Container>
  )
}

export default Template

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    padding: 30px;

    display: flex;  
    flex-direction: column;
    align-items: center;
    
    .main-content{
        max-width: 500px;
        width: 100%; 
        min-height: 100px; // remove
        background-color: white; // remove
    }
`