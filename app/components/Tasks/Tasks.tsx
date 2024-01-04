"use client"
import { useGlobalState } from '@/app/context/globalProvider';
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import TaskItem from '../TaskItem/TaskItem';
import { plus } from '@/app/utils/Icons';
import { checkRole } from "@/app/utils/roles";
import CreateContent from '../Modals/CreateContent';
import Modal from '../Modals/Modal';
import Image from 'next/image';
import { routeModule } from 'next/dist/build/templates/app-page';
import { useRouter } from 'next/navigation';


interface Props{
  title: string;
  tasks: any[];
  
}

const Tasks = ({ title, tasks }: Props) => {
    const { theme, isLoading, openModal, modal, updateShowTasks, showTasks } = useGlobalState();
    const [isAdmin, setIsAdmin] = useState(false);

    const route = useRouter();

    const handleButtonClick = () => {
      updateShowTasks(true);
    };

    const handleBackToFeatures = () => {
      updateShowTasks(false);
      route.push('/');
    };

    useEffect(() => {
      const checkAdminRole = async () => {
        const result = await checkRole("admin");
        setIsAdmin(result);
      };
  
      checkAdminRole();
    }, []);

  return (
    <TaskStyled theme={theme}>
      {!showTasks ? (
      <main className="flex min-h-screen flex-col items-center justify-center p-20">
      <div className="grid text-center">
        <div
          className="mb-20 group rounded-lg px-20 py-10 transition-colors border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
        >
          <h4 className={`mb-3 text-2xl font-semibold`}>
            Welcome to Taskify👋!
          </h4>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Kindly choose a topic from the sidebar to commence your journey!
          </p>
          
        </div>
      </div>
    </main>

      ) : (
        <>
      { modal && <Modal content={<CreateContent />} />}

      <div className="absolute top-14 right-20">
        <button 
          onClick={handleBackToFeatures}
          className="flex items-center"  
        >
          <Image src="/undo.png" alt="Back to Features" width={30} height={30} className="mr-2" />
        </button>
      </div>

      <h1>{title}</h1>

      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}

            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
            xpPoints={task.xpPoints}

          />
        ))}

        {isAdmin && (
          <button className="create-task" onClick={openModal}>
            {plus}
            Add New Task
          </button>
        )}
        </div>
        </>
      )}
      {/* <CreateContent /> */}
    </TaskStyled>
  )
}

const TaskStyled = styled.main`
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

    &::-webkit-scroolbar {
        width: 0.5rem;
    }

    .tasks{
      margin: 2rem 0; 
    }

    > h1 {
      font-size: clamp(1.5rem, 2vw, 2rem);
      font-weight: 800;
      position: relative;
    
      &::after {
        content: "";
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 3rem;
        height: 0.2rem;
        background-color: ${(props) => props.theme.colorPrimaryGreen};
        border-radius: 0.5rem;
      }
    }

    > h2 {
      font-size: clamp(1.5rem, 2vw, 2rem);
      font-weight: 800;
      position: relative;
      margin-bottom: 2rem;
    
      &::after {
        content: "";
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 3rem;
        height: 0.2rem;
        background-color: ${(props) => props.theme.colorPrimaryGreen};
        border-radius: 0.5rem;
      }
    }

    .create-task{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      height: 16rem;
      color: ${(props) => props.theme.colorGrey2};
      font-weight: 600;
      cursor: pointer;
      border-radius: 1rem;
      border: 3px dashed ${(props) => props.theme.colorGrey5};
      transition: all 0.3s ease;

      i {
        font-size: 1.5rem;
        margin-right: 0.2rem;
      }

      &:hover {
        background-color: ${(props) => props.theme.colorGrey5};
        color: ${(props) => props.theme.colorGrey0};
      }
    }

    .tasks-header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
  
      .back-button {
        background: none;
        border: none;
        color: ${(props) => props.theme.colorPrimary};
        cursor: pointer;
        font-size: 1rem;
        margin-right: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: ${(props) => props.theme.colorBg2};
        border: 2px solid ${(props) => props.theme.borderColor2};
        transition: all 0.3s ease;
  
        &:hover {
          background-color: ${(props) => props.theme.colorPrimary};
          color: ${(props) => props.theme.colorGrey0};
        }
      }
  
      h1 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;
  
        &::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 3rem;
          height: 0.2rem;
          background-color: ${(props) => props.theme.colorPrimaryGreen};
          border-radius: 0.5rem;
        }
      }
    }

`;

export default Tasks