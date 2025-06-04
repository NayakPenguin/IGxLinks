import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ControlFooter from "../../Components/ControlFooter";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import BackControl from "../../Components/BackControl";

const Form = () => {
    const [replies, setReplies] = useState([]);
    const [input, setInput] = useState("");

    const handleReply = () => {
        if (input.trim() !== "") {
            setReplies([input, ...replies]);
            setInput("");
        }
    };

    return (
        <Container>
            <div className="main-content">
                <BackControl />
                <div className="title">Collab with me 🥹</div>
                <div className="desc">Looking to team up? Fill out this quick form to collaborate on content, promotions, or projects. I review each request personally and will reach out to your email if we vibe 💌</div>
                
                <div className="input-container">
                    <div className="label">Your Name</div>
                    <input className="input-basic" placeholder="Enter your full name" />
                </div>

                <div className="input-container">
                    <div className="label">Email Address</div>
                    <input className="input-basic" type="email" placeholder="example@gmail.com" />
                </div>

                <div className="input-container">
                    <div className="label">Instagram Handle</div>
                    <input className="input-basic" placeholder="@yourhandle" />
                </div>

                <div className="input-container">
                    <div className="label">Brand or Company Name</div>
                    <input className="input-basic" placeholder="Enter your brand name/Influencer name" />
                </div>

                <div className="input-container">
                    <div className="label">Website (optional)</div>
                    <input className="input-basic" placeholder="Give your website link" />
                </div>

                <div className="input-container">
                    <div className="label">Your Approx. Budget for This Campaign</div>
                    <input className="input-basic" type="text" placeholder="Mention your budget range" />
                </div>

                <div className="input-container">
                    <div className="label">Collab Details</div>
                    <textarea className="input-basic" placeholder="Tell me more about your idea or campaign..." rows={4} />
                </div>

                <div className="main-btns">
                    <div className="btn-1 trans">Send</div>
                </div>
            </div>
            <ControlFooter />
        </Container>
    )
}

export default Form

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
            position: fixed;
            top: 0px;
            left: 0px;

            border-bottom: 1px solid #313231;

            height: 60px;
            width: 100vw;

            display: flex;
            align-items: center;
    
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
        }
        
        .title{
            font-size: 1.25rem;
            margin-top: 20px;
            font-weight: 500;
        }

        .desc{
            margin-top: 10px;
            font-weight: 200;
            font-size: 0.85rem;
        }

        .input-container{
            width: 100%;
            margin-top: 30px;
            border-bottom: 1px solid #313231ba;
            padding-bottom: 20px;
            /* background-color: orang e; */

            .label{
                font-size: 0.75rem;
                font-weight: 500;
            }

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

            textarea{
                height: 200px;
            }
        }

        .main-btns{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 30px;

            .btn-1{
                width: 100%;
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #0095f6;
                border-radius: 10px;
                text-align: center;
            }

            .secondary{
                background-color: #363636;
            }

            .trans{
                /* background-color: transparent; */
                border: 1px solid rgb(119, 118, 118);
            }
        }
    }

`