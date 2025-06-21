import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import { parseRichText } from '../../Helpers/parseRichText';
import PublicBackControl from "./PublicBackControl";

const PublicInsideWrite = ({ data, username }) => {
    const [replies, setReplies] = useState([]);
    const [input, setInput] = useState("");

    // console.log(data);

    return (
        <Container>
            <div className="main-content">
                <PublicBackControl username={username}></PublicBackControl>
                <div className="heading">{parseRichText(data.titleInside ? data.titleInside : null)}</div>
                <div className="desc">{parseRichText(data.description ? data.description : null)}</div>

                <div className="main-writing">
                    {data.writeItems.map((item, key) => {
                        switch (item.type) {
                            case "Subheading":
                                return <h3 key={key}>{parseRichText(item.content)}</h3>;

                            case "Paragraph":
                                return <p key={key}>{parseRichText(item.content)}</p>;

                            case "Bullet Point":
                                return (
                                    <ul key={key}>
                                        <li>{parseRichText(item.content)}</li>
                                    </ul>
                                );

                            case "Numeric Point":
                                return (
                                    <div key={key} className="numeric-point">
                                        <div className="num">{parseRichText(item.pointNumber)}.</div>
                                        <p>{parseRichText(item.content)}</p>
                                    </div>
                                );

                            case "Link":
                                return (
                                    <div className="link">
                                        <a key={key} href={item.url} target="_blank" rel="noopener noreferrer">
                                            {parseRichText(item.title)}
                                        </a>
                                    </div>
                                );

                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </Container>
    )
}

export default PublicInsideWrite

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

        .main-writing{
            margin-top: 30px;
            border-top: 1px solid #363636;
            padding-top: 5px;

            h3{
                margin-top: 25px;
                font-size: 1rem;
                font-weight: 500;
            }

            p{
                margin-top: 25px;
                font-size: 0.85rem;
                font-weight: 200;
            }

            ul{
                margin-left: 25px;
                margin-top: 25px;
                font-size: 0.85rem;
                font-weight: 200;
            }

            .numeric-point{
                margin-top: 25px;
                display: flex;
                align-items: flex-start;
                margin-left: 15px;

                .num{
                    font-size: 1rem;
                    font-weight: 700;
                    margin-right: 10px;
                    font-family: 'Roboto Mono', 'Courier New', monospace;
                }

                p{
                    margin-top: 0px;
                    font-size: 0.85rem;
                    font-weight: 200;
                }
            }

            .link{
                margin-top: 25px;

                a{
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 500;
                }
            }
        }
        
    }
`