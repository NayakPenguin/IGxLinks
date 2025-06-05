import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const AllSocialMediaPlatforms = [
    {
        "id": "instagram",
        "name": "Instagram",
        "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
    },
    {
        "id": "youtube",
        "name": "YouTube",
        "iconUrl": "https://www.svgrepo.com/show/416500/youtube-circle-logo.svg"
    },
    {
        "id": "snapchat",
        "name": "SnapChat",
        "iconUrl": "https://cdn2.downdetector.com/static/uploads/c/300/f52a5/image11.png"
    },
    {
        "id": "facebook",
        "name": "Facebook",
        "iconUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png"
    },
    {
        "id": "twitter",
        "name": "Twitter (X)",
        "iconUrl": "https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740"
    },
    {
        "id": "linkedin",
        "name": "LinkedIn",
        "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png"
    },
    {
        "id": "tiktok",
        "name": "TikTok",
        "iconUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP0N3zvG1w5AohL7rpXml844HBmbINcRx0oDSCMCrpiT55vOV8ILlUzTV78Q6na5tPjxs&usqp=CAU"
    },
    {
        "id": "pinterest",
        "name": "Pinterest",
        "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
    },
    {
        "id": "threads",
        "name": "Threads",
        "iconUrl": "https://cbx-prod.b-cdn.net/COLOURBOX65108147.jpg?width=800&height=800&quality=70"
    }
];

