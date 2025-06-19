import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PublicInsideAnonymous from './PublicInsideAnonymous';
import PublicInsideFolder from './PublicInsideFolder';
import PublicInsideForm from './PublicInsideForm';
import PublicInsideMeeting from './PublicInsideMeeting';
import PublicInsideWrite from './PublicInsideWrite';

const ViewProfileInsideControl = () => {
  const { username, id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🌐 Fetching advanced info for:", username);
        const res = await axios.get(`${API_URL}/advanced-info/${username}`);
        const raw = res.data?.localStorageData;

        if (!raw) {
          console.warn("⚠️ No localStorageData found in response");
          setLoading(false);
          return;
        }

        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        const arrayData = Object.values(parsed); // convert from object with numeric keys
        setItems(arrayData);
        console.log(arrayData);
      } catch (error) {
        console.error("❌ Error fetching advanced info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username && id) fetchData();
  }, [username, id]);

  if (loading) return <div>Loading...</div>;

  const selectedItem = items.find(item => item.id === id);

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  switch (selectedItem.type) {
    case "Anonymous Replies":
      return <PublicInsideAnonymous data={selectedItem} username={username} />;
    case "Folder for Redirect Links":
      return <PublicInsideFolder data={selectedItem} username={username} />;
    case "Custom Form":
      return <PublicInsideForm data={selectedItem} username={username} />;
    case "Meeting Scheduler":
      return <PublicInsideMeeting data={selectedItem} username={username} />;
    case "Write your content":
      return <PublicInsideWrite data={selectedItem} username={username} />;
    default:
      return <div>Unsupported type: {selectedItem.type}</div>;
  }
}

export default ViewProfileInsideControl;