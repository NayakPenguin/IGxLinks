import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RoomIcon from "@material-ui/icons/Room";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';

const BasicInfo = () => {
    return (
        <Container>
            <div className="top-bar">
                <div className="left">
                    <b>Last Published :</b> <br /> 25 May 9:16AM (UTC)
                </div>
                <div className="view-btn">View</div>
            </div>

            <div className="user-data">
                <div className="logo-x-dp">
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                        alt=""
                    />
                    <div className="add-btn"><AddIcon /></div>
                </div>
                <div className="name">Your Name <CreateIcon /></div>


                <div className="input-container">
                    <div className="label">Your Name</div>
                    <div className="input-line">
                        <input
                            className="input-basic"
                            type="number"
                            placeholder="Enter your name"
                        />
                        <div className="done-btn">
                            <DoneIcon/>
                        </div>
                    </div>
                </div>

                <div className="about-header">Your Role @Your Organisation <CreateIcon /></div>
                <div className="about-desc">Your bio <CreateIcon /></div>
                <div className="about-location">
                    Your Location <CreateIcon />
                </div>

                <div className="socials">
                    <div className="social-icon light">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
                            alt=""
                        />
                    </div>
                    <div className="social-icon light">
                        <img
                            src="https://www.svgrepo.com/show/416500/youtube-circle-logo.svg"
                            alt=""
                        />
                    </div>
                    <div className="social-icon light">
                        <img
                            src="https://cdn2.downdetector.com/static/uploads/c/300/f52a5/image11.png"
                            alt=""
                        />
                    </div>
                    <div className="social-icon light">
                        <img
                            src="https://downloadr2.apkmirror.com/wp-content/uploads/2020/10/91/5f9b61e42640e.png"
                            alt=""
                        />
                    </div>
                    <div className="social-icon">
                        <CreateIcon />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default BasicInfo

const Container = styled.div`
    .top-bar{
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100;

        border-bottom: 1px solid #313231;

        height: 60px;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 0.9rem;
        font-weight: 500;

        color: whitesmoke;

        padding: 0 30px;

        svg{
            font-size: 1.25rem;
            margin-right: 15px;
        }

        margin-bottom: 10px;
        background-color: black;

        .left{
            font-size: 0.65rem;
            font-weight: 200;
            letter-spacing: 0.07rem;
            
            b{
                font-weight: 500;
            }
        }

        .view-btn{
            padding: 7.5px 20px;
            font-size: 0.75rem;
            /* border: 1px solid #676363; */
            color: white;
            border-radius: 10px;
            background-color: #363636;
            text-decoration: none;
            font-weight: 200;
            letter-spacing: 0.07rem;
        }
    }

    .user-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
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
            
            .add-btn{
                position: absolute;
                z-index: 10;
                height: 30px;
                width: 30px;
                border-radius: 50%;
                background-color: #313232;
                left: calc(50% + 25px);
                top: 85px;

                display: grid;
                place-items: center;

                svg{
                    font-size: 1rem;
                    margin-bottom: 0;
                    margin-left: 0;
                    fill: #fff;
                }
            }
        }

        .input-container{
            width: 100%;
            /* margin-top: 30px; */
            /* border-bottom: 1px solid #313231ba; */
            /* padding-bottom: 20px; */
            /* background-color: orang e; */

            .label{
                font-size: 0.75rem;
                font-weight: 500;
            }

            .input-line{
                display: flex;
                align-items: center;
                
                .input-basic{
                    width: 100%;
                    border-radius: 10px;
                    margin: 15px 0 5px 0;
                    /* outline: none; */
                    /* background-color: transparent; */
                    background-color:rgb(22, 22, 22);
                    border: 1px solid #363636;
                    padding: 15px;
                    color: white;
                    resize: none;
                    font-size: 0.75rem;
                    font-weight: 300;
                    /* letter-spacing: 0.1rem; */
                    /* outline: white; */
                }
                
                .input-basic:focus {
                    outline: 1px solid white;
                    outline-offset: 2px; 
                    letter-spacing: 0.1rem;
                    transition: outline 125ms ease, letter-spacing 125ms ease;
                }

                .done-btn{
                    height: 42px;
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    background-color: #333;
                    margin-left: 10px;

                    display: grid;
                    place-items: center;

                    svg{
                        font-size: 1.25rem;
                        /* margin-bottom: -2px; */
                        margin-left: -2.5px;
                    }
                }
            }

            textarea{
                height: 200px;
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

        }
        
        svg{
            font-size: 1rem;
            margin-bottom: -2px;
            margin-left: 5px;
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

                display: grid;
                place-items: center;

                img{
                    width: 100%;
                    border-radius: 100px;
                }

                svg{
                    font-size: 1rem;
                    margin-bottom: 0;
                    margin-left: 0;
                    fill: #333;
                }
            }
        }
    }
`