import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import ControlFooter from "./Components/BackControl";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import BackControl from "../../../Components/BackControl";
import { parseRichText } from '../../Helpers/parseRichText';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const InsideMeeting = ({ data }) => {
    const [replies, setReplies] = useState([]);
    const [input, setInput] = useState("");

    const userBasicInfo = JSON.parse(localStorage.getItem("userBasicInfo"));
    // console.log(userBasicInfo);

    const newLocalImageURL = localStorage.getItem("newLocalImageURL");
    // console.log(newLocalImageURL);

    // const newLocalImageURL = JSON.parse(localStorage.getItem("newLocalImageURL"));

    // console.log(data);

    return (
        <Container>
            <div className="main-content">
                <BackControl />
                <div className="heading">{parseRichText(data.titleInside ? data.titleInside : null)}</div>
                <div className="desc">{parseRichText(data.description ? data.description : null)}</div>
                <div className="time">
                    <QueryBuilderIcon/>
                    <div className="text">{data.duration ? data.duration : null} Minutes</div>
                </div>
                <div className="owner-user">
                    <div className="user-dp"><img src={newLocalImageURL} alt="" /></div>
                    <div className="user-name">{userBasicInfo.formData.name}</div>
                </div>
                <div className="line"></div>

                <div className="date-select">
                    <div className="month">
                        <div className="month-name">June</div>
                        <div className="weeks">
                            <div className="week">
                                <div className="day">Mon</div>
                                <div className="day">Tues</div>
                                <div className="day">Wed</div>
                                <div className="day">Thus</div>
                                <div className="day">Fri</div>
                                <div className="day">Sat</div>
                                <div className="day">Sun</div>
                            </div>
                            <div className="week">
                                <div className="day"></div>
                                <div className="day"></div>
                                <div className="day circle">22</div>
                                <div className="day">23</div>
                                <div className="day">24</div>
                                <div className="day">25</div>
                                <div className="day">26</div>
                            </div>
                            <div className="week">
                                <div className="day">28</div>
                                <div className="day">29</div>
                                <div className="day">30</div>
                                <div className="day"></div>
                                <div className="day"></div>
                                <div className="day"></div>
                                <div className="day"></div>
                            </div>
                            <div className="week">
                                <div className="day"></div>
                                <div className="day"></div>
                                <div className="day"></div>
                                <div className="day">1</div>
                                <div className="day">2</div>
                                <div className="day">3</div>
                                <div className="day">4</div>
                            </div>
                            <div className="week">
                                <div className="day">5</div>
                                <div className="day">6</div>
                                <div className="day">7</div>
                                <div className="day">8</div>
                                <div className="day">9</div>
                                <div className="day">10</div>
                                <div className="day">11</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ControlFooter />
        </Container>
    )
}

export default InsideMeeting

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

        .time{
            display: flex;
            align-items: center;
            margin-top: 20px;

            svg{
                font-size: 1.15rem;
            }

            .text{
                font-size: 0.85rem;
                margin-left: 10px;
            }
        }

        .owner-user{
            display: flex;
            align-items: center;

            margin-top: 20px;

            .user-dp{
                height: 30px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                display: grid;
                place-items: center;

                overflow: hidden;

                img{
                    height: 100%;
                    width: 100%;
                }
            }

            .user-name{
                font-size: 0.85rem;
                margin-left: 10px;
            }
        }

        .line{
            margin: 40px 0 20px 0;
            border-bottom: 1px solid #313231;
        }

        .date-select{
            .month{
                .month-name{
                    font-size: 1rem;
                    font-weight: 500;
                }

                .weeks{
                    display: flex;
                    flex-direction: column;
                    
                    .week{
                        width: 100%;

                        display: flex;
                        align-items: center;
                        gap: 5px;
                        margin-bottom: 5px;

                        .day{
                            flex: 1;
                            aspect-ratio: 1/1;

                            /* background-color: white; // for visibility */
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            font-size: 0.75rem;
                        }

                        .circle{
                            background-color: orange;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }

    }
`