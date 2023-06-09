import React, { useEffect, useState } from 'react'
import Statuses from './Statuses'

const DisplayTask = ({tasks, setTasks}) => {
    const [todos, setTodos]= useState([])
    const [ongoing, setOngoing]= useState([])
    const [closed, setClosed] = useState([])

   

    useEffect(()=>{
        const sTodos = tasks.filter(task => task.status === 'todo')
        const sOngoing = tasks.filter(task => task.status === 'ongoing')
        const sClosed = tasks.filter(task => task.status === 'closed')


        setTodos(sTodos);
        setOngoing(sOngoing);
        setClosed(sClosed);
    },[tasks])    

    const statuses = ["todo", "ongoing", "closed"];

    
  return (
    <div className='flex gap-16'>
        {
            statuses.map((status, index)=>{
                return(
                    <Statuses 
                    key={index}
                    status={status}
                    tasks={tasks}
                    setTasks={setTasks}
                    todos ={todos}
                    ongoing={ongoing}
                    closed={closed}
                    />
                )
            })
        }
    </div>
  )
}

export default DisplayTask;

// const Section =({status})=>{
//     return(
//         <div>
//         <h2>{status}</h2>list
//         </div>
//     )
// }