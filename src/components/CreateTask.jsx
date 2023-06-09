import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

import {v4 as uuidv4} from 'uuid'

const CreateTask = ({tasks, setTasks}) => {
    const [task, setTask] = useState({
        id:'',
        name:"",
        status:"todo"
    });

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(task.name.length < 1 ) return toast.error('a task cant be empty')

        setTasks((prev)=>{
            const list=[...prev, task];

            localStorage.setItem("tasks", JSON.stringify(list));
            return list
        })

        toast.success("Task Added")
        
        setTask({
            id:"",
            name:"",
            status:"todo"
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            className='border-2 border-blue-500 rounded-md mr-4 h-12 w-[40vw] px-[3px]'
            onChange={(e)=>setTask({
                ...task,
                id:uuidv4(),
                name:e.target.value
            })}
            value={task.name}
            />
            <button className='bg-blue-500 rounded-lg px-4 h-12 text-white'>Add Task</button>
        </form>
    </div>
  )
}

export default CreateTask