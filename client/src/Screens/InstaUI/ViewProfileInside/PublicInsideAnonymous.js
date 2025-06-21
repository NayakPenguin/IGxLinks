import React, { useState } from "react";
import styled from "styled-components";
import { parseRichText } from "../../Helpers/parseRichText";
import PublicBackControl from "./PublicBackControl";
import axios from "axios";

// Axios instance
const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const PublicInsideAnonymous = ({ data, username }) => {
  const [input, setInput] = useState("");
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (input.trim() === "") return;

    try {
      setLoading(true);

      // console.log("📤 Submitting anonymous response:", {
        userContentId: data.id,
        type: "anonymous",
        ownerId: data.ownerId,
        data: { reply: input }
      });

      const res = await api.post("/response", {
        userContentId: data.id,
        type: "anonymous",
        ownerId: username,
        data: { reply: input }
      });

      // console.log("✅ Response submitted:", res.data);

      // Optionally update local replies UI
      setReplies([input, ...replies]);
      setInput("");
    } catch (err) {
      console.error("❌ Failed to submit response:", err);
      alert("Failed to send response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="main-content">
        <PublicBackControl username={username} />
        <div className="question">
          {parseRichText(data.question ? data.question : "")}
        </div>

        <textarea
          className="ans-input"
          placeholder="Write your anonymous reply here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="main-btns">
          <div className="btn-1 trans" onClick={handleReply}>
            {loading ? "Sending..." : "Send"}
          </div>
        </div>

        <div className="extra-btns">
          <div className="svg-frd">
            <svg aria-label="Share" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
              <title>Share</title>
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083" />
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PublicInsideAnonymous;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    /* padding-bottom: 100px; */

    /* background-size: cover; */
    /* background-repeat: no-repeat; */
    /* background-position: center; */
    /* background-attachment: fixed; */

    padding: 30px;

    display: flex;  
    flex-direction: column;
    align-items: center;

    .main-content{
        width: 100%;
        max-width: 500px;
        padding-top: 30px;

        position: relative;
        
        .back-control{
            position: fixed;
            top: 0px;
            left: 0px;

            border-bottom: 1px solid #313231;

            height: 60px;
            width: 100vw;

            display: flex;
            align-items: center;
    
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
        }
        
        .question{
            font-size: 1.25rem;
            margin-top: 20px;
            font-weight: 500;
            width: 100%;

            strong{
                font-weight: 500;
            }
        }

        .desc{
            margin-top: 10px;
            font-weight: 200;
            font-size: 0.85rem;
        }

        .ans-input{
            width: 100%;
            border-radius: 10px;
            height: 200px;
            margin: 20px 0 -5px 0;
            outline: none;
            /* background-color: transparent; */
            background-color:rgb(22, 22, 22);
            border: 1px solid #363636;
            border-bottom: none;
            padding: 20px;
            color: white;
            resize: none;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .main-btns{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .btn-1{
                width: 100%;
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #0095f6;
                border-radius: 10px;
                text-align: center;
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }

            .secondary{
                background-color: #363636;
            }

            .trans{
                background-color: transparent;
                border: 1px solid rgb(119, 118, 118);
            }
        }

        .extra-btns{
            padding: 20px 0;
            display: flex;
            align-items: center;

            svg{
                margin-right: 15px;
                /* fill: grey; */
                font-size: 1.75rem;
            }

            .fadeicon{
                fill: grey;
            }

            .svg-frd{
                margin-bottom: -5px;
            }
        }

        .comment-info{
            font-size: 0.75rem;
            font-weight: 200;
            font-style: italic;
        }
    }
`