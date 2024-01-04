"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  const {completedTasks, selectedCategory} = useGlobalState();

  const title = `Completed Tasks for ${selectedCategory}`;
  const categoryTasks = completedTasks.filter((task: any) => task.category === selectedCategory);

  return (
    <Tasks title={title} tasks={categoryTasks}/>
  )
}

export default page