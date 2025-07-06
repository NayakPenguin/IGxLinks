import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AllResponses = () => {
  const userContentId = "1751374352820";
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Going to fetch");
    const fetchResponses = async () => {
      try {
        const route = `/response/by-content/${userContentId}`;
        console.log(route);
        const res = await api.get(route);
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

export default AllResponses;
