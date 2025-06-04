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
import RoomIcon from "@material-ui/icons/Room";
import AddIcon from "@material-ui/icons/Add";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from '@material-ui/icons/Edit';
import ControlFooter from "../../Components/ControlFooter";

const initialItems = [
    {
        id: "1",
        type: "Redirect",
        title: "My Instagram",
        url: "https://instagram.com",
        openSection: false
    },
    {
        id: "2",
        type: "Redirect",
        title: "My YouTube",
        url: "https://youtube.com",
        openSection: false
    }
];

const SortableItem = ({ item, onEdit, editingId, onSaveEdit, onCancelEdit }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const [editTitle, setEditTitle] = useState(item.title);
    const [editUrl, setEditUrl] = useState(item.url || '');

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
        zIndex: isDragging ? 100 : 'auto',
    };

    if (editingId === item.id) {
        return (
            <div className="item editing">
                <MainEdit>
                    <div className="input-container">
                        <div className="label">Title</div>
                        <input
                            className="input-basic"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    </div>
                    {item.type === 'Redirect' && (
                        <div className="input-container">
                            <div className="label">URL</div>
                            <input
                                className="input-basic"
                                value={editUrl}
                                onChange={(e) => setEditUrl(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="edit-actions">
                        <button
                            className="save-btn"
                            onClick={() => onSaveEdit(item.id, editTitle, editUrl)}
                        >
                            Save
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={() => onCancelEdit()}
                        >
                            Cancel
                        </button>
                    </div>
                </MainEdit>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`item ${isDragging ? 'dragging' : ''} ${item.type === 'Subgroup' ? 'subgroup' : ''}`}
        >
            <div className="drag-btn" {...attributes} {...listeners}>
                <DragIndicatorIcon />
            </div>
            <div className="item-content">
                <div className="item-type">Type : {item.type}</div>
                <div className="item-title">{item.title}</div>
                {item.url && (
                    <div className="item-url">{item.url}</div>
                )}
            </div>
            <div className="edit-btn" onClick={() => onEdit(item.id)}>
                <EditIcon/>
            </div>
        </div>
    );
};

const CreateYourPage = () => {
    const [items, setItems] = useState(initialItems);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemUrl, setNewItemUrl] = useState('');
    const [itemType, setItemType] = useState('Redirect');
    const [editingId, setEditingId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    };

    const handleAddItem = () => {
        if (!newItemTitle.trim()) return;

        const newItem = {
            id: Date.now().toString(),
            type: itemType,
            title: newItemTitle,
            ...(itemType === 'Redirect' && { url: newItemUrl }),
            openSection: false
        };

        setItems([...items, newItem]);
        setNewItemTitle('');
        setNewItemUrl('');
    };

    const handleEditItem = (id) => {
        setEditingId(id);
    };

    const handleSaveEdit = (id, newTitle, newUrl) => {
        setItems(items.map(item =>
            item.id === id
                ? { ...item, title: newTitle, url: newUrl }
                : item
        ));
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    useEffect(() => {
        console.log("Updated item order:", items);
    }, [items]);

    return (
        <Container>
            <div className="main-content">
                <div className="top-bar">
                    <div className="left">
                        <b>Last Published :</b> <br /> 25 May 9:16AM (UTC)
                    </div>
                    <div className="view-btn">View</div>
                </div>

                <div className="user-data">
                    <div className="logo-x-dp">
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                            alt=""
                        />
                    </div>
                    <div className="name">Your Name</div>
                    <div className="about-header">Your Role @Your Organisation</div>
                    <div className="about-desc">Your bio</div>
                    <div className="about-location">
                        <RoomIcon /> Your Location
                    </div>

                    <div className="socials">
                        <div className="social-icon">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
                                alt=""
                            />
                        </div>
                        <div className="social-icon">
                            <img
                                src="https://www.svgrepo.com/show/416500/youtube-circle-logo.svg"
                                alt=""
                            />
                        </div>
                        <div className="social-icon light">
                            <img
                                src="https://cdn2.downdetector.com/static/uploads/c/300/f52a5/image11.png"
                                alt=""
                            />
                        </div>
                        <div className="social-icon light">
                            <img
                                src="https://downloadr2.apkmirror.com/wp-content/uploads/2020/10/91/5f9b61e42640e.png"
                                alt=""
                            />
                        </div>
                        <div className="social-icon">
                            <AddIcon />
                        </div>
                    </div>
                </div>

                <div className="add-new-item">
                    <div className="selector">
                        <div className="add-type" onClick={() => setItemType(prev =>
                            prev === 'Redirect' ? 'Subgroup' : 'Redirect')}>
                            <div>{itemType === 'Redirect' ? 'Redirect Links' : 'Subgroup Title'}</div>
                            <ExpandMoreIcon />
                        </div>
                        {/* <div className="add-btn">Add</div> */}
                    </div>

                    <MainCreate>
                        <div className="input-container">
                            <div className="label">Enter Title</div>
                            <input
                                className="input-basic"
                                placeholder={itemType === 'Redirect' ?
                                    "Enter your title eg. My latest instagram reel" :
                                    "Enter subgroup title"}
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                            />
                        </div>
                        {itemType === 'Redirect' && (
                            <div className="input-container">
                                <div className="label">Enter URL</div>
                                <input
                                    className="input-basic"
                                    placeholder="Enter your URL, eg. instagram.com/reel/DH-55c"
                                    value={newItemUrl}
                                    onChange={(e) => setNewItemUrl(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="add-btn" onClick={handleAddItem}>
                            Add to Page
                        </div>
                    </MainCreate>

                </div>

                <div className="all-items">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                            {items.map((item) => (
                                <SortableItem
                                    key={item.id}
                                    item={item}
                                    editingId={editingId}
                                    onEdit={handleEditItem}
                                    onSaveEdit={handleSaveEdit}
                                    onCancelEdit={handleCancelEdit}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
            <ControlFooter />
        </Container>
    );
};

export default CreateYourPage;

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #000;

    margin-bottom: 64px;

    padding: 30px 45px;

    display: flex;  
    flex-direction: column;
    align-items: center;

    .light{
        opacity: 0.5;
    }
    
    .main-content{
        max-width: 500px;
        width: 100%; 

        padding-top: 70px;

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
            }

            .name{
                margin-top: 20px;
                font-weight: 500;
                text-align: center;
            }

            .about-header{
                margin-top: 10px;
                font-weight: 500;
                font-size: 0.85rem;
                text-align: center;
            }

            .about-desc{
                margin-top: 10px;
                font-weight: 200;
                font-size: 0.85rem;
                text-align: center;
            }

            .about-location{
                margin-top: 10px;
                font-weight: 500;
                font-size: 0.85rem;
                text-align: center;

                svg{
                    font-size: 1rem;
                    margin-bottom: -2px;
                }
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
                        fill: #333;
                    }
                }
            }
        }

        .add-new-item{
            padding: 40px 0;
            margin-bottom: 40px;
            
            border-bottom: 1px solid #313232;
            
            .selector{
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                .add-type{
                    flex: 1;
                    background-color: #333;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    /* margin-right: 20px; */
    
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
    
                    font-weight: 200;
                    letter-spacing: 0.06rem;
    
                    svg{
                        font-size: 1.5rem;
                    }
                }
    
                .add-btn{
                    background-color: #0095f6;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 500;
                }
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
    /* background-color: #313231; */
    margin-top: 40px;
    /* border-radius: 20px; */
    border-left: 10px solid white;
    /* border-right: 2px solid white; */

    padding: 0 0 0 20px;

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

    .add-btn{
        margin-top: 20px;
        background-color: #0095f6;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 300;
        text-align: center;
    }
`

const MainEdit = styled.div`
    width: calc(100% + 100px);
    padding: 30px 0px;
    /* border-left: 10px solid white; */
    /* border-radius: 10px; */
    margin: -10px -50px;
    background-color: black;
    border-bottom: 1px solid #333333;
    border-top: 1px solid #333333;

    .input-container{
        width: 100%;
        /* border-bottom: 1px solid #313231ba; */
        /* padding-bottom: 20px; */
        margin-bottom: 20px;

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

    .edit-actions{
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        button{
            width: calc(50% - 10px);
            border: none;
            background-color: #0095f6;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.75rem;
            font-weight: 300;
            text-align: center;
            cursor: pointer;
        }
    }

`