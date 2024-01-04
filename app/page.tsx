'use client'
import Model from './components/Modals/Modal';
import Tasks from './components/Tasks/Tasks'
import { useGlobalState } from './context/globalProvider';

export default function Home() {

  const {tasks, selectedCategory} = useGlobalState();

  const title = `Tasks for ${selectedCategory}`;
  const categoryTasks = tasks.filter((task: any) => task.category === selectedCategory);

  return (
    <>
    <Tasks title={title} tasks={categoryTasks}/>
    </>
  );
}
