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
import DeleteIcon from '@material-ui/icons/Delete';
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from "@material-ui/icons/Add";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from '@material-ui/icons/Edit';
import ControlFooter from "../../../Components/ControlFooter";
import { Switch } from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled as muiStyled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InfoIcon from '@material-ui/icons/Info';
import BasicInfo from "./BasicInfo";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { trimUrl } from '../../Helpers/trimUrl';
import { parseRichText } from '../../Helpers/parseRichText';
import Publish from "../../../Components/Publish";
import axios from 'axios';

const ITEM_TYPES = {
  SUBGROUP: 'Subgroup',
  REDIRECT: 'Redirect Link',
  ANONYMOUS: 'Anonymous Replies',
  FOLDER_REDIRECT: 'Folder for Redirect Links',
  FORM: 'Custom Form',
  // MEETING_SCHEDULER: 'Meeting Scheduler',
  WRITE_CONTENT: 'Write your content',
};

const getRouteForType = (type) => {
  switch (type) {
    case ITEM_TYPES.FOLDER_REDIRECT:
      return "folder";
    case ITEM_TYPES.FORM:
      return "form";
    case ITEM_TYPES.MEETING_SCHEDULER:
      return "meeting";
    case ITEM_TYPES.WRITE_CONTENT:
      return "write";
    default:
      return "default"; // fallback route
  }
};

const initialItems = [
  {
    id: "0",
    type: ITEM_TYPES.SUBGROUP,
    title: "My Links",
  },
  {
    id: "1",
    type: ITEM_TYPES.REDIRECT,
    title: "Sample Link",
    url: "https://google.com",
  },
];

