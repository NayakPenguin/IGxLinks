import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const CustomAlert = ({color, text, setShowContainer}) => {
  return (
    <Container>
        <div className="dark-container">
            <div className={color == "dark" ? "alert-box dark" : "alert-box"}>
                <div className="top-section">
                    <div className="text">{text}</div>
                </div>
                <div className="bottom-section" onClick={() => setShowContainer(false)}>Close</div>
            </div>
        </div>
    </Container>
  )
}

export default CustomAlert

const Container = styled.div`
    .dark-container{
        height: 100vh;
        width: 100vw;
        background-color: #0000009c;
        z-index: 10000;
    
        position: fixed;
        top: 0;
        left: 0;
    
        display: flex;
        align-items: center;
        justify-content: center;
    
        .alert-box{
            width: 80%;
            max-width: 440px;
            height: 140px;
            border-radius: 10px;
    
            display: flex;
            flex-direction: column;
    
            overflow: hidden;
    
            .top-section{
                width: 100%;
                flex: 1;
    
                display: grid;
                background-color: white;
                place-items: center;
    
                .text{
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #333;
                    text-align: center;
                }
            }
            
            .bottom-section{
                width: 100%;
                height: 50px;
                border-top: 1px solid #d6caca;
    
                display: grid;
                place-items: center;
    
                color: #333;
                font-size: 0.85rem;
                font-weight: 200;
    
                background-color: #eeeeee;
    
                cursor: pointer;
            }
        }
    
        .dark{
            .top-section{
                background-color:rgb(10, 10, 10);
                
                .text{
                    color: #fff;
                }
            }
            
            .bottom-section{
                border-top: 1px solid rgb(10, 10, 10);
                
                background-color: #333;
                color: #fff;
            }
        }
    }
`