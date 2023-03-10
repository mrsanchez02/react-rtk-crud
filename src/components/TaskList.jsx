import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTask } from '../features/tasks/taskSlice'

const TaskList = () => {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-4'>
        <h1>Tasks: {tasks.length}</h1>
        <Link to='/create-task' className='bg-indigo-600 px-2 py-1 rounded-sm text-sm'>Create new task</Link>
      </header>
      <div className='grid grid-cols-3 gap-3'>
      {tasks.map((tasks) => (
        <div key={tasks.id} className='bg-neutral-800 p-4 rounded-md'>
          <header className='flex justify-between'>
            <h3>{tasks.title}</h3>
            <div className='flex gap-x-2'>
              <Link to={`/edit-task/${tasks.id}`} className='bg-zinc-600 px-2 py-1 text-xs rounded-md self-center'>Edit</Link>
              <button onClick={() => handleDelete(tasks.id)} className='bg-red-500 px-2 py-1 text-xs rounded-md self-center'>Del</button>
            </div>
          </header>
          <p>{tasks.description}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TaskList
