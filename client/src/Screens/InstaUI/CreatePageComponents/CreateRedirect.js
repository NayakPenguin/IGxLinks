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

// FormContentItem.jsx
const FormContentItem = ({ item, index, onEdit, onDelete }) => {
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
                {item.url && <div className="item-url">{item.url}</div>}
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

// CreateRedirect.jsx
const CreateRedirect = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [existingFormData, setExistingFormData] = useState(null);

    const [formData, setFormData] = useState({
        titleInside: '',
        description: '',
        linkItems: [
            {
                id: '1',
                type: 'Text',
                title: 'Sample Title',
                url: 'https://example.com',
            }
        ]
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("userContentInfo") || "[]");
        const existingItem = saved.find(item => item.id === id);

        if (existingItem) {
            setIsEditMode(true);
            setExistingFormData(existingItem);
            setFormData({
                titleInside: existingItem.titleInside || '',
                description: existingItem.description || '',
                linkItems: existingItem.linkItems || []
            });
        }
    }, [id]);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({});

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditData({ ...formData.linkItems[index] });
    };

    const handleSaveEditForm = () => {
        const updated = [...formData.linkItems];
        updated[editingIndex] = editData;
        setFormData({ ...formData, linkItems: updated });
        setEditingIndex(null);
    };

    const handleDeleteForm = (index) => {
        setFormData(prev => ({
            ...prev,
            linkItems: prev.linkItems.filter((_, i) => i !== index)
        }));
    };

    const handleDragEndForm = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = formData.linkItems.findIndex(item => item.id === active.id);
        const newIndex = formData.linkItems.findIndex(item => item.id === over.id);
        const newItems = arrayMove(formData.linkItems, oldIndex, newIndex);
        setFormData({ ...formData, linkItems: newItems });
    };

    const handleNewItemChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddNewField = () => {
        const newField = {
            id: Date.now().toString(),
            type: 'Text',
            title: 'Sample Link Title',
            url: 'example.com',
        };
        setFormData(prev => ({
            ...prev,
            linkItems: [...prev.linkItems, newField]
        }));
    };


    const handleSaveForm = () => {
        const savedItems = JSON.parse(localStorage.getItem("userContentInfo") || "[]");

        const updatedItem = {
            ...(isEditMode && { title: existingFormData.title }),
            id: isEditMode ? id : Date.now().toString(),
            type: "Folder for Redirect Links",
            titleInside: formData.titleInside,
            description: formData.description,
            linkItems: formData.linkItems,
            updatedAt: new Date().toISOString(),
            ...(isEditMode ? {} : {
                createdAt: new Date().toISOString(),
                title: 'Default Title'
            })
        };

        const updatedItems = isEditMode
            ? savedItems.map(item => item.id === id ? updatedItem : item)
            : [...savedItems, updatedItem];

        localStorage.setItem("userContentInfo", JSON.stringify(updatedItems));
        navigate('/page/view-edit');
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
                            <div className="label">Form Heading</div>
                            <input
                                className="input-basic"
                                value={formData.titleInside}
                                onChange={(e) => handleNewItemChange('titleInside', e.target.value)}
                                placeholder="Enter internal title shown on the form"
                            />
                        </div>

                        <div className="input-container">
                            <div className="label">Description (Optional)</div>
                            <textarea
                                className="input-basic"
                                value={formData.description}
                                onChange={(e) => handleNewItemChange('description', e.target.value)}
                                placeholder="Enter description text"
                            />
                        </div>

                        <div className="form-content">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEndForm}
                                modifiers={[restrictToVerticalAxis]}
                            >
                                <SortableContext
                                    items={formData.linkItems.map(i => i.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {formData.linkItems.map((item, index) => (
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
                                        <div className="label">Link Title</div>
                                        <input
                                            className="input-basic"
                                            value={editData.title}
                                            onChange={e => setEditData({ ...editData, title: e.target.value })}
                                            placeholder="Enter link title"
                                        />
                                    </div>

                                    <div className="input-container">
                                        <div className="label">Link URL</div>
                                        <input
                                            className="input-basic"
                                            value={editData.url}
                                            onChange={e => setEditData({ ...editData, url: e.target.value })}
                                            placeholder="https://example.com"
                                        />
                                    </div>

                                    <button className="save-btn" onClick={handleSaveEditForm}>Save Field</button>
                                </div>
                            )}

                            <div className="add-field-btn" onClick={handleAddNewField}>
                                <div className="line"></div>
                                <div className="text"><AddIcon /></div>
                                <div className="line"></div>
                            </div>
                        </div>

                        <button className="add-btn full" onClick={handleSaveForm}>
                            {isEditMode ? "Update List" : "Add to Page"}
                        </button>
                    </MainCreate>
                </div>
            </div>

            <ControlFooter />
        </Container>
    );
};

export default CreateRedirect;


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

        .add-new-item{
            /* padding: 20px 0; */
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

                .full{
                    margin-top: 20px;
                    width: 100%;
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

            svg{
                margin-bottom: -5px;
            }
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

    .full{
        margin-top: 20px;
        width: 100%;
    }
`