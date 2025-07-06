import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlFooter from '../../../Components/ControlFooter';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { parseRichText } from '../../Helpers/parseRichText';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as XLSX from "xlsx";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const Engagement = () => {
    const [contentItems, setContentItems] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("selectedContent : ", selectedContent);
    }, [selectedContent])

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

    const handleViewResponses = async (item) => {
        setSelectedContent(item);
        setLoading(true);
        setError("");
        try {
            const res = await api.get(`/response/by-content/${item.id}`);
            setResponses(res.data);
            console.log("res.data : ", res.data);
        } catch (err) {
            setError("Failed to fetch responses");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadExcel = () => {
        if (responses.length === 0) return;

        // Extract headers from first response
        const answerHeaders = responses[0].data.answers.map((ans) => ans.question);

        // Build header row
        const headers = ["S.No.", "Created At", ...answerHeaders];

        // Build row data
        const rows = responses.map((resp, index) => {
            const createdAt = resp?.createdAt
                ? new Date(resp.createdAt).toLocaleString()
                : "Unknown";

            const answers = resp.data.answers.map((ans) => ans.answer);

            return [index + 1, createdAt, ...answers];
        });

        const worksheetData = [headers, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

        XLSX.writeFile(workbook, "engagement-responses.xlsx");
    };

    // Only show responses if one is selected
    if (selectedContent) {
        return (
            <ResponseContainer>
                <div className="page-name">Engagements</div>

                {
                    selectedContent.type == "Custom Form" ?
                        <div className="main-content">
                            <div className="go-back" onClick={() => { setSelectedContent(null) }}>
                                <ArrowBackIosIcon />
                                View All
                            </div>
                            <div className="title">{parseRichText(selectedContent.title)}</div>
                            <div className="desc">{parseRichText(selectedContent.description)}</div>

                            <button
                                onClick={handleDownloadExcel}
                                className="download-btn"
                            >
                                Download Excel
                            </button>

                            <div className="response-section">
                                {loading && <i>Loading responses...</i>}
                                {error && <i>{error}</i>}
                                {!loading && !error && responses.length === 0 && (
                                    <i>No responses found.</i>
                                )}
                                {!loading && !error && responses.length > 0 && (
                                    <div style={scrollContainerStyle}>
                                        <table style={{ width: "100%", minWidth: "800px", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    <th style={snStyle}>S.No.</th>
                                                    <th style={headerCellStyle}>Created At</th>
                                                    {responses[0]?.data?.answers?.map((ans, i) => (
                                                        <th key={i} style={headerCellStyle}>{ans.question}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {responses.map((resp, index) => {
                                                    const createdAt = resp?.createdAt
                                                        ? new Date(resp.createdAt).toLocaleString()
                                                        : "Unknown";
                                                    const answers = resp?.data?.answers || [];

                                                    return (
                                                        <tr key={resp._id}>
                                                            <td style={snStyle}>{index + 1}</td>
                                                            <td style={cellStyle}>{createdAt}</td>
                                                            {answers.map((ans, i) => (
                                                                <td key={i} style={cellStyle}>{ans.answer}</td>
                                                            ))}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div> :
                        <div className="main-content">
                            <div className="go-back" onClick={() => setSelectedContent(null)}>
                                <ArrowBackIosIcon />
                                View All
                            </div>
                            <div className="title">{parseRichText(selectedContent.title)}</div>
                            {/* <div className="desc"></div> */}


                            <div className="response-section">
                                {!loading && !error && responses.length > 0 && (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        {responses.map((resp, index) => {
                                            const createdAt = resp?.createdAt
                                                ? new Date(resp.createdAt).toLocaleString()
                                                : "Unknown";

                                            const isAnswersArray = Array.isArray(resp?.data?.answers);
                                            const answers = isAnswersArray
                                                ? resp.data.answers
                                                : Object.entries(resp.data || {}).map(([key, value]) => ({
                                                    question: key,
                                                    answer: value,
                                                }));

                                            return (
                                                <div className="one-response" key={resp._id}>
                                                    <div className="response-value">
                                                        {answers.map((ans, i) => (
                                                            <div key={i}>
                                                                {ans.answer}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="response-date">{createdAt}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                            </div>
                        </div>
                }

                <ControlFooter />
            </ResponseContainer>
        );
    }

    // Default view with all engagement items
    return (
        <Container>
            <div className="page-name">Engagements</div>

            <div className="main-content">
                {contentItems.filter((item) => {
                    const type = item.type?.toLowerCase();
                    return type === "anonymous replies" || type === "custom form";
                }).length === 0 ? (
                    <div style={{ padding: "1rem 0", fontSize: "0.95rem", color: "#ccc", fontWeight: "200" }}>
                        Please add a Custom Form or Anonymous Form to see responses here
                    </div>
                ) : (
                    contentItems.map((item) => {
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
                            containerClass === "anonymous-container" ||
                            containerClass === "form-container"
                        ) {
                            return (
                                <div className="container-basic" key={item.id}>
                                    <div className="title">{parseRichText(item.title)}</div>

                                    <div
                                        className="stats view-responses"
                                        onClick={() => handleViewResponses(item)}
                                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                                    >
                                        <div className="text">View All Responses</div>
                                        <ChevronRightIcon />
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    })
                )}
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
            margin-top: 20px;
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


const ResponseContainer = styled.div`
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

        strong{
            font-weight: 500;
        }

        .go-back{
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            svg{
                font-size: 1rem;
                margin-top: -2px;
            }
        }

        .title{
            font-size: 1.25rem;
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

        .download-btn{
            margin-top: 20px;
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
        }

        .response-section{
            margin-top: 20px;

            i{
                font-size: 0.85rem;
                font-weight: 200;
            }

            .one-response{
                border: 1px solid #343434;
                padding: 1rem;
                border-radius: 10px;
                background-color: #121212;

                .response-value{
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .response-date{
                    font-size: 0.75rem;
                    font-weight: 200;
                    font-style: italic;
                    margin-top: 10px;
                    letter-spacing: 0.05rem;
                    color: #bcbcbc;
                }
            }
        }
    }
`

const snStyle = {
    border: "1px solid #343434",
    padding: "8px",
    fontWeight: "500",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
    width: "60px",
    maxWidth: "60px",
    textAlign: "center",
    verticalAlign: "top",
    background: "#1a1a1a",
    color: "#fff"
};

const headerCellStyle = {
    border: "1px solid #343434",
    padding: "8px",
    background: "#121212",
    minWidth: "120px",
    width: "120px",
    fontWeight: "500",
    fontSize: "0.85rem",
    textAlign: "left",
    verticalAlign: "top",
    background: "#1a1a1a",
    color: "#fff"
};

const cellStyle = {
    border: "1px solid #343434",
    padding: "8px",
    minWidth: "120px",
    width: "120px",
    whiteSpace: "normal",
    fontWeight: "200",
    fontSize: "0.85rem",
    verticalAlign: "top",
    color: "#ddd",
};

const scrollContainerStyle = {
    overflowX: "auto",
    maxWidth: "100%",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#888 #f1f1f1", // Firefox
};
