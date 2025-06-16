import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import logo from "../Images/logo-main.png";
import samplePage1 from "../Images/samplePage1.png";
import logo2 from "../Images/logo-bg.png";
import CallMadeIcon from '@material-ui/icons/CallMade';
import feature1 from "../Images/Landing/feature1.png";

const Landing = () => {
    return (
        <Container>
            <div className="prenav"></div>
            <div className="navbar">
                {/* <div className="left"></div> */}
                {/* <div className="middle">IG <span>x</span> Links</div> */}
                <div className="middle">
                    <img src={logo} alt="" />
                    IG x Links
                    {/* <img src={sitename} alt="" /> */}
                </div>
                <div className="login-btn">Login</div>
            </div>
            <div className="top-page">
                {/* <div className="tag">Minimal Design</div> */}
                <h1><br /> Share More Than Links. <br /> <strong>Share Yourself.</strong></h1>
                <h3><i>It’s minimal, emotional, and modern.</i></h3>
                <h3>
                    IGxLinks lets you turn a single link into your <strong>personal hub</strong> — share <strong>forms, polls, stories, anonymous replies</strong>, <strong>sell or promote products</strong>, <strong>create paid links</strong>, and express everything that makes you <strong>you</strong>. Designed to be <strong>minimalist</strong> — not loud, not cluttered — your page feels like a <strong>sleek app extension</strong> when someone clicks your link. Whether you're a <strong>creator, entrepreneur, student</strong>, or just vibing online — it’s all here, <strong>your way</strong>.
                </h3>
                <div className="create-your-page-btn">Create your Page</div>
            </div>
            <div className="sample-page">
                <h2>Discover the <strong>pages</strong> you can create with IGxLinks.</h2>
                <div className="desc">
                    Below are examples from a <strong>Software Developer, Influencer, Student, and Brand</strong> — now it’s your turn to build your own.
                </div>
                <img src={samplePage1} alt="" />
                <div className="link-to-profile">
                    <img src={logo2} alt="" />
                    <div className="username">igxl.ink/@nayakpenguin</div>
                    <CallMadeIcon/>
                </div>
            </div>
            <div className="sample-page-2">
                <h2><strong>Features</strong> — One Link. Endless Possibilities.</h2>
                <div className="desc">
                    From <strong>forms</strong> and <strong>polls</strong> to <strong>paid links</strong> and <strong>anonymous replies</strong> — discover the features that make IGxLinks more than just a bio link. 
                    It's your <strong>most versatile tool</strong> to share, express, and grow.
                </div>
                <img src={feature1} alt="" />
            </div>
        </Container>
    )
}

export default Landing

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: 100vh;
    width: 100vw;

    background-color: white;
    color: #333;

    .prenav{
        height: 45px;
        width: 100%;
        background-color: orange;
    }
     
    .navbar{
        height: 60px;
        /* border-bottom: 1px solid #bae6b2; */
        width: 100%;
        /* background-color: #eeffec; */
        border-bottom: 1px solid rgb(233, 229, 229);
        background-color: rgba(255, 255, 255, 0.83);
        box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;

        padding: 0 20px;

        display: flex;  
        align-items: center;
        justify-content: space-between;


        .middle{
            font-size: 1.15rem;
            /* letter-spacing: 0.1rem; */
            font-weight: 600;
            color: #333;

            display: flex;
            align-items: center;

            span{
                color:rgb(243, 114, 114);
                margin: 0 5px;
                font-weight: 700;
            }

            img{
                height: 30px;
                margin-right: 10px;
            }
        }

        .login-btn{
            background-color: black;
            padding: 10px 27.5px;
            font-size: 0.85rem;
            border-radius: 100px;
        }

    }

    .top-page{
        /* height: calc(100vh - 60px); */
        /* min-height: 300px; */
        width: 100%;

        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        padding: 60px 30px;
        margin-bottom: 60px;

        max-width: 600px;

        /* background-color: #eeffec; */

        .tag{
            color: #333;
            padding: 10px 25px;
            border: 1px solid black;
            border-radius: 100px;
        }

        h1{
            color: #333;
            font-size: 2.15rem;
            font-weight: 600;
            text-align: center;
            
            strong{
                color: #333;
                font-weight: 600;
                background-color: yellow; 
                padding: 0 10px;
            }
        }

        h3{
            margin-top: 30px;
            padding: 0 30px;
            color: #333;
            font-size: 1rem;
            font-weight: 200;
            text-align: center;

            i{
                color: #333;
                font-weight: 400;
            }

            strong{
                color: #333;
                font-weight: 400;
            }
        }

        .create-your-page-btn{
            margin-top: 50px;
            background-color: black;
            padding: 15px 35px;
            font-size: 0.85rem;
            border-radius: 100px;
        }
    }

    .sample-page{
        padding: 100px 30px;
        background-color: #d9f4e0;
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;

        h2{
            max-width: 600px;
            color: #333;
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 20px;

            strong{
                color: #333;
                font-weight: 600;
                background-color: yellow; 
                padding: 0 10px;
            }
        }

        .desc{
            max-width: 600px;
            padding: 0 30px;
            color: #333;
            font-size: 1rem;
            font-weight: 200;
            text-align: center;
            margin-bottom: 50px;

            i{
                color: #333;
                font-weight: 400;
            }

            strong{
                color: #333;
                font-weight: 400;
            }
        }

        img{
            width: 100%;
            max-width: 600px;
        }

        .link-to-profile{
            max-width: 600px;
            margin-top: 20px;

            border: 1px solid rgb(233, 229, 229);
            background-color: rgba(255, 255, 255, 0.83);
            box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;

            padding: 10px 20px;
            border-radius: 100px;

            display: flex;
            align-items: center;

            img{
                width: 30px;
                border-radius: 50%;
                margin-right: 10px;
                margin-left: -5px;
            }

            .username{
                font-size: 0.75rem;
                color: cornflowerblue;
                font-weight: 500;
            }

            svg{
                fill: cornflowerblue;
                margin-left: 5px;
                font-size: 1.25rem;
            }
        }
    }

    .sample-page-2{
        padding: 100px 30px;
        /* background-color: #d9f4e0; */
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 600px;

        h2{
            color: #333;
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 20px;

            strong{
                color: #333;
                font-weight: 600;
                background-color: yellow; 
                padding: 0 10px;
            }
        }

        .desc{
            padding: 0 30px;
            color: #333;
            font-size: 1rem;
            font-weight: 200;
            text-align: center;
            margin-bottom: 50px;

            i{
                color: #333;
                font-weight: 400;
            }

            strong{
                color: #333;
                font-weight: 400;
            }
        }

        img{
            width: 100%;
        }
    }
`