import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import ControlFooter from "../../../Components/ControlFooter";
import { Switch } from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled as muiStyled } from '@mui/material/styles';
import InfoIcon from '@material-ui/icons/Info';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams, useNavigate } from "react-router-dom";

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
    const [modelTimeAddOpen, setModelTimeAddOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [existingMeetingData, setExistingMeetingData] = useState(null);
    const [selectedSlotMeta, setSelectedSlotMeta] = useState({ day: null, index: null, type: null });
    const [minTimeForPicker, setMinTimeForPicker] = useState("00:00");
    const [maxTimeForPicker, setMaxTimeForPicker] = useState("23:45");

    const parseTimeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours % 12 * 60 + minutes;
        if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
        return totalMinutes;
    };

    const formatMinutesToTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60) % 24;
        const mins = totalMinutes % 60;
        const period = hours < 12 ? 'AM' : 'PM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
    };

    // Function to merge overlapping time slots
    const mergeOverlappingSlots = (slots) => {
        if (slots.length <= 1) return slots;

        // Convert to minutes and sort
        const slotsInMinutes = slots.map(slot => ({
            start: parseTimeToMinutes(slot.start),
            end: parseTimeToMinutes(slot.end)
        })).sort((a, b) => a.start - b.start);

        const merged = [slotsInMinutes[0]];

        for (let i = 1; i < slotsInMinutes.length; i++) {
            const last = merged[merged.length - 1];
            const current = slotsInMinutes[i];

            if (current.start <= last.end) {
                // Overlapping or adjacent, merge them
                last.end = Math.max(last.end, current.end);
            } else {
                merged.push(current);
            }
        }

        // Convert back to time strings
        return merged.map(slot => ({
            start: formatMinutesToTime(slot.start),
            end: formatMinutesToTime(slot.end)
        }));
    };

    // Initialize with existing data from localStorage if available
    const getInitialAvailability = () => {
        const savedItems = JSON.parse(localStorage.getItem("userContentInfo") || "[]");
        const existingItem = savedItems.find(item => item.id === id);

        // Helper function to ensure consistent time formatting
        const formatTimeSlot = (slot) => {
            if (!slot) return { start: '09:00 AM', end: '10:30 AM' };
            return {
                start: formatTimeString(slot.start),
                end: formatTimeString(slot.end)
            };
        };

        const formatTimeString = (timeStr) => {
            if (!timeStr) return '09:00 AM';
            if (timeStr.includes(' ')) return timeStr;

            try {
                const [hours, minutes] = timeStr.split(':').map(Number);
                const period = hours < 12 ? 'AM' : 'PM';
                const displayHours = hours % 12 === 0 ? 12 : hours % 12;
                return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
            } catch (e) {
                console.warn('Failed to format time string:', timeStr);
                return '09:00 AM';
            }
        };

        if (existingItem && existingItem.availability) {
            // Safely handle availability data
            const availability = {};
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            days.forEach(day => {
                const dayData = existingItem.availability[day];

                // Handle missing or invalid day data
                if (!dayData) {
                    availability[day] = {
                        enabled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day),
                        slots: []
                    };
                    return;
                }

                // Process slots if they exist
                const slots = Array.isArray(dayData.slots)
                    ? dayData.slots.map(slot => formatTimeSlot(slot))
                    : [];

                availability[day] = {
                    enabled: !!dayData.enabled,
                    slots: mergeOverlappingSlots(slots)
                };
            });

            return availability;
        }

        // Default availability with consistent formatting
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            .reduce((acc, day) => {
                acc[day] = {
                    enabled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day),
                    slots: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day)
                        ? [{ start: '09:00 AM', end: '10:30 AM' }]
                        : []
                };
                return acc;
            }, {});
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: 30,
        availability: getInitialAvailability()
    });

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("userContentInfo") || "[]");
        const existingItem = savedItems.find(item => item.id === id);

        if (id) {
            console.log("Id : ", id);
            
            if (existingItem) {
                setIsEditMode(true);
                setExistingMeetingData(existingItem);
                setFormData({
                    title: existingItem.title || '',
                    description: existingItem.description || '',
                    duration: existingItem.duration || 30,
                    availability: existingItem.availability || getInitialAvailability()
                });
                console.log("formData : ", formData);
                
            } else {
                // navigate('/pagenotfound');
            }
        }
    }, [id, navigate]);

    const getPlaceholder = (field) => {
        switch (field) {
            case 'title':
                return "Enter link title";
            case 'url':
                return "Enter your URL, eg. instagram.com/reel/DH-55c";
            case 'titleInside':
                return "Enter heading for this page";
            case 'description':
                return "Enter description text";
            default:
                return "";
        }
    };

    const generateTimeSlots = (start = "00:00", end = "23:45") => {
        const slots = [];
        let [h, m] = start.split(":").map(Number);
        const [endH, endM] = end.split(":").map(Number);

        while (h < endH || (h === endH && m <= endM)) {
            const hour = h % 12 === 0 ? 12 : h % 12;
            const meridian = h < 12 ? "AM" : "PM";
            // Ensure two-digit formatting for hours (09 instead of 9)
            const formatted = `${hour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${meridian}`;
            slots.push(formatted);

            m += 15;
            if (m >= 60) {
                m -= 60;
                h += 1;
            }
        }

        return slots;
    };

    const getNextAvailableTime = (day, index) => {
        if (selectedSlotMeta.type === 'start' && index > 0) {
            const prevEndTime = formData.availability[day].slots[index - 1].end;
            const minutes = parseTimeToMinutes(prevEndTime) + 15;
            return formatMinutesToTime(minutes);
        }
        return "00:00";
    };

    const selectedRef = useRef(null);
    const [selectedTime, setSelectedTime] = useState("09:00 AM");

    useEffect(() => {
        if (selectedRef.current && modelTimeAddOpen) {
            selectedRef.current.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }, [selectedTime, modelTimeAddOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleInputClick = (day, index, type, currentTime) => {
        setSelectedSlotMeta({ day, index, type });
        setSelectedTime(currentTime);

        if (type === 'end') {
            const startTime = formData.availability[day].slots[index].start;
            const startMinutes = parseTimeToMinutes(startTime);
            setMinTimeForPicker(formatMinutesToTime(startMinutes + 15).split(' ')[0]);
            setMaxTimeForPicker("23:45");
        } else { // start time
            const baseTime = getNextAvailableTime(day, index);
            setMinTimeForPicker(baseTime.split(' ')[0]);
            setMaxTimeForPicker("23:30");
        }

        setModelTimeAddOpen(true);
    };

    const handleDayToggle = (day, enabled) => {
        setFormData(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: {
                    enabled,
                    slots: enabled ? (prev.availability[day].slots.length === 0
                        ? [{ start: '09:00 AM', end: '10:30 AM' }]
                        : prev.availability[day].slots) : []
                }
            }
        }));
    };

    const handleAddTimeSlot = (day) => {
        const lastSlot = formData.availability[day].slots[formData.availability[day].slots.length - 1];
        const defaultStart = lastSlot ?
            formatMinutesToTime(parseTimeToMinutes(lastSlot.end) + 15) :
            '09:00 AM';

        const startMinutes = parseTimeToMinutes(defaultStart);
        const endMinutes = Math.min(startMinutes + 90, parseTimeToMinutes("11:45 PM"));
        const defaultEnd = formatMinutesToTime(endMinutes);

        setFormData(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: {
                    ...prev.availability[day],
                    slots: [
                        ...prev.availability[day].slots,
                        { start: defaultStart, end: defaultEnd }
                    ]
                }
            }
        }));
    };

    const handleRemoveTimeSlot = (day, index) => {
        setFormData(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: {
                    ...prev.availability[day],
                    slots: prev.availability[day].slots.filter((_, i) => i !== index)
                }
            }
        }));
    };

    const handleTimeSelection = (time) => {
        const { day, index, type } = selectedSlotMeta;

        if (day !== null && index !== null && type) {
            setFormData(prev => {
                const updatedSlots = [...prev.availability[day].slots];
                const currentSlot = updatedSlots[index];

                if (type === 'end') {
                    const startMinutes = parseTimeToMinutes(currentSlot.start);
                    const endMinutes = parseTimeToMinutes(time);
                    if (endMinutes <= startMinutes) {
                        time = formatMinutesToTime(startMinutes + 15);
                    }
                } else if (type === 'start') {
                    const startMinutes = parseTimeToMinutes(time);
                    const endMinutes = parseTimeToMinutes(currentSlot.end);
                    if (startMinutes >= endMinutes) {
                        time = formatMinutesToTime(endMinutes - 15);
                    }
                    if (index > 0) {
                        const prevEndMinutes = parseTimeToMinutes(prev.availability[day].slots[index - 1].end);
                        if (startMinutes < prevEndMinutes + 15) {
                            time = formatMinutesToTime(prevEndMinutes + 15);
                        }
                    }
                }

                updatedSlots[index] = {
                    ...updatedSlots[index],
                    [type]: time
                };

                // Merge overlapping slots after update
                const mergedSlots = mergeOverlappingSlots(updatedSlots);

                return {
                    ...prev,
                    availability: {
                        ...prev.availability,
                        [day]: {
                            ...prev.availability[day],
                            slots: mergedSlots
                        }
                    }
                };
            });
        }
        setModelTimeAddOpen(false);
    };

    const handleSaveMeeting = () => {
        const savedItems = JSON.parse(localStorage.getItem("userContentInfo") || "[]");

        // Merge overlapping slots before saving
        const mergedAvailability = {};
        Object.keys(formData.availability).forEach(day => {
            mergedAvailability[day] = {
                enabled: formData.availability[day].enabled,
                slots: mergeOverlappingSlots(formData.availability[day].slots)
            };
        });

        const newItem = {
            id: isEditMode ? id : Date.now().toString(),
            type: "Meeting Scheduler",
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            availability: mergedAvailability,
            createdAt: isEditMode ? existingMeetingData.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        let updatedItems;
        if (isEditMode) {
            updatedItems = savedItems.map(item =>
                item.id === id ? newItem : item
            );
        } else {
            updatedItems = [...savedItems, newItem];
        }

        localStorage.setItem("userContentInfo", JSON.stringify(updatedItems));
        navigate('/page/create');
    };

    const slots = generateTimeSlots(minTimeForPicker, maxTimeForPicker);

    return (
        <Container>
            {modelTimeAddOpen &&
                <ModelConatiner>
                    <div className="model-closer" onClick={() => setModelTimeAddOpen(false)}></div>
                    <div className="model">
                        <div className="all-times">
                            {slots.map((time) => (
                                <div
                                    key={time}
                                    className={`one-time ${time === selectedTime ? "selected-time" : ""}`}
                                    ref={time === selectedTime ? selectedRef : null}
                                    onClick={() => handleTimeSelection(time)}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>
                </ModelConatiner>
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
                                placeholder={getPlaceholder('titleInside')}
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <div className="label">Description (Optional)</div>
                            <textarea
                                className="input-basic"
                                placeholder={getPlaceholder('description')}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <div className="label">Meeting Duration (in Minutes)</div>
                            <input
                                className="input-basic"
                                type="number"
                                placeholder="30"
                                min="0"
                                value={formData.duration}
                                onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                            />
                        </div>

                        <div className="meeting-select">
                            <div className="info">
                                <InfoIcon />
                                <div className="text">
                                    Enter your weekly availability by specifying time slots for each day you're generally free. You can edit this later if needed.
                                </div>
                            </div>

                            {Object.keys(formData.availability).map(day => (
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
                                                    className="switch"
                                                    checked={formData.availability[day]?.enabled}
                                                    onChange={(e) => handleDayToggle(day, e.target.checked)}
                                                />
                                            }
                                            label={day}
                                        />
                                    </div>

                                    <div className="day-time">
                                        {formData.availability[day].enabled && formData.availability[day].slots.map((slot, index) => (
                                            <div className="input-container-2" key={index}>
                                                <div
                                                    className="input-time"
                                                    onClick={() => handleInputClick(day, index, 'start', slot.start)}
                                                >
                                                    {slot.start}
                                                </div>

                                                <RemoveIcon className="space" />

                                                <div
                                                    className="input-time"
                                                    onClick={() => handleInputClick(day, index, 'end', slot.end)}
                                                >
                                                    {slot.end}
                                                </div>

                                                {index === 0 ? (
                                                    <div className="add-more-time-btn" onClick={() => handleAddTimeSlot(day)}>
                                                        <AddIcon />
                                                    </div>
                                                ) : (
                                                    <div className="add-more-time-btn" onClick={() => handleRemoveTimeSlot(day, index)}>
                                                        <DeleteIcon />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="add-btn" onClick={handleSaveMeeting}>
                            {isEditMode ? "Update Meeting" : "Add to Page"}
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
        margin: 30px 0;
        /* margin-bottom: 50px; */
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
        margin-bottom: 20px;

        .day-open{
          margin-bottom: 10px;
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
            padding: 20px 0;
            /* margin-bottom: 20px; */
            /* border-bottom: 1px solid #313232; */
            
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
        /* margin-bottom: 20px; */
        
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
            padding: 7.5px 0;
            color: white;
            resize: none;
            font-size: 0.75rem;
            font-weight: 300;
            text-align: center;
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
                padding: 10px 0;
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

