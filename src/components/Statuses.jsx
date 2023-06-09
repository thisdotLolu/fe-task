import React from 'react'
import { toast } from 'react-hot-toast';
import {FaTrash} from 'react-icons/fa'
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'


function Statuses({status,key, tasks,setTasks, todos, ongoing, closed}) {

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item.id),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }))
    let text= 'todo';
    let bg = 'bg-blue-400'
    let tasksToMap = todos

    if(status === 'ongoing'){
        text = "On going"
        bg="bg-yellow-200"
        tasksToMap = ongoing
    }

    if(status === 'closed'){
        text = 'Closed'
        bg = 'bg-red-700'
        tasksToMap = closed
    }

    const addItemToSection=(id)=>{
        setTasks(prev=>{
            // console.log(prev)
            const tasksModified= prev.map(t=>{
                if(t.id === id){
                    return {...t, status:status}
                }

                return t
            })
            localStorage.setItem("tasks", JSON.stringify(tasksModified));

            toast('task status changed')
            return tasksModified;
        })
    }
  return (
    <>
    <div 
    ref={drop}
    className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200":""}`}>
        <Header text={text}
        bg={bg}
        count={tasksToMap.length}
        />
        {tasksToMap.length > 0 && tasksToMap.map(task=>(
            <Task
            key={task.id}
            tasks={tasks} 
            setTasks={setTasks}
            task={task}
            />
        ))}
    </div>
    </>
  )
}

export default Statuses


export const Header = ({text, bg, count}) => {
    return(
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text} <div
            className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'
            >{count}</div>
        </div>
    )
}


export const Task=({task, tasks, setTasks})=>{

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'task',
        item: {id:task.id},
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))

    const handleRemove=(id)=>{
        console.log(id);

        const filteredTasks= tasks.filter(tsk=>tsk.id !== id);
        setTasks(filteredTasks);

        toast.success('Task deleted')

        localStorage.setItem("tasks", JSON.stringify(filteredTasks))
    }
    return <div 
    ref={drag}
    className={`relative p-4 mt-8 shadow-md rounded-md ${isDragging?"opacity-25":"opacity-100"} cursor-grabbing`}>
        <p>{task.name}</p>
        <button className='absolute bottom-1 right-1'
        onClick={()=>handleRemove(task.id)}
        >
            <FaTrash/>
        </button>
    </div>
}