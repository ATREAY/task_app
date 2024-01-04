"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import { edit, trash } from '@/app/utils/Icons';
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import  formatDate from "@/app/utils/formatDate"
import { checkRole } from "@/app/utils/roles";

interface Props{
    title: string;
    description: string;
    date: string,
    isCompleted: boolean;
    id: string;
    xpPoints: number;
    
}

const TaskItem = ({ title, description, date, isCompleted, id, xpPoints}: Props) => {

  const { theme, deleteTask, updateTask } = useGlobalState();
  const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const checkAdminRole = async () => {
        const result = await checkRole("admin");
        setIsAdmin(result);
      };
  
      checkAdminRole();
    }, []);

  return (
    <>
    
    <div className="p-4 rounded shadow-2 border-2 hover:border-orange-500 relative flex flex-col gap-0.5">
        <p className="absolute l-2 top-4 right-2 text-white p-1.5 rounded font-semibold text-sm border border-violet-300 hover:border-orange-500">
          {xpPoints} XP
        </p>
        <div>
          <h2 className={`mb-3 mr-10 text-2xl font-semibold text-amber-50`}>
            {title}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-100`}>{description}</p>
          <p className="mt-20 ml-1 date"></p>
          <div className="task-footer flex items-center pt-6">
            {isCompleted ? (
              <button 
                onClick={() => {
                  const task = {
                    id,
                    isCompleted: !isCompleted,
                    // xpPoints,
                  };

                  updateTask(task);
                }} 
                className="mt-5 text-gray-200 bg-green-500 hover:text-gray-800 hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                Completed
              </button>
            ) : (
              <button 
                onClick={() => {
                  const task = {
                    id,
                    isCompleted: !isCompleted,
                    xpPoints,
                  };

                  updateTask(task);
                }}
                className="mt-12 text-gray-100 hover:text-gray-800 bg-red-400 hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                InComplete
              </button>
            )}

            {isAdmin && (
              <div className="ml-auto flex items-end gap-2">
                <button className="pt-4">{edit}</button>
                <button 
                  className="pt-4 pl-4" 
                  onClick={() => {
                    deleteTask(id);
                }}
                >
                  {trash}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.borderColor2};
    box-shadow: ${(props) => props.theme.shadow7};
    border: 2px solid ${(props) => props.theme.borderColor2};

    height: 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .xp{
      absolute top-2 right-2 bg-violet text-white p-1.5 rounded font-semibold text-sm;
    }

    .date{
      margin: 6rem 0 0.3rem 0.5rem;
    }

    > h1, h2 {
      font-size: 1.5rem;
      font-weight: 600;
    }
  
    .task-footer {
      display: flex;
      align-items: center;
      gap: 1.2rem;
  
      button {
        border: none;
        outline: none;
        cursor: pointer;
  
        i {
          font-size: 1.4rem;
          color: ${(props) => props.theme.colorGrey2};
        }
      }
  
      .edit {
        margin-left: auto;
      }
  
      .completed,
      .incomplete {
        display: inline-block;
        padding: 0.4rem 1rem;
        background: ${(props) => props.theme.colorDanger};
        border-radius: 30px;
      }
  
      .completed {
        background: ${(props) => props.theme.colorGreenDark} !important;
      }
    }
    
`;

export default TaskItem