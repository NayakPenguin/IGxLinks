import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import CallMadeIcon from '@material-ui/icons/CallMade';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const UserArya = () => {
    return (
    <Container>
        <div className="main-content glass">
            <div className="logo-x-dp">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Nr0qukQ0dG8-ekf5oSbtMKS6ACMsqhX35w&s" alt="" />
            </div>
            <div className="name">Arya Sharma</div>
            <div className="about-header">Influencer @Instagram</div>
            <div className="about-desc">Hello, I'm Arya Sharma, a computer science student and I make reaction videos on Youtube and Instragram for fun!</div>

            <div className="main-btns">
                <div className="btn-1 trans glass">80K page views</div>
                <div className="btn-1">Follow</div>
            </div>

            <div className="socials">
                <div className="social-icon">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png" alt="" />
                </div>
                <div className="social-icon">
                    <img src="https://www.svgrepo.com/show/416500/youtube-circle-logo.svg" alt="" />
                </div>
                <div className="social-icon">
                    <img src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338508_1280.png" alt="" />
                </div>
            </div>
            

            <div className="group">
                <div className="group-name-container">
                    <div className="group-name-container-line"></div>
                    <div className="group-name">Ask Ananously</div>
                    <div className="group-name-container-line"></div>
                </div>
                <div className="link1">Honest views about my reels?</div>
                <div className="link1">Confess something</div>
            </div>

            <div className="group">
                <div className="group-name-container">
                    <div className="group-name-container-line"></div>
                    <div className="group-name">Let me know</div>
                    <div className="group-name-container-line"></div>
                </div>
                <div className="link1">Copyright issue</div>
                <div className="link1">Connect for collaboration</div>
                <div className="link1">Promote your product</div>
            </div>

            <div className="group">
                <div className="group-name-container">
                    <div className="group-name-container-line"></div>
                    <div className="group-name">Merchandise</div>
                    <div className="group-name-container-line"></div>
                </div>
                <div className="link-2">
                    <img src="https://redtape.com/cdn/shop/products/8-800x800_22c88bd9-f9c2-4c61-ab55-71edce92bf57.jpg?v=1728477061" alt="" />
                    <div className="tags">
                        <div className="price">₹ 7999.99</div>
                        <div className="tag">Best seller</div>
                    </div>
                    <div className="title">
                        RedTape Sneaker Casual Shoes For Men | Soft Cushion Insole, Slip-ResisTance, Dynamic Feet ...
                    </div>
                    <div className="buy-btn">Purchase</div>
                </div>
                <div className="link-2">
                    <img src="https://www.eyewearlabs.com/cdn/shop/files/1_d98fa425-93a3-4127-8a0c-8d590aa46735.png?v=1715073649" alt="" />
                    <div className="tags">
                        <div className="price">₹ 1299.99</div>
                        {/* <div className="tag">Best seller</div> */}
                    </div>
                    <div className="title">
                        Captain | Black and Silver Polarized Round Sunglasses
                    </div>
                    <div className="buy-btn">Purchase</div>
                </div>
            </div>
        </div>
        {/* <div className="join-us"></div> */}
    </Container>
  )
}

export default UserArya

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    /* background-color: #333; */
    /* background-image: url('https://media0.giphy.com/media/4IlgE2iRukYIMbZsJZ/200w.gif?cid=82a1493bkue5enzruga0dznx3jz7dllsooyi1zkknv6pn3kp&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    /* background-image: url('https://media4.giphy.com/media/YT4z922u0PlOHhoap2/200w.gif?cid=82a1493biu02p2az2bwfiwfoefie5fkywswq32j54a9hjslv&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    /* background-image: url('https://media3.giphy.com/media/L1X6XcN2oxS08VrquP/giphy.gif?cid=6c09b952kh7p7oq0fwgeyinqxeaeiykmyvxtlulyyg3cr6m4&ep=v1_gifs_search&rid=giphy.gif&ct=g'); */
    /* background-image: url('https://cdn.dribbble.com/users/2773311/screenshots/14473889/media/91fad3184d4d4c377c32cba06da2d0a1.gif'); */
    background-image: url('https://media1.giphy.com/media/tNt8ZSSrwNHzQcPABV/200w.gif?cid=82a1493bqjkhddxjr340tneezzrwuqsy9ld4pmddvavjwlip&ep=v1_gifs_related&rid=200w.gif&ct=g');
    
    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    background-position: center;
    background-attachment: fixed;

    padding: 30px;

    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;

    .main-content{
        width: calc(100vw - 60px);
        max-width: 450px;
        background-color: #3e3e3e;
        /* background: linear-gradient(135deg, #dfe9f3, #ffffff);  */
        min-height: calc(100vh - 150px);
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 35px;

        .logo-x-dp{
            height: 120px;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 50%;

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
            margin-top: 5px;
            font-weight: 200;
            font-size: 0.85rem;
            text-align: center;
        }

        .main-btns{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .btn-1{
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #363636;
                border-radius: 10px;
                margin: 0 5px;
            }

            .trans{
                background-color: transparent;
            }
        }

        .socials{
            margin-top: 30px;
            display: flex; 
            align-items: center; 
            justify-content: center;
            flex-wrap: wrap;

            .social-icon{
                height: 45px;
                aspect-ratio: 1/1;
                background-color: #363636;
                border-radius: 50%;
                margin: 2.5px;

                padding: 2.5px;

                img{
                    width: 100%;
                    border-radius: 100px;
                }
            }
        }

        .group{
            width: 100%;

            .group-name-container{
                margin: 30px 0;
                padding: 0 35px;

                display: flex;
                align-items: center;
                justify-content: center;

                .group-name{
                    font-size: 0.85rem;
                    margin: 0 10px;
                }

                .group-name-container-line{
                    height: 3px;
                    border-radius: 100px;
                    background-color: #676363;
                    flex: 1;
                }
            }

            .link1{
                background-color: #f5f5f5;
                font-size: 0.85rem;
                font-weight: 500;
                text-align: center;
                padding: 15px 30px;
                border-radius: 100px;
                color: #333;
                margin-bottom: 5px;

                display: flex; 
                align-items: center;
                justify-content: center;

                height: 60px;
            }

            .link-2{
                background-color: #f5f5f5;
                
                padding: 30px;
                border-radius: 30px;
                color: #333;
                margin-bottom: 5px;
                margin-top: 30px;

                display: flex; 
                align-items: center;
                flex-direction: column;

                img{
                    width: 100%;
                    border-radius: 30px;
                }

                .tags{
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;

                    .price{
                        background-color: yellowgreen;
                        font-size: 0.85rem;
                        color: #333;
                        font-weight: 600;
                        padding: 5px 10px;
                        border-radius: 100px;
                        margin-right: 5px;
                    }
                    
                    .tag{
                        background-color: pink;
                        font-size: 0.85rem;
                        color: #333;
                        font-weight: 600;
                        padding: 5px 10px;
                        border-radius: 100px;
                        margin-right: 5px;
                    }
                }

                .title{
                    color: #333;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-top: 10px;
                    width: 100%;
                }

                .buy-btn{
                    margin-top: 10px;
                    background-color: yellowgreen;
                    font-size: 0.85rem;
                    color: #333;
                    font-weight: 600;
                    padding: 15px 15px;
                    width: 100%;
                    border-radius: 30px;
                    text-align: center;
                }
            }
        }
    }

    .glass {
        background: rgba(255, 255, 255, 0.2); /* Transparent white */
        border-radius: 16px; /* Rounded corners */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
        backdrop-filter: blur(10px); /* Background blur effect */
        -webkit-backdrop-filter: blur(10px); /* For Safari support */
        border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for glass effect */
    }

    .join-us{
        width: calc(100vw - 60px);
        max-width: 450px;
        background-color: whitesmoke;
        border-radius: 30px;
        height: 60px;
        margin-top: 30px;
    }
`