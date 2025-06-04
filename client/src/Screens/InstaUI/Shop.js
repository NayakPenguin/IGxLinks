import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ControlFooter from "../../Components/ControlFooter";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackControl from "../../Components/BackControl";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

import brandproduct1 from "../../Images/brandproduct1.png"
import brandproduct2 from "../../Images/brandproduct2.png"
import brandproduct3 from "../../Images/brandproduct3.png"

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} />);
    }
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" />);
    }
    while (stars.length < 5) {
        stars.push(<FaRegStar key={`empty-${stars.length}`} />);
    }
    return stars;
};

const Shop = () => {
    return (
        <Container>
            <div className="main-content">
                <div className="back-control">
                    {/* <ArrowBackIcon/> */}
                    <div className="search-box">
                        <SearchIcon />
                        <input type="text" className="search" placeholder="Buy assured items" />
                    </div>
                    <FilterListIcon />
                </div>

                <div className="shop">
                    <div className="link-2-shop">
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={brandproduct1} alt="" /></div>
                        <div className="right">
                            <div className="tags">
                                <div className="tag">Best seller</div>
                            </div>
                            <div className="title">
                                Cute hand made penguin storage basket | Handcrafted
                            </div>
                            <div className="reviews">
                                <StarsWrapper>
                                    {renderStars(4.3)}
                                </StarsWrapper>
                                <div className="review-info">4.3 (38 Users)</div>
                            </div>
                            <div className="price">
                                <div className="main-price"><span>₹</span>669</div>
                                <div className="old-price"><div className="strike">M.R.P  : ₹3,396</div> (80% off)</div>
                            </div>
                            <div className="btns">
                                <div className="top-svgs">
                                    <div className="left-svgs">
                                        <WhatsAppIcon/>
                                        <svg aria-label="Reels" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
                                    </div>
                                    <div className="right-svgs">
                                        <BookmarkBorderOutlinedIcon/>
                                    </div>
                                </div>
                                <div className="buy-btn">Add to Cart</div>
                            </div>
                        </div>
                    </div>
                    <div className="link-2-shop">
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={brandproduct2} alt="" /></div>
                        <div className="right">
                            <div className="tags">
                                <div className="tag">Best seller</div>
                            </div>
                            <div className="title">
                                Cute hand bag | Flower bag | Handcrafted - Women in this og ...
                            </div>
                            <div className="reviews">
                                <StarsWrapper>
                                    {renderStars(3.5)}
                                </StarsWrapper>
                                <div className="review-info">3.5 (12 Users)</div>
                            </div>
                            <div className="price">
                                <div className="main-price"><span>₹</span>399</div>
                                <div className="old-price"><div className="strike">M.R.P  : ₹3,396</div> (80% off)</div>
                            </div>
                            <div className="btns">
                                <div className="top-svgs">
                                    <div className="left-svgs">
                                        <WhatsAppIcon/>
                                        <svg aria-label="Reels" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
                                    </div>
                                    <div className="right-svgs">
                                        <BookmarkBorderOutlinedIcon/>
                                    </div>
                                </div>
                                <div className="buy-btn">Add to Cart</div>
                            </div>
                        </div>
                    </div>
                    <div className="link-2-shop">
                        <div className="border-bottom-light"></div>
                        <div className="left"><img src={brandproduct3} alt="" /></div>
                        <div className="right">
                            <div className="tags">
                                <div className="tag">Best seller</div>
                            </div>
                            <div className="title">
                                Storage bucket
                            </div>
                            <div className="reviews">
                                <StarsWrapper>
                                    {renderStars(4.5)}
                                </StarsWrapper>
                                <div className="review-info">4.5 (76 Users)</div>
                            </div>
                            <div className="price">
                                <div className="main-price"><span>₹</span>999</div>
                                <div className="old-price"><div className="strike">M.R.P  : ₹3,396</div> (80% off)</div>
                            </div>
                            <div className="btns">
                                <div className="top-svgs">
                                    <div className="left-svgs">
                                        <WhatsAppIcon/>
                                        <svg aria-label="Reels" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path></svg>
                                    </div>
                                    <div className="right-svgs">
                                        <BookmarkBorderOutlinedIcon/>
                                    </div>
                                </div>
                                <div className="buy-btn">Add to Cart</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ControlFooter />
        </Container>
    )
}

