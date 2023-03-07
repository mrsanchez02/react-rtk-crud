import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../features/tasks/taskSlice'
import {v4 as uuid} from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
  const initialState = {
    title: '',
    description:''
  }

  const [task, setTask] = useState(initialState)
  const { title, description } = task
  
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks)

  const handleChange = e => {
    setTask({...task, 
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (params.id) {
      dispatch(editTask(task))
    } else {
      dispatch(addTask({
        ...task,
        id: uuid()
      }))
    }
    setTask(initialState)
    navigate('/')
  }

  useEffect(()=> {
    if (params.id) {
      setTask(tasks.find(item => item.id === params.id))
    }
  },[params.id, tasks])

  return (
    <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4'>
      <div>
        <label htmlFor="title" className='block text-sm font-bold mb-2'>Title:</label>
        <input value={title} type="text" name="title" id="title" onChange={handleChange} required 
          className='w-full p-2 rounded-md bg-zinc-600 mb-3'
        />
      </div>
      <div>
        <label htmlFor='description' className='block text-sm font-bold mb-2'>Description:</label>
        <textarea value={description} name='description' id='description' onChange={handleChange} required className='w-full p-2 rounded-md bg-zinc-600 mb-3'/>
      </div>
      {params.id ? <button type='submit' className='bg-green-600 px-2 py-1 rounded-sm'>Save</button>
      : <button type='submit' className='bg-indigo-600 px-2 py-1 rounded-sm'>Save</button>}
    </form>
  )
}

export default TaskForm
