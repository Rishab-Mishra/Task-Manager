import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";



function App() {

  const[isCompleteScreen, setIsCompleteScreen] = useState(false);
  const[allTodos , setAllTodos] = useState([]);
  const[newTitle , setNewTitle] = useState("");
  const[newDescription , setNewDescription] = useState("");
  const[completedTodos , setCompletedTodos] = useState([]);
 

  
    
    const resetInput = ()=>{
      setNewTitle("");
      setNewDescription("");
    }
    // this is new task that needs to be add
    
    const addTask = ()=>{
      let newTodoItem = {
        title: newTitle,
        description: newDescription
      }
      // this is rendering all the previous tasks with the help of spread operator and 
    // then pushing the newTodo into the updatedArr and then setting the state of allTodos with respect to updatedArr
      let updatedArr = [...allTodos];
      updatedArr.push(newTodoItem);
      setAllTodos(updatedArr);
      //using localStorage to store the data/arr locally in the form of string with the help of JSON.stringify()
      localStorage.setItem('todolist', JSON.stringify(updatedArr));
      resetInput();
    }

    
   const handleCompleted = (index) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy= now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let fillteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    };

    let completedArr = [...completedTodos];
    completedArr.push(fillteredItem);
    setCompletedTodos(completedArr);
    taskDeletion(index);
    localStorage.setItem('completedTodos' , JSON.stringify(completedArr));
   }

 
  // useEffect will be trigger everytime when we render / refresh the page and it will render all the data from localStorage 
  // in the form of an array with the help of JSON.parse() mehtod
  useEffect(()=>{
   let storedArr = JSON.parse(localStorage.getItem('todolist'));
   let comArr = JSON.parse(localStorage.getItem('completedTodos'));
   if(storedArr){
    setAllTodos(storedArr);
   }

   if(comArr){
    setCompletedTodos(comArr);
   }
  },[]);

  const taskDeletion = (index)=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist')); //or you can use [...allTodos] instead of getting it from local storage
    savedTodo.splice(index, 1);
    setAllTodos(savedTodo);
    localStorage.setItem('todolist', JSON.stringify(savedTodo));
  }
  const compDeletion = (index)=>{
    let compSavedTodo = [...completedTodos];
    compSavedTodo.splice(index , 1);
    setCompletedTodos(compSavedTodo);
    localStorage.setItem('completedTodos', JSON.stringify(compSavedTodo));
  }
  
  

  return (
    <div className="App">
      <h1>My To-Do Tasks</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            
              <label>Title</label>
              <input type="text" name="title" placeholder="Enter task title" onChange={(e)=>{setNewTitle(e.target.value)}}/>
            

          </div>
          <div className="todo-input-item">
            
              <label>Description</label>
              <input type="text" name="description" placeholder="Enter task description" onChange={(e)=>{setNewDescription(e.target.value)}}/>
            

          </div>
          <div className="todo-input-item">
            
           <button title="Add Task" className="primaryBtn" onClick={addTask}>Add</button>
            

          </div>
          
        </div>
        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)} >ToDo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
           
        </div>
        <div className="todo-list">
          {isCompleteScreen === false && allTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
             
              <AiFillDelete title="Delete Task" className="icon"onClick={()=>taskDeletion(index)}/>
              <FaCheck title="Mark Completed" className="check-icon" onClick={()=>handleCompleted(index)}/>
            </div>
          </div>
            );
          })}
        </div>
         <div className="todo-list">
          {isCompleteScreen === true && completedTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on : {item.completedOn}</small></p>
            </div>
            <div>
              <AiFillDelete title="Delete Task" className="icon"onClick={()=>compDeletion(index)}/>
            </div>
          </div>
            );
          })}
        </div>
         
      </div>
      
      
    </div>
  );
}

export default App;
