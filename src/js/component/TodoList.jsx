import React, { useState } from "react";


export const TodoList = () => {

   // const nuevaTarea = ["tarea"] 
    const [nuevaTarea,setNuevaTarea] = useState("")
    const [todos, setTodo] = useState([]);
    
    return (
        <div className="container">
            <div className="mb-3">       
                <input 
                    type="text" 
                    placeholder="escribe tu tarea aqui" 
                    aria-label=".form-control-lg example" 
                    style={{ borderRadius: '10px', border: '2px solid blue' }}
                    onChange={(e) => setNuevaTarea(e.target.value)}
                    value={nuevaTarea}
                    onKeyDown={(e) => {
                        
                        if (e.key === "Enter") {
                            setTodo(todos.concat ([nuevaTarea] ));
                            setNuevaTarea("");
                            console.log (todos)
                        }
                    }}
                    ></input>
                    </div>
            
            <ul className="list-group">
                {
                todos.map((todo, index) => {
                    return (
                        <li key={index}>{todo} <i className="fa-solid fa-trash-can" onClick={()=> setTodo(todos.filter((todo,currentIndex) => index != currentIndex))}>
                            </i> </li>
                    )

                })  
                }
                
            </ul>
            <div className="text-start fw-light mt-2 p-7">{todos.length} items left</div>
                 
        </div>
    )
}