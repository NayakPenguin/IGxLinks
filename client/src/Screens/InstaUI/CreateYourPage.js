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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from "@material-ui/icons/Add";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from '@material-ui/icons/Edit';
import ControlFooter from "../../Components/ControlFooter";
import { Switch } from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled as muiStyled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ITEM_TYPES = {
  REDIRECT: 'Redirect',
  SUBGROUP: 'Subgroup',
  // FOLDER_REDIRECT: 'Folder for Redirect Links',
  FORM: 'Custom Form',
  MEETING_SCHEDULER: 'Meeting Scheduler',
};

const initialItems = [
  {
    id: "1",
    type: ITEM_TYPES.REDIRECT,
    title: "My Instagram",
    url: "https://instagram.com",
    openSection: false
  },
  {
    id: "2",
    type: ITEM_TYPES.FORM,
    title: "Contact Form",
    titleInside: "Get in Touch",
    description: "Fill out this form to contact us",
    openSection: false
  }
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

          {(item.type === ITEM_TYPES.FORM || item.type === ITEM_TYPES.MEETING_SCHEDULER) && (
            <>
              <div className="input-container">
                <div className="label">Title Inside</div>
                <input
                  className="input-basic"
                  value={editData.titleInside}
                  onChange={(e) => handleEditChange('titleInside', e.target.value)}
                />
              </div>
              <div className="input-container">
                <div className="label">Description</div>
                <input
                  className="input-basic"
                  value={editData.description}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                />
              </div>
            </>
          )}

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

          {(item.type === ITEM_TYPES.MEETING_SCHEDULER) && (
            <>
              <div className="input-container">
                <div className="label">Meeting Duration (in Minutes)</div>
                <input
                  className="input-basic"
                  type="number"
                  value={editData.duration}
                  onChange={(e) => handleEditChange('duration', parseInt(e.target.value) || 30)}
                  placeholder="30"
                  min="1"
                />
              </div>

              <div className="meeting-select">
                <div className="info">
                  <div className="text">
                    Write available times in 24-hour format, using "-" between start and end times,
                    and "," between different time slots. Example: "09:00-12:00, 14:00-18:00"
                  </div>
                </div>

                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                  const dayLower = day.toLowerCase();
                  return (
                    <div className="day-container" key={day}>
                      <div className="day-open">
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              sx={{ m: 1 }}
                              checked={editData[`${dayLower}Enabled`]}
                              onChange={(e) => handleEditChange(
                                `${dayLower}Enabled`,
                                e.target.checked
                              )}
                            />
                          }
                          label={day}
                        />
                      </div>
                      <div className="day-time">
                        <div className="input-container">
                          <input
                            className="input-basic"
                            value={editData[`${dayLower}Times`]}
                            onChange={(e) => handleEditChange(
                              `${dayLower}Times`,
                              e.target.value
                            )}
                            placeholder={day === 'Monday' ? "09:00-12:00, 14:00-18:00" : "..."}
                            disabled={!editData[`${dayLower}Enabled`]}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
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
        <div className="item-type">Type: {item.type}</div>
        <div className="item-title">{item.title}</div>
        {item.url && <div className="item-url">{item.url}</div>}
        {item.type === ITEM_TYPES.MEETING_SCHEDULER && (
          <div className="item-duration">Duration: {item.duration} mins</div>
        )}
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

const FormContentItem = ({ item, index, onEdit, onDelete, onReorder }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`item ${isDragging ? 'dragging' : ''}`}
    >
      <div className="drag-btn" {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </div>
      <div className="item-content">
        <div className="item-type">Type: {item.type}</div>
        <div className="item-title">{item.title}</div>
        {item.placeholder && <div className="item-placeholder">{item.placeholder}</div>}
      </div>
      <div className="edit-btn" onClick={() => onEdit(index)}>
        <EditIcon />
      </div>
      <div className="delete-btn" onClick={() => onDelete(index)}>
        <HighlightOffIcon />
      </div>
    </div>
  );
};

const CreateYourPage = () => {
  const [items, setItems] = useState(initialItems);
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
    console.log('====================================');
    console.log(items);
    console.log('====================================');
  }, [items]);

  const [itemType, setItemType] = useState(ITEM_TYPES.REDIRECT);
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

  const [formItems, setFormItems] = useState([
    { id: '1', type: 'Text', title: 'Sample Text', placeholder: 'Sample Placeholder' },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...formItems[index] });
  };

  const handleDragEndForm = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = formItems.findIndex(item => item.id === active.id);
      const newIndex = formItems.findIndex(item => item.id === over.id);
      setFormItems(arrayMove(formItems, oldIndex, newIndex));
    }
  };

  const handleSaveEditForm = () => {
    const updatedItems = [...formItems];
    updatedItems[editingIndex] = editData;
    setFormItems(updatedItems);
    setEditingIndex(null);
  };

  const handleDeleteForm = (index) => {
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    setFormItems([
      ...formItems,
      { id: Date.now().toString(), type: 'Text', title: 'New Field', placeholder: '' }
    ]);
  };

  return (
    <Container>
      <div className="main-content">
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

            {(itemType === ITEM_TYPES.FORM || itemType === ITEM_TYPES.MEETING_SCHEDULER) && (
              <>
                <div className="input-container">
                  <div className="label">Title Inside</div>
                  <input
                    className="input-basic"
                    value={newItemData.titleInside}
                    onChange={(e) => handleNewItemChange('titleInside', e.target.value)}
                    placeholder={getPlaceholder('titleInside')}
                  />
                </div>
                <div className="input-container">
                  <div className="label">Description (Optional)</div>
                  <input
                    className="input-basic"
                    value={newItemData.description}
                    onChange={(e) => handleNewItemChange('description', e.target.value)}
                    placeholder={getPlaceholder('description')}
                  />
                </div>
              </>
            )}

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

            {itemType === ITEM_TYPES.FORM && (
              <div className="form-content">
                <div className="content-title">Form Content</div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndForm}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={formItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    {formItems.map((item, index) => (
                      <FormContentItem
                        key={item.id}
                        item={item}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDeleteForm}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                {editingIndex !== null && (
                  <div className="form-edit">
                    <div className="input-container">
                      <div className="label">Field Title</div>
                      <input
                        className="input-basic"
                        value={editData.title}
                        onChange={e => setEditData({ ...editData, title: e.target.value })}
                        placeholder={getPlaceholder('Field Title')}
                      />
                    </div>
                    <div className="input-container">
                      <div className="label">Placeholder</div>
                      <input
                        className="input-basic"
                        value={editData.placeholder}
                        onChange={e => setEditData({ ...editData, placeholder: e.target.value })}
                        placeholder={getPlaceholder('Placeholder')}
                      />
                    </div>
                    <button className="save-btn" onClick={handleSaveEditForm}>Save Field</button>
                  </div>
                )}

                <div className="add-field-btn" onClick={handleAddField}>
                  <div className="line"></div>
                  <div className="text">Add Field + </div>
                  <div className="line"></div>
                </div>
              </div>
            )}

            {(itemType === ITEM_TYPES.MEETING_SCHEDULER) && (
              <>
                <div className="input-container">
                  <div className="label">Meeting Duration (in Minutes)</div>
                  <input
                    className="input-basic"
                    type="number"
                    value={newItemData.duration || ''}
                    onChange={(e) => handleNewItemChange('duration', e.target.value)}
                    placeholder="30"
                    min="1"
                  />
                </div>

                <div className="meeting-select">
                  <div className="info">
                    <div className="text">
                      Write available times in 24-hour format, using "-" between start and end times,
                      and "," between different time slots. Example: "09:00-10:30, 20:15-23:00"
                    </div>
                  </div>

                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div className="day-container" key={day}>
                      <div className="day-open">
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              sx={{ m: 1 }}
                              checked={newItemData[`${day.toLowerCase()}Enabled`] !== false}
                              onChange={(e) => handleNewItemChange(
                                `${day.toLowerCase()}Enabled`,
                                e.target.checked
                              )}
                            />
                          }
                          label={day}
                        />
                      </div>
                      <div className="day-time">
                        <div className="input-container">
                          <input
                            className="input-basic"
                            value={newItemData[`${day.toLowerCase()}Times`] || ''}
                            onChange={(e) => handleNewItemChange(
                              `${day.toLowerCase()}Times`,
                              e.target.value
                            )}
                            placeholder={day === 'Monday' ? "09:00-12:00, 14:00-18:00" : "..."}
                            disabled={newItemData[`${day.toLowerCase()}Enabled`] === false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
      
      // edit from the parent
      .input-container{
        width: 100%;
        margin-top: 20px;
        border-bottom: none;
        padding-bottom: 0;
        /* background-color: orange; */

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

const MainEdit = styled.div`
    width: calc(100% + 100px);
    padding: 30px 0px;
    /* border-left: 10px solid white; */
    /* border-radius: 10px; */
    margin: -10px -50px;
    background-color: black;
    border-bottom: 1px solid white;
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