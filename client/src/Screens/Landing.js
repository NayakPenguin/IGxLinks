import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import logo from "../Images/logo-main.png";
import samplePage1 from "../Images/samplePage1.png";
import logo2 from "../Images/logo-bg.png";
import CallMadeIcon from '@material-ui/icons/CallMade';
import feature1 from "../Images/Landing/feature1.png";
import feature2 from "../Images/Landing/feature2.png";
import feature3 from "../Images/Landing/feature3.png";
import feature4 from "../Images/Landing/feature4.png";
import feature5 from "../Images/Landing/feature5.png";

const Landing = () => {
    return (
        <Container>
            <div className="prenav">Watch us create an influencer page in 5 mins <CallMadeIcon /> </div>
            <div className="navbar">
                {/* <div className="left"></div> */}
                {/* <div className="middle">IG <span>x</span> Links</div> */}
                <div className="middle">
                    <img src={logo} alt="" />
                    IG x Links
                    {/* <img src={sitename} alt="" /> */}
                </div>
                <a href="/redirect" className="login-btn">Login</a>
            </div>
            <div className="top-page">
                {/* <div className="tag">Minimal Design</div> */}
                <h1><br /> Share More Than Links. <br /> <strong>Share Yourself.</strong></h1>
                <h3><i>It’s minimal, expressive, and modern.</i></h3>
                <h3>
                    IGxLinks lets you turn a single link into your <strong>personal hub</strong> — share <strong>forms, polls, stories, anonymous replies</strong>, <strong>sell or promote products</strong>, <strong>create paid links</strong>, and express everything that makes you <strong>you</strong>. Designed to be <strong>minimalist</strong> — not loud, not cluttered — your page feels like a <strong>sleek app extension</strong> when someone clicks your link. Whether you're a <strong>creator, entrepreneur, student</strong>, or just vibing online — it’s all here, <strong>your way</strong>.
                </h3>
                <a href="/redirect" className="create-your-page-btn">Create your Page</a>
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
                    <CallMadeIcon />
                </div>
            </div>
            <div className="sample-page-2">
                <h2><strong>Features</strong> — One Link. Endless Possibilities.</h2>
                <div className="desc">
                    From <strong>forms</strong> and <strong>polls</strong> to <strong>paid links</strong> and <strong>anonymous replies</strong> — discover the features that make IGxLinks more than just a bio link.
                    It's your <strong>most versatile tool</strong> to share, express, and grow.
                </div>
                <img src={feature1} alt="" />
                <img src={feature2} alt="" />
                <img src={feature3} alt="" />
                <img src={feature4} alt="" />
                <img src={feature5} alt="" />
            </div>
            <div className="sample-page">
                <h2>Influencers using IGxLinks collectively bring in <strong>50M+ followers</strong> — and counting.</h2>
                <div className="desc">From niche creators to viral trendsetters, IGxLinks powers the link-in-bio for influencers whose combined audience exceeds <strong>50 million followers</strong>. Your reach starts here.</div>
                <div className="faces">
                    <div className="face">
                        <img src="https://digitalscholar.in/wp-content/uploads/2022/11/ranveer-allahbadia-male-fashion-influencer.jpg" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://influencersplace.com/wp-content/uploads/2025/01/Dolly-Singh.webp" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://cdn.theatlantic.com/thumbor/5CAt1Sk4MzY7oW1-cEmDn-shA9Y=/326x0:2674x2348/540x540/media/img/mt/2015/12/AP_72715539984/original.jpg" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://preview.redd.it/day-2-drop-your-favourite-karan-aujla-bar-v0-vpobe1uk6csd1.jpeg?auto=webp&s=32edeaa01ff3368b042722b18c68fa0c71004a23" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://influencermatchmaker.co.uk/assets/influencer-profiles/charlidamelio/charlidamelio3.jfif" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://rollingstoneindia.com/wp-content/uploads/2022/09/Vishnu-Kaushal.jpg" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://influencermatchmaker.co.uk/img/containers/assets/influencer-profiles/addison-rae/addisonrae.jpeg/6c468630fea1e91113865efbfc3db351.webp" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://i1.feedspot.com/original/5698668.jpg" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://imageio.forbes.com/specials-images/imageserve/5f11ecaa1c59f700085461dd/Influencer-Halley-Elefante--aka-The-Salty-Blonde--for-her-new-collaboration-with/960x0.jpg?height=640&width=640&fit=bounds" alt="" />
                    </div>
                    <div className="face">
                        <img src="https://yt3.googleusercontent.com/ytc/AIdro_mn-OrvRY_xYsDE-Vj9kV19tX8wxhPaXOoLz4bcJmOk6ltB=s900-c-k-c0x00ffffff-no-rj" alt="" />
                    </div>
                </div>
            </div>
            <div className="sample-page-2">
                <h2><strong>AI Power</strong> — Write with AI</h2>
                <div className="desc">
                    We’ve built <strong>AI right into IGxLinks</strong> — just <strong>describe the kind of page</strong> you want, and it’ll generate it for you. Instantly <strong>create</strong>, <strong>customize</strong>, and <strong>enhance</strong> your page with AI.
                </div>
                {/* <img className="ai-logo" src="https://assets-v2.lottiefiles.com/a/5acc3e3c-428f-11ef-b34c-df6c030cb9f4/6oefGLvorT.gif" alt="" /> */}
                <img className="ai-logo" src="https://miro.medium.com/v2/resize:fit:1400/0*NsAa6H_ZNoQS8bvm.gif" alt="" />
            </div>
            <div className="footer">
                <div className="branding">
                    <div className="logo">
                        <img src={logo} alt="" />
                        IG x Links
                        {/* <img src={sitename} alt="" /> */}
                    </div>
                    <div className="tagline">Share More Than Links. Share Yourself.</div>

                    <div className="content">
                        <div className="content-title">Trust & Legal</div>
                        <div className="links">
                            <a href="/terms-of-service">Terms of Service</a>
                            <a href="/privacy-policy">Privacy Policy</a>
                            <a href="/cookie-policy">Cookie Policy</a>
                            <a href="/content-guidelines">Content Guidelines</a>
                            <a href="/disclaimer">Disclaimer</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-footer">
                <b>© 2025 IGxLinks. All rights reserved.</b>
                Made with ❤️ in India for users worldwide.
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

    padding-top: 45px;

    .prenav{
        position: fixed;
        top: 0;
        left: 0;
        height: 45px;
        width: 100vw;
        background-color: #292030;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 0.85rem;
        font-weight: 300;
        color: white;

        svg{
            font-size: 1rem;
            margin-left: 5px;
        }
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
            color: white;
            text-decoration: none;
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
            color: white;
            text-decoration: none;
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

            .underline{
                text-decoration: underline;
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

        .faces{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 15px;

            padding: 0 30px;

            max-width: 400px;

            .face{
                height: 60px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                overflow: hidden;

                display: grid;
                place-items: center;

                border: 1px solid rgb(66, 53, 53);
                background-color: rgba(255, 255, 255, 0.83);
                box-shadow: rgba(0, 0, 0, 0.23) 1px 1px 10px 0px;

                img{
                    width: 100%;
                    height: 100%;
                }
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
            margin-bottom: 30px;
        }

        .ai-logo{
            width: 70%;
            margin-bottom: -10px;
        }
    }

    .footer{
        background-color: black;
        padding: 50px 30px;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        .branding{
            display: flex;
            flex-direction: column;
            align-items: center;

            .logo{
                display: flex;
                align-items: center;
                margin-bottom: 20px;

                img{
                    height: 30px;
                    margin-right: 10px;
                }

                font-size: 2rem;
            }

            .tagline{
                font-style: italic;
                font-weight: 200;
                font-size: 0.85rem;

            }
        }

        .content{
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .content-title{
                font-size: 1.25rem;
                margin-bottom: 5px;
            }

            .links{
                display: flex;
                flex-direction: column;
                text-align: center;
                /* margin-top: 10px; */

                a{
                    margin-top: 10px;
                    text-decoration: none;
                    font-size: 0.85rem;
                }
            }
        }
    }
    
    .post-footer{
        background-color: #121010;
        padding: 30px;
        width: 100%;

        /* color: #333; */
        font-size: 0.75rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 200;

        b{
            display: block;
            font-weight: 500;
        }
    }
`