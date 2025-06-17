import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import logo from "../../Images/logo-main.png";
import logo2 from "../../Images/logo-bg.png";
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const Login = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1].focus();
    if (!value && index > 0) inputRefs.current[index - 1].focus();
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      console.log("Logged out");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleRequestOTP = async () => {
    if (!email) return alert("Enter your email");
    const res = await fetch("http://localhost:5000/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      alert("OTP sent to your email");
      setShowOTP(true);
    } else {
      alert(data.message || "Error sending OTP");
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return alert("Enter all 6 digits of OTP");

    const res = await fetch("http://localhost:5000/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp: fullOtp })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Logged in successfully!");
      window.location.href = "/basic-info";
    } else {
      alert(data.message || "Invalid OTP");
    }
  };

  useEffect(() => {
  fetch("http://localhost:5000/auth/me", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(user => {
      console.log("Logged-in user:", user);
      if (user && user.email) {
        window.location.href = "/basic-info";
      }
    });
}, []);

  return (
    <Container>
      <BackBtn>
        <a href="/"><ChevronLeftIcon /></a>
      </BackBtn>
      <div className="main-content">
        <div className="top">
          <img src={logo} alt="" />
          IG x Links
        </div>

        <div className="intro">
          <h1>Access Your Account</h1>
          <div className="desc">Sign in or create an account using your email to get started.</div>
        </div>

        <div className="social-login" onClick={handleGoogleLogin}>
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" alt="" />
          </div>
          <div className="text">Continue with Google</div>
        </div>

        <h3>OR</h3>

        <div className="email-entry">
          <div className="input-container">
            <div className="input-name">Email</div>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {showOTP ? (
            <>
              <div className="otp-container">
                <div className="input-name">Enter OTP</div>
                <div className="otp-inputs">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={otp[index]}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ))}
                </div>
              </div>
              <div className="next-btn" onClick={handleVerifyOTP}>Submit</div>
            </>
          ) : (
            <div onClick={handleRequestOTP} className="next-btn">Continue</div>
          )}
        </div>

        <div className="info">
          <InfoIcon />
          Your Info is Safe - We only use your email to identify your account. No spam, no sharing — your data is securely stored and locally cached to enhance your experience.
        </div>

        <div className="links">
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/cookie-policy">Cookie Policy</a>
          <a href="/content-guidelines">Content Guidelines</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
      </div>
    </Container>
  );
};

export default Login;

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

  .top{
      font-size: 1.5rem;
      /* letter-spacing: 0.1rem; */
      font-weight: 500;
      color: #333;

      display: flex;
      align-items: center;

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

  .intro{
    margin-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
      color: #333;
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
    }
    
    .desc{
      color: #333;
      font-size: 0.85rem;
      font-weight: 200;
      text-align: center;
    }
  }

  .social-login{
    width: 100%;
    height: 50px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 100px;
    margin-top: 50px;

    display: flex;
    align-items: center;
    justify-content: center;


    img{
      height: 24px;
      margin-right: 10px;
      margin-bottom: -2px;
    }

    .text{
      font-size: 0.85rem;
      color: #333;
    }
  }

  h3{
    font-size: 1.15rem;
    color: #9a9999;
    font-weight: 500;
    margin: 20px 0;
  }

  .email-entry{
    width: 100%;
    
    .input-container{
      display: flex;
      flex-direction: column;
  
      width: 100%;
  
      .input-name{
        color: #333;
        font-size: 0.85rem;
        font-weight: 500;
      }
  
      input{
        width: 100%;
        background-color: #f9fafb;
        border: 1px solid #d1d5db;
        border-radius: 100px;
        margin-top: 10px;
        font-size: 0.85rem;
        padding: 13.6px 16px;
        color: #333;
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
  }

  .otp-container {
    margin-top: 20px;

    .input-name {
      color: #333;
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .otp-inputs {
      width: 100%;
      display: flex;

      gap: 10px;

      input {
        width: calc((100% - 25px)/6);
        height: 48px;
        text-align: center;
        font-size: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        background-color: #f9fafb;
        color: #333;

        &:focus {
          outline: 2px solid #000;
        }
      }
    }
  }

  .info{
    margin-top: 20px;
    color: #333;
    font-size: 0.75rem;
    font-weight: 200;

    svg{
      fill: #333;
      font-size: 1.15rem;
      margin-bottom: -3.5px;
      margin-right: 3.5px;
    }
  }

  .links{
    position: absolute; 
    bottom: 30px;
    margin-top: 60px;
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: 10px;

    a{
      font-size: 0.75rem;
      color: #333;
      font-weight: 200;
    }
  }

`

const BackBtn = styled.div`
  a{
    height: 40px;
    aspect-ratio: 1/1;
    border: 1px solid #d1d5db;
    background-color: rgba(255, 255, 255, 0.83);
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 10px 0px;
    border-radius: 50%;
  
    position: fixed;
    top: 20px;
    left: 20px;
  
    display: grid;
    place-items: center;
  
    svg{
      fill: #333;
    }
  }
`