const BasicInfo = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        org: "",
        bio: "",
        location: "",
        profileImage: "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
    });
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        height: 50,
        aspect: 1,  // This enforces 1:1 aspect ratio
        x: 25,
        y: 25
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleDone = () => {
        setEditingField(null);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // Check file type
            if (!file.type.match('image.(jpeg|jpg|png)')) {
                alert('Please select a JPEG/JPG or PNG image');
                return;
            }
            // Check file size (e.g., 5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                setCropModalOpen(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    const handleSaveCroppedImage = () => {
        if (!completedCrop || !imageRef.current) {
            return;
        }

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
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
                setCropModalOpen(false);
            };
        }, 'image/jpeg', 1);
    };

    const renderInput = (field, label, placeholder = "") => (
        <div className="input-container">
            <div className="label">{label}</div>
            <div className="input-line">
                <input
                    className="input-basic"
                    type="text"
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                />
                <div className="done-btn" onClick={handleDone}>
                    <DoneIcon />
                </div>
            </div>
        </div>
    );

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


    // Social Media
    const [searchTerm, setSearchTerm] = useState('');
    const [socialLinks, setSocialLinks] = useState({});
    const [activeSocialLinks, setActiveSocialLinks] = useState([]);
    const [filteredPlatforms, setFilteredPlatforms] = useState(AllSocialMediaPlatforms);

    useEffect(() => {
        // Initialize with empty values for all platforms
        const initialLinks = {};
        AllSocialMediaPlatforms.forEach(platform => {
            initialLinks[platform.id] = '';
        });
        setSocialLinks(initialLinks);
    }, []);

    useEffect(() => {
        // Filter platforms based on search term
        const filtered = AllSocialMediaPlatforms.filter(platform =>
            platform.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPlatforms(filtered);
    }, [searchTerm]);

    const handleInputChange = (platformId, value) => {
        setSocialLinks(prev => ({
            ...prev,
            [platformId]: value
        }));
    };

    const handleSave = () => {
        // Filter out empty links and map to include platform info
        const updatedLinks = AllSocialMediaPlatforms
            .filter(platform => socialLinks[platform.id]?.trim() !== '')
            .map(platform => ({
                ...platform,
                url: socialLinks[platform.id].trim()
            }));

        setActiveSocialLinks(updatedLinks);
        setModelOpen(false);
    };

    return (
        <Container>
            {cropModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Crop your profile picture (Square 1:1)</h3>
                        {imageSrc && (
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                                <ReactCrop
                                    src={imageSrc}
                                    crop={crop}
                                    onComplete={handleCropComplete}
                                    onChange={newCrop => setCrop(newCrop)}
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

            {
                modelOpen ?
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
                                {filteredPlatforms.map(platform => (
                                    <div className="one-social-media" key={platform.id}>
                                        <div className="icon">
                                            <img src={platform.iconUrl} alt={platform.name} />
                                        </div>
                                        <input
                                            type="text"
                                            className="input-basic"
                                            placeholder={`Enter your ${platform.name} profile`}
                                            value={socialLinks[platform.id] || ''}
                                            onChange={(e) => handleInputChange(platform.id, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="done-btn" onClick={handleSave}>Done</div>
                        </div>
                    </ModelConatiner> : null
            }

            <div className="top-bar">
                <div className="left">
                    <b>Last Published :</b> <br /> 25 May 9:16AM (UTC)
                </div>
                <div className="view-btn">View</div>
            </div>

            <div className="user-data">
                <div className="logo-x-dp">
                    <img
                        src={formData.profileImage}
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

                {/* Rest of your existing code... */}
                {/* Name */}
                {editingField === "name"
                    ? renderInput("name", "Your Name", "Enter your name")
                    : <div className="name" onClick={() => setEditingField("name")}>
                        {formData.name || "Your Name"} <CreateIcon />
                    </div>
                }

                {/* Role */}
                {editingField === "role"
                    ? renderInput("role", "Your Role", "Enter your role")
                    : <div className="about-header" onClick={() => setEditingField("role")}>
                        {formData.role || "Your Role"} <CreateIcon />
                    </div>
                }

                {/* Organization */}
                {editingField === "org"
                    ? renderInput("org", "Your Organization", "Enter your organization")
                    : <div className="about-header" onClick={() => setEditingField("org")}>
                        {formData.org || "Your Organisation"} <CreateIcon />
                    </div>
                }

                {/* Bio */}
                {editingField === "bio"
                    ? renderInput("bio", "Your Bio", "Tell us about yourself")
                    : <div className="about-desc" onClick={() => setEditingField("bio")}>
                        {formData.bio || "Your bio"} <CreateIcon />
                    </div>
                }

                {/* Location */}
                {editingField === "location"
                    ? renderInput("location", "Your Location", "Enter your location")
                    : <div className="about-location" onClick={() => setEditingField("location")}>
                        {formData.location || "Your Location"} <CreateIcon />
                    </div>
                }

                <div className="socials">
                    {[
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png",
                        "https://www.svgrepo.com/show/416500/youtube-circle-logo.svg",
                        "https://cdn2.downdetector.com/static/uploads/c/300/f52a5/image11.png",
                        "https://downloadr2.apkmirror.com/wp-content/uploads/2020/10/91/5f9b61e42640e.png"
                    ].map((src, idx) => (
                        <div key={idx} className="social-icon light">
                            <img src={src} alt="" />
                        </div>
                    ))}
                    <div className="social-icon" onClick={setModelOpen}>
                        <CreateIcon />
                    </div>
                </div>
            </div>
        </Container>
    );
};

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;

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

export default BasicInfo;

const Container = styled.div`
    .top-bar{
        position: fixed;
        top: 0px;
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

        .left{
            font-size: 0.65rem;
            font-weight: 200;
            letter-spacing: 0.07rem;
            
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
        }
    }

    .user-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 40px;
        
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
        
        background-color: #00000085; 
    }

    .model{ 
        width: 80%;
        max-height: 50vh;
        max-width: 400px;
        border-radius: 10px;
        /* margin-top: -50px; */
        background-color: #000;
        border: 1px solid #363636;
        z-index: 1009;
        padding: 20px;
        overflow: scroll;
        /* position: relative; */

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
            .one-social-media{
                display: flex;
                align-items: center;
                margin-top: 20px;

                .icon{
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
    }

    .model::-webkit-scrollbar {
        display: none;  
    }
`