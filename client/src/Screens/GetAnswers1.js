import React, { useState } from "react";
import styled from "styled-components";

const GetAnswers = () => {
  const [replies, setReplies] = useState([]);
  const [input, setInput] = useState("");

  const handleReply = () => {
    if (input.trim() !== "") {
      setReplies([input, ...replies]);
      setInput("");
    }
  };

  return (
    <Container>
      <div className="main-content glass">
        <div className="title">What are your honest thoughts on my Instagram profile?</div>
        <div className="desc">
          I'm trying to improve my personal brand. Feel free to give feedback on the vibe, content, or overall look. Be honest!
        </div>
        <textarea
          className="ans-input"
          placeholder="Write your anonymous reply here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="btn" onClick={handleReply}>Send Reply</div>
      </div>

      {replies.length > 0 && (
        <>
          <div className="group-name-container">
            <div className="group-name-container-line" />
            <div className="group-name">All Replies</div>
            <div className="group-name-container-line" />
          </div>

          {replies.map((reply, index) => (
            <div className="main-content glass" key={index}>
              <div className="desc">{reply}</div>
            </div>
          ))}
        </>
      )}
    </Container>
  );
};

export default GetAnswers;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    /* background-color: #333; */
    /* background-image: url('https://media0.giphy.com/media/4IlgE2iRukYIMbZsJZ/200w.gif?cid=82a1493bkue5enzruga0dznx3jz7dllsooyi1zkknv6pn3kp&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    /* background-image: url('https://media4.giphy.com/media/YT4z922u0PlOHhoap2/200w.gif?cid=82a1493biu02p2az2bwfiwfoefie5fkywswq32j54a9hjslv&ep=v1_gifs_related&rid=200w.gif&ct=g'); */
    /* background-image: url('https://media3.giphy.com/media/L1X6XcN2oxS08VrquP/giphy.gif?cid=6c09b952kh7p7oq0fwgeyinqxeaeiykmyvxtlulyyg3cr6m4&ep=v1_gifs_search&rid=giphy.gif&ct=g'); */
    /* background-image: url('https://cdn.dribbble.com/users/2773311/screenshots/14473889/media/91fad3184d4d4c377c32cba06da2d0a1.gif'); */
    background-image: url('https://media1.giphy.com/media/tNt8ZSSrwNHzQcPABV/200w.gif?cid=82a1493bqjkhddxjr340tneezzrwuqsy9ld4pmddvavjwlip&ep=v1_gifs_related&rid=200w.gif&ct=g');
    
    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    background-position: center;
    background-attachment: fixed;

    padding: 30px;

    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;

    .main-content{
        width: calc(100vw - 60px);
        max-width: 450px;
        background-color: #3e3e3e;
        /* background: linear-gradient(135deg, #dfe9f3, #ffffff);  */
        /* min-height: calc(100vh - 150px); */
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        padding: 35px;

        .title{
            font-size: 1.25rem;
            margin-bottom: 10px;
            
        }

        .desc{
            margin-bottom: 10px;
            font-weight: 300;
            font-size: 0.9rem;
            color: #eae0e0;
        }

        .ans-input{
            width: 100%;
            border-radius: 30px;
            height: 300px;
            outline: none;
            background-color: #648be8;
            border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for glass effect */
            padding: 20px;
            color: white;
        }

        .btn{
            margin-top: 10px;
            background-color: yellowgreen;
            font-size: 0.85rem;
            color: #333;
            font-weight: 600;
            padding: 15px 15px;
            width: 100%;
            border-radius: 30px;
            text-align: center;
        }
    }

    .group-name-container{
        margin: 30px 0;
        padding: 0 35px;

        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        .group-name{
            font-size: 0.85rem;
            margin: 0 10px;
        }

        .group-name-container-line{
            height: 3px;
            border-radius: 100px;
            background-color:rgb(213, 209, 209);
            flex: 1;
        }
    }

    .glass {
        background: rgba(255, 255, 255, 0.2); /* Transparent white */
        border-radius: 16px; /* Rounded corners */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
        backdrop-filter: blur(10px); /* Background blur effect */
        -webkit-backdrop-filter: blur(10px); /* For Safari support */
        border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for glass effect */
    }

    .join-us{
        width: calc(100vw - 60px);
        max-width: 450px;
        background-color: whitesmoke;
        border-radius: 30px;
        height: 60px;
        margin-top: 30px;
    }
`