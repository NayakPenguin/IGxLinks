import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowEngagementResults = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    const api = axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    const { userContentId } = useParams();

    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await api.get(`/response/by-content/${userContentId}`);
                setResponses(res.data);
            } catch (err) {
                setError("Failed to fetch responses");
            } finally {
                setLoading(false);
            }
        };

        if (userContentId) {
            fetchResponses();
        }
    }, [userContentId]);

    if (loading) return <div>Loading responses...</div>;
    if (error) return <div>{error}</div>;
    if (!responses.length) return <div>No responses found.</div>;

    return (
        <div>
            <h2>Responses for: {userContentId}</h2>
            <ul>
                {responses.map((resp) => {
                    const createdAt = resp?.data?.createdAt
                        ? new Date(resp.data.createdAt).toLocaleString()
                        : "Unknown";

                    return (
                        <li key={resp._id}>
                            <strong>Type:</strong> {resp.type} <br />
                            <strong>Created:</strong> {createdAt}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ShowEngagementResults;