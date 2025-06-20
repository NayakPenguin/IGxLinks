import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useParams } from 'react-router-dom';

import CheckIcon from '@material-ui/icons/Check';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress, LinearProgress } from "@material-ui/core";
import axios from "axios";

import logo from "../../Images/logo-main.png";
import logo2 from "../../Images/logo-bg.png";

import { AllSocialMediaPlatforms } from "../../constants/socialMediaPlatforms";
import { parseRichText } from '../Helpers/parseRichText';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const ViewProfile = () => {
    const { username } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAd, setShowAd] = useState(true);

    useEffect(() => {
        if (!username) {
            console.warn("⚠️ No username provided, skipping profile fetch.");
            return;
        }

        const fetchProfile = async () => {
            console.log("🟡 Starting profile fetch process...");
            setLoading(true);
            setError(null);

            const lastClick = localStorage.getItem("lastClick");
            const now = Date.now();

            console.log("🕒 Current timestamp:", now);
            console.log("🧠 lastClick from localStorage:", lastClick);

            const within5Seconds =
                lastClick && now - parseInt(lastClick, 10) <= 5000;

            const profileDataRaw = localStorage.getItem("profileDataSave");

            if (within5Seconds && profileDataRaw) {
                console.log("📦 Using cached profileDataSave from localStorage (within 5s)");
                try {
                    const parsed = JSON.parse(profileDataRaw);
                    setProfileData(parsed);
                } catch (parseErr) {
                    console.error("❌ Failed to parse profileDataSave:", parseErr);
                    localStorage.removeItem("profileDataSave");
                    console.warn("🧹 Corrupted localStorage entry removed.");
                    fetchFromAPI();
                } finally {
                    setLoading(false);
                    console.log("✅ Finished with localStorage path.");
                }
                return;
            }

            console.log("🌐 Cached data expired or missing, making API request...");
            fetchFromAPI();
        };

        const fetchFromAPI = async () => {
            try {
                const res = await api.get(`/all-info/${username}`);
                console.log("✅ Profile fetched successfully from API:", res.data);

                setProfileData(res.data);
                localStorage.setItem("profileDataSave", JSON.stringify(res.data));
                localStorage.setItem("lastClick", Date.now().toString());
                console.log("💾 Cached new profile data and updated lastClick.");
            } catch (err) {
                console.error("❌ Failed to fetch profile from API:", err.message, err);
                setError(err);
            } finally {
                setLoading(false);
                console.log("✅ Finished with API path.");
            }
        };

        fetchProfile();
    }, [username]);

    const [modelOpen, setModelOpen] = useState(false);
    const [notificationModelOpen, setNotificationModelOpen] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [showDone, setShowDone] = useState(false);
    const [exitAnimation, setExitAnimation] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [savedProduct, setSavedProduct] = useState(false);

    useEffect(() => {
        if (notificationModelOpen) {
            setTimeout(() => {
                setShowDone(true);
            }, 1500);

            setTimeout(() => {
                setExitAnimation(true); // trigger slide down
            }, 3300); // little before hide to give time for animation

            setTimeout(() => {
                setNotificationModelOpen(false);
                setShowDone(false);
                setExitAnimation(false); // reset
            }, 3800);
        }
    }, [notificationModelOpen]);

    useEffect(() => {
        if (modelOpen) {
            document.body.classList.add('no-scroll');
            window.location.hash = 'm1op1';
        } else {
            document.body.classList.remove('no-scroll');
            if (window.location.hash === '#m1op1') {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        }

        if (window.location.hash !== '#m1op1') {
            setModelOpen(false);
        }

        return () => {
            document.body.classList.remove('no-scroll');
            if (window.location.hash === '#m1op1') {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        };
    }, [modelOpen]);

    const handleSubscription = () => {
        setSavedProduct(false);
        // setNotificationModelOpen(false);

        if (subscribed == false) {
            setSubscribed(!subscribed);
            setNotificationText("Now you will be notified by Somya's content!");
        }
        else {
            setSubscribed(!subscribed);
            setNotificationText("You unsubsribed to Somya!");
        }

        setNotificationModelOpen(true);
    }


    return (
        <Container>
            {
                notificationModelOpen ?
                    <NotificationModelConatiner exit={exitAnimation}>
                        <div className="modal">
                            <div className="left">
                                <div className="loading" style={{ display: showDone ? "none" : "block" }}>
                                    <CircularProgress />
                                </div>
                                <div className="done" style={{ display: showDone ? "block" : "none" }}>
                                    <CheckIcon />
                                </div>
                                <div className="text">
                                    {notificationText}
                                </div>
                            </div>
                            <div className="right" onClick={() => setNotificationModelOpen(false)}>
                                {
                                    savedProduct ? "View" : "Ok"
                                }
                            </div>
                        </div>
                    </NotificationModelConatiner> : null
            }

            {
                profileData ?
                <div className="main-content">
                    <Subscribe>
                        {
                            subscribed ? (
                                <div className="subscribe-btn subscribed" onClick={() => handleSubscription()}>
                                    <NotificationsActiveIcon />
                                </div>
                            ) : (
                                <div className="subscribe-btn" onClick={() => handleSubscription()}>
                                    <NotificationsNoneOutlinedIcon />
                                </div>
                            )
                        }
                    </Subscribe>
                    {
                        showAd == true &&
                        <CreateYourPageAd>
                            <div className="close" onClick={() => setShowAd(false)}>
                                <CloseIcon />
                            </div>
                            <a href="/page/create" target="_blank" className="type1">
                                <b>Join {profileData.basicInfo.name} on IGxLinks</b>
                                <p>Click to create your account</p>
                            </a>
                        </CreateYourPageAd>
                    }
                    <div className="user-data">
                        <div className="logo-x-dp">
                            <img src={profileData.basicInfo.profileImage} alt="" />
                        </div>
                        <div className="name">{profileData.basicInfo.name}</div>
                        <div className="about-header">{profileData.basicInfo.role} @{profileData.basicInfo.org}</div>
                        <div className="about-desc">{profileData.basicInfo.bio}</div>
                        <div className="about-location"><RoomIcon /> {profileData.basicInfo.location}</div>

                        <div className="socials">
                            {profileData.basicInfo.socialLinks?.map((link) => {
                                const platform = AllSocialMediaPlatforms.find(p => p.id === link.platformId);
                                if (!platform || !link.profileUrl) return null;

                                // Determine correct href
                                let href = link.profileUrl;
                                if (link.platformId === "mail") {
                                    href = `mailto:${link.profileUrl}`;
                                } else if (!link.profileUrl.startsWith("http")) {
                                    href = `https://${link.profileUrl}`;
                                }

                                return (
                                    <a
                                        key={link._id}
                                        href={href}
                                        className="social-icon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <img
                                            src={link.iconUrl || platform.iconUrl}
                                            alt={platform.name}
                                            onError={(e) => {
                                                e.target.src = platform.iconUrl;
                                            }}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {
                        profileData.basicInfo.announcement.isVisible &&
                        <PinnedAnnouncement>
                            <div className="label">
                                <svg viewBox="0 0 24 24" height="16" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>pin-refreshed</title><path d="M16 5V12L17.7 13.7C17.8 13.8 17.875 13.9125 17.925 14.0375C17.975 14.1625 18 14.2917 18 14.425V15C18 15.2833 17.9042 15.5208 17.7125 15.7125C17.5208 15.9042 17.2833 16 17 16H13V21.85C13 22.1333 12.9042 22.3708 12.7125 22.5625C12.5208 22.7542 12.2833 22.85 12 22.85C11.7167 22.85 11.4792 22.7542 11.2875 22.5625C11.0958 22.3708 11 22.1333 11 21.85V16H7C6.71667 16 6.47917 15.9042 6.2875 15.7125C6.09583 15.5208 6 15.2833 6 15V14.425C6 14.2917 6.025 14.1625 6.075 14.0375C6.125 13.9125 6.2 13.8 6.3 13.7L8 12V5C7.71667 5 7.47917 4.90417 7.2875 4.7125C7.09583 4.52083 7 4.28333 7 4C7 3.71667 7.09583 3.47917 7.2875 3.2875C7.47917 3.09583 7.71667 3 8 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.28333 16.9042 4.52083 16.7125 4.7125C16.5208 4.90417 16.2833 5 16 5ZM8.85 14H15.15L14 12.85V5H10V12.85L8.85 14Z" fill="currentColor"></path></svg>
                                Pinned Announcement
                            </div>
                            <b>{profileData.basicInfo.announcement.title}</b>
                            {profileData.basicInfo.announcement.description}
                        </PinnedAnnouncement>
                    }

                    <div className="group">
                        {profileData.advancedInfo.localStorageData &&
                            Object.values(profileData.advancedInfo.localStorageData).map((item) => {
                                const { id, type, title, url } = item;

                                const handleClick = () => {
                                    localStorage.setItem("lastClick", Date.now().toString());
                                    console.log(`🕒 lastClick updated at ${new Date().toISOString()}`);
                                };

                                switch (type) {
                                    case "Subgroup":
                                        return (
                                            <div key={id} className="group-name-container" onClick={handleClick}>
                                                <div className="group-name-container-line"></div>
                                                <div className="group-name">{parseRichText(title)}</div>
                                                <div className="group-name-container-line"></div>
                                            </div>
                                        );

                                    case "Redirect Link":
                                        return (
                                            <a
                                                key={id}
                                                href={url.startsWith("http") ? url : `https://${url}`}
                                                className="link1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={handleClick}
                                            >
                                                <div>{parseRichText(title)}</div>
                                                <div className="link-circle">
                                                    <CallMadeIcon />
                                                </div>
                                            </a>
                                        );

                                    case "Anonymous Replies":
                                    case "Meeting Scheduler":
                                    default:
                                        return (
                                            <a
                                                key={id}
                                                href={`/p/${profileData.basicInfo.userName}/${id}`}
                                                className="link1"
                                                onClick={handleClick}
                                            >
                                                <div>{parseRichText(title)}</div>
                                                <div className="link-circle">
                                                    {
                                                        type === "Anonymous Replies" ? (
                                                            <svg /* [SVG ICON HERE] */ />
                                                        ) : type === "Meeting Scheduler" ? (
                                                            <EventAvailableIcon />
                                                        ) : (
                                                            <ChevronRightIcon />
                                                        )
                                                    }
                                                </div>
                                            </a>
                                        );
                                }
                            })}
                    </div>

                    {
                        !showAd &&
                        <CreateYourPageAd>
                            <a href="/page/create" target="_blank" className="type2">
                                <img src={logo2} alt="" />
                                <div className="text">
                                    <b>Powered by IGxLinks</b>
                                    <p>
                                        Click to create your account
                                        <CallMadeIcon/>
                                    </p>
                                </div>
                            </a>
                        </CreateYourPageAd>
                    }
                </div>
                : 
                <div className="show-loader">
                    <LinearProgress />
                </div>
            }
        </Container>
    )
}

export default ViewProfile

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    /* padding-bottom: 100px; */

    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    /* background-position: center; */
    /* background-attachment: fixed; */

    padding: 30px;

    display: flex;  
    flex-direction: column;
    align-items: center;

    .show-loader{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }
    
    .main-content{
        width: 100%;
        max-width: 500px;
    }

    .user-data{
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 40px;
        
            .logo-x-dp{
                height: 120px;
                aspect-ratio: 1/1;
                overflow: hidden;
                border-radius: 50%;
                border: 2px solid #313231;

                img{
                    width: 100%;
                }
            }

            .name{
                margin-top: 20px;
                font-weight: 500;
                text-align: center;
            }

            .about-header{
                margin-top: 10px;
                font-weight: 500;
                font-size: 0.85rem;
                text-align: center;
            }

            .about-desc{
                margin-top: 10px;
                font-weight: 200;
                font-size: 0.85rem;
                text-align: center;
            }

            .about-location{
                margin-top: 10px;
                font-weight: 500;
                font-size: 0.85rem;
                text-align: center;

                svg{
                    font-size: 1rem;
                    margin-bottom: -2px;
                }
            }

            .main-btns{
                margin-top: 30px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;

                .btn-1{
                    font-size: 0.85rem;
                    padding: 10px 15px;
                    background-color: #0095f6;
                    border-radius: 10px;
                    margin: 0 5px;
                }

                .secondary{
                    background-color: #363636;
                }

                .trans{
                    background-color: transparent;
                    border: 1px solid white;
                }
            }

            .socials{
                margin-top: 30px;
                display: flex; 
                align-items: center; 
                justify-content: center;
                flex-wrap: wrap;

                gap: 10px;

                .social-icon{
                    height: 40px;
                    aspect-ratio: 1/1;
                    background-color:rgb(217, 211, 211);
                    border-radius: 50%;
                    padding: 2.5px;

                    img{
                        width: 100%;
                        border-radius: 100px;
                    }
                }
            }
        }
        
    .group{
        width: 100%;
        margin-top: 85px;

        .group-name-container{
            margin: 30px 0;
            padding: 0 35px;
            margin-top: 45px;

            display: flex;
            align-items: center;
            justify-content: center;


            .group-name{
                font-size: 0.85rem;
                margin: 0 10px;
                text-align: center;
            }

            .group-name-container-line{
                min-width: 20px;
                height: 3px;
                border-radius: 100px;
                background-color: #676363;
                flex: 1;
            }
        }

        .link1{
            text-decoration: none;
            background-color: #363636;
            font-size: 0.75rem;
            font-weight: 500;
            text-align: center;
            padding: 15px 60px;
            border-radius: 100px;
            color: #e5e5e5;
            margin-bottom: 10px;

            display: flex; 
            align-items: center;
            justify-content: center;

            height: 60px;

            position: relative;

            b{
                display: inline;
                margin-right: 5px;
            }

            .paid-circle{
                position: absolute;

                left: 15px;
                
                svg{
                    font-size: 1.65rem;
                    fill: yellow;
                }
            }

            .link-circle{
                position: absolute;
                height: 40px;
                width: 40px;
                border-radius: 50%;

                background-color: #0095f6;
                /* background-color: #3c4f5b; */

                right: -10px;

                display: grid;
                place-items: center;

                svg{
                    font-size: 1rem;
                    fill: #e5e5e5;
                }
            }

        }

        .shop-2{
            width: 100%;
            display: flex;
            flex-wrap: wrap; 
            /* justify-content: space-between; */

            .link-2-shop{
                position: relative;
                /* padding-bottom: 140px; */
                width: calc(33.33% - 2.5px);
                aspect-ratio: 1/1;
                margin-bottom: 3.75px;
                /* background-color: #363636; */
                color: #e5e5e5;
                margin-right: 3.75px;
                
                /* border-radius: 10px; */
                /* margin-bottom: 1px; */
                /* margin-top: 30px; */

                display: flex; 
                flex-direction: column;
                align-items: flex-start;
                overflow: hidden;

                .border-bottom-light{
                    display: none;
                    position: absolute; 
                    height: 1px;
                    background-color:#313231;
                    bottom: -15px;
                    width: 90%;
                }

                .left{
                    /* width: 50%; */
                    width: 100%;

                    img{
                        width: 100%;
                        height: 100%;
                        /* border-radius: 4px; */
                        /* margin-bottom: 5px; */
                    }
                }

                .item-name {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 5px 5px;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 500;
                    /* font-style: italic; */
                    letter-spacing: 0.05rem;
                    z-index: 2;
                }
            }

            .link-2-shop::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50%; /* Adjust for how much fade you want */
                background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
                z-index: 1;
            }
        }

        .shop-2 > .link-2-shop:nth-child(3n) {
            margin-right: 0;
        }

        .view-all-btn{
            margin: 15px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: center;

            .btn-3{
                padding: 7.5px 20px;
                font-size: 0.65rem;
                border: 1px solid #676363;
                color: white;
                border-radius: 100px;
                background-color: #363636;
                text-decoration: none;
                font-weight: 500;
            }
        }
    }
`

const Subscribe = styled.div`
    .subscribe-btn{
        position: fixed; 
        top: 20px;
        right: 20px;
        height: 30px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: white;
        /* background-color: #363636; */
        z-index: 1000;
    
        display: grid;
        place-items: center;
    
        svg{
            height: 1.25rem;
            fill: black;
        }
    }

    .subscribed{
        background-color: #363636;
        /* background-color: yellowgreen; */

        svg{
            fill: white;
        }
    }
`

const RedorGreenFlag = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 80px;

    position: relative;

    .info{
        position: absolute;
        top: -25px;
        font-size: 0.65rem;
        color: white;
        left: 50px;
        font-style: italic;

        svg{
            fill: green;
            font-size: 1rem;
            margin-bottom: -5px;
        }
    }

    .vote-btn{
        height: 30px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: #363636;
        z-index: 100;

        display: grid;
        place-items: center;

        svg{
            margin-top: -2px;
            height: 2rem;
            fill: white;
        }
    }

    .voted{
        background-color: #b0ae28;
        border: 2px solid white;

        svg{
            height: 2rem;
            fill: white;
        }
    }

    .box{
        border: 2px solid white;
        height: 50px;
        width: calc(100% - 80px);
        background-color: #333;
        border-radius: 100px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 0.75rem;
        overflow: hidden;

        .left{
            background-color: #5ca65c;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            /* text-wrap: nowrap; */
            white-space: nowrap;
            width: 61%;
            border-right: 2px solid white;
            overflow: hidden;
            padding: 5px;

            svg{
                font-size: 1rem;
                fill: lightgreen;
            }
        }

        .right{
            height: 100%;
            width: 39%;
            display: flex;
            align-items: center;
            justify-content: center;
            
            background-color: #e94747;
            overflow: hidden;
            padding: 5px;
        }
    }
`

const ModelConatiner = styled.div`
    width: 100vw;
    height: calc(100vh - 60px);

    
    z-index: 1002;
    
    position: fixed;
    top: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    .model-closer{
        width: 100vw;
        height: calc(100vh - 60px);
        
        position: absolute;
        top: 0;
        left: 0;
        
        background-color: #00000085; 
    }

    .model{ 
        width: 80%;
        /* height: 70%; */
        max-width: 400px;
        /* margin-top: -50px; */

        background-color: white;
        
        z-index: 1009;

        padding: 20px;

        .shop-model-items{
            position: relative;
            width: 100%;
            /* background-color: #363636; */
            color: #e5e5e5;
            
            border-radius: 10px;

            display: flex; 
            flex-direction: column;
            align-items: flex-start;

            .border-bottom-light{
                position: absolute; 
                height: 1px;
                background-color:#313231;
                bottom: -15px;
                width: 90%;
            }


            .left{
                /* width: 50%; */
                width: 100%;
                
                img{
                    width: 100%;
                    margin-bottom: 5px;
                }
            }

            .right{
                /* width: 50%; */
                width: 100%;
                /* margin-left: 10px; */

                .tags{
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    display: none;
                    
                    .tag{
                        background-color: pink;
                        font-size: 0.85rem;
                        color: #333;
                        font-weight: 600;
                        padding: 5px 10px;
                        border-radius: 100px;
                        margin-right: 5px;
                        margin-bottom: 5px;
                    }
                }

                .title{
                    color: #333;
                    font-size: 0.85rem;
                    font-weight: 600;
                    width: 100%;
                    margin-bottom: 10px;
                }

                .brand{
                    color: #333;
                    font-size: 0.75rem;
                    width: 100%;
                    margin-bottom: 10px;
                    
                    b{
                        color: #333;
                        font-weight: 600;
                        color: cornflowerblue;
                    }
                }

                .promo{
                    display: flex;
                    align-items: center;

                    color: #333;
                    font-size: 0.75rem;
                    width: 100%;
                    margin-bottom: 10px;
                    
                    b{
                        color: #333;
                        font-weight: 600;
                        color: cornflowerblue;
                        margin-right: 5px;
                    }

                    svg{
                        fill: #333;
                        font-size: 0.85rem;
                    }

                    i{
                        color: #333;
                    }

                    .price-container{
                        width: 100%;
                        display: flex;
                        align-items: flex-end;
                    }
                }

                .reviews{
                    display: flex;

                    .review-info{
                        display: flex;
                        align-items: flex-end;
                        width: 100%;
                        color: #333;
                        font-size: 0.7rem;
                        margin-left: -15px;
                        font-family: Arial, sans-serif;
                        font-style: italic;
                    }
                }

                .main-price{
                    margin-top: 5px;
                    display: flex;
                    align-items: flex-start;

                    color: #333;
                    font-size: 1rem;
                    font-weight: 600;
                    font-family: Arial, sans-serif;
                    margin-right: 7.5px;
                    
                    span{
                        color: #333;
                        font-family: Arial, sans-serif;
                        font-size: 0.75rem;
                        font-weight: 300;
                        margin-right: 3px;
                    }
                }
                
                .old-price{
                    display: flex;
                    align-items: flex-end;
                    /* width: 100%; */
                    color: #333;
                    font-size: 0.7rem;
                    font-family: Arial, sans-serif;
                    margin-top: 5px;
                    

                    .strike{
                        color: #333;
                        text-decoration: line-through;
                        margin-right: 5px;
                        font-family: Arial, sans-serif;
                    }
                }

                .desc{
                    color: #333;
                    font-size: 0.75rem;
                    font-weight: 300;
                    margin-top: 10px;
                    width: 100%;
                }

                .date{
                    color: #333;
                    font-size: 0.65rem;
                    font-weight: 300;
                    margin-top: 10px;
                    width: 100%;
                    font-weight: 500;
                }

                .price{
                    color: #333;
                    /* position: absolute;
                    bottom: 85px;
                    left: 0; */
                    /* padding-left: 10px; */
                }

                .btns{
                    /* position: absolute;
                    bottom: 0;
                    left: 0; */
                    margin-top: 20px;
                    width: 100%;

                    display: flex;
                    align-items: center;
                    
                    .buy-btn{
                        flex: 1;
                        font-size: 0.85rem;
                        padding: 10px 15px;
                        background-color: #0095f6;
                        border-radius: 10px;
                        color: white;
                        text-decoration: none;
                        
                        margin: 5px 10px 0 10px;

                        display: flex;
                        align-items: center;
                        justify-content: center;


                        svg{
                            font-size: 1rem;
                            margin-left: 5px;
                        }
                    }

                    .svg-container{
                        display: flex;
                        align-items: center;

                        svg{
                            font-size: 1.65rem;
                            fill: #333;
                        }

                    }
                    
                    .svg-2{
                        svg{
                            margin-bottom: -3px;
                        }
                    }
                }
            }
        }
    }
`

const NotificationModelConatiner = styled.div`
  position: fixed;
  bottom: 80px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;

  transition: transform 0.4s ease, opacity 0.4s ease;
  transform: ${(props) => (props.exit ? 'translateY(100%)' : 'translateY(0)')};
  opacity: ${(props) => (props.exit ? 0 : 1)};

  .modal {
    width: calc(100% - 40px);
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2e3035f0;
    border: 1px solid #333;
    border-radius: 17.5px;
    padding: 0 20px 0 10px;

    .left {
      display: flex;
      align-items: center;

      .loading {
        svg {
          scale: 0.45;
          margin-bottom: -5px;
        }
      }

      .done {
        margin-left: 10px;
        svg {
          font-size: 1.35rem;
          margin-right: 5px;
        }
      }

      .text {
        font-size: 0.75rem;
      }
    }

    .right {
      font-size: 0.75rem;
      font-weight: 600;
    }
  }
`;

const PinnedAnnouncement = styled.div`
    width: 100%;
    margin-top: 100px;
    margin-bottom: -20px;
    padding: 15px;
    background-color: #363636;
    font-size: 0.85rem;
    font-weight: 300;
    border-radius: 10px;
    line-height: 1.35rem;
    border-left: 10px solid white;
    /* border: 1px solid white; */
    color: #e5e5e5;
    
    position: relative;
    
    b{
        font-weight: 600;
        display: block;
        margin-bottom: 5px;
    }

    .label{
        position: absolute;
        top: -30px;
        left: -10px;
        font-size: 0.7rem;
        font-weight: 300;
        /* letter-spacing: 0.04rem; */

        display: flex;
        align-items: center;

        svg{
            margin-right: 5px;
            transform: rotate(45deg);
        }
    }
`

const slideIn = keyframes`
  from {
    transform: translateX(-110%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CreateYourPageAd = styled.div`
  .type1 {
    position: fixed;
    height: 60px;
    width: 80%;
    bottom: 24px;
    left: 10%;
    z-index: 1000;
    border-radius: 100px;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 0.7rem;
    text-decoration: none;

    b {
      font-size: 0.85rem;
      font-weight: 500;
    }

    animation: ${slideIn} 0.5s ease-out 5s both;
  }

  .type2{
    height: 50px;
    width: 100%;

    margin-top: 40px;
    margin-bottom: -50px;

    display: flex;
    align-items: center;
    justify-content: center;

    img{
        height: 40px;
        border-radius: 50%;
    }

    .text{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        svg{
            font-size: 0.9rem;
            margin-left: 2.5px;
        }
    }

    font-size: 0.7rem;
    text-decoration: none;

    b {
      font-size: 0.85rem;
      font-weight: 500;
    }
  }

   .close {
    position: fixed;
    height: 45px;
    aspect-ratio: 1/1;
    bottom: 31.5px;
    right: 7.5%;
    z-index: 1001;
    border-radius: 100px;
    background-color: #232222;

    display: grid;
    place-items: center;

    opacity: 0;
    animation: ${fadeIn} 0.1s ease-in 6.5s forwards;
  }
`;
