import React, { useEffect, useState } from "react";
import axios from "axios";

// axios instance
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const MyResponsesPage = () => {
    const userName = "igxl.ink";
    
    const [groupedResponses, setGroupedResponses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await api.get(`/response/${userName}`);
                // console.log("✅ Grouped responses:", res.data);
                setGroupedResponses(res.data);
            } catch (err) {
                console.error("❌ Error fetching responses", err.response?.data || err);
                alert(err.response?.data?.message || "Failed to fetch responses");
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [userName]);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>My Responses</h2>

            {Object.entries(groupedResponses).map(([type, responses]) => (
                <div key={type} style={{ marginBottom: "2rem" }}>
                    <h3>{type.toUpperCase()} ({responses.length})</h3>
                    {responses.map((r) => (
                        <div
                            key={r._id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "1rem",
                                marginBottom: "1rem"
                            }}
                        >
                            <pre style={{ whiteSpace: "pre-wrap" }}>
                                {JSON.stringify(r.data, null, 2)}
                            </pre>
                            <div style={{ fontSize: "0.8rem", color: "#666" }}>
                                Submitted on {new Date(r.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyResponsesPage;