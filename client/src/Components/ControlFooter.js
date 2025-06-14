import React from "react";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ControlFooter = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (basePath) => currentPath === basePath || currentPath.startsWith(`${basePath}/`);

    return (
        <Container>
            {
                !true ? (
                    <div className="before-login"><a href="/">Log in</a> or <a href="/">sign up</a> to create your page.</div>
                ) : (
                    <div className="after-login">
                        <a href="/page/create">
                            {isActive("/page/create") ? (
                                <svg aria-label="Home" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
                                </svg>
                            ) : (
                                <svg aria-label="Home" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                            )}
                        </a>
                        <a href="/engagement">
                            {isActive("/engagement") ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </a>
                        <a href="/notification">
                            {isActive("/notification") ? <NotificationsIcon /> : <NotificationsNoneOutlinedIcon />}
                        </a>
                        <a href="/profile">
                            {isActive("/profile") ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon />}
                        </a>
                    </div>
                )
            }
        </Container>
    );
};

export default ControlFooter;

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