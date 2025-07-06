import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlFooter from '../../../Components/ControlFooter';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { parseRichText } from '../../Helpers/parseRichText';

const Engagement = () => {
    const [contentItems, setContentItems] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("userContentInfo");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setContentItems(parsed);
            } catch (e) {
                console.error("Failed to parse userContentInfo", e);
            }
        }
    }, []);

    return (
        <Container>
            <div className="page-name">Engagements</div>

            <div className="main-content">
                {contentItems.map((item) => {
                    let containerClass = "item-card";

                    switch (item.type?.toLowerCase()) {
                        case "subgroup":
                            containerClass = "subgroup-container";
                            break;
                        case "redirect link":
                            containerClass = "redirect-container";
                            break;
                        case "anonymous replies":
                            containerClass = "anonymous-container";
                            break;
                        case "folder for redirect links":
                            containerClass = "folder-container";
                            break;
                        case "custom form":
                            containerClass = "form-container";
                            break;
                        case "write your content":
                            containerClass = "write-content-container";
                            break;
                        default:
                            containerClass = "item-card";
                            break;
                    }

                    if (
                        // containerClass === "subgroup-container" ||
                        containerClass === "anonymous-container" ||
                        containerClass === "form-container"
                    ) {
                        return (
                            <div className={containerClass === "subgroup-container" ? "container-basic bold-border" : "container-basic"} key={item.id}>
                                <div className="title">{parseRichText(item.title)}</div>

                                {containerClass === "redirect-container" && (
                                    <div className="stats">
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Total Clicks : </div>
                                            <div className="stat-value">1,782</div>
                                        </div> */}
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Last 30 Days : </div>
                                            <div className="stat-value">258</div>
                                        </div> */}
                                    </div>
                                )}

                                {containerClass === "anonymous-container" && (
                                    <div className="stats">
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Total Responses : </div>
                                            <div className="stat-value">91</div>
                                        </div> */}
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Last 30 Days : </div>
                                            <div className="stat-value">23</div>
                                        </div> */}
                                        <a href={`/engagement/${item.id}`} className="view-responses">
                                            <div className="text">View All Responses</div>
                                            <ChevronRightIcon />
                                        </a>
                                    </div>
                                )}

                                {containerClass === "folder-container" && (
                                    <div className="stats">
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Total Responses : </div>
                                            <div className="stat-value">91</div>
                                        </div> */}
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Last 30 Days : </div>
                                            <div className="stat-value">23</div>
                                        </div> */}
                                    </div>
                                )}

                                {containerClass === "form-container" && (
                                    <div className="stats">
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Total Responses : </div>
                                            <div className="stat-value">91</div>
                                        </div> */}
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Last 30 Days : </div>
                                            <div className="stat-value">23</div>
                                        </div> */}
                                        <a href={`/engagement/${item.id}`} className="view-responses">
                                            <div className="text">View All Responses</div>
                                            <ChevronRightIcon />
                                        </a>
                                    </div>
                                )}

                                {containerClass === "write-content-container" && (
                                    <div className="stats">
                                        <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Total Views : </div>
                                            <div className="stat-value">3921</div>
                                        </div>
                                        {/* <div className="stat-1">
                                            <div className="icon"></div>
                                            <div className="stat">Last 30 Days : </div>
                                            <div className="stat-value">839</div>
                                        </div> */}
                                    </div>
                                )}
                            </div>
                        );
                    }
                })}
            </div>

            <ControlFooter />
        </Container>
    );
};

export default Engagement;

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
        padding: 20px;
        border-top: 1px solid #343434;
        padding-top: 0;

        strong{
            font-weight: 500;
        }

        .container-basic{
            padding: 20px;
            border: 1px solid #343434;
            /* background-color: #333; */
            background-color: #121212;
            margin-bottom: 20px;
            font-size: 0.9rem;
            font-weight: 300;
            border-radius: 10px;
            font-weight: 500;
        }

        .bold-border{
            margin-top: 20px;
            margin-bottom: 20px;
            background-color: #121212;
            padding: 10px;
            border: none;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 10px;

            border: 1px solid #343434;
            text-align: center;
        }

        .stat-1{
            display: flex;
            align-items: center;
            margin-top: 15px;

            .icon{
                height: 8px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background-color: orange;
            }
            
            .stat{
                font-size: 0.85rem;
                font-weight: 300;
                margin: 0 15px 0 10px;
            }
            
            .stat-value{
                font-size: 0.85rem;
                font-weight: 500;
                letter-spacing: 0.15rem;
            }
        }

        .view-responses{
            width: 100%;
            border-radius: 10px;
            margin-top: 25px;
            background-color: #1f1f1f;
            /* border: 1px solid #fff; */
            padding: 15px;
            color: white;
            text-decoration: none;
            /* text-align: center; */
            font-size: 0.75rem;
            font-weight: 300;

            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
`
