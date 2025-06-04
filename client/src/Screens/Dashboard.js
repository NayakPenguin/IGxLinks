import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';

const Dashboard = () => {
    return (
        <Container>
            <Navbar>
                <div className="left">
                    <div className="logo">
                        OKDM.me
                    </div>
                </div>
                {/* <div className="middle no-mob">
                    Not visible
                </div> */}

                <div className="right">
                    {/* <button className="btn btn-2">
                        Create your page
                    </button> */}

                    <div className="username">@nayakpenguin</div>

                    <MenuIcon className="menu-btn no-lap" />
                </div>
            </Navbar>

            <EditScreen>

            </EditScreen>
        </Container>
    )
}

export default Dashboard

const Container = styled.div`
    p, span, div, h1, h2, h3, h4, h5, h6, svg {
        color: #333;
        fill: #333;
    }

    .no-mob{
        @media (max-width: 1000px) {
            display: none;
        }
    }

    .no-lap{
        @media (min-width: 1001px) {
            display: none;
        }
    }

    .btn{
        font-size: 0.9rem;
        padding: 15px 25px;
        border-radius: 50px;
        border: 1px solid black;
        font-weight: 300;
    }

    .btn-2{
        color: black;
        background-color: #b0ec9c;
    }

    .all-shadow{
        -webkit-box-shadow: 1px 0px 19px -4px rgba(0,0,0,0.36);
        -moz-box-shadow: 1px 0px 19px -4px rgba(0,0,0,0.36);
        box-shadow: 1px 0px 19px -4px rgba(0,0,0,0.36);
    }

    .email-input{
        font-size: 0.9rem;
        padding: 15px 25px;
        border-radius: 50px;
        border: 1px solid black;
        font-weight: 300;
        color: #333;
    }
`

const Navbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    width: 100vw;
    padding: 15px;

    z-index: 100;

    background-color: #fffffa;
    border-bottom: 1px solid rgb(233, 229, 229);
    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;

    display: flex;  
    align-items: center;
    justify-content: space-between;

    .left{
        .logo{
            font-weight: 600;
            letter-spacing: 0.1rem;
            font-size: 1.15rem;
        }   
    }

    .right{
        display: flex;
        align-items: center;

        .username{
            font-size: 0.85rem;
            font-weight: 500;
        }

        .menu-btn{
            margin-left: 10px;
            font-size: 1.75rem;
        }
    }   

    @media (min-width: 1001px) {
        padding: 15px 60px;
    }    
`

const EditScreen = styled.div``