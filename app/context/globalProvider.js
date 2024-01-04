"use client"
import React, { createContext, useState, useContext } from 'react'
import themes from "./themes";
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useUser();
    
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [modal, setModel] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");

    const selectCategory = (category) => {
        setSelectedCategory(category);
      };

    const theme = themes[selectedTheme];

    const [totalXpPoints, setTotalXpPoints] = useState(0);

    const [showTasks, setShowTasks] = useState(false);


    const updateShowTasks = (newShowTasks) => {
        setShowTasks(newShowTasks);
    };

    const updateTotalXpPoints = (newTotalXpPoints) => {
        setTotalXpPoints(newTotalXpPoints);
    };

    const openModal = () => {
        setModel(true);
    };

    const closeModal = () => {
        setModel(false);
    };

    const collapseMenu = () => {
        setCollapsed(!collapsed);
      };

      const allTasks = async () => {

        setIsLoading(true);
        try {
          const res = await axios.get(`/api/tasks/`);
    
          const sorted = res.data.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
    
          setTasks(sorted);
    
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

    const deleteTask = async (id) => {
        try {
            const deletedTask = tasks.find((task) => task.id === id);

            const res = await axios.delete(`/api/tasks/${id}`);
            toast.success("Task deleted");

            allTasks();

            if(deletedTask.isCompleted) {
                const updatedTotalXpPoints = Math.max(totalXpPoints - deletedTask.xpPoints, 0);
                updateTotalXpPoints(updatedTotalXpPoints);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const updateTask = async (task) => {

        
        try {
            const res = await axios.put(`/api/tasks`, task);
            toast.success("Task updated");
            allTasks();

            const updatedTaskIndex = tasks.findIndex((t) => t.id === task.id);

            if (updatedTaskIndex !== -1) {
            // Create a new array with the updated task
            const updatedTasks = [...tasks];
            updatedTasks[updatedTaskIndex] = res.data; // Assuming the API response contains the updated task

            // Update the state with the new array
            setTasks(updatedTasks);
            
            // Calculate total XP points for completed tasks
            let totalXpPointsForCompletedTask = updatedTasks
                .filter((t) => t.isCompleted)
                .reduce((total, t) => total + t.xpPoints, 0);

            // Subtract the XP points of the task that was marked as incomplete
            let updatedTotalXpPoints = task.isCompleted
                ? totalXpPointsForCompletedTask
                : Math.max((totalXpPointsForCompletedTask - !task.xpPoints) + 1, 0);


            // Update the task with the new total XP points
            const taskWithUpdatedTotalXpPoints = { ...task, totalXpPoints: updatedTotalXpPoints };
            await axios.put(`/api/tasks`, taskWithUpdatedTotalXpPoints);
            
            updateTotalXpPoints(updatedTotalXpPoints);
            console.log("Total XP Points for completed tasks:", updatedTotalXpPoints);
        }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    const importantTasks = tasks.filter((task) => task.isImportant === true);
    const incompeleteTasks = tasks.filter((task) => task.isCompleted === false);

    const getCategoryNames = (tasks) => {
        return Array.from(new Set(tasks.map((task) => task.category)));
    };

    React.useEffect(() => {
        if (user) allTasks();
    }, [user]);

    return(
        <GlobalContext.Provider 
            value={{
                theme,
                tasks,
                deleteTask,
                isLoading,
                completedTasks,
                importantTasks,
                incompeleteTasks,
                updateTask,
                modal,
                openModal,
                closeModal,
                totalXpPoints,
                updateTotalXpPoints,
                showTasks,
                updateShowTasks,
                getCategoryNames,
                selectedCategory,
                selectCategory,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);