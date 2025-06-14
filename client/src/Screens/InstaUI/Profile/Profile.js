import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlFooter from '../../../Components/ControlFooter';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { parseRichText } from '../../Helpers/parseRichText';

const Profile = () => {
    const [basicItems, setBasicItems] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("userBasicInfo");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setBasicItems(parsed.formData);
                console.log(parsed.formData);
            } catch (e) {
                console.error("Failed to parse userBasicInfo", e);
            }
        }
    }, []);

    return (
        <Container>
            <div className="page-name">Your Profile</div>

            <div className="main-content">
                <div className="top-content">
                    <div className="logo-x-dp">
                        <img src={basicItems.profileImage ? basicItems.profileImage : "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"} alt="" />
                    </div>
                    <div className="name">Riya Bhowmik</div>
                    <div className="user-name">@RiyaPenguin</div>
                </div>
                <div className="content">
                    <div className="stat">
                        <div className="stat-value">1238</div>
                        <div className="stat-name">Subscribers</div>
                    </div>
                    <div className="mid-circle"></div>
                    <div className="stat">
                        <div className="stat-value">89</div>
                        <div className="stat-name">Subscribed</div>
                    </div>
                </div>
                <div className="content">
                    <div className="btn">Share</div>
                    <div className="btn">Edit Profile</div>
                </div>
                <div className="settings">
                    <div className="title">Settings</div>
                    <div className="setting-one">
                        <div className="text">Tutorial / Onboarding Guide</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Change Password</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Change Username</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Update Page</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Email Notification Preferences</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Contact Support</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Report a Bug</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Terms & Conditions</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Privacy Policy</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one">
                        <div className="text">Share your Stats</div>
                        <ChevronRightIcon/>
                    </div>
                    <div className="setting-one logout">
                        <div className="text">Logout</div>
                    </div>
                </div>
            </div>

            <ControlFooter />
        </Container>
    );
};

export default Profile;

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
    
    .main-content{
        padding: 30px 20px;
        border-top: 1px solid #343434;

        strong{
            font-weight: 500;
        }

        .top-content{
            display: flex;
            align-items: center;
            flex-direction: column;
            // justify-content: space-between;

            .logo-x-dp{
                height: 120px;
                aspect-ratio: 1/1;
                overflow: hidden;
                border-radius: 50%;
                /* border: 2px solid white; */
                border: 2px solid #313231;

                img{
                    width: 100%;
                }
            }
            
            .name{
                margin: 20px 0 10px 0;
                font-size: 1.5rem;
                font-weight: 500;
                color: white;
            }

            .user-name{
                font-size: 0.85rem;
                font-weight: 300;
                letter-spacing: 0.1rem;
                color: #d1d1d1;
            }
        }

        .content{
            display: flex;
            align-items: center;
            justify-content: center; 
            margin: 30px 0;

            gap: 15px;

            .mid-circle{
                height: 5px;
                aspect-ratio: 1/1;
                background-color: #343434;
                /* margin: 0 10px; */
                border-radius: 50%;
            }
            
            .stat{
                display: flex;
                /* flex-direction: column; */
                align-items: center;    
                font-size: 0.85rem;
                font-weight: 500;
    
                .stat-name{
                    /* font-weight: 200; */
                    margin-left: 5px;
                }
                
                .stat-value{
                    /* font-weight: 500; */
                    letter-spacing: 0.2rem;
                }
            }

            .btn{
                font-size: 0.75rem;
                padding: 10px 15px;
                border-radius: 10px;
                background-color: #343434;
                color: white;
                letter-spacing: 0.05rem;
            }
        }

        .settings{
            .title{
                font-size: 1rem;
                font-weight: 500;
                border-bottom: 1px solid #343434;
                padding: 20px 0;
            }
            
            .setting-one{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 0;
                border-bottom: 1px solid #343434;


                .text{
                    font-size: 0.85rem;
                    font-weight: 200;
                }
            }

            .logout{
                .text{
                    color: #f97b7b;
                }
            }
        }
    }
`
