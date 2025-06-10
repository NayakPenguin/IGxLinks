import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlFooter from '../../../Components/ControlFooter'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

const Notification = () => {
    const [selected, setSelected] = useState("All");

    const options = [
        { label: "All", value: 1 },
        { label: "Following", value: 0 },
    ];

    const notifications = [
        {
            title: "Welcome to IGxLinks!",
            type: "System",
            text: "Your account has been created successfully. You can complete your setup by visiting the 'Create Your Profile' page.",
            redirectLink: "/create-profile"
        },
        {
            title: "You're now following IGxLinks Official",
            type: "Follow",
            text: "You are now following the IGxLinks official page. Any updates or announcements will be notified here.",
            redirectLink: "/page/igxlinks-official"
        }
    ];


    return (
        <Container>
            <div className="page-name">Notifications</div>
            <div className="options">
                {options.map((opt) => (
                    <div
                        key={opt.label}
                        className={`opt ${selected === opt.label ? "selected" : ""}`}
                        onClick={() => setSelected(opt.label)}
                    >
                        <div className="text">{opt.label}</div>
                        <div className="value">{opt.value}</div>
                    </div>
                ))}
            </div>
            <div className="notifications">
                {notifications
                    .filter((note) => selected === "All" || note.type === "Follow")
                    .map((note, index) => (
                        <a key={index} href={note.redirectLink} className="notification">
                            <div className="icon">
                                {note.type === "System" ? <SettingsIcon /> : <AccountCircleIcon />}
                            </div>
                            <div className="text">
                                <div className="notification-title">{note.title}</div>
                                <div className="notification-text">{note.text}</div>
                            </div>
                        </a>
                    ))}
            </div>
            <ControlFooter />
        </Container>
    )
}

export default Notification;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    /* padding: 30px 45px; */

    display: flex;  
    flex-direction: column;

    .page-name{
        padding: 20px;
        width: 100%;
        font-size: 1.25rem;
        font-weight: 500;
    }

    .options{
        margin-top: 10px;
        width: 100%;
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 20px;
        border-bottom: 1px solid #363636;
        
        .opt{
            display: flex;
            align-items: center;
            padding: 0 10px 10px 10px;
            transition: border-bottom 0.3s ease;
            border-bottom: 2px solid transparent;

            .text{
                color: #c7c4c4;
                font-size: 0.85rem;
                font-weight: 300;
                transition: color 0.3s ease;
            }

            .value{
                margin-left: 10px;
                font-size: 0.75rem;
                width: 25px;
                aspect-ratio: 1/1;
                border-radius: 5px;
                background-color: #c7c4c4;
                color: #333;
                display: grid;
                place-items: center;
                transition: background-color 0.3s ease, color 0.3s ease;
            }
        }

        .selected{
            border-bottom: 2px solid #fff;

            .text{
                color: white;
            }

            .value{
                background-color: white;
                color: #333;
            }
        }
    }

    .notifications {
        display: flex;
        flex-direction: column;
        /* gap: 15px; */
        /* margin: 30px 0; */
        
        .notification {
            padding: 20px;
            /* border: 1px solid #444; */
            border-bottom: 1px solid #444;
            /* border-radius: 8px; */
            /* background-color: #1a1a1a; */
            color: white;
            text-decoration: none;

            display: flex;
            align-items: flex-start;

            .icon{
                margin-right: 20px;
            }

            .text{
                flex 1;
                .notification-title {
                    font-weight: 500;
                    font-size: 1rem;
                }
                
                .notification-text {
                    color: #bbb;
                    font-size: 0.85rem;
                    margin-top: 6px;
                }
            }
            
        }
    }




`