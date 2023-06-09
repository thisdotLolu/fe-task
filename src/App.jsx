import { useEffect, useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask'
import DisplayTask from './components/DisplayTask'
import {Toaster} from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([]);

  console.log("tasks",tasks);

  useEffect(()=>{
    if(tasks){
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
  },[])
  
  return (  
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
    <div className='bg-slate-100 w-screen h-screen flex flex-col items-center justify-center pt-3 gap-16'>
      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <DisplayTask tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
    
  )
}

export default App;
