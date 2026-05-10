import { useState,useEffect } from 'react'
import './App.css'


function App() {
    const [inputText,setInputText] = useState('');
    const [tasks,setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });    //state to hold the list of tasks
    const [editId,setEditId] = useState(null);
    const [editText,setEditText] = useState('');

    useEffect(()=>{
      localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks]);

    const handleAdd = ()=>{
      console.log(inputText);

      //prevent adding empty task
      if(inputText.trim()==='')return;

      const newTask = {
        id:Date.now(),
        text:inputText,
        completed:false,
      }
      
      setTasks([...tasks,newTask]);
      setInputText('');
    }

    const handleDelete =(id)=>{
      const updatedTasks = tasks.filter((task)=> task.id !== id);
      setTasks(updatedTasks);
    }

    const handleToggle =(id)=>{
      //add toggled class to the task
      
      const updatedTasks = tasks.map((task)=>(
        task.id === id ? {...task,completed:!task.completed }:task
      ));
      setTasks(updatedTasks);
    }

    const handleEdit = (task)=>{
      setEditId(task.id);
      setEditText(task.text);
    }

    const handleSave=(id)=>{
      const updatedTask = tasks.map((task)=>(task.id===id ? {...task,text:editText}:task));
      setTasks(updatedTask);

      // reset state once done
      setEditId(null);
      setEditText('');
    }

  return (
    <>
      <div className='mainDiv'>
        <h1 className='todoHeading'>To Do List</h1>

        <span>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} 
          className='inputBox'/>

          <button onClick={handleAdd} className='addBtn'>
            Add
          </button></span>

          {tasks.length == 0 ? <p className='notask'>Add tasks to see here</p>:
          <ul className='taskList'>

            {tasks.map((task) =>(
              <li key={task.id} className={task.completed ? 'toggled' : 'item'}>
                {editId === task.id ?(
                  <>
                    <input
                      type='text'
                      value={editText}
                      onChange = {(e)=>setEditText(e.target.value)}
                      className='editInput'
                    />
                    <button onClick={()=>handleSave(task.id)} className='saveBtn'>Save</button>
                  </>
                ):(
                  <>
                      <span onClick={()=>handleToggle(task.id)} className='' >
                        {task.text}
                      </span>

                      <span>
                        <button
                          className='editBtn'
                          onClick={()=>handleEdit(task)}>Edit</button>
                        <button 
                          onClick={()=>handleDelete(task.id)} className='deleteBtn'>
                          X
                        </button>
                      </span>

                  </>
                )}
              </li>
                
            ))}
          </ul>
          }

      </div>
    </>
  )
}

export default App
