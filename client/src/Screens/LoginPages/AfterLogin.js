import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import logo from "../../Images/logo-main.png";
import InfoIcon from '@material-ui/icons/Info';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const AfterLogin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [1, 2, 3];

    // Username states
    const [usernames, setUsernames] = useState(new Set());
    const [inputUsername, setInputUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoadingUsernameSearch, setIsLoadingUsernameSearch] = useState(false);
    const [page1Error, setPage1Error] = useState('');
    const typingTimer = useRef(null);

    // Business states
    const [isBusiness, setIsBusiness] = useState(false);
    const [page2Error, setPage2Error] = useState('');

    // Personal information states
    const [fullName, setFullName] = useState('');
    const [profession, setProfession] = useState('');
    const [organization, setOrganization] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [page3Errors, setPage3Errors] = useState({
        fullName: '',
        profession: '',
        organization: '',
        bio: '',
        location: '',
        profilePicture: ''
    });

    // Image states
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageSrcCropped, setImageSrcCropped] = useState(null);
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

    useEffect(() => {
        const fakeData = ['atanu', 'john_doe', 'elon.musk', 'riya12'];
        setUsernames(new Set(fakeData));
    }, []);

    const validateUsername = (value) => {
        if (!value.trim()) {
            setIsValidUsername(false);
            setErrorMsg('Username cannot be empty');
            return false;
        }

        if (!/^[a-z0-9._]{3,30}$/.test(value)) {
            setIsValidUsername(false);
            setErrorMsg('Only lowercase letters, numbers, ".", "_" allowed. 3–30 chars.');
            return false;
        } else if (/^_/.test(value)) {
            setIsValidUsername(false);
            setErrorMsg("Username cannot start with '_'.");
            return false;
        } else if (value.includes('..') || value.includes('__')) {
            setIsValidUsername(false);
            setErrorMsg("Username cannot contain consecutive '.' or '_'.");
            return false;
        } else if (usernames.has(value)) {
            setIsValidUsername(false);
            setErrorMsg('This username is already taken.');
            return false;
        } else {
            setIsValidUsername(true);
            setErrorMsg('');
            return true;
        }
    };

    const handleChangeUsername = (e) => {
        const value = e.target.value.trim();
        setInputUsername(value);
        setIsLoadingUsernameSearch(true);
        setIsValidUsername(null);
        setErrorMsg('');
        setPage1Error('');

        clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => {
            setIsLoadingUsernameSearch(false);
            if (value.length > 0) validateUsername(value);
        }, 750);
    };

    const validatePage1 = () => {
        if (!inputUsername.trim()) {
            setPage1Error('Username is required');
            return false;
        }

        if (isValidUsername !== true) {
            setPage1Error('Please enter a valid username');
            return false;
        }

        return true;
    };

    const validatePage2 = () => {
        // Business selection is optional (default is false)
        return true;
    };

    const validatePage3 = () => {
        const errors = {
            fullName: '',
            profession: '',
            organization: '',
            bio: '',
            location: '',
            profilePicture: ''
        };

        let isValid = true;

        if (!fullName.trim()) {
            errors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!profession.trim()) {
            errors.profession = 'Profession is required';
            isValid = false;
        }

        if (!organization.trim()) {
            errors.organization = 'Organization is required';
            isValid = false;
        }

        if (!bio.trim()) {
            errors.bio = 'Bio is required';
            isValid = false;
        }

        if (!location.trim()) {
            errors.location = 'Location is required';
            isValid = false;
        }

        if (!imageSrcCropped) {
            errors.profilePicture = 'Profile picture is required';
            isValid = false;
        }

        setPage3Errors(errors);
        return isValid;
    };

    const handleNextPage = () => {
        if (currentPage === 1) {
            if (!validatePage1()) return;
        } else if (currentPage === 2) {
            if (!validatePage2()) return;
        }
        setCurrentPage(currentPage + 1);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (!file.type.match('image.(jpeg|jpg|png)')) {
                setPage3Errors(prev => ({
                    ...prev,
                    profilePicture: 'Please select a JPEG/JPG or PNG image'
                }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setPage3Errors(prev => ({
                    ...prev,
                    profilePicture: 'Image size should be less than 5MB'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                setCropModalOpen(true);
                setPage3Errors(prev => ({
                    ...prev,
                    profilePicture: ''
                }));
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
                localStorage.setItem("newLocalImageURL", reader.result);
                setImageSrcCropped(reader.result);
                setCropModalOpen(false);
                setPage3Errors(prev => ({
                    ...prev,
                    profilePicture: ''
                }));
            };
        }, 'image/jpeg', 1);
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

    const handleSubmit = () => {
        if (!validatePage3()) return;

        const basicData = {
            username: inputUsername,
            isBusiness,
            fullName,
            profession,
            organization,
            bio,
            location,
            profilePicture: imageSrcCropped
        };

        console.log("Basic Data:", basicData);
        // window.location.href = "page/create";
    };

    return (
        <Container>
            {
                currentPage > 1
                &&
                <BackBtn onClick={() => setCurrentPage(currentPage - 1)}>
                    <ChevronLeftIcon />
                </BackBtn>
            }
            <div className="main-content">
                <div className="pagination">
                    {pages.map((page, index) => (
                        <React.Fragment key={page}>
                            <div className={`page ${currentPage >= page ? 'curr-or-done' : ''}`}>{page}</div>
                            {index < pages.length - 1 && (
                                <div className={`line ${currentPage >= page + 1 ? 'curr-or-done' : ''}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="top">
                    <img src={logo} alt="" />
                    IG x Links
                </div>

                {currentPage === 1 && (
                    <div className="one-page">
                        <div className="page-content">
                            <div className="page-icon">
                                <AlternateEmailIcon />
                            </div>

                            <div className="title">Username</div>
                            <div className="desc">Enter your preferred username</div>
                        </div>
                        <div className="username-entry">
                            <div className="input-container">
                                <div className="input-valid">
                                    <input
                                        type="text"
                                        placeholder="Enter preferred username"
                                        value={inputUsername}
                                        onChange={handleChangeUsername}
                                    />
                                    {inputUsername.length > 0 && (
                                        <div className={`iscorrect ${isValidUsername === true ? 'valid' : isValidUsername === false ? 'not-valid' : ''}`}>
                                            {isLoadingUsernameSearch ? (
                                                <img src="https://i.gifer.com/ZKZg.gif" alt="" />
                                            ) : isValidUsername === true ? (
                                                <CheckIcon />
                                            ) : isValidUsername === false ? (
                                                <ErrorIcon />
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="next-btn" onClick={handleNextPage}>Next</div>
                        </div>

                        {(isValidUsername === false || page1Error) && (
                            <div className="error-msg">
                                <InfoIcon />
                                {page1Error || errorMsg}
                            </div>
                        )}
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="one-page">
                        <div className="page-content">
                            <div className="page-icon">
                                <StorefrontIcon />
                            </div>
                            <div className="title">Are you a Business?</div>
                            <div className="desc">If you're looking to sell or promote your products, we offer business-specific tools including a public feedback box. Most users can simply select 'No' for now — you'll always have the option to switch later.</div>
                        </div>
                        <div className="input-container">
                            <div className="options">
                                <div
                                    className={`opt ${!isBusiness ? 'selected' : ''}`}
                                    onClick={() => setIsBusiness(false)}
                                >
                                    No
                                </div>
                                <div
                                    className={`opt ${isBusiness ? 'selected' : ''}`}
                                    onClick={() => setIsBusiness(true)}
                                >
                                    Yes
                                </div>
                            </div>
                        </div>
                        {page2Error && (
                            <div className="error-msg">
                                <InfoIcon />
                                {page2Error}
                            </div>
                        )}
                        <div className="next-btn" onClick={handleNextPage}>Next</div>
                    </div>
                )}

                {currentPage === 3 && (
                    <div className="one-page">
                        <div className="page-content">
                            <div className="page-icon">
                                <PersonIcon />
                            </div>
                            <div className="title">Personal Information</div>
                            <div className="desc">This information will be used to create your page with IGxLinks.</div>
                        </div>
                        <div className="input-container">
                            <div className="input-title">Full Name</div>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    setPage3Errors(prev => ({ ...prev, fullName: '' }));
                                }}
                            />
                            {page3Errors.fullName && (
                                <div className="error-msg">
                                    <InfoIcon />
                                    {page3Errors.fullName}
                                </div>
                            )}
                        </div>
                        <div className="input-container">
                            <div className="input-title">Your role or profession</div>
                            <input
                                type="text"
                                placeholder="e.g., Student, Software Engineer, Designer, Creator"
                                value={profession}
                                onChange={(e) => {
                                    setProfession(e.target.value);
                                    setPage3Errors(prev => ({ ...prev, profession: '' }));
                                }}
                            />
                            {page3Errors.profession && (
                                <div className="error-msg">
                                    <InfoIcon />
                                    {page3Errors.profession}
                                </div>
                            )}
                        </div>
                        <div className="input-container">
                            <div className="input-title">Organization</div>
                            <input
                                type="text"
                                placeholder="e.g., Google, Freelance, Self-employed"
                                value={organization}
                                onChange={(e) => {
                                    setOrganization(e.target.value);
                                    setPage3Errors(prev => ({ ...prev, organization: '' }));
                                }}
                            />
                            {page3Errors.organization && (
                                <div className="error-msg">
                                    <InfoIcon />
                                    {page3Errors.organization}
                                </div>
                            )}
                        </div>
                        <div className="input-container">
                            <div className="input-title">Short Bio</div>
                            <input
                                type="text"
                                placeholder="Tell a bit about yourself"
                                value={bio}
                                onChange={(e) => {
                                    setBio(e.target.value);
                                    setPage3Errors(prev => ({ ...prev, bio: '' }));
                                }}
                            />
                            {page3Errors.bio && (
                                <div className="error-msg">
                                    <InfoIcon />
                                    {page3Errors.bio}
                                </div>
                            )}
                        </div>

                        <div className="input-container">
                            <div className="input-title">Primary Location</div>
                            <input
                                type="text"
                                placeholder="e.g., Delhi, Bangalore"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setPage3Errors(prev => ({ ...prev, location: '' }));
                                }}
                            />
                            {page3Errors.location && (
                                <div className="error-msg">
                                    <InfoIcon />
                                    {page3Errors.location}
                                </div>
                            )}
                        </div>

                        {cropModalOpen && (
                            <ModalOverlay>
                                <ModalContent>
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

                        <div className="input-container">
                            <div className="input-title">Your profile picture</div>
                            <div className="logo-x-dp">
                                {imageSrcCropped != null && (
                                    <img
                                        src={imageSrcCropped}
                                        alt="Profile"
                                    />
                                )}
                                <div className="add-btn" onClick={() => fileInputRef.current.click()}>
                                    Add Image
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/jpeg, image/png"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                            {page3Errors.profilePicture && (
                                <div className="error-msg">
                                    <InfoIcon />
                                    {page3Errors.profilePicture}
                                </div>
                            )}
                        </div>

                        <div className="next-btn" onClick={handleSubmit}>Submit</div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default AfterLogin;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background-color: white;

  padding: 30px;
  padding-bottom: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .main-content{
    width: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pagination{
    width: 100%;
    display: flex;
    align-items: center;

    margin-bottom: 50px;

    .page{
        font-size: 0.85rem;
        height: 35px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: #45375170;

        display: grid;
        place-items: center;
    }

    .line{
        flex: 1;
        height: 2px;
        border-radius: 100px;
        background-color: #45375170;
        margin: 0 10px;
    }
    
    .curr-or-done{
        background-color: #453751;
    }

  }

  .top{
      position: absolute;
      bottom: 20px;
      font-size: 1.5rem;
      /* letter-spacing: 0.1rem; */
      font-weight: 500;
      color: #333;
      margin-top: 50px;

      display: flex;
      align-items: center;

      scale: 0.75;

      span{
          color:rgb(243, 114, 114);
          margin: 0 5px;
          font-weight: 700;
      }

      img{
          height: 30px;
          margin-right: 10px;
      }
  }

  .one-page{
    width: 100%;
  }

  .page-content{
    width: 100%;

    .page-icon{
        height: 40px;
        width: 40px;
        background-color: #453751;
        border-radius: 50%;

        margin-bottom: 20px;

        display: grid;
        place-items: center;

        svg{
            font-size: 1.25rem;
        }
    }

    .title{
        color: #333;
        font-size: 1.25rem;
        font-weight: 500;
    }

    .desc{
        color: #333;
        font-size: 0.85rem;
        font-weight: 200;
        margin-bottom: 10px;
    }
  }

  .username-entry{
    width: 100%;
  }

    .input-container{
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        width: 100%;

        .input-title{
            color: #333;
            font-size: 0.75rem;
            font-weight: 500;
            margin-bottom: 10px;
        }

        input{
            flex: 1;
            background-color: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 100px;
            font-size: 0.85rem;
            padding: 13.6px 16px;
            color: #333;
        }

        .input-valid{
            display: flex;
            align-items: center;
            margin-top: 10px;

            .iscorrect{
                height: 40px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background-color: #f9fafb;
                margin-left: 10px;

                display: grid;
                place-items: center;

                svg{
                    font-size: 1rem;
                    fill: #333;
                }

                img{
                    height: 1rem;
                }
            }

            .circle{
                font-size: 1rem;
                fill: #333;
            }

            .valid{
                background-color: yellowgreen;

                svg{
                fill: white; 
                }
            }

            .not-valid{
                background-color: #f85454;
                
                svg{
                fill: white; 
                }
            }
        }

        .options{
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 10px 0 0 0;

            .opt{
                height: 40px;
                width: 80px;

                display: grid;
                place-items: center;

                font-size: 0.85rem;
                color: #333;
                
                border: 1px solid black;
                border-radius: 100px;
            }

            .selected{
                background-color: black;
                color: white;
            }
        }
    } 

    .logo-x-dp{
        padding: 20px;

        background-color: #f9fafb;
        border: 1px solid #d1d5db;
        border-radius: 20px;

        img{
            width: 100%;
            border-radius: 50%;
            margin-bottom: 10px;
        }

        .add-btn{
            color: #333;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.15rem;
            text-align: center;
        }   
    }

    .next-btn{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding: 13.6px;

    font-size: 0.85rem;

    background-color: black;
    color: white;
    text-decoration: none;
    
    margin-top: 20px;
    border-radius: 100px;
    }

    

  .error-msg {
    margin-top: 20px;
    color: #f85454;
    font-size: 0.75rem;
    font-weight: 300;
    width: 100%;

    svg{
      fill: #f85454;
      font-size: 1.15rem;
      margin-bottom: -3.5px;
      margin-right: 3.5px;
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

const BackBtn = styled.div`
    height: 30px;
    aspect-ratio: 1/1;
    border: 1px solid #d1d5db;
    background-color: rgba(255, 255, 255, 0.83);
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 10px 0px;
    border-radius: 50%;
  
    position: fixed;
    top: 15px;
    left: 15px;
  
    display: grid;
    place-items: center;
  
    svg{
      fill: #333;
    }
`;