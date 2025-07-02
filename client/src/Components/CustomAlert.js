import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const CustomAlert = ({color}) => {
  return (
    <Container>
        {
            color == "light" ? (
                <div className="alert-box light">
                    Hellp
                </div>
            ) : null
        }
    </Container>
  )
}

export default CustomAlert

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: black;
    z-index: 10000;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    .alert-box{
        
    }
`