export default Shop

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
        padding-top: 30px;

        position: relative;

        .back-control{
            z-index: 100;
            position: fixed;
            top: 0px;
            left: 0px;

            border-bottom: 1px solid #313231;

            width: 100vw;
            height: 60px;

            display: flex;
            align-items: center;
            justify-content: space-between;
    
            font-size: 0.9rem;
            font-weight: 500;

            color: whitesmoke;

            padding: 0 15px;
    
            svg{
                font-size: 1.25rem;
            }
    
            margin-bottom: 10px;

            background-color: black;

            .search-box{
                flex: 1;
                display: flex;
                align-items: center;
                background-color: #313231;
                height: 70%;
                padding: 0 20px;
                border-radius: 100px;
                margin-right: 10px;

                svg{
                    margin-right: 15px;
                }
            }
            
            .search{
                width: 100%;
                background-color: transparent;
                border: none;
            }
        }
        
        .shop{
            width: 100%;
            display: flex;
            flex-wrap: wrap; 
            justify-content: space-between;

            .link-2-shop{
                position: relative;
                padding-bottom: 140px;
                width: 50%;
                /* background-color: #363636; */
                color: #e5e5e5;
                
                border-radius: 10px;
                margin-bottom: 5px;
                margin-top: 30px;

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
                        border-radius: 10px;
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
                        color: #e5e5e5;
                        font-size: 0.75rem;
                        font-weight: 600;
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    .reviews{
                        display: flex;

                        .review-info{
                            display: flex;
                            align-items: flex-end;
                            width: 100%;
                            color: #e5e5e5;
                            font-size: 0.7rem;
                            margin-left: -15px;
                            font-family: Arial, sans-serif;
                            font-style: italic;
                        }
                    }

                    .main-price{
                        margin-top: 10px;
                        display: flex;
                        align-items: flex-start;

                        color: #e5e5e5;
                        font-size: 1.15rem;
                        font-weight: 600;
                        font-family: Arial, sans-serif;
                        
                        span{
                            font-family: Arial, sans-serif;
                            font-size: 0.75rem;
                            font-weight: 300;
                            margin-right: 3px;
                        }
                    }
                    
                    .old-price{
                        display: flex;
                        align-items: flex-end;
                        width: 100%;
                        color: #e5e5e5;
                        font-size: 0.7rem;
                        font-family: Arial, sans-serif;
                        margin-top: 5px;
                        

                        .strike{
                            text-decoration: line-through;
                            margin-right: 5px;
                            font-family: Arial, sans-serif;
                        }
                    }

                    .desc{
                        color: #e5e5e5;
                        font-size: 0.75rem;
                        font-weight: 300;
                        margin-top: 10px;
                        width: 100%;
                    }

                    .date{
                        color: #e5e5e5;
                        font-size: 0.65rem;
                        font-weight: 300;
                        margin-top: 10px;
                        width: 100%;
                        font-weight: 500;
                    }

                    .price{
                        /* position: absolute;
                        bottom: 85px;
                        left: 0; */
                        /* padding-left: 10px; */
                    }

                    .btns{
                        /* position: absolute;
                        bottom: 0;
                        left: 0; */
                        width: calc(100% - 7.5px);

                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        
                        .buy-btn{
                            width: 100%;
                            margin-top: 5px;
                            font-size: 0.85rem;
                            padding: 10px 15px;
                            background-color: #0095f6;
                            border-radius: 10px;
                            text-align: center;
                        }

                        .top-svgs{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            svg{
                                font-size: 1.65rem;
                            }

                            .left-svgs{
                                svg{
                                    font-size: 1.65rem;
                                    margin-right: 10px;
                                }
                            }
                        }

                        
                    }
                }
            }
        }

        .shop > :nth-child(even) {
            border-left: 1px solid #313231;
            padding-left: 7.5px;
            border-radius: 0;
            position: relative; 

            .border-bottom-light{
                right: 0;
            }

            .right{
                /* position: relative;  */

                .price{
                    position: absolute;
                    bottom: 85px;
                    left: 7.5px;
                }

                .btns{
                    position: absolute;
                    left: 7.5px;
                    bottom: 0px;
                }
            }
        }

        .shop > :nth-child(odd) {
            padding-right: 7.5px;

            position: relative; 

            .border-bottom-light{
                left: 0;
            }

            .right{
                /* position: relative;  */

                .price{
                    position: absolute;
                    bottom: 85px;
                    left: 0px;
                }

                .btns{
                    position: absolute;
                    right: 7.5px;
                    bottom: 0px;
                }
            }
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
