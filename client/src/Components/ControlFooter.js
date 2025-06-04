import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

const ControlFooter = () => {
    return (
        <Container>
            {
                !true ? (
                    <div className="before-login"><a href="/">Log in</a> or <a href="/">sign up</a> to create your page.</div>
                ) : <div className="after-login">
                    <a href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9L12 3l9 6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                            <path d="M9 22V12h6v10"></path>
                        </svg>
                    </a>
                    <a href="/">
                        <ExploreOutlinedIcon/>
                    </a>
                    <a href="/">
                        <NotificationsNoneOutlinedIcon/>
                    </a>
                    {/* <a href="/">
                        <ShoppingCartOutlinedIcon/>
                    </a> */}
                    <a href="/">
                        <AccountCircleOutlinedIcon/>
                    </a>
                </div>
            }
        </Container>
    )
}

export default ControlFooter

const Container = styled.div`
    background-color: #000;
    position: fixed;
    bottom: 0;
    left: 0;

    z-index: 1010;

    width: 100vw;

    height: 64px;
    border-top: 1px solid #313231;

    display: flex;
    justify-content: center;

    .before-login{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        font-weight: 200;

        a{
            font-weight: 500;
            color: #0095f6;
            margin: 0 5px;
        }
    }

    .after-login{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: 0.85rem;
        font-weight: 200;

        svg{
            font-size: 1.65rem;
        }
    }
`