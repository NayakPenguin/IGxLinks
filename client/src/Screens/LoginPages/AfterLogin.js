import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import logo from "../../Images/logo-main.png";
import logo2 from "../../Images/logo-bg.png";
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import { CircularProgress } from "@material-ui/core";
import StorefrontIcon from '@material-ui/icons/Storefront';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PersonIcon from '@material-ui/icons/Person';

const AfterLogin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [1, 2, 3];

    const [usernames, setUsernames] = useState(new Set());
    const [inputUsername, setInputUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(null); // true, false, null
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoadingUsernameSearch, setIsLoadingUsernameSearch] = useState(false);
    const typingTimer = useRef(null);

    const [isBusiness, setIsBusiness] = useState(false);

    useEffect(() => {
        const fakeData = ['atanu', 'john_doe', 'elon.musk', 'riya12'];
        setUsernames(new Set(fakeData));
    }, []);

    const validateUsername = (value) => {
        // Instagram-like rules:
        // 1. lowercase letters, numbers, underscores, dots allowed
        // 2. no "__" or ".."
        // 3. cannot start with "_"
        // 4. must be 3-30 characters (Instagram allows 30)

        if (!/^[a-z0-9._]{3,30}$/.test(value)) {
            setIsValidUsername(false);
            setErrorMsg('Only lowercase letters, numbers, ".", "_" allowed. 3–30 chars.');
        } else if (/^_/.test(value)) {
            setIsValidUsername(false);
            setErrorMsg("Username cannot start with '_'.");
        } else if (value.includes('..') || value.includes('__')) {
            setIsValidUsername(false);
            setErrorMsg("Username cannot contain consecutive '.' or '_'.");
        } else if (usernames.has(value)) {
            setIsValidUsername(false);
            setErrorMsg('This username is already taken.');
        } else {
            setIsValidUsername(true);
            setErrorMsg('');
        }
    };

    const handleChangeUsername = (e) => {
        const value = e.target.value.trim();
        setInputUsername(value);
        setIsLoadingUsernameSearch(true);
        setIsValidUsername(null);
        setErrorMsg('');

        clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => {
            setIsLoadingUsernameSearch(false);
            if (value.length > 0) validateUsername(value);
        }, 750);
    };

    return (
        <Container>
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

            {
                currentPage === 1 &&
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
                                {
                                    inputUsername.length > 0 &&
                                    <div className={`iscorrect ${isValidUsername === true ? 'valid' : isValidUsername === false ? 'not-valid' : ''}`}>
                                        {isLoadingUsernameSearch ? (
                                            <img src="https://i.gifer.com/ZKZg.gif" alt="" />
                                        ) : isValidUsername === true ? (
                                            <CheckIcon />
                                        ) : isValidUsername === false ? (
                                            <ErrorIcon />
                                        ) : null}
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="next-btn" onClick={() => setCurrentPage(2)}>Next</div>
                    </div>

                    {isValidUsername === false && (
                        <div className="error-msg">
                            <InfoIcon />
                            {errorMsg}
                        </div>
                    )}
                </div>
            }

            {
                currentPage === 2 &&
                <div className="one-page">
                    <div className="page-content">
                        <div className="page-icon">
                            <StorefrontIcon />
                        </div>
                        <div className="title">Are you a Business?</div>
                        <div className="desc">If you're looking to sell or promote your products, we offer business-specific tools including a public feedback box. Most users can simply select 'No' for now — you’ll always have the option to switch later.</div>
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
                    <div className="next-btn" onClick={() => setCurrentPage(3)}>Next</div>
                </div>
            }

            {
                currentPage === 3 &&
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
                        <input type="text" placeholder="Enter your full name" />
                    </div>
                    <div className="input-container">
                        <div className="input-title">Your role or profession</div>
                        <input type="text" placeholder="e.g., Student, Software Engineer, Designer, Creator" />
                    </div>
                    <div className="input-container">
                        <div className="input-title">Organization</div>
                        <input type="text" placeholder="e.g., Google, Freelance, Self-employed" />
                    </div>
                    <div className="input-container">
                        <div className="input-title">Short Bio</div>
                        <input type="text" placeholder="Tell a bit about yourself" />
                    </div>

                    <div className="input-container">
                        <div className="input-title">Primary Location</div>
                        <input type="text" placeholder="e.g., Delhi, Bangalore" />
                    </div>

                    <div className="next-btn" onClick={() => setCurrentPage(3)}>Next</div>
                </div>
            }

        </Container>
    )
}

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
        margin-top: 20px;
        width: 100%;

        .input-title{
            color: #333;
            font-size: 0.75rem;
            font-weight: 500;
            margin-bottom: 5px;
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