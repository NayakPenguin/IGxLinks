import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import CallMadeIcon from '@material-ui/icons/CallMade';

import ControlFooter from "../../Components/ControlFooter";
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

import influencerproduct1 from "../../Images/influencerproduct1.png"
import influencerproduct2 from "../../Images/influencerproduct2.png"
import influencerproduct3 from "../../Images/influencerproduct3.png"
import influencerproduct4 from "../../Images/influencerproduct4.png"
import influencerproduct5 from "../../Images/influencerproduct5.png"
import influencerproduct6 from "../../Images/influencerproduct6.png"

import BackControl from "../../Components/BackControl";

const NewShop = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [notificationModelOpen, setNotificationModelOpen] = useState(false);
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

            <div className="main-content">
                <BackControl />
                <div className="search-box-container">
                    {/* <ArrowBackIcon/> */}
                    <div className="search-box">
                        <SearchIcon />
                        <input type="text" className="search" placeholder="Search Products by Category" />
                    </div>
                    <FilterListIcon />
                </div>
                <div className="shop-2">
                    <div className="link-2-shop" onClick={() => setModelOpen(true)}>
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={influencerproduct1} alt="" /></div>
                        <div className="item-name">
                            T-shirt
                        </div>
                        <div className="item-price">
                            ₹1,399
                        </div>
                    </div>
                    <div className="link-2-shop" onClick={() => setModelOpen(true)}>
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={influencerproduct2} alt="" /></div>
                        <div className="item-name">
                            Shine Lip Gloss
                        </div>
                        <div className="item-price">
                            ₹349
                        </div>
                    </div>
                    <div className="link-2-shop" onClick={() => setModelOpen(true)}>
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={influencerproduct3} alt="" /></div>
                        <div className="item-name">
                            Watch
                        </div>
                        <div className="item-price">
                            ₹9,999
                        </div>
                    </div>
                    <div className="link-2-shop" onClick={() => setModelOpen(true)}>
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={influencerproduct4} alt="" /></div>
                        <div className="item-name">
                            T-shirt
                        </div>
                        <div className="item-price">
                            ₹499
                        </div>
                    </div>
                    <div className="link-2-shop" onClick={() => setModelOpen(true)}>
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={influencerproduct5} alt="" /></div>
                        <div className="item-name">
                            T-shirt
                        </div>
                        <div className="item-price">
                            ₹499
                        </div>
                    </div>
                    <div className="link-2-shop" onClick={() => setModelOpen(true)}>
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={influencerproduct6} alt="" /></div>
                        <div className="item-name">
                            Phone Cover
                        </div>
                        <div className="item-price">
                            ₹249
                        </div>
                    </div>
                </div>

            </div>
            <ControlFooter />
        </Container>
    )
}

export default NewShop

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

    padding: 60px 10px 30px 10px;

    display: flex;  
    flex-direction: column;
    align-items: center;

    .main-content{
        max-width: 500px;
        position: relative;

        .search-box-container{
            width: 100%;
            height: 60px;

            display: flex;
            align-items: center;
            justify-content: space-between;
    
            font-size: 0.9rem;
            font-weight: 500;

            color: whitesmoke;

            svg{
                font-size: 1.5rem;
            }
    
            margin: 15px 0;

            .search-box{
                flex: 1;
                display: flex;
                align-items: center;
                background-color: rgb(22, 22, 22);
                border: 1px solid #363636;
                height: 90%;
                padding: 0 20px;
                border-radius: 100px;
                margin-right: 10px;

                svg{
                    font-size: 1.25rem;
                    margin-right: 15px;
                }
            }
            
            .search{
                width: 100%;
                background-color: transparent;
                border: none;
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
                    bottom: 20px;
                    left: 0;
                    padding: 5px 5px;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 500;
                    /* font-style: italic; */
                    letter-spacing: 0.05rem;
                    z-index: 2;
                }

                .item-price{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 5px 5px;
                    color: white;
                    font-family: Arial, sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    /* font-size: 0.65rem; */
                    /* font-weight: 500; */
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
        margin-top: -50px;

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