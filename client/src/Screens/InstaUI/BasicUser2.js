import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import CallMadeIcon from '@material-ui/icons/CallMade';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BarChartIcon from '@material-ui/icons/BarChart';
import ControlFooter from "../../Components/ControlFooter";
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RoomIcon from '@material-ui/icons/Room';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import InstagramIcon from '@material-ui/icons/Instagram';
import CheckIcon from '@material-ui/icons/Check';
import FlagIcon from '@material-ui/icons/Flag';

import basicUser2Dp from "../../Images/basicUser2Dp.png"
import influencerproduct1 from "../../Images/influencerproduct1.png"
import influencerproduct2 from "../../Images/influencerproduct2.png"
import influencerproduct3 from "../../Images/influencerproduct3.png"
import influencerproduct4 from "../../Images/influencerproduct4.png"
import influencerproduct5 from "../../Images/influencerproduct5.png"
import influencerproduct6 from "../../Images/influencerproduct6.png"

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { CircularProgress } from "@material-ui/core";

const BasicUser2 = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [notificationModelOpen, setNotificationModelOpen] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [upvoted, setUpvoted] = useState(0); // 0 - not voted, -1 green, +1 red
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

    const handleVote = (newValue) => {
        setSavedProduct(false);
        setNotificationModelOpen(false);
        setUpvoted(newValue);

        if (newValue === -1) {
            setNotificationText("You voted Somya as a green flag!");
        } else if (newValue === 1) {
            setNotificationText("You voted Somya as a red flag!");
        } else {
            setNotificationText("Your vote has been removed!");
        }

        setNotificationModelOpen(true);
    };

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

    const handleSave = () => {
        if (savedProduct) {
            setSavedProduct(!savedProduct);
            setNotificationText("Removed from Saved");
            setNotificationModelOpen(true);
        }
        else {
            setSavedProduct(!savedProduct);
            setNotificationText("Saved to Bookmarked Products");
            setNotificationModelOpen(true);
        }
    }

    return (
        <Container>
            {
                modelOpen ?
                    <ModelConatiner>
                        <div className="model-closer" onClick={() => setModelOpen(false)}></div>
                        <div className="model">
                            <div className="shop-model-items">
                                <div className="left"><img src={influencerproduct1} alt="" /></div>
                                <div className="right">
                                    <div className="tags">
                                        <div className="tag">Best seller</div>
                                    </div>
                                    <div className="title">
                                        White Graphic Sports Jersey Tshirt
                                    </div>
                                    <div className="brand">
                                        Brand - <b>@newme.asia</b>
                                    </div>
                                    <div className="promo">
                                        My promo code for 30% off - <b>SOMY</b> <FileCopyOutlinedIcon />
                                    </div>
                                    <div className="promo">
                                        <i>
                                            Avg price with my promo comes becomes around
                                            <div className="price-container">
                                                <div className="main-price"><span>₹</span>1,399</div>
                                                <div className="old-price"><div className="strike">Avg Selling Price : ₹1,999</div> (30% off)</div>
                                            </div>
                                        </i>
                                    </div>
                                    {/* <div className="reviews">
                                    <StarsWrapper>
                                        {renderStars(4.3)}
                                    </StarsWrapper>
                                    <div className="review-info">4.3 (38 Users)</div>
                                </div> */}
                                    {/* <div className="price">
                                    <div className="main-price"><span>₹</span>669</div>
                                    <div className="old-price"><div className="strike">M.R.P  : ₹3,396</div> (80% off)</div>
                                </div> */}
                                    <div className="btns">
                                        <div className="svg-container svg-2">
                                            <svg aria-label="Reels" class="x1lliihq x1n2onr6 x5n08af" fill="#333" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="#333" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
                                        </div>
                                        <div className="svg-container svg-2" style={{ "marginLeft": "10px" }}>
                                            <svg aria-label="Share Post" class="x1lliihq x1n2onr6 x5n08af" fill="#333" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="#333" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="#333" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                        </div>
                                        <a href="https://newme.asia/product/white-graphic-sports-jersey-tshirt?srsltid=AfmBOooC-e1QTAD72Bq9zdyw4nH5vDSARUP55s--_b_Qd2leAkw7J0w_" className="buy-btn">Shop Now <CallMadeIcon /></a>
                                        <div className="svg-container" onClick={() => handleSave()}>
                                            {
                                                savedProduct ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModelConatiner> : null
            }
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
            <div className="main-content">
                <Subscribe>
                    {/*  */}
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
                <div className="user-data">
                    <div className="logo-x-dp">
                        <img src={basicUser2Dp} alt="" />
                    </div>
                    <div className="name">Atanu Nayak</div>
                    <div className="about-header">Software Developer @Samsung</div>
                    <div className="about-desc">I develop software that scales.</div>
                    <div className="about-location"><RoomIcon /> Kol/Blr</div>

                    {/* <div className="main-btns">
                        <div className="btn-1 trans">30K page views</div>
                        <div className="btn-1">Subscribe</div>
                    </div> */}

                    <div className="socials">
                        <div className="social-icon">
                            <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="" />
                        </div>
                        <div className="social-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="" />
                        </div>
                        <div className="social-icon">
                            <img src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/83facdeba5b924cb3b1a" alt="" />
                        </div>
                        <div className="social-icon">
                            <img src="https://downloadr2.apkmirror.com/wp-content/uploads/2020/10/91/5f9b61e42640e.png" alt="" />
                        </div>
                        <div className="social-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png" alt="" />
                        </div>
                    </div>
                </div>

                {/* <RedorGreenFlag>
                    <div className="info">
                        61% votes for <b>green flag <FlagIcon /></b> as a person
                    </div>

                    <div className={upvoted === -1 ? "vote-btn voted" : "vote-btn"}
                        onClick={() => handleVote(upvoted === -1 ? 0 : -1)}>
                        <ArrowDropUpIcon />
                    </div>

                    <div className="box">
                        <div className="left">Green Flag <FlagIcon /></div>
                        <div className="right">🚩</div>
                    </div>

                    <div className={upvoted === 1 ? "vote-btn voted" : "vote-btn"}
                        onClick={() => handleVote(upvoted === 1 ? 0 : 1)}>
                        <ArrowDropUpIcon />
                    </div>
                </RedorGreenFlag> */}

                <PinnedAnnouncement>
                    <div className="label">
                        <svg viewBox="0 0 24 24" height="16" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>pin-refreshed</title><path d="M16 5V12L17.7 13.7C17.8 13.8 17.875 13.9125 17.925 14.0375C17.975 14.1625 18 14.2917 18 14.425V15C18 15.2833 17.9042 15.5208 17.7125 15.7125C17.5208 15.9042 17.2833 16 17 16H13V21.85C13 22.1333 12.9042 22.3708 12.7125 22.5625C12.5208 22.7542 12.2833 22.85 12 22.85C11.7167 22.85 11.4792 22.7542 11.2875 22.5625C11.0958 22.3708 11 22.1333 11 21.85V16H7C6.71667 16 6.47917 15.9042 6.2875 15.7125C6.09583 15.5208 6 15.2833 6 15V14.425C6 14.2917 6.025 14.1625 6.075 14.0375C6.125 13.9125 6.2 13.8 6.3 13.7L8 12V5C7.71667 5 7.47917 4.90417 7.2875 4.7125C7.09583 4.52083 7 4.28333 7 4C7 3.71667 7.09583 3.47917 7.2875 3.2875C7.47917 3.09583 7.71667 3 8 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.28333 16.9042 4.52083 16.7125 4.7125C16.5208 4.90417 16.2833 5 16 5ZM8.85 14H15.15L14 12.85V5H10V12.85L8.85 14Z" fill="currentColor"></path></svg>
                        Pinned Announcement
                    </div>
                    <b>Open to Work</b>
                    Open to backend-heavy SDE 2 positions at product-based companies.
                </PinnedAnnouncement>

                <div className="group">
                    <div className="group-name-container">
                        <div className="group-name-container-line"></div>
                        <div className="group-name">Professional 💼</div>
                        <div className="group-name-container-line"></div>
                    </div>

                    <div className="link1">
                        <div>View my Resume - <b>Software Developer • 2 YOE</b></div>
                        <div className="link-circle">
                            <CallMadeIcon />
                        </div>
                    </div>


                    <div className="link1">
                        <div>Want a Referral? Fill the Form with Your <b>Experience, Opening Link etc</b></div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </div>

                    <div className="link1">
                        <div>Schedule a One-on-One Meeting</div>
                        <div className="link-circle">
                            <EventAvailableIcon />
                        </div>
                    </div>

                    <a href="/influencer/form" className="link1">
                        <div>Invite Me for an Interview</div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </a>

                    <div className="link1">
                        <div>Explore My Past Projects</div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </div>

                    <div className="link1">
                        <div>Collaborate on a Project - Share your Idea</div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </div>
                </div>

                <div className="group">
                    <div className="group-name-container">
                        <div className="group-name-container-line"></div>
                        <div className="group-name">Paid Servies</div>
                        <div className="group-name-container-line"></div>
                    </div>

                    <div className="link1">
                        <div className="paid-circle">
                            <MonetizationOnIcon />
                        </div>
                        <div>Top <b>200 Leetcode Questions</b> - One needs to Solve</div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </div>

                    <div className="link1">
                        <div className="paid-circle">
                            <MonetizationOnIcon />
                        </div>
                        <div><b>Mock Interview</b> - 45 Mins/2 Questions - with feedback</div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </div>
                </div>


                <div className="group">
                    <div className="group-name-container">
                        <div className="group-name-container-line"></div>
                        <div className="group-name">About me</div>
                        <div className="group-name-container-line"></div>
                    </div>
                    <div className="link1">
                        <div>🧸 22 Years of Me – My Story So Far/Timeline</div>
                        <div className="link-circle">
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="link1">
                        <div>🎧 Music Taste? Basically My Personality <b>Spotify</b></div>
                        <div className="link-circle">
                            <CallMadeIcon />
                        </div>
                    </div>
                </div>

                <div className="share-my-page">
                    {/* igonel.ink/somyakodan_ */}
                </div>
            </div>

            <ControlFooter />
        </Container>
    )
}

export default BasicUser2

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
    
    .main-content{
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

                .social-icon{
                    height: 35px;
                    aspect-ratio: 1/1;
                    background-color:rgb(217, 211, 211);
                    border-radius: 50%;
                    margin: 3.5px;

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
        margin-top: 70px;

        .group-name-container{
            margin: 30px 0;
            padding: 0 35px;

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
            margin-bottom: 5px;

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

    .share-my-page{
        height: 20px;
        /* margin: 60px 0 30px 0;
        font-size: 0.75rem;
        color: cornflowerblue;
        text-align: center; */
    }
`

const StarsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  color: #f5c518; /* IMDb star color */
  
  svg{
    font-size: 12px;
    fill: #f5c518; /* IMDb star color */
  }
`;


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