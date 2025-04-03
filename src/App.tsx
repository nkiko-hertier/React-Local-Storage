import viteLogo from '/vite.svg'
import { Storage } from './Db/local_db'

import './App.css'
import { use, useEffect, useState } from 'react';

function App() {
  const studentss = Storage.getStudents();
  Storage.getStudents() ? '' : Storage.saveStudents([]);

  const [students, setStudents ] = useState(studentss);
  const [change, setChange] = useState({});
  const [edit, setEdit] = useState({id: 0, name: '', email: '', age: 0})

  useEffect(()=>{
    setStudents(Storage.getStudents());
  }, [change])

  const HandleForm = (e:any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const student = Object.fromEntries(formData);
    console.log(student);
    const action = student.id ? Storage.updateStudent(student) : Storage.addStudent(student);
    if (action) {
      setChange(student)
    }
  }

  const handleInput = (e:any) => {
    const newData = {...edit, [e.target.name]: [e.target.value]}
    setEdit(newData)
  }

  return (
    <div className='flex gap-5'>
        <div className='w-1/3 flex flex-col'>
          <a href="https://vite.dev" className='block mx-auto' target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <form id='form' onSubmit={HandleForm} method='post'  className=' mx-auto space-y-4 w-full' >
            <input hidden          onInput={handleInput} value={edit.id || ''} name='id' type='number' />
            <input required onInput={handleInput} value={edit.name || ''} name='name' type="text" className='bg-slate-100 w-full p-2 rounded-md block placeholder:text-slate-400 outline-none' placeholder='Name' />
            <input required onInput={handleInput} value={edit.email || ''} name='email' type="text" className='bg-slate-100 w-full p-2 rounded-md block placeholder:text-slate-400 outline-none' placeholder='Email' />
            <input required onInput={handleInput} value={edit.age || ''} name='age' type="text" className='bg-slate-100 w-full p-2 rounded-md block placeholder:text-slate-400 outline-none' placeholder='Age' />
            <div className="flex gap-3">
            <button type='submit' className='p-2 bg-indigo-500 w-full text-white rounded-md'>Submit</button>
            {edit.id ? 
             <button 
              onClick={() => {
                setEdit({})
              }}
              type='submit' className='p-2 bg-red-500 w-1/3 text-white rounded-md'>close</button>
            : ''}
            </div>
          </form>
        </div>
        <div className="w-full rows-span-2">
          <h1 className='text-2xl my-10'>Students List</h1>
          <table className='w-full'>
            <thead className='bg-slate-100'>
              <tr className='*:p-2'>
                <td>Id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Age</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
            {students.map((student:any, index:number) => 
                <tr className='*:p-2'>
                  <td>{index+1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td className='flex gap-2'>
                    <button 
                      onClick={()=> {
                        setEdit(student)
                      }}
                      className='p-1 text-white bg-blue-500 text-sm rounded-md px-3'>Edit</button>
                    <button 
                      onClick={()=>{
                        Storage.deleteStudent(student.id);
                        setChange({name: "Nkiko"})
                      }}
                      className='p-1 text-white bg-red-500 text-sm rounded-md px-3'>Delete</button>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default App
