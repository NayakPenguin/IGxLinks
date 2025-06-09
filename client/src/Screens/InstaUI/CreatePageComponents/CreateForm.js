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

const CreateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [existingFormData, setExistingFormData] = useState(null);

    const [modelFormAddOpen, setModelFormAddOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Text');
    const options = ['Text', 'Long Answer', 'Email', 'Number'];

    // Initialize form data
    const [formData, setFormData] = useState({
        titleInside: '',
        description: '',
        formItems: [
            { id: '1', type: 'Text', title: 'Sample Text', placeholder: 'Sample Placeholder' },
        ]
    });

    // Load existing data if in edit mode
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("userContentInfo") || []);
        const existingItem = savedItems.find(item => item.id === id);

        if (id) {
            if (existingItem) {
                setIsEditMode(true);
                setExistingFormData(existingItem);
                setFormData({
                    titleInside: existingItem.titleInside || '',
                    description: existingItem.description || '',
                    formItems: existingItem.formItems || []
                });
            } else {
                // navigate('/pagenotfound');
            }
        }
    }, [id, navigate]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const saveOptionSelect = () => {
        setModelFormAddOpen(false);
        setFormData(prev => ({
            ...prev,
            formItems: [
                ...prev.formItems,
                {
                    id: Date.now().toString(),
                    type: selectedOption,
                    title: 'New Field',
                    placeholder: ''
                }
            ]
        }));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    );

    const handleNewItemChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getPlaceholder = (field) => {
        switch (field) {
            case 'titleInside':
                return "Enter internal title shown on the form";
            case 'description':
                return "Enter description text";
            default:
                return "";
        }
    };

    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({});

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditData({ ...formData.formItems[index] });
    };

    const handleDragEndForm = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = formData.formItems.findIndex(item => item.id === active.id);
            const newIndex = formData.formItems.findIndex(item => item.id === over.id);
            setFormData(prev => ({
                ...prev,
                formItems: arrayMove(prev.formItems, oldIndex, newIndex)
            }));
        }
    };

    const handleSaveEditForm = () => {
        setFormData(prev => {
            const updatedItems = [...prev.formItems];
            updatedItems[editingIndex] = editData;
            return { ...prev, formItems: updatedItems };
        });
        setEditingIndex(null);
    };

    const handleDeleteForm = (index) => {
        setFormData(prev => ({
            ...prev,
            formItems: prev.formItems.filter((_, i) => i !== index)
        }));
    };

    const handleAddField = () => {
        setModelFormAddOpen(true);
    };

    const handleSaveForm = () => {
        const savedItems = JSON.parse(localStorage.getItem("userContentInfo") || []);

        const newItem = {
            // Preserve specific fields from existing data
            ...(isEditMode && {
                title: existingFormData.title,
                // Add any other fields you want to preserve here
                someOtherField: existingFormData.someOtherField
            }),

            // Updated fields
            id: isEditMode ? id : Date.now().toString(),
            type: "Custom Form",
            titleInside: formData.titleInside,
            description: formData.description,
            formItems: formData.formItems,
            updatedAt: new Date().toISOString(),

            // New item fields
            ...(!isEditMode && {
                createdAt: new Date().toISOString(),
                title: 'Default Title' // Set default title for new forms if needed
            })
        };

        // Rest of the save logic remains the same
        let updatedItems;
        if (isEditMode) {
            updatedItems = savedItems.map(item =>
                item.id === id ? newItem : item
            );
        } else {
            updatedItems = [...savedItems, newItem];
        }

        localStorage.setItem("userContentInfo", JSON.stringify(updatedItems));
        navigate('/page/view-edit');
    };

    return (
        <Container>
            {modelFormAddOpen && (
                <ModelConatiner>
                    <div className="model-closer" onClick={() => setModelFormAddOpen(false)}></div>
                    <div className="model">
                        <div className="model-title">Select the kind of form field you want to create</div>
                        <div className="checkboxes">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    className="opt"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedOption === option}
                                        onChange={() => { }}
                                        readOnly
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                        <div className="done-btn" onClick={saveOptionSelect}>Done</div>
                    </div>
                </ModelConatiner>
            )}

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
                            <div className="label">Form Heading</div>
                            <input
                                className="input-basic"
                                value={formData.titleInside}
                                onChange={(e) => handleNewItemChange('titleInside', e.target.value)}
                                placeholder={getPlaceholder('titleInside')}
                            />
                        </div>

                        <div className="input-container">
                            <div className="label">Description (Optional)</div>
                            <textarea
                                className="input-basic"
                                value={formData.description}
                                onChange={(e) => handleNewItemChange('description', e.target.value)}
                                placeholder={getPlaceholder('description')}
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
                                    items={formData.formItems.map(item => item.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {formData.formItems.map((item, index) => (
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
                                    <button className="save-btn" onClick={handleSaveEditForm}>
                                        Save Field
                                    </button>
                                </div>
                            )}

                            <div className="add-field-btn" onClick={handleAddField}>
                                <div className="line"></div>
                                <div className="text"><AddIcon /></div>
                                <div className="line"></div>
                            </div>
                        </div>

                        <button className="add-btn full" onClick={handleSaveForm}>
                            {isEditMode ? "Update Form" : "Add to Page"}
                        </button>
                    </MainCreate>
                </div>
            </div>

            <ControlFooter />
        </Container>
    );
};

export default CreateForm;

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
        background-color: white;
        z-index: 1009;
        padding: 20px;

        
        .model-title{
          color: #333;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .checkboxes{
          .opt {
            display: flex;
            align-items: center;
            margin: 10px 20px;

            label{
              color: #333;
              margin-left: 10px;
              font-size: 0.75rem;
              /* margin-top: -15px; */
            }
          }
        }

        .done-btn{
          border: none;
          margin-top: 20px;
          background-color: #0095f6;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 300;
          text-align: center;
        }
    }
`