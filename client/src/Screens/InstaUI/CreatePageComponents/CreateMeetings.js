import React, { useEffect, useRef, useState } from "react";
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
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ITEM_TYPES = {
    REDIRECT: 'Redirect',
    SUBGROUP: 'Subgroup',
    // FOLDER_REDIRECT: 'Folder for Redirect Links',
    FORM: 'Custom Form',
    MEETING_SCHEDULER: 'Meeting Scheduler',
};

const initialItems = [
    {
        id: "0",
        type: ITEM_TYPES.SUBGROUP,
        title: "My Links",
        openSection: false
    },
    {
        id: "1",
        type: ITEM_TYPES.REDIRECT,
        title: "Sample Link",
        url: "https://google.com",
        openSection: false
    },
];

const IOSSwitch = muiStyled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const CreateMeetings = () => {
    const [modelFormAddOpen, setModelFormAddOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Text');

    const options = ['Text', 'Long Answer', 'Email', 'Number'];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("userContentInfo");
        return saved ? JSON.parse(saved) : initialItems;
    });

    const [newItemData, setNewItemData] = useState({
        title: '',
        url: '',
        titleInside: '',
        description: '',
        formItems: [],
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
        localStorage.setItem("userContentInfo", JSON.stringify(items));
    }, [items]);

    const [itemType, setItemType] = useState(ITEM_TYPES.REDIRECT);

    const handleAddItem = () => {
        if (!newItemData.title.trim()) return;

        const newItem = {
            id: Date.now().toString(),
            type: itemType,
            title: newItemData.title,
            ...(itemType === ITEM_TYPES.REDIRECT && { url: newItemData.url }),
            ...((itemType === ITEM_TYPES.FORM || itemType === ITEM_TYPES.MEETING_SCHEDULER) && {
                titleInside: newItemData.titleInside,
                description: newItemData.description,
            }),
            ...(itemType === ITEM_TYPES.FORM && { formItems: formItems }),
            ...(itemType === ITEM_TYPES.MEETING_SCHEDULER && {
                duration: newItemData.duration,
                mondayEnabled: newItemData.mondayEnabled,
                mondayTimes: newItemData.mondayTimes,
                tuesdayEnabled: newItemData.tuesdayEnabled,
                tuesdayTimes: newItemData.tuesdayTimes,
                wednesdayEnabled: newItemData.wednesdayEnabled,
                wednesdayTimes: newItemData.wednesdayTimes,
                thursdayEnabled: newItemData.thursdayEnabled,
                thursdayTimes: newItemData.thursdayTimes,
                fridayEnabled: newItemData.fridayEnabled,
                fridayTimes: newItemData.fridayTimes,
                saturdayEnabled: newItemData.saturdayEnabled,
                saturdayTimes: newItemData.saturdayTimes,
                sundayEnabled: newItemData.sundayEnabled,
                sundayTimes: newItemData.sundayTimes
            }),
            openSection: false
        };

        setItems([...items, newItem]);

        // Reset form
        setNewItemData({
            title: '',
            url: '',
            titleInside: '',
            description: '',
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
        setFormItems([]);
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

    const [formItems, setFormItems] = useState([
        { id: '1', type: 'Text', title: 'Sample Text', placeholder: 'Sample Placeholder' },
    ]);

    const generateTimeSlots = (start = "09:00", end = "22:00") => {
        const slots = [];
        let [h, m] = start.split(":").map(Number);
        const [endH, endM] = end.split(":").map(Number);

        while (h < endH || (h === endH && m <= endM)) {
            const hour = h % 12 === 0 ? 12 : h % 12;
            const meridian = h < 12 ? "AM" : "PM";
            const formatted = `${hour}:${m.toString().padStart(2, '0')} ${meridian}`;
            slots.push(formatted);

            m += 15;
            if (m >= 60) {
                m -= 60;
                h += 1;
            }
        }

        return slots;
    };

    const slots = generateTimeSlots();
    const selectedRef = useRef(null);

    const [selectedTime, setSelectedTime] = useState("12:00 PM");

    useEffect(() => {
        if (selectedRef.current) {
            selectedRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [selectedTime]);

    return (
        <Container>
            {
                modelFormAddOpen ?
                    <ModelConatiner>
                        <div className="model-closer" onClick={() => setModelFormAddOpen(false)}></div>
                        <div className="model">
                            <div className="all-times">
                                {slots.map((time) => (
                                    <div
                                        key={time}
                                        className={`one-time ${time === selectedTime ? "selected-time" : ""}`}
                                        ref={time === selectedTime ? selectedRef : null}
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ModelConatiner> : null
            }
            <div className="main-content">
                <div className="top-bar">
                    <a href="/page/create" className="left">
                        <ArrowBackIosIcon />
                    </a>
                    <a href="/page/view-edit" className="view-btn">View</a>
                </div>
                <div className="add-new-item">
                    <MainCreate>
                        <div className="input-container">
                            <div className="label">Heading</div>
                            <input
                                className="input-basic"
                                value={newItemData.titleInside}
                                onChange={(e) => handleNewItemChange('titleInside', e.target.value)}
                                placeholder={getPlaceholder('titleInside')}
                            />
                        </div>
                        <div className="input-container">
                            <div className="label">Description (Optional)</div>
                            <textarea
                                className="input-basic"
                                value={newItemData.description}
                                onChange={(e) => handleNewItemChange('description', e.target.value)}
                                placeholder={getPlaceholder('description')}
                            />
                        </div>

                        <div className="input-container">
                            <div className="label">Meeting Duration (in Minutes)</div>
                            <input
                                className="input-basic"
                                type="number"
                                value={newItemData.duration || ''}
                                onChange={(e) => handleNewItemChange('duration', e.target.value)}
                                placeholder="30"
                                min="0"
                            />
                        </div>

                        <div className="meeting-select">
                            <div className="info">
                                <InfoIcon />
                                <div className="text">
                                    Enter your weekly availability by specifying time slots for each day you're generally free. You can edit this later if needed.
                                </div>
                            </div>

                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <div className="day-container" key={day}>
                                    <div className="day-open">
                                        <FormControlLabel
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    marginLeft: '-5px'
                                                },
                                            }}
                                            control={
                                                <IOSSwitch
                                                    sx={{ m: 1 }}
                                                    checked={newItemData[`${day.toLowerCase()}Enabled`] !== false}
                                                    onChange={(e) => handleNewItemChange(
                                                        `${day.toLowerCase()}Enabled`,
                                                        e.target.checked
                                                    )}
                                                    className="switch"
                                                />
                                            }
                                            label={day}
                                        />
                                    </div>
                                    <div className="day-time">
                                        <div className="input-container-2">
                                            {/* <input
                                                className="input-basic"
                                                value={newItemData[`${day.toLowerCase()}Times`] || ''}
                                                onChange={(e) => handleNewItemChange(
                                                    `${day.toLowerCase()}Times`,
                                                    e.target.value
                                                )}
                                                placeholder={newItemData[`${day.toLowerCase()}Enabled`] === true ? "eg., 09:00-12:00, 14:00-18:00" : "Not available on this day."}
                                                disabled={newItemData[`${day.toLowerCase()}Enabled`] === false}
                                            /> */}

                                            <div className="input-time">
                                                09:00 AM
                                            </div>

                                            <RemoveIcon className="space" />

                                            <div className="input-time">
                                                10:30 AM
                                            </div>

                                            <div className="add-more-time-btn">
                                                <AddIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="add-btn" onClick={handleAddItem}>
                            Add to Page
                        </button>
                    </MainCreate>
                </div>
            </div>
            <ControlFooter />
        </Container>
    );
};

export default CreateMeetings;

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
    /* background-color: #313231; */
    margin-top: 40px;
    /* border-radius: 20px; */
    /* border-left: 10px solid white; */
    /* border-right: 2px solid white; */
    /* padding: 0 0 0 20px; */


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

    .input-container-2{
        width: 100%;
        padding-bottom: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
        
        display: flex;
        align-items: center;

        .label{
            font-size: 0.75rem;
            font-weight: 500;
        }

        .input-time{
            width: 100%;
            border-radius: 10px;
            background-color:rgb(22, 22, 22);
            border: 1px solid #363636;
            padding: 7.5px 15px;
            color: white;
            resize: none;
            font-size: 0.75rem;
            font-weight: 300;
        }

        .space{
            margin: 0 10px;
        }

        svg{
            font-size: 1.15rem;
        }

        .add-more-time-btn{
            display: grid;
            place-items: center; 
            margin-left: 10px;
        }

        textarea{
            height: 200px;
        }
    }

    .form-content{
      width: 100%;
      margin-top: 30px;
      border-bottom: 1px solid #313231ba;
      padding-bottom: 20px;
      /* background-color: orange; */

      .content-title{
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 20px;
      }

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
              
              .item-placeholder {
                  margin-top: 5px;
                  font-size: 0.75rem;
                  font-weight: 300;
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
      
      .add-field-btn{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;

          .line{
            flex: 1;
            height: 2px;
            border-radius: 100px;
            background-color: #696969;
          }

          .text{
            font-size: 0.75rem;
            margin: 0 10px;
          }
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
const ModelConatiner = styled.div`
    width: 100vw;
    height: calc(100vh - 60px);
    
    z-index: 1002;
    
    position: fixed;
    top: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;

    .model-closer{
        width: 100vw;
        height: calc(100vh - 60px);
        
        position: absolute;
        top: 0;
        left: 0;
        
        background-color: #00000085; 
    }

    .model{ 
        width: 80%;
        /* height: 70%; */
        max-width: 400px;
        border-radius: 10px;
        /* margin-top: -50px; */
        background-color: #111;
        border: 1px solid #333;
        z-index: 1009;
        padding: 20px;

        .model-title{
          color: #333;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .all-times{
            display: flex;
            flex-direction: column;
            align-items: center;

            max-height: 400px;
            overflow-y: scroll;

            .one-time{
                width: 100%;
                padding: 10px;
                margin: 5px;
                /* background-color: orange; */
                font-size: 0.85rem;
                text-align: center;
                border-radius: 10px;
            }

            .selected-time{
                background-color: orange;
            }
        }

        .all-times::-webkit-scrollbar {
            display: none;
        }
    }
`