import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import { parseRichText } from "../../Helpers/parseRichText";
import PublicBackControl from "./PublicBackControl";
import axios from "axios";

// Axios instance with credentials
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const PublicInsideForm = ({ data, username }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (title, value) => {
    setAnswers((prev) => ({ ...prev, [title]: value }));
  };

  const handleSend = async () => {
    try {
      setLoading(true);

      const response = await api.post("/response", {
        userContentId: data.id,
        type: "form",
        ownerId: username,
        data: {
          answers: Object.entries(answers).map(([question, answer]) => ({
            question,
            answer
          }))
        }
      });

      console.log("✅ Response submitted", response.data);
      alert("Response submitted!");
      setAnswers({});
    } catch (err) {
      console.error("❌ Failed to submit response", err);
      alert("Failed to send response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="main-content">
        <PublicBackControl username={username} />
        <div className="title">{parseRichText(data.titleInside)}</div>
        <div className="desc">{parseRichText(data.description)}</div>

        {data.formItems.map((item, key) => {
          if (["Text", "Email", "Number"].includes(item.type)) {
            return (
              <div key={key} className="input-container">
                <div className="label">{item.title}</div>
                <input
                  className="input-basic"
                  placeholder={item.placeholder}
                  value={answers[item.title] || ""}
                  onChange={(e) => handleInputChange(item.title, e.target.value)}
                />
              </div>
            );
          } else if (item.type === "Long Answer") {
            return (
              <div key={key} className="input-container">
                <div className="label">{item.title}</div>
                <textarea
                  className="input-basic"
                  placeholder={item.placeholder}
                  rows={4}
                  value={answers[item.title] || ""}
                  onChange={(e) => handleInputChange(item.title, e.target.value)}
                />
              </div>
            );
          } else {
            return null;
          }
        })}

        <div className="main-btns">
          <div className="btn-1 trans" onClick={handleSend}>
            {loading ? "Sending..." : "Send"}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PublicInsideForm;

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
        
        .title{
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

            strong{
                font-weight: 500;
            }
        }

        .input-container{
            width: 100%;
            margin-top: 30px;
            border-bottom: 1px solid #313231ba;
            padding-bottom: 20px;
            /* background-color: orang e; */

            .label{
                font-size: 0.75rem;
                font-weight: 500;
            }

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

            textarea{
                height: 200px;
            }
        }

        .main-btns{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 30px;

            .btn-1{
                width: 100%;
                font-size: 0.85rem;
                padding: 10px 15px;
                background-color: #0095f6;
                border-radius: 10px;
                text-align: center;
            }

            .secondary{
                background-color: #363636;
            }

            .trans{
                /* background-color: transparent; */
                border: 1px solid rgb(119, 118, 118);
            }
        }
    }

`