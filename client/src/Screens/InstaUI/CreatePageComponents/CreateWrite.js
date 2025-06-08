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

    const [writeData, setWriteData] = useState({
        titleInside: '',
        description: '',
        writeItems: [
            {
                id: '1',
                type: 'Sub-heading',
                content: 'This is a sub heading',
            },
            {
                id: '2',
                type: 'para',
                content: 'this is a paragraph',
            }
        ]
    });

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
                            />
                        </div>

                        <div className="input-container">
                            <div className="label">Description (Optional)</div>
                            <textarea
                                className="input-basic"
                                placeholder="Enter description text"
                            />
                        </div>

                        <div className="all-opts">
                                {["Subheading", "Paragraph", "Bullet Point", "Numeric Point", "Link"].map((val) => (
                                    <div
                                        className={`opt ${val == "Bullet Point" ? 'selected' : ''}`}
                                    >
                                        {val}
                                    </div>
                                ))}
                            </div>

                            <div className="input-container input-modified">
                                <div className="label">Subheading</div>
                            <input
                                className="input-basic"
                                placeholder="Enter subheading"
                            />
                        </div>

                        <div className="input-container input-modified">
                            <div className="label">Paragraph</div>
                            <textarea
                                className="input-basic"
                                placeholder="Enter paragraph"
                            />
                        </div>

                        <button className="add-btn">
                            Add to your writing
                        </button>

                        <button className="add-btn full">
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
`