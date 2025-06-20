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
    console.log("🟡 Starting fetchData useEffect...");

    try {
      const lastClick = localStorage.getItem("lastClick");
      const profileDataRaw = localStorage.getItem("profileDataSave");
      const now = Date.now();

      console.log("🕒 Current time:", now);
      console.log("🧠 lastClick from localStorage:", lastClick);
      console.log("💾 profileDataSave from localStorage:", profileDataRaw ? "FOUND" : "NOT FOUND");

      console.log("Time Less than 5 sec : ", now - parseInt(lastClick, 10) <= 5000);

      if (
        lastClick &&
        profileDataRaw &&
        now - parseInt(lastClick, 10) <= 5000 // 10 seconds
      ) {
        console.log("✅ Using cached profileDataSave from localStorage");

        const parsedProfileData = JSON.parse(profileDataRaw);
        const raw = parsedProfileData?.advancedInfo?.localStorageData;

        console.log("raw : ", raw);

        if (!raw) {
          console.warn("⚠️ profileDataSave.advancedInfo.localStorageData is missing");
          setLoading(false);
          return;
        }

        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        const arrayData = Object.values(parsed);
        setItems(arrayData);

        console.log("📦 Set items from localStorage:", arrayData);
      } else {
        console.log("🌐 Fetching from API as localStorage is invalid or expired:", `${API_URL}/all-info/${username}`);
        const res = await axios.get(`${API_URL}/all-info/${username}`);
        const raw = res.data?.advancedInfo?.localStorageData;
        localStorage.setItem("profileDataSave", JSON.stringify(res.data));
        console.log("profileDataSave updated");

        if (!raw) {
          console.warn("⚠️ No localStorageData found in API response");
          setLoading(false);
          return;
        }

        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        const arrayData = Object.values(parsed);
        setItems(arrayData);

        console.log("📦 Set items from API:", arrayData);
      }
    } catch (error) {
      console.error("❌ Error during data fetch:", error);
    } finally {
      setLoading(false);
      console.log("✅ fetchData completed");
    }
  };

  if (username && id) {
    console.log("👤 username and id found:", username, id);
    fetchData();
  } else {
    console.log("❌ username or id missing, skipping fetchData");
  }
}, [username, id]);

  // if (loading) return <div>Loading...</div>;

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