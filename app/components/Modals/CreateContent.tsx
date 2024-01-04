"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { add, plus } from "@/app/utils/Icons";
import Button from '../Button/Button';

const CreateContent = () => {

    const [title, setTitle] = useState("");
    const [ftitle, setfTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fdescription, setfDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);
    const [xpPoints, setXpPoints] = useState(0);

    const { theme, allTasks, closeModal, updateCurrentCategory } = useGlobalState();

    const handleChange = (name: string) => (e: any) => {
        
        switch (name) {
            case "title":
                    setTitle(e.target.value);
                break;
            case "ftitle":
                  setfTitle(e.target.value);
                break;
            case "description":
                    setDescription(e.target.value);
                break;
            case "fdescription":
                    setfDescription(e.target.value);
                break;
            case "category":
                  setCategory(e.target.value);
              break;
            case "date":
                    setDate(e.target.value);
                break;
            case "completed":
                    setCompleted(e.target.checked);
                break;
            case "important":
                    setImportant(e.target.checked);
                break;
            case "xpPoints":
                  setXpPoints(Number(e.target.value));
                break;
        
            default:
                break;
        }
    };

    const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      ftitle,
      description,
      fdescription,
      date,
      completed,
      important,
      xpPoints,
      category,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        toast.success("Task created successfully.");
        allTasks();
        closeModal();
      }
    } catch (error) {
      // toast.error("Something went wrong.");
      console.log(error);
    }
  };

   return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a task</h1>
        <div className='input-control'>
             <label htmlFor='title'>Title</label>
             <input
                id='title'
                 value={title}
                type="text"
                 name="title"
                onChange={handleChange("title")}
                 placeholder='e.g watch the first episode of naruto.'
            />
         </div>

         <div className='input-control'>
             <label htmlFor='ftitle'>fTitle</label>
             <input
                id='ftitle'
                 value={ftitle}
                type="text"
                 name="ftitle"
                onChange={handleChange("ftitle")}
                 placeholder='e.g Aptitude skills'
            />
         </div>
         
         <div className='input-control'>
             <label htmlFor='description'>Description</label>
            <textarea
                 id='description'
                 value={description}
                 name="description"
                 rows={4}
                 onChange={handleChange("description")}
                 placeholder='e.g watch a video on clerk auth.'
             ></textarea>
         </div>

         <div className='input-control'>
             <label htmlFor='fdescription'>fDescription</label>
            <textarea
                 id='fdescription'
                 value={fdescription}
                 name="fdescription"
                 rows={4}
                 onChange={handleChange("fdescription")}
                 placeholder='e.g a math problem'
             ></textarea>
         </div>
        
         <div className='input-control'>
             <label htmlFor='category'>Category</label>
             <input
                id='category'
                 value={category}
                type="text"
                 name="category"
                onChange={handleChange("category")}
                 placeholder='e.g Aptitude, General Studies, Sports etc.'
            />
         </div>

         <div className="input-control">
            <label htmlFor="date">Date</label>
            <input
                value={date}
                onChange={handleChange("date")}
                type="date"
                name="date"
                id="date"
            />
        </div>

         <div className='input-control'>
                <label htmlFor='xpPoints'>XP Points</label>
                <input
                    id='xpPoints'
                    value={xpPoints}
                    type="number"
                    name="xpPoints"
                    onChange={handleChange("xpPoints")}
                    placeholder='e.g 100'
                />
          </div>

        <div className='input-control'>
             <label htmlFor='completed'>Toggle completed</label>
             <input
                 id='completed'
                 value={completed.toString()}
                 type="checkbox"
                 name="completed"
                 onChange={handleChange("completed")}
             />
         </div>
         <div className='input-control'>
            <label htmlFor='important'>Toggle important</label>
             <input
                 id='important'
                 value={important.toString()}
                 type="checkbox"
                 name="important"
                 onChange={handleChange("important")}
             />
         </div>

         <div className="submit-btn flex justify-end">
             <Button 
                type="submit"
                name="Create Task"
                icon={add}
                padding={"0.8rem 2rem"}
                borderRad={"0.8rem"}
                fw={"500"}
                fs={"1.2rem"}
                background={"rgb(0, 163, 255)"}
             />
             
         </div>
     </CreateContentStyled>
   )
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 400px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent