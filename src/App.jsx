import { useEffect } from 'react';
import { useState } from 'react';
import { List } from './List';
import appStyle from './scss/App.scss';

const getTodos = () =>{
  const todos = localStorage.getItem('todos');
  if(todos){
    return JSON.parse(localStorage.getItem('todos'))
  }
  else{
    return [];
  }
}

function App() {
  const [toDo, setToDo] = useState('');
  const [list, setList] = useState(getTodos());
  const [edit, setEdit] = useState(false);
  const [editedItem,setEditedItem] = useState(null);
  const [alertMessage, setAlertMessage] = useState('Type your To-Do and click Add')

  const deleteItem = (index) => {
    setList(list.filter((e,i)=> i!==index));
    setAlertMessage('To-Do deleted');
  }

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      setAlertMessage('Type your To-Do and click Add')
    },2000)
    return ()=> clearTimeout(timeOut);
  },[alertMessage])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(list))
  },[list])


  const editItem = (todo,index) => {
    setEdit(true);
    setToDo(todo);
    setEditedItem(index);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!edit){
      if(!toDo){
        setAlertMessage('You must type something')
      }
      else if(!list.includes(toDo)){
        setList([
        ...list,
        toDo
      ])
      setToDo('');
      setAlertMessage('New To-Do added')
      }
      else{
        setAlertMessage(toDo + " is already exist!!!" )
      }
    }
    else{
      if(!list.includes(toDo)){
        list[editedItem] = toDo;
        setEdit(false);
        setToDo('')
        localStorage.setItem('todos',JSON.stringify(list))
        setAlertMessage('To-Do Edited')
      }
      else{
        setAlertMessage(toDo + " is already exist!!!")
      }
    }
  }
    
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do App</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=> setToDo(e.target.value)} type="text" id='todo' name='todo' value={toDo} placeholder="e.g learn react"/>
          <button className='addBtn' type='submit'>{!edit ? 'Add' : 'Edit'}</button>
        </form>
        <article>
          <div className="alertbox">{alertMessage}</div>
          <ul>
          {
            list.map((item,index) => {
              return (
                <List
                  key={index}
                  index = {index}
                  todo={item}
                  deleteItem = {deleteItem}
                  editItem = {editItem}
                />
              )
            })
          }
          </ul>
        </article>
      </main>
      <footer>
        <button onClick={()=> {
          setToDo(''); setList([])}} type="submit" className='clearBtn'>Clear All</button>
      </footer>
    </div>

  )
}

export default App
