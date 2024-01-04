"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  const {incompeleteTasks, selectedCategory} = useGlobalState();

  const title = `InCompleted Tasks for ${selectedCategory}`;
  const categoryTasks = incompeleteTasks.filter((task: any) => task.category === selectedCategory);

  return (
    <Tasks title={title} tasks={categoryTasks}/>
  )
}

export default page