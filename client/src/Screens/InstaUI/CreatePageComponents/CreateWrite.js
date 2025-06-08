import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from "@material-ui/icons/Add";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import ControlFooter from "../../../Components/ControlFooter";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useParams, useNavigate } from "react-router-dom";

const CreateWrite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [existingWriteData, setExistingWriteData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("userContentInfo");
        if (storedData) {
            const parsed = JSON.parse(storedData);
            const matchedEntry = parsed.find(entry => entry.id === id);
            if (matchedEntry) {
                setWriteData({
                    titleInside: matchedEntry.titleInside || '',
                    description: matchedEntry.description || '',
                    writeItems: matchedEntry.writeItems || []
                });
            }
        }
    }, [id]);

    const [selectedType, setSelectedType] = useState("Subheading");

    const [inputData, setInputData] = useState({
        subheading: '',
        paragraph: '',
        bulletPoint: '',
        numericPointNumber: '',
        numericPointText: '',
        linkTitle: '',
        linkUrl: ''
    });

    const [writeData, setWriteData] = useState({
        titleInside: '',
        description: '',
        writeItems: []
    });

    const handleAddItem = () => {
        let newItem = { id: Date.now().toString(), type: selectedType };

        switch (selectedType) {
            case "Subheading":
                newItem.content = inputData.subheading;
                break;
            case "Paragraph":
                newItem.content = inputData.paragraph;
                break;
            case "Bullet Point":
                newItem.content = inputData.bulletPoint;
                break;
            case "Numeric Point":
                newItem.pointNumber = inputData.numericPointNumber;
                newItem.content = inputData.numericPointText;
                break;
            case "Link":
                newItem.title = inputData.linkTitle;
                newItem.url = inputData.linkUrl;
                break;
            default:
                return;
        }

        const updatedItems = [...writeData.writeItems, newItem];
        setWriteData(prev => ({ ...prev, writeItems: updatedItems }));

        setInputData({
            subheading: '',
            paragraph: '',
            bulletPoint: '',
            numericPointNumber: '',
            numericPointText: '',
            linkTitle: '',
            linkUrl: ''
        });
    };

    useEffect(() => {
        console.log("Updated Write Items:", writeData.writeItems);
    }, [writeData.writeItems]);

    const handleSaveAndUpdate = () => {
        const storedRaw = localStorage.getItem("userContentInfo");
        let storedData = [];

        try {
            storedData = JSON.parse(storedRaw);
            if (!Array.isArray(storedData)) {
                storedData = [storedData];
            }
        } catch {
            storedData = [];
        }

        const existingEntry = storedData.find(entry => entry.id === id);

        // Preserve everything not in writeData
        const preservedFields = {};
        if (existingEntry) {
            Object.keys(existingEntry).forEach(key => {
                if (!(key in writeData)) {
                    preservedFields[key] = existingEntry[key];
                }
            });
        }

        const updatedEntry = {
            id,
            ...preservedFields,
            ...writeData, // writeData can override fields if needed
        };

        const updatedData = storedData.filter(entry => entry.id !== id);
        updatedData.push(updatedEntry);

        localStorage.setItem("userContentInfo", JSON.stringify(updatedData));

        alert("Content saved successfully!");
    };


    return (
        <Container>
            <div className="main-content">
                <div className="top-bar">
                    <a href="/page/create" className="left"><ArrowBackIosIcon /></a>
                    <a href="/page/view-edit" className="view-btn">View</a>
                </div>

                <div className="add-new-item">
                    <MainCreate>
                        <div className="input-container">
                            <div className="label">Page Heading</div>
                            <input
                                className="input-basic"
                                placeholder="Enter page heading"
                                value={writeData.titleInside}
                                onChange={(e) =>
                                    setWriteData({ ...writeData, titleInside: e.target.value })
                                }
                            />
                        </div>

                        <div className="input-container">
                            <div className="label">Description (Optional)</div>
                            <textarea
                                className="input-basic"
                                placeholder="Enter description text"
                                value={writeData.description}
                                onChange={(e) =>
                                    setWriteData({ ...writeData, description: e.target.value })
                                }
                            />
                        </div>

                        <div className="all-opts">
                            {["Subheading", "Paragraph", "Bullet Point", "Numeric Point", "Link"].map((val) => (
                                <div
                                    key={val}
                                    className={`opt ${selectedType === val ? 'selected' : ''}`}
                                    onClick={() => setSelectedType(val)}
                                >
                                    {val}
                                </div>
                            ))}
                        </div>

                        {selectedType === "Subheading" && (
                            <div className="input-container input-modified">
                                <div className="label">Subheading</div>
                                <input
                                    className="input-basic"
                                    placeholder="Enter subheading"
                                    value={inputData.subheading}
                                    onChange={(e) =>
                                        setInputData({ ...inputData, subheading: e.target.value })
                                    }
                                />
                            </div>
                        )}

                        {selectedType === "Paragraph" && (
                            <div className="input-container input-modified">
                                <div className="label">Paragraph</div>
                                <textarea
                                    className="input-basic"
                                    placeholder="Enter your paragraph"
                                    value={inputData.paragraph}
                                    onChange={(e) =>
                                        setInputData({ ...inputData, paragraph: e.target.value })
                                    }
                                />
                            </div>
                        )}

                        {selectedType === "Bullet Point" && (
                            <div className="input-container input-modified">
                                <div className="label">Bullet Point</div>
                                <textarea
                                    className="input-basic"
                                    placeholder="Enter your bullet point"
                                    value={inputData.bulletPoint}
                                    onChange={(e) =>
                                        setInputData({ ...inputData, bulletPoint: e.target.value })
                                    }
                                />
                            </div>
                        )}

                        {selectedType === "Numeric Point" && (
                            <>
                                <div className="input-container input-modified">
                                    <div className="label">Point Number</div>
                                    <input
                                        type="number"
                                        className="input-basic"
                                        placeholder="Enter point number"
                                        value={inputData.numericPointNumber}
                                        onChange={(e) =>
                                            setInputData({ ...inputData, numericPointNumber: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="input-container input-modified">
                                    <div className="label">Point Text</div>
                                    <textarea
                                        className="input-basic"
                                        placeholder="Enter your point"
                                        value={inputData.numericPointText}
                                        onChange={(e) =>
                                            setInputData({ ...inputData, numericPointText: e.target.value })
                                        }
                                    />
                                </div>
                            </>
                        )}

                        {selectedType === "Link" && (
                            <>
                                <div className="input-container input-modified">
                                    <div className="label">Link Title</div>
                                    <input
                                        className="input-basic"
                                        placeholder="Enter your link title"
                                        value={inputData.linkTitle}
                                        onChange={(e) =>
                                            setInputData({ ...inputData, linkTitle: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="input-container input-modified">
                                    <div className="label">URL</div>
                                    <input
                                        className="input-basic"
                                        placeholder="Enter your url"
                                        value={inputData.linkUrl}
                                        onChange={(e) =>
                                            setInputData({ ...inputData, linkUrl: e.target.value })
                                        }
                                    />
                                </div>
                            </>
                        )}

                        <button className="add-btn" onClick={handleAddItem}>
                            Add to your writing
                        </button>

                        <div className="line"></div>

                        <div className="preview-section">
                            {writeData.writeItems.map((item, index) => (
                                <div key={item.id} className="preview-item">
                                    {!item.isEditing ? (
                                        <>
                                            {/* <div><strong>Type:</strong> {item.type}</div> */}
                                            {item.type === "Link" ? (
                                                <div className="link">
                                                    <a href={item.url}>{item.title}</a>
                                                </div>
                                            ) : item.type === "Numeric Point" ? (
                                                <div className="numeric-point">
                                                    <div className="num">{item.pointNumber}.</div>
                                                    <p>{item.content}</p>
                                                </div>
                                            ) : item.type === "Subheading" ? (
                                                <>
                                                    <h3>{item.content}</h3>
                                                </>
                                            ) : item.type === "Paragraph" ? (
                                                <>
                                                    <p>{item.content}</p>
                                                </>
                                            ) : item.type === "Bullet Point" ? (
                                                <ul>
                                                    <li>{item.content}</li>
                                                </ul>
                                            ) : (
                                                <div>{item.content}</div>
                                            )}

                                            {/*  */}

                                            <div className="control-btns">
                                                <div className="control-btn" onClick={() => {
                                                    const updated = [...writeData.writeItems];
                                                    updated[index].isEditing = true;
                                                    setWriteData({ ...writeData, writeItems: updated });
                                                }}>Edit</div>

                                                <div className="control-btn" onClick={() => {
                                                    const updated = writeData.writeItems.filter((_, i) => i !== index);
                                                    setWriteData({ ...writeData, writeItems: updated });
                                                }}>Delete</div>
                                            </div>

                                        </>
                                    ) : (
                                        <div className="input-container input-modified">
                                            {/* Show editable fields */}
                                            {item.type === "Subheading" && (
                                                <input
                                                    className="input-basic"
                                                    value={item.content}
                                                    onChange={(e) => {
                                                        const updated = [...writeData.writeItems];
                                                        updated[index].content = e.target.value;
                                                        setWriteData({ ...writeData, writeItems: updated });
                                                    }}
                                                />
                                            )}
                                            {item.type === "Paragraph" && (
                                                <textarea
                                                    className="input-basic"
                                                    value={item.content}
                                                    onChange={(e) => {
                                                        const updated = [...writeData.writeItems];
                                                        updated[index].content = e.target.value;
                                                        setWriteData({ ...writeData, writeItems: updated });
                                                    }}
                                                />
                                            )}
                                            {item.type === "Bullet Point" && (
                                                <textarea
                                                    className="input-basic"
                                                    value={item.content}
                                                    onChange={(e) => {
                                                        const updated = [...writeData.writeItems];
                                                        updated[index].content = e.target.value;
                                                        setWriteData({ ...writeData, writeItems: updated });
                                                    }}
                                                />
                                            )}
                                            {item.type === "Numeric Point" && (
                                                <>
                                                    <input
                                                        type="number"
                                                        className="input-basic"
                                                        value={item.pointNumber}
                                                        onChange={(e) => {
                                                            const updated = [...writeData.writeItems];
                                                            updated[index].pointNumber = Number(e.target.value);
                                                            setWriteData({ ...writeData, writeItems: updated });
                                                        }}
                                                    />
                                                    <textarea
                                                        className="input-basic"
                                                        value={item.content}
                                                        onChange={(e) => {
                                                            const updated = [...writeData.writeItems];
                                                            updated[index].content = e.target.value;
                                                            setWriteData({ ...writeData, writeItems: updated });
                                                        }}
                                                    />
                                                </>
                                            )}
                                            {item.type === "Link" && (
                                                <>
                                                    <input
                                                        className="input-basic"
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const updated = [...writeData.writeItems];
                                                            updated[index].title = e.target.value;
                                                            setWriteData({ ...writeData, writeItems: updated });
                                                        }}
                                                    />
                                                    <input
                                                        className="input-basic"
                                                        value={item.url}
                                                        onChange={(e) => {
                                                            const updated = [...writeData.writeItems];
                                                            updated[index].url = e.target.value;
                                                            setWriteData({ ...writeData, writeItems: updated });
                                                        }}
                                                    />
                                                </>
                                            )}
                                            <div className="save-btn" onClick={() => {
                                                const updated = [...writeData.writeItems];
                                                updated[index].isEditing = false;
                                                setWriteData({ ...writeData, writeItems: updated });
                                            }}>Save</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="line"></div>

                        <button className="add-btn full" onClick={handleSaveAndUpdate}>
                            Save and update
                        </button>
                    </MainCreate>
                </div>
            </div>

            <ControlFooter />
        </Container>
    );
};

export default CreateWrite;


const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    padding: 30px 45px;

    display: flex;  
    flex-direction: column;
    align-items: center;

    .line{
        margin: 40px 0 20px 0;
        border-bottom: 1px solid #313231;
    }

    .item-url {
        margin-top: 5px;
        font-size: 0.75rem;
        font-weight: 300;
        color: cornflowerblue;
        letter-spacing: 0.05rem;
    }

    .light{
        opacity: 0.5;
    }
    
    .main-content{
        max-width: 500px;
        width: 100%; 

        padding-top: 40px;

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

            .color{
                color: yellowgreen;
            }

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

        .all-items {
            .item {
                width: 100%;
                min-height: 60px;
                border-radius: 10px;
                background-color: #333;
                margin-bottom: 10px;
                padding: 10px 50px;

                touch-action: none; /* Changed from manipulation to none */
                user-select: none;
                cursor: default; /* Changed from grab to default */
                display: flex;
                align-items: center;
                color: white;
                font-size: 1.2rem;
                position: relative;

                &.dragging {
                    border: 2px solid white;
                    scale: 0.85;
                    transition: transform 0.1s ease, border 0.25s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    cursor: grabbing;
                }

                .drag-btn {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    display: grid;
                    place-items: center;
                    width: 50px;
                    cursor: grab; /* Add grab cursor only to handle */
                
                    &:active {
                        cursor: grabbing;
                    }

                    svg {
                        font-size: 1.25rem;
                        opacity: 0.7;
                        transition: opacity 0.2s ease;
                    }

                    &:hover svg {
                        opacity: 1;
                    }
                }

                .item-content {
                    .item-type{
                        font-size: 0.75rem;
                        font-weight: 200;
                    }
                
                    .item-title {
                        margin-top: 5px;
                        font-size: 0.85rem;
                        font-weight: 500;
                    }
                    
                    .item-url {
                        margin-top: 5px;
                        font-size: 0.75rem;
                        font-weight: 300;
                        color: cornflowerblue;
                        letter-spacing: 0.05rem;
                    }

                    .item-duration{
                      margin-top: 5px;
                      font-size: 0.75rem;
                      font-weight: 300;
                      color: orange;
                      letter-spacing: 0.05rem;
                    }
                }

                .delete-btn{
                  position: absolute;
                  right: -10px;
                  top: -10px;

                  svg {
                    cursor: pointer;
                    font-size: 1.25rem;
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                  }

                  &:hover svg {
                      opacity: 1;
                  }
                }

                .edit-btn { 
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    display: grid;
                    place-items: center;
                    width: 50px;

                    svg {
                        cursor: pointer;
                        font-size: 1.25rem;
                        opacity: 0.7;
                        transition: opacity 0.2s ease;
                    }

                    &:hover svg {
                        opacity: 1;
                    }
                }
            }

            .subgroup{
                margin-top: 50px;
            }
            }
    }
`

const MainCreate = styled.div`
    width: 100%;
    /* margin-top: 40px; */

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

    .input-modified{
        margin-top: 10px;
        border-bottom: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .input-basic{
            margin: 0;
            margin-top: 15px;
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

        .save-btn{
          margin-top: 20px;
          border: 1px solid #363636;
          background-color: #333333;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 300;
        }
        
    }


    .all-opts{
        display: flex;
        flex-wrap: wrap;
        margin: 15px 0 30px 0;

        .opt{
            margin-top: 5px;
            padding: 10px;
            margin-right: 5px;
            border-radius: 10px;
            background-color:rgb(22, 22, 22);
            border: 1px solid #363636;
            color: #8d8d8d;
            font-size: 0.75rem;
            font-weight: 300;

            display: grid;
            place-items: center;
        }

        .selected{
            font-weight: 500;
            border-color: white;
            color: white;
        }
    }

    .add-btn{
        border: none;
        background-color: #0095f6;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 300;
        text-align: center;
    }
    
    .full{
        margin-top: 20px;
        width: 100%;
    }

    .preview-section{
        .control-btns{
            display: flex;
            align-items: center;
            margin-top: 10px;

            .control-btn{
                font-size: 0.75rem;
                color: orange;
                margin-right: 15px;
            }
        }

        h3{
            font-size: 1rem;
        }

        p{
            margin-top: 25px;
            font-size: 0.85rem;
            font-weight: 200;
        }

        ul{
            margin-left: 15px;
            margin-top: 25px;
            font-size: 0.85rem;
            font-weight: 200;
        }

        .numeric-point{
            margin-top: 25px;
            display: flex;
            align-items: flex-start;

            .num{
                font-size: 0.85rem;
                font-weight: 200;
                margin-right: 10px;
            }

            p{
                margin-top: 0px;
                font-size: 0.85rem;
                font-weight: 200;
            }
        }

        .link{
            margin-top: 25px;

            a{
                text-decoration: none;
                font-size: 0.85rem;
                font-weight: 500;
            }
        }
    }
`