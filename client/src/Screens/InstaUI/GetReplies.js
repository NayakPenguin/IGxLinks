import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ControlFooter from "../../Components/ControlFooter";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import BackControl from "../../Components/BackControl";

const GetReplies = () => {
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
                <BackControl/>
                <div className="question">What are your honest thoughts on my Instagram profile?</div>
                <div className="desc">I'm trying to improve my personal brand. Feel free to give feedback on the vibe, content, or overall look. Be honest!</div>
                <textarea
                    className="ans-input"
                    placeholder="Write your anonymous reply here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="main-btns">
                    <div className="btn-1 trans">Send</div>
                </div>

                <div className="extra-btns">
                    <SmsOutlinedIcon className="fadeicon"/>
                    <div className="svg-frd">
                        <svg aria-label="Share" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                    </div>
                </div>

                <div className="comment-info">
                    *The page owner has chosen to keep comments private.
                </div>
            </div>
            <ControlFooter />
        </Container>
    )
}

export default GetReplies

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
        
        .question{
            font-size: 1.25rem;
            margin-top: 20px;
            font-weight: 500;
        }

        .desc{
            margin-top: 10px;
            font-weight: 200;
            font-size: 0.85rem;
        }

        .ans-input{
            width: 100%;
            border-radius: 10px;
            height: 200px;
            margin: 20px 0 -5px 0;
            outline: none;
            /* background-color: transparent; */
            background-color:rgb(22, 22, 22);
            border: 1px solid #363636;
            border-bottom: none;
            padding: 20px;
            color: white;
            resize: none;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .main-btns{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .btn-1{
                width: 100%;
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #0095f6;
                border-radius: 10px;
                text-align: center;
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }

            .secondary{
                background-color: #363636;
            }

            .trans{
                background-color: transparent;
                border: 1px solid rgb(119, 118, 118);
            }
        }

        .extra-btns{
            padding: 20px 0;
            display: flex;
            align-items: center;

            svg{
                margin-right: 15px;
                /* fill: grey; */
                font-size: 1.75rem;
            }

            .fadeicon{
                fill: grey;
            }

            .svg-frd{
                margin-bottom: -5px;
            }
        }

        .comment-info{
            font-size: 0.75rem;
            font-weight: 200;
            font-style: italic;
        }
    }

`