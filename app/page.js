"use client"
import React, { useState } from 'react'

const page = () => {
  const [task, settask] = useState("")
  const [desc, setdesc] = useState("")
  const [mainTask, setmainTask] = useState([])

  const submitHandler=(e)=>{
    e.preventDefault()
    setmainTask([...mainTask, {task,desc}])
    settask("")
    setdesc("")
  };

  const deleteHandler = (i)=>{
    let copyTask = [...mainTask]
    copyTask.splice(i,1)
    setmainTask(copyTask)
  };

  const handleSubmit = (i) => {
    const updatedTasks = mainTask.map((item, index) =>
      index === i ? { ...item, completed: !item.completed } : item
    );
    setmainTask(updatedTasks);
  };

  let renderTask = <h2 className='text-center'>No task available</h2>

  if(mainTask.length>0){
    renderTask = mainTask.map((t,i)=>{
      return (
        <li key={i} className='flex items-center justify-between w-full border-b-2 border-gray-300 mb-4 pb-2'>
          <div className='flex items-center justify-between flex-1'>
          <div className='flex flex-row justify-between w-2/3'>
            <h5 className='font-bold text-2xl'>{t.task}</h5>
            <h6 className='font-medium text-lg'>{t.desc}</h6>
            </div>

            <div className='flex gap-4'>
            <button onClick={()=>{
              deleteHandler(i)
            }}
            className='bg-red-600 text-white rounded font-bold px-4 py-2'>Delete</button>
            <button onClick={() => {
                handleSubmit(i);
              }}
              className={`${
                t.completed ? "bg-green-500" : "bg-blue-500"
              } text-white rounded px-4 py-2`}
            >
              {t.completed ? "✔️" : "Submit"}
             </button>
          </div>

          </div>
        </li>
      );
    });
  }
  return (
    <>
    <h1 className='font-bold text-center text-white bg-black text-2xl px-4 py-2'>
    My To-Do App
    </h1>
    <form className='flex justify-center' onSubmit={submitHandler}>
      <input type='text' placeholder='Enter Your Task' className='border-zinc-800 border-4 mx-4 my-2 px-4 py-2 text-center text-black'
      value={task}
      onChange={(e)=>{
        settask(e.target.value)
      }}
      />
      <input type='text' placeholder='Enter Task Description' className='border-zinc-800 border-4 mx-4 my-2 px-4 py-2 text-center text-black'
      value={desc}
      onChange={(e)=>{
        setdesc(e.target.value)
      }}
      />
      <button className='bg-slate-600 text-white border-2 font-bold text-xl border-3 px-3 py-2 rounded-md mx-2 my-1 text-center'>
        Add Task
      </button>
    </form>
    <hr/>
    <div className='bg-slate-200 p-8'>
      <ul>{renderTask}</ul>
    </div>
    </>
  )
}

export default page
