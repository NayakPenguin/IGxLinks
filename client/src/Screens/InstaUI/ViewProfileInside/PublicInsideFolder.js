import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import { parseRichText } from '../../Helpers/parseRichText';
import PublicBackControl from "./PublicBackControl";

const FolderInsideFolder = ({ data, username }) => {
    const [replies, setReplies] = useState([]);
    const [input, setInput] = useState("");

    console.log(data);

    return (
        <Container>
            <div className="main-content">
                <PublicBackControl username={username}></PublicBackControl>
                <div className="heading">{parseRichText(data.titleInside ? data.titleInside : null)}</div>
                <div className="desc">{parseRichText(data.description ? data.description : null)}</div>

                <div className="all-links">
                    {data.linkItems && data.linkItems.map((item) => {
                        const { id, title, url } = item;
                        return (
                            <a
                                key={id}
                                href={url.startsWith("http") ? url : `https://${url}`}
                                className="link1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div>{parseRichText(title)}</div>
                                <div className="link-circle">
                                    <CallMadeIcon />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </Container>
    )
}

export default FolderInsideFolder

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
        width: 100%;
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
        
        .heading{
            font-size: 1.25rem;
            margin-top: 20px;
            font-weight: 500;
            width: 100%;

            strong{
                font-weight: 500;
            }
        }

        .desc{
            margin-top: 10px;
            font-weight: 200;
            font-size: 0.85rem;

            strong{
                font-weight: 500;
            }
        }

        .all-links{
            margin-top: 30px;
            border-top: 1px solid #363636;
            padding-top: 30px;

            .link1{
                text-decoration: none;
                background-color: #363636;
                font-size: 0.75rem;
                font-weight: 500;
                text-align: center;
                padding: 15px 60px;
                border-radius: 100px;
                color: #e5e5e5;
                margin-bottom: 15px;
    
                display: flex; 
                align-items: center;
                justify-content: center;
    
                height: 60px;
    
                position: relative;
    
                b{
                    display: inline;
                    margin-right: 5px;
                }
    
                strong{
                    font-weight: 700;
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
    
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
    
            }
        }
        
    }
`