const SortableItem = ({ item, onEdit, editingId, onSaveEdit, onCancelEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  // Initialize editData with all possible fields, including meeting scheduler fields
  const [editData, setEditData] = useState({
    title: item.title,
    url: item.url || '',
    titleInside: item.titleInside || '',
    description: item.description || '',
    question: item.question || '',
    duration: item.duration || 30,
    // Initialize all days with their current values or defaults
    mondayEnabled: item.mondayEnabled !== false,
    mondayTimes: item.mondayTimes || '',
    tuesdayEnabled: item.tuesdayEnabled !== false,
    tuesdayTimes: item.tuesdayTimes || '',
    wednesdayEnabled: item.wednesdayEnabled !== false,
    wednesdayTimes: item.wednesdayTimes || '',
    thursdayEnabled: item.thursdayEnabled !== false,
    thursdayTimes: item.thursdayTimes || '',
    fridayEnabled: item.fridayEnabled !== false,
    fridayTimes: item.fridayTimes || '',
    saturdayEnabled: item.saturdayEnabled || false,
    saturdayTimes: item.saturdayTimes || '',
    sundayEnabled: item.sundayEnabled || false,
    sundayTimes: item.sundayTimes || ''
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
    zIndex: isDragging ? 100 : 'auto',
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (editingId === item.id) {
    return (
      <div className="item editing">
        <MainEdit>
          <div className="input-container">
            <div className="label">Title</div>
            <input
              className="input-basic"
              value={editData.title}
              onChange={(e) => handleEditChange('title', e.target.value)}
            />
          </div>

          {(item.type === ITEM_TYPES.REDIRECT) && (
            <div className="input-container">
              <div className="label">URL</div>
              <input
                className="input-basic"
                value={editData.url}
                onChange={(e) => handleEditChange('url', e.target.value)}
              />
            </div>
          )}

          {(item.type !== ITEM_TYPES.REDIRECT && item.type !== ITEM_TYPES.ANONYMOUS && item.type !== ITEM_TYPES.SUBGROUP) && (
            <a href={`${getRouteForType(item.type)}/${item.id}`} className="inside-edit-btn">
              <div className="text">View or Update inside content</div>
              <ChevronRightIcon />
            </a>
          )}

          {item.type === ITEM_TYPES.ANONYMOUS && (
            <div className="input-container">
              <div className="label">Question</div>
              <textarea
                className="input-basic"
                value={editData.question}
                onChange={(e) => handleEditChange('question', e.target.value)}
              />
            </div>
          )}

          <div className="edit-actions">
            <button className="save-btn" onClick={() => onSaveEdit(item.id, editData)}>
              Save
            </button>
            <button className="cancel-btn" onClick={onCancelEdit}>
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
      className={`item ${isDragging ? 'dragging' : ''} ${item.type.toLowerCase().replace(' ', '-')}`}
    >
      <div className="drag-btn" {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </div>
      <div className="item-content">
        <div className="item-type">Type : <b>{item.type}</b></div>
        <div className="item-title">{parseRichText(item.title)}</div>
        {item.url && (
          <a href={item.url} target="_blank" className="item-url" rel="noopener noreferrer">
            {trimUrl(item.url)}
          </a>
        )}
        {item.question && <div className="item-ques">{item.question}</div>}
      </div>
      <div className="edit-btn" onClick={() => onEdit(item.id)}>
        <EditIcon />
      </div>
      <div className="delete-btn" onClick={() => onDelete(item.id)}>
        <HighlightOffIcon />
      </div>
    </div>
  );
};

const CreateYourPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [items, setItems] = useState([]);
  const [lastUpdatedIST, setLastUpdatedIST] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/advanced-info/`, {
          withCredentials: true
        });

        const publishedData = res.data;
        const publishedTime = publishedData.lastUpdated;

        console.log(typeof (JSON.parse(publishedData.localStorageData.localSaved)));
        console.log(typeof (initialItems));


        const dateIST = new Date(publishedTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });


        setLastUpdatedIST(dateIST);
        localStorage.setItem("publishedTime", dateIST);

        const saved = localStorage.getItem("userContentInfo");
        console.log(saved);

        localStorage.setItem("publishedData", JSON.stringify(JSON.parse(publishedData.localStorageData.localSaved)));

        if (!saved || saved === "undefined") {
          console.log("1");
          localStorage.setItem("userContentInfo", JSON.stringify(JSON.parse(publishedData.localStorageData.localSaved)));
          setItems(JSON.parse(publishedData.localStorageData.localSaved)); // Use from API
          console.log(JSON.parse(publishedData.localStorageData.localSaved));
        } else {
          console.log("2");
          setItems(JSON.parse(saved)); // Use from localStorage
        }
      } catch (err) {
        console.log("3");
        console.error("Error fetching published data:", err);
        setItems(initialItems); // fallback to default
      }
    };

    fetchData();
  }, []);

  const [newItemData, setNewItemData] = useState({
    title: '',
    url: '',
    titleInside: '',
    description: '',
    question: '',
    duration: 30, // Default meeting duration
    // Initialize all days as enabled with empty times
    mondayEnabled: true,
    mondayTimes: '',
    tuesdayEnabled: true,
    tuesdayTimes: '',
    wednesdayEnabled: true,
    wednesdayTimes: '',
    thursdayEnabled: true,
    thursdayTimes: '',
    fridayEnabled: true,
    fridayTimes: '',
    saturdayEnabled: false,
    saturdayTimes: '',
    sundayEnabled: false,
    sundayTimes: ''
  });

  useEffect(() => {
    if (items.length > 0) localStorage.setItem("userContentInfo", JSON.stringify(items));
  }, [items]);

  const [itemType, setItemType] = useState(ITEM_TYPES.SUBGROUP);
  const [editingId, setEditingId] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
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
    if (!newItemData.title.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      type: itemType,
      title: newItemData.title,
      ...(itemType === ITEM_TYPES.REDIRECT && { url: newItemData.url }),
      ...(itemType === ITEM_TYPES.ANONYMOUS && { question: newItemData.question }),
    };

    setItems([...items, newItem]);

    // Reset form
    setNewItemData({
      title: '',
      url: '',
      titleInside: '',
      description: '',
      question: '',
      formItems: [],
      duration: 30,
      mondayEnabled: true,
      mondayTimes: '',
      tuesdayEnabled: true,
      tuesdayTimes: '',
      wednesdayEnabled: true,
      wednesdayTimes: '',
      thursdayEnabled: true,
      thursdayTimes: '',
      fridayEnabled: true,
      fridayTimes: '',
      saturdayEnabled: false,
      saturdayTimes: '',
      sundayEnabled: false,
      sundayTimes: ''
    });
  };

  const handleDelete = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleEditItem = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id, editData) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, ...editData } : item
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleNewItemChange = (field, value) => {
    setNewItemData(prev => ({ ...prev, [field]: value }));
  };

  const getPlaceholder = (field) => {
    switch (field) {
      case 'title':
        return itemType === ITEM_TYPES.REDIRECT
          ? "Enter your title eg. My latest instagram reel"
          : itemType === ITEM_TYPES.FORM
            ? "Enter form title eg. Contact Us"
            : "Enter link title";
      case 'url':
        return "Enter your URL, eg. instagram.com/reel/DH-55c";
      case 'titleInside':
        return "Enter internal title shown on the form";
      case 'description':
        return "Enter description text";
      default:
        return "";
    }
  };

  const checkDataDifference = () => {
    const savedLocal = localStorage.getItem("userContentInfo");
    const savedGlobal = localStorage.getItem("publishedData");
    
    return savedLocal !== savedGlobal;
  };

  const [showPublish, setShowPublish] = useState(true);

  useEffect(() => {
    console.log("checkDataDifference : ", checkDataDifference());
    
    if(checkDataDifference() == true) setShowPublish(true);
    else setShowPublish(false);
  }, [items])

  return (
    <Container>
      {
        showPublish && <Publish />
      }

      <div className="main-content">
        <BasicInfo />
        <div className="add-new-item">
          <div className="selector">
            <div
              className="add-type"
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            >

              <div className="top">
                <div>{itemType}</div>
                <ExpandMoreIcon />
              </div>

              <div className="bottom">
                {showTypeDropdown && (
                  <div className="type-dropdown">
                    {Object.values(ITEM_TYPES).map(type => (
                      <div
                        key={type}
                        onClick={() => {
                          setItemType(type);
                          setShowTypeDropdown(false);
                        }}
                        className="select-opt"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <MainCreate>
            <div className="input-container">
              <div className="label">Title</div>
              <input
                className="input-basic"
                value={newItemData.title}
                onChange={(e) => handleNewItemChange('title', e.target.value)}
                placeholder={getPlaceholder('title')}
              />
            </div>

            {(itemType === ITEM_TYPES.REDIRECT) && (
              <div className="input-container">
                <div className="label">URL</div>
                <input
                  className="input-basic"
                  value={newItemData.url}
                  onChange={(e) => handleNewItemChange('url', e.target.value)}
                  placeholder={getPlaceholder('url')}
                />
              </div>
            )}

            {itemType === ITEM_TYPES.ANONYMOUS && (
              <div className="input-container">
                <div className="label">Question</div>
                <textarea
                  className="input-basic"
                  value={newItemData.question}
                  onChange={(e) => handleNewItemChange('question', e.target.value)}
                  placeholder="Enter your anonymous question"
                />
              </div>
            )}

            <button className="add-btn" onClick={handleAddItem}>
              Add to Page
            </button>
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
                  onDelete={handleDelete}
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

    .meeting-select{
      .info{
        margin: 20px 0;
        display: flex;
        align-items: flex-start;

        svg{
          font-size: 1.25rem;
        }
        
        .text{
          margin-left: 10px;
          font-size: 0.7rem;
          font-weight: 200;
          letter-spacing: 0.05rem;
        }
      }

      .day-container{
        display: flex;
        flex-direction: column;

        .day-open{
          .switch{
            scale: 0.75;
          }
  
          label{
            font-size: 0.7rem;
          }
          
        }      
  
        .day-time{
          .input-container{
            width: 100%;
            margin: 0px 0 20px 0;
            border-bottom: none;
            padding-bottom: 0;

            input:disabled {
              border: none;
              /* background-color: #363636; */
            }
          }
        }
      }


    }

    .light{
        opacity: 0.5;
    }
    
    .main-content{
        max-width: 500px;
        width: 100%; 

        padding-top: 70px;

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
                    /* background-color: #333;
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-size: 0.85rem; */
                    /* margin-right: 20px; */
    
                    display: flex;
                    flex-direction: column;
                    // align-items: center;
                    // justify-content: space-between;
    
                    font-weight: 200;
                    letter-spacing: 0.06rem;

                    .top{
                      background-color: #333;
                      padding: 10px 20px;
                      border-radius: 10px;
                      font-size: 0.85rem;
                      font-weight: 500;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    }

                    .bottom{
                      .select-opt{
                        background-color: #161616;
                        border: 1px solid #363636;
                        padding: 10px 20px;
                        border-radius: 10px;
                        font-size: 0.85rem;
                        margin: 10px 0;
                      }

                      &:last-child {
                        margin-bottom: 0;
                      }
                    }
    
                    svg{
                        font-size: 1.5rem;
                    }
                }
    
                .add-btn{
                  border: none;
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


                        b{
                          font-weight: 500;
                          text-transform: uppercase;
                          letter-spacing: 0.05rem;
                        }
                    }
                
                    .item-title {
                        margin-top: 5px;
                        font-size: 0.85rem;
                        font-weight: 500;
                        /* word-wrap: break-word;
                        overflow-wrap: break-word;
                        white-space: normal; */
                    }
                    
                    .item-url {
                        margin-top: 5px;
                        font-size: 0.75rem;
                        font-weight: 300;
                        color: cornflowerblue;
                        letter-spacing: 0.05rem;
                        text-decoration: none;
                        word-break: break-all;
                        overflow-wrap: anywhere;
                        white-space: normal;
                    }

                    .item-ques {
                        margin-top: 5px;
                        font-size: 0.75rem;
                        font-weight: 300;
                        color: yellowgreen;
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

    .save-btn{
      margin-top: 20px;
      border: 1px solid #363636;
      background-color: #333333;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 300;
    }

    .add-btn{
        border: none;
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
    /* border-bottom: 1px solid white; */
    border-top: 1px solid #333333;
    border-bottom: 1px solid #333333;

    display: flex;
    flex-direction: column;

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

    .inside-edit-btn{
      width: 100%;
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: transparent;
      border: 1px solid #fff;
      padding: 15px;
      color: white;
      text-decoration: none;
      /* text-align: center; */
      font-size: 0.75rem;
      font-weight: 300;

      display: flex;
      align-items: center;
      justify-content: space-between;
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