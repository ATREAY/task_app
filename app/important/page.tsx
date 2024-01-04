"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  const {importantTasks, selectedCategory} = useGlobalState();

  const title = `Important Tasks for ${selectedCategory}`;
  const categoryTasks = importantTasks.filter((task: any) => task.category === selectedCategory);

  return (
    <Tasks title={title} tasks={categoryTasks}/>
  )
}

export default page