import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { parseRichText } from '../../Helpers/parseRichText';
import axios from 'axios';
import { AllSocialMediaPlatforms } from '../../../constants/socialMediaPlatforms';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CallMadeIcon from '@material-ui/icons/CallMade';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;


const BasicInfo = ({ diffCreated, setDiffCreated }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [dBdata, setDBdata] = useState(null);

    const [basicData, setBasicData] = useState({
        name: "",
        role: "",
        org: "",
        bio: "",
        location: "",
        profileImage: "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png",
        socialLinks: [],
        announcement: {
            title: "Announcement Title",
            description: "This is your announcement description",
            isVisible: true
        }
    });

    const [modelOpen, setModelOpen] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        height: 50,
        aspect: 1,
        x: 25,
        y: 25
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlatforms, setFilteredPlatforms] = useState(AllSocialMediaPlatforms);
    const [isAnnouncementEditing, setIsAnnouncementEditing] = useState(false);


    const [announcementData, setAnnouncementData] = useState({
        title: "Announcement Title",
        description: "This is your announcement description",
        isVisible: true
    });

    useEffect(() => {
        const fetchData = async () => {
            // console.log("🔄 Starting BasicInfo fetch...");

            // Ensure API_URL is correctly loaded
            // console.log("🌍 API_URL:", API_URL);

            try {
                const saved = localStorage.getItem("userBasicInfo");

                if (saved && saved !== "undefined" && saved !== "null") {
                    // console.log("🔧 Found saved data in localStorage, attempting to parse...");

                    try {
                        const parsedSaved = JSON.parse(saved);

                        if (parsedSaved && typeof parsedSaved === "object") {
                            // console.log("✅ Successfully parsed localStorage data");
                            setBasicData(parsedSaved);
                            setDBdata(parsedSaved);

                            if (parsedSaved.announcement) {
                                setAnnouncementData({
                                    title: parsedSaved.announcement.title || "Announcement Title",
                                    description: parsedSaved.announcement.description || "This is your announcement description",
                                    isVisible: parsedSaved.announcement.isVisible !== false
                                });
                            }

                            return; // ✅ Done using localStorage data
                        } else {
                            console.warn("⚠️ Parsed localStorage data is not a valid object");
                        }
                    } catch (e) {
                        console.error("❌ Failed to parse localStorage data:", e);
                    }
                } else {
                    // console.log("📭 No valid localStorage data found. Proceeding to fetch from API...");
                }

                // Step 2: API Fallback
                try {
                    // console.log("🌐 Fetching basicData from API...");
                    const res = await axios.get(`${API_URL}/basic-info/`, {
                        withCredentials: true,
                        timeout: 10000 // Optional: prevents indefinite hangs
                    });

                    // console.log("📦 API Response:", res.data);

                    setBasicData(res.data);
                    setDBdata(res.data);

                    if (res.data.announcement) {
                        setAnnouncementData({
                            title: res.data.announcement.title || "Announcement Title",
                            description: res.data.announcement.description || "This is your announcement description",
                            isVisible: res.data.announcement.isVisible !== false
                        });
                    }

                    localStorage.setItem("userBasicInfo", JSON.stringify(res.data));
                    // console.log("✅ Successfully saved basicData to localStorage from API");

                } catch (apiError) {
                    console.error("❌ Error fetching from API:", apiError.message, apiError);
                }

            } catch (outerError) {
                console.error("💥 Unexpected fetch failure:", outerError);
            }

            // console.log("✅ BasicInfo fetch process completed.");
        };

        fetchData();
    }, []);


    useEffect(() => {
        const filtered = AllSocialMediaPlatforms.filter(platform =>
            platform.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPlatforms(filtered);
    }, [searchTerm]);

    const handleChange = async (field, value) => {
        const updatedData = { ...basicData, [field]: value };
        setBasicData(updatedData);
        handleSaveLocally();
        // await axios.post(`${API_URL}/basic-info/`, updatedData, {
        //     withCredentials: true
        // });
        // setDiffCreated(true);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (!file.type.match('image.(jpeg|jpg|png)')) return;
            if (file.size > 5 * 1024 * 1024) return;

            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                setCropModalOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    const handleSaveCroppedImage = () => {
        if (!completedCrop || !imageRef.current) return;

        const image = imageRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const updatedData = { ...basicData, profileImage: reader.result };
                setBasicData(updatedData);
                // axios.post(`${API_URL}/basic-info/`, updatedData, {
                //     withCredentials: true
                // });
                setCropModalOpen(false);
                // setDiffCreated(true);
            };
        }, 'image/jpeg', 1);
    };

    const handleInputChange = (platformId, value) => {
        // Check if this platform already exists in socialLinks
        const existingLinkIndex = basicData.socialLinks.findIndex(
            link => link.platformId === platformId
        );

        let updatedLinks;

        if (existingLinkIndex >= 0) {
            updatedLinks = basicData.socialLinks?.map(link =>
                link.platformId === platformId ? { ...link, profileUrl: value } : link
            );
        } else {
            updatedLinks = [
                ...basicData.socialLinks,
                {
                    platformId,
                    profileUrl: value,
                }
            ];
        }

        setBasicData({ ...basicData, socialLinks: updatedLinks });
        handleSaveLocally();
    };

    const handleSave = async () => {
        await axios.post(`${API_URL}/basic-info/`, basicData, {
            withCredentials: true
        });
        setModelOpen(false);
        // setDiffCreated(true);
    };

    const handleSaveLocally = async () => {
        try {
            localStorage.setItem("userBasicInfo", JSON.stringify(basicData));


            const existingData = JSON.parse(localStorage.getItem("userBasicInfo"));

            // Compare stringified versions for deep equality
            const isDifferent = JSON.stringify(dBdata) !== JSON.stringify(existingData);

            if (isDifferent) {
                setDiffCreated(true);
            }

            setModelOpen(false);
        } catch (error) {
            console.error("Failed to save to localStorage:", error);
        }
    };

    useEffect(() => {
        handleSaveLocally();
    }, [basicData]);

    const toggleAnnouncementVisibility = async () => {
        const updatedAnnouncement = {
            ...basicData.announcement,
            isVisible: basicData.announcement ? !basicData.announcement.isVisible : !announcementData.isVisible
        };
        setAnnouncementData(updatedAnnouncement);
        const updatedData = { ...basicData, announcement: updatedAnnouncement };
        setBasicData(updatedData);
        handleSaveLocally();
        // await axios.post(`${API_URL}/basic-info/`, updatedData, {
        //     withCredentials: true
        // });
        // setDiffCreated(true);
    };

    const handleAnnouncementChange = async (field, value) => {
        const updatedAnnouncement = {
            ...basicData.announcement,
            [field]: value
        };
        setAnnouncementData(updatedAnnouncement);
        const updatedData = { ...basicData, announcement: updatedAnnouncement };
        setBasicData(updatedData);
        handleSaveLocally();
        // await axios.post(`${API_URL}/basic-info/`, updatedData, {
        //     withCredentials: true
        // });
        // setDiffCreated(true);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: "px",
                width: MIN_DIMENSION,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const renderInput = (field, label, placeholder = "") => (
        <div className="input-container">
            <div className="label">{label}</div>
            <div className="input-line">
                <input
                    className="input-basic"
                    type="text"
                    placeholder={placeholder}
                    value={basicData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                />
                <div className="done-btn" onClick={() => { setEditingField(null); handleSaveLocally(); }}>
                    <DoneIcon />
                </div>
            </div>
        </div>
    );

    function formatTimestampToIST(dateStr) {
        if (!dateStr) return "";

        const options = {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };

        const date = new Date(dateStr);
        return date.toLocaleString("en-IN", options);
    }

    const savedPublishedTime = formatTimestampToIST(basicData.lastUpdated);

    const [editingPlatforms, setEditingPlatforms] = useState({});
    const [platformValues, setPlatformValues] = useState({});

    useEffect(() => {
        if (basicData.socialLinks) {
            const initialValues = {};
            basicData.socialLinks.forEach(link => {
                initialValues[link.platformId] = link.profileUrl;
            });
            setPlatformValues(initialValues);
        }
    }, [basicData.socialLinks]);

    const handlePlatformClick = (platformId) => {
        setEditingPlatforms(prev => ({
            ...prev,
            [platformId]: true
        }));
    };

    const handlePlatformBlur = (platformId) => {
        setEditingPlatforms(prev => ({
            ...prev,
            [platformId]: false
        }));

        if (platformValues[platformId]) {
            handleInputChange(platformId, platformValues[platformId]);
        }
    };


    return (
        <Container>
            {cropModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {imageSrc && (
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                                <ReactCrop
                                    src={imageSrc}
                                    crop={crop}
                                    onComplete={handleCropComplete}
                                    onChange={setCrop}
                                    aspect={ASPECT_RATIO}
                                    minWidth={MIN_DIMENSION}
                                    ruleOfThirds
                                    keepSelection
                                    style={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        margin: '0 auto'
                                    }}
                                >
                                    <img
                                        ref={imageRef}
                                        src={imageSrc}
                                        alt="Crop me"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '70vh',
                                            display: 'block'
                                        }}
                                        onLoad={onImageLoad}
                                    />
                                </ReactCrop>
                            </div>
                        )}
                        <ModalActions>
                            <button onClick={() => setCropModalOpen(false)}>Cancel</button>
                            <button onClick={handleSaveCroppedImage}>Save</button>
                        </ModalActions>
                    </ModalContent>
                </ModalOverlay>
            )}

            {modelOpen && (
                <ModelConatiner>
                    <div className="model-closer" onClick={() => setModelOpen(false)}></div>
                    <div className="model">
                        <div className="model-title">Add or Edit your social media profile pages</div>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search social media"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="search-btn">
                                <SearchIcon />
                            </div>
                        </div>
                        <div className="all-social-medias">
                            {filteredPlatforms.map(platform => {
                                const currentValue = platformValues[platform.id] || '';
                                const isEditing = editingPlatforms[platform.id];

                                return (
                                    <div className="one-social-media" key={platform.id}>
                                        <div className="icon">
                                            {
                                                currentValue && <div className="added-icon"><CheckCircleIcon /></div>
                                                // true && <div className="added-icon"><CheckCircleIcon/></div>
                                            }
                                            <img src={platform.iconUrl} alt={platform.name} />
                                        </div>

                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="input-basic"
                                                placeholder={`${platform.name} username/URL`}
                                                value={currentValue}
                                                onChange={(e) => setPlatformValues(prev => ({
                                                    ...prev,
                                                    [platform.id]: e.target.value
                                                }))}
                                                onBlur={() => handlePlatformBlur(platform.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handlePlatformBlur(platform.id);
                                                    }
                                                }}
                                                autoFocus
                                            />
                                        ) : (
                                            <div className="social-info" onClick={() => handlePlatformClick(platform.id)}>
                                                <div className="social-name">{platform.name}</div>
                                                {currentValue &&
                                                    <div className="social-value">
                                                        <a
                                                            href={platform.id === 'mail' ? `mailto:${currentValue}` : currentValue}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {currentValue.length > 18 ? `${currentValue.substring(0, 15)}...` : currentValue}
                                                        </a>
                                                    </div>
                                                }
                                                <ChevronRightIcon />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="done-btn" onClick={handleSaveLocally}>Done</div>
                    </div>
                </ModelConatiner>
            )}

            <div className="pre-top-bar">
                <a href={`/p/${basicData.userName}`} target="_blank">
                    Visit your live public page
                    <CallMadeIcon />
                </a>
            </div>

            <div className="top-bar">
                <div className="left">
                    {/* <div className="color">{diffCreated ? "Unsaved changes" : "All changes published!"}</div> */}
                    <b>Last Published :</b> <br /> {savedPublishedTime != null ? savedPublishedTime : "Never"}
                </div>
                <a href="/page/view-edit" className="view-btn">Preview</a>
            </div>

            <div className="user-data">
                <div className="logo-x-dp">
                    <img
                        src={basicData.profileImage}
                        alt="Profile"
                    />
                    <div className="add-btn" onClick={() => fileInputRef.current.click()}>
                        <AddIcon />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/jpeg, image/png"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                {editingField === "name"
                    ? renderInput("name", "Your Name", "Enter your name")
                    : <div className="name" onClick={() => setEditingField("name")}>
                        {basicData.name || "Your Name"} <CreateIcon />
                    </div>
                }

                {editingField === "role"
                    ? renderInput("role", "Your Role", "Enter your role")
                    : <div className="about-header" onClick={() => setEditingField("role")}>
                        {basicData.role || "Your Role"} <CreateIcon />
                    </div>
                }

                {editingField === "org"
                    ? renderInput("org", "Your Organization", "Enter your organization")
                    : <div className="about-header" onClick={() => setEditingField("org")}>
                        {basicData.org || "Your Organisation"} <CreateIcon />
                    </div>
                }

                {editingField === "bio"
                    ? renderInput("bio", "Your Bio", "Tell us about yourself")
                    : <div className="about-desc" onClick={() => setEditingField("bio")}>
                        {basicData.bio || "Your bio"} <CreateIcon />
                    </div>
                }

                {editingField === "location"
                    ? renderInput("location", "Your Location", "Enter your location")
                    : <div className="about-location" onClick={() => setEditingField("location")}>
                        {basicData.location || "Your Location"} <CreateIcon />
                    </div>
                }

                <div className="socials">
                    {basicData.socialLinks?.map((link, idx) => (
                        <div key={idx} className="social-icon">
                            <img src={AllSocialMediaPlatforms.find(p => p.id === link.platformId)?.iconUrl} alt="" />
                        </div>
                    ))}
                    <div className="social-icon" onClick={() => setModelOpen(true)}>
                        <CreateIcon />
                    </div>
                </div>
            </div>
            <PinnedAnnouncement>
                {!isAnnouncementEditing && (
                    <div className="edit-btn" onClick={() => {
                        setIsAnnouncementEditing(true);
                        handleAnnouncementChange('isVisible', true);
                    }}>
                        <CreateIcon />
                    </div>
                )}

                <div className="change-visibility" onClick={toggleAnnouncementVisibility}>
                    {announcementData.isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    <div className="text">
                        Click to {announcementData.isVisible ? "hide" : "show"}
                    </div>
                </div>

                <div className="label">
                    <svg viewBox="0 0 24 24" height="16" width="16" preserveAspectRatio="xMidYMid meet" fill="none">
                        <path d="M16 5V12L17.7 13.7C17.8 13.8 17.875 13.9125 17.925 14.0375C17.975 14.1625 18 14.2917 18 14.425V15C18 15.2833 17.9042 15.5208 17.7125 15.7125C17.5208 15.9042 17.2833 16 17 16H13V21.85C13 22.1333 12.9042 22.3708 12.7125 22.5625C12.5208 22.7542 12.2833 22.85 12 22.85C11.7167 22.85 11.4792 22.7542 11.2875 22.5625C11.0958 22.3708 11 22.1333 11 21.85V16H7C6.71667 16 6.47917 15.9042 6.2875 15.7125C6.09583 15.5208 6 15.2833 6 15V14.425C6 14.2917 6.025 14.1625 6.075 14.0375C6.125 13.9125 6.2 13.8 6.3 13.7L8 12V5C7.71667 5 7.47917 4.90417 7.2875 4.7125C7.09583 4.52083 7 4.28333 7 4C7 3.71667 7.09583 3.47917 7.2875 3.2875C7.47917 3.09583 7.71667 3 8 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.28333 16.9042 4.52083 16.7125 4.7125C16.5208 4.90417 16.2833 5 16 5ZM8.85 14H15.15L14 12.85V5H10V12.85L8.85 14Z" fill="currentColor"></path>
                    </svg>
                    Pinned Announcement
                </div>

                {announcementData.isVisible && (
                    <div>
                        {isAnnouncementEditing ? (
                            <>
                                <div className="input-container">
                                    <div className="label-inside">Title</div>
                                    <div className="input-line">
                                        <input
                                            className="input-basic"
                                            type="text"
                                            placeholder="Announcement title"
                                            value={announcementData.title || ""}
                                            onChange={(e) => handleAnnouncementChange('title', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <div className="label-inside">Description</div>
                                    <div className="input-line">
                                        <input
                                            className="input-basic"
                                            type="text"
                                            placeholder="Announcement description"
                                            value={announcementData.description || ""}
                                            onChange={(e) => handleAnnouncementChange('description', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="done-btn" onClick={() => setIsAnnouncementEditing(false)}>
                                    Done
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="title">{parseRichText(announcementData.title || "")}</div>
                                <div className="desc">{parseRichText(announcementData.description || "")}</div>
                            </>
                        )}
                    </div>
                )}
            </PinnedAnnouncement>
        </Container>
    );
};

export default BasicInfo;

const Container = styled.div`
    .pre-top-bar{
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100;

        border-bottom: 1px solid #313231;

        height: 40px;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: center;
        
        padding: 0 30px;

        /* background-color: #92b419; */
        background-color: #000;

        a{
            display: flex;
            align-items: center;
            font-size: 0.75rem;
            font-weight: 500;
            cursor: pointer;

            color: white;
            text-decoration: none;

            svg{
                font-size: 1rem;
                margin-left: 5px;
            }

        }
    }

    .top-bar{
        position: fixed;
        top: 40px;
        left: 0px;
        z-index: 100;

        border-bottom: 1px solid #313231;

        height: 60px;
        width: 100vw;

        display: flex;
        align-items: center;
        justify-content: space-between;

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

        .color{
            color: yellowgreen;
        }

        .left{
            font-size: 0.65rem;
            font-weight: 200;
            letter-spacing: 0.05rem;
            
            b{
                font-weight: 500;
            }
        }

        .view-btn{
            padding: 7.5px 20px;
            font-size: 0.75rem;
            /* border: 1px solid #676363; */
            color: white;
            border-radius: 10px;
            background-color: #363636;
            text-decoration: none;
            font-weight: 200;
            letter-spacing: 0.07rem;
            margin-left: 5px;
        }
    }

    .user-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 40px;
        margin-top: 40px;
        
        .logo-x-dp{
            height: 120px;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 50%;
            border: 2px solid #313231;
            
            img{
                width: 100%;
            }
            
            .add-btn{
                position: absolute;
                z-index: 10;
                height: 30px;
                width: 30px;
                border-radius: 50%;
                background-color: #313232;
                left: calc(50% + 25px);
                top: 85px;

                display: grid;
                place-items: center;

                svg{
                    font-size: 1rem;
                    margin-bottom: 0;
                    margin-left: 0;
                    fill: #fff;
                }
            }
        }

        .input-container{
            width: 100%;
            margin-top: 10px;

            .label{
                font-size: 0.75rem;
                font-weight: 500;
                display: none;
            }

            .input-line{
                display: flex;
                align-items: center;
                
                .input-basic{
                    width: 100%;
                    border-radius: 10px;
                    margin: 15px 0 5px 0;
                    /* outline: none; */
                    /* background-color: transparent; */
                    background-color:rgb(22, 22, 22);
                    border: 1px solid #363636;
                    padding: 15px;
                    color: white;
                    resize: none;
                    font-size: 0.75rem;
                    font-weight: 300;
                    /* letter-spacing: 0.1rem; */
                    /* outline: white; */
                }
                
                .input-basic:focus {
                    outline: 1px solid white;
                    outline-offset: 2px; 
                    letter-spacing: 0.1rem;
                    transition: outline 125ms ease, letter-spacing 125ms ease;
                }

                .done-btn{
                    height: 42px;
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    background-color: #333;
                    margin-left: 10px;

                    display: grid;
                    place-items: center;

                    svg{
                        font-size: 1.25rem;
                        /* margin-bottom: -2px; */
                        margin-left: -2.5px;
                    }
                }
            }

            textarea{
                height: 200px;
            }
        }

        .name{
            margin-top: 35px;
            font-weight: 500;
            text-align: center;
        }

        .about-header{
            margin-top: 20px;
            font-weight: 200;
            font-size: 0.85rem;
            text-align: center;
        }

        .about-desc{
            margin-top: 20px;
            font-weight: 200;
            font-size: 0.85rem;
            text-align: center;
        }

        .about-location{
            margin-top: 20px;
            font-weight: 500;
            font-size: 0.85rem;
            text-align: center;
        }
        
        svg{
            font-size: 1rem;
            margin-bottom: -2px;
            margin-left: 5px;
        }

        .main-btns{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .btn-1{
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #0095f6;
                border-radius: 10px;
                margin: 0 5px;
            }

            .secondary{
                background-color: #363636;
            }

            .trans{
                background-color: transparent;
                border: 1px solid white;
            }
        }

        .socials{
            margin-top: 30px;
            display: flex; 
            align-items: center; 
            justify-content: center;
            flex-wrap: wrap;

            .social-icon{
                height: 35px;
                aspect-ratio: 1/1;
                background-color:rgb(217, 211, 211);
                border-radius: 50%;
                margin: 3.5px;

                padding: 2.5px;

                display: grid;
                place-items: center;

                img{
                    width: 100%;
                    border-radius: 100px;
                }

                svg{
                    font-size: 1rem;
                    margin-bottom: 0;
                    margin-left: 0;
                    fill: #333;
                }
            }
        }
    }
`

const ModelConatiner = styled.div`
    width: 100vw;
    height: calc(100vh - 60px);
    
    z-index: 1002;
    
    position: fixed;
    top: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;

    
    
    .model-closer{
        width: 100vw;
        height: calc(100vh - 60px);
        
        position: absolute;
        top: 0;
        left: 0;
        
        background-color: #000000c7; 
    }

    .model{ 
        width: 80%;
        /* max-height: 50vh; */
        max-width: 400px;
        border-radius: 10px;
        /* margin-top: -50px; */
        background-color: #000;
        border: 1px solid #363636;
        z-index: 1009;
        padding: 20px;
        
        position: relative;

        .model-title{
          color: whitesmoke;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .search-bar{
            margin-top: 20px;
            display: flex;
            /* align-items: center; */
            /* background-color:rgb(22, 22, 22); */
            /* border: 1px solid #363636; */

            input{
                width: 100%;
                border-radius: 10px;
                /* margin: 15px 0 5px 0; */
                /* outline: none; */
                /* background-color: transparent; */
                /* margin-left: 10px; */
                background-color:rgb(22, 22, 22);
                border: 1px solid #363636;
                padding: 15px;
                color: white;
                resize: none;
                font-size: 0.75rem;
                font-weight: 300;
                /* letter-spacing: 0.1rem; */
                /* outline: white; */
            }
            
            input:focus {
                outline: 1px solid white;
                outline-offset: 2px; 
                letter-spacing: 0.1rem;
                transition: outline 125ms ease, letter-spacing 125ms ease;
            }

            .search-btn{
                background-color: #333;
                height: 49.5px;
                aspect-ratio: 1/1;
                display: grid;
                place-items: center;
                border-radius: 10px;
                margin-left: 10px;
            }
        }
        
        .all-social-medias{
            overflow: scroll;
            height: 225px;
            margin-top: 10px;

            .one-social-media{
                padding-right: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;

                
                
                .icon{
                    position: relative;

                    .added-icon{
                        position: absolute;
                        right: -5px;
                        top: -5px;
                        background-color: white;
                        height: 1.25rem;
                        width: 1.25rem;
                        border-radius: 100%;
    
                        svg{
                            font-size: 1.25rem;
                            fill: yellowgreen;
                        }
                    }

                    img{
                        height: 25px;
                        border-radius: 100px;
                    }
                }

                .input-basic{
                    width: 100%;
                    border-radius: 10px;
                    /* margin: 15px 0 5px 0; */
                    /* outline: none; */
                    /* background-color: transparent; */
                    margin-left: 10px;
                    background-color:rgb(22, 22, 22);
                    border: 1px solid #363636;
                    padding: 15px;
                    color: white;
                    resize: none;
                    font-size: 0.75rem;
                    font-weight: 300;
                    /* letter-spacing: 0.1rem; */
                    /* outline: white; */
                }
                
                .input-basic:focus {
                    outline: 1px solid white;
                    outline-offset: 2px; 
                    letter-spacing: 0.1rem;
                    transition: outline 125ms ease, letter-spacing 125ms ease;
                }

                .social-info{
                    height: 50px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    flex: 1;

                    .social-name{
                        font-size: 0.85rem;
                        font-weight: 200;
                        margin-left: 20px;
                    }

                    .social-value{
                        font-size: 0.75rem;
                        font-weight: 500;
                        margin-left: 10px;
                        flex: 1;
                    }
                }

            }
        }

        .all-social-medias::-webkit-scrollbar {
            display: none;  
        }

        .done-btn{
          border: none;
          margin-top: 20px;
          background-color: #0095f6;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 300;
          text-align: center;

          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
        }
    }

    
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  z-index: 1200;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
  z-index: 1200;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:last-child {
    background-color: #007bff;
    color: white;
  }
`;

const PinnedAnnouncement = styled.div`
    margin-top: 80px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #363636;
    font-size: 0.85rem;
    font-weight: 300;
    border-radius: 10px;
    line-height: 1.35rem;
    border-left: 10px solid white;
    /* border: 1px solid white; */
    color: #e5e5e5;
    
    position: relative;
    
    .title{
        margin-top: 20px;
        font-weight: 600;
        display: block;
        margin-bottom: 5px;
    }

    .desc{
        font-size: 0.85rem;
        font-weight: 300;

        strong{
            font-weight: 500;
        }
    }

    .change-visibility{
        display: flex;
        align-items: center;
        /* margin-bottom: 20px; */

        .text{
            font-size: 0.75rem;
            margin-left: 5px;
        }
    }

    .edit-btn{
        height: 35px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: #d9d3d3;
        position: absolute;
        right: -17.5px;
        top: 9px;

        display: grid;
        place-items: center;

        z-index: 10;

        svg{
            font-size: 1rem;
            margin-bottom: 0;
            margin-left: 0;
            fill: #333;
        }
    }

    .label{
        position: absolute;
        top: -30px;
        left: -10px;
        font-size: 0.7rem;
        font-weight: 300;
        /* letter-spacing: 0.04rem; */

        display: flex;
        align-items: center;

        svg{
            margin-right: 5px;
            transform: rotate(45deg);
        }
    }

    .input-container{
        width: 100%;
        margin-top: 10px;
        
        .label-inside{
            position: relative;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .input-line{
            display: flex;
            align-items: center;
            
            .input-basic{
                width: 100%;
                border-radius: 10px;
                margin: 5px 0 5px 0;
                /* outline: none; */
                /* background-color: transparent; */
                background-color:rgb(22, 22, 22);
                border: 1px solid #363636;
                padding: 15px;
                color: white;
                resize: none;
                font-size: 0.75rem;
                font-weight: 300;
                /* letter-spacing: 0.1rem; */
                /* outline: white; */
            }
            
            .input-basic:focus {
                outline: 1px solid white;
                outline-offset: 2px; 
                letter-spacing: 0.1rem;
                transition: outline 125ms ease, letter-spacing 125ms ease;
            }

            .done-btn{
                height: 42px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background-color: #333;
                margin-left: 10px;

                display: grid;
                place-items: center;

                svg{
                    font-size: 1.25rem;
                    /* margin-bottom: -2px; */
                    margin-left: -2.5px;
                }
            }
        }

        textarea{
            height: 200px;
        }
    }

    .done-btn{
        border: none;
        margin-top: 20px;
        background-color: #0095f6;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 300;
        text-align: center;
    }
`