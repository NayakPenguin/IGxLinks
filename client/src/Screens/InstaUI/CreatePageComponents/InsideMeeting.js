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

    const newLocalImageURL = userBasicInfo.profileImage;

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Start from tomorrow

    const [selectedDate, setSelectedDate] = useState(startDate);

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate])

    const weeks = [];
    const dayNames = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    let currentDate = new Date(startDate);

    for (let week = 0; week < 4; week++) {
        const weekArray = new Array(7).fill(null);

        for (let i = 0; i < 7; i++) {
            const dayOfWeek = currentDate.getDay(); // Sunday = 0
            const index = (dayOfWeek + 6) % 7; // Adjust so Monday = 0
            weekArray[index] = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        weeks.push(weekArray);
    }

    const monthName = startDate.toLocaleString('default', { month: 'long' });

    const isSameDay = (date1, date2) =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();


    return (
        <Container>
            <div className="main-content">
                <BackControl />
                <div className="heading">{parseRichText(data.titleInside ? data.titleInside : null)}</div>
                <div className="desc">{parseRichText(data.description ? data.description : null)}</div>
                <div className="time">
                    <QueryBuilderIcon />
                    <div className="text">{data.duration ? data.duration : null} Minutes</div>
                </div>
                <div className="owner-user">
                    <div className="user-dp"><img src={newLocalImageURL} alt="" /></div>
                    <div className="user-name">{userBasicInfo ? userBasicInfo.name : ""}</div>
                </div>

                <div className="line"></div>

                <div className="date-select">
                    <div className="month">
                        <div className="month-name">{monthName}</div>
                        <div className="weeks">
                            <div className="week">
                                {dayNames.map((day) => (
                                    <div key={day} className="day">{day}</div>
                                ))}
                            </div>
                            {weeks.map((week, idx) => (
                                <div key={idx} className="week">
                                    {week.map((date, i) => {
                                        const isSelected = date && isSameDay(date, selectedDate);
                                        return (
                                            <div
                                                key={i}
                                                className={`day ${isSelected ? 'circle' : ''}`}
                                                onClick={() => date && setSelectedDate(date)}
                                            >
                                                {date ? date.getDate() : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="line"></div>

                <div className="time-select">
                    <div className="day-for-meet">
                        Select time for meet for day{' '}
                        {selectedDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                        })}
                    </div>
                    <div className="all-slots">
                        <div class="slot">09:00 AM - 09:30 AM</div>
                        <div class="slot">09:45 AM - 10:15 AM</div>
                        <div class="slot">10:30 AM - 11:00 AM</div>
                        <div class="slot">11:15 AM - 11:45 AM</div>
                        <div class="slot">12:00 PM - 12:30 PM</div>
                        <div class="slot">12:45 PM - 01:15 PM</div>
                        <div class="slot">01:30 PM - 02:00 PM</div>
                        <div class="slot">02:15 PM - 02:45 PM</div>
                        <div class="slot">03:00 PM - 03:30 PM</div>
                        <div class="slot">03:45 PM - 04:15 PM</div>
                    </div>
                </div>

                <div className="line"></div>

                <button className="add-btn full">
                    Book Meeting
                </button>
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
                            cursor: pointer;
                        }

                        .circle{
                            background-color: orange;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }

        .time-select{
            .day-for-meet{
                font-size: 1rem;
                font-weight: 500;
            }

            .all-slots{
                display: flex;
                flex-wrap: wrap;
                margin-top: 20px;
                
                .slot{
                    padding: 10px;
                    background-color: rgb(22, 22, 22);
                    border: 1px solid #363636;
                    border-radius: 5px;
                    margin: 0 5px 5px 0;
                    font-size: 0.75rem;
                    color: white;
                    cursor: pointer;

                    &:hover{
                        background-color: #363636;
                    }
                }
            }
        }

        .add-btn{
            border: none;
            background-color: #0095f6;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 500;

            cursor: pointer;
        }

        .full{
            margin-top: 20px;
            width: 100%;
        }
    }
`