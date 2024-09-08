import React, { useState, useEffect } from "react";

export const TodoList = () => {
    const [nuevaTarea, setNuevaTarea] = useState(""); // Estado para la nueva tarea
    const [todos, setTodos] = useState([]); // Estado para la lista de tareas

    // Función para verificar si el usuario existe
    const verificarUsuario = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Auricel');
            if (response.ok) {
                console.log('Usuario ya existe');
                return true;
            } else if (response.status === 404) {
                console.log('Usuario no encontrado');
                return false;
            } else {
                throw new Error('Error al verificar usuario');
            }
        } catch (error) {
            console.log('Error al verificar usuario:', error);
            return false;
        }
    };

    // Crear usuario si no existe
    const crearUser = async () => {
        if (await verificarUsuario()) return; // No hacemos nada si el usuario ya existe
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Auricel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([]), // Crear un usuario con lista vacía
            });
            if (!response.ok) throw new Error('Error al crear el usuario');
            console.log('Usuario creado');
        } catch (error) {
            console.log('Error al crear el usuario:', error);
        }
    };

    // Obtener las tareas desde la API
    const obtnerArrayApi = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Auricel');
            if (!response.ok) throw new Error('Error al obtener las tareas');
            const data = await response.json();
            console.log(data); // Verificar la estructura de la respuesta
            if (Array.isArray(data)) {
                setTodos(data); // Asignar las tareas si es un array
            } else {
                console.error('La respuesta no es un array:', data);
                setTodos([]); // Asegurar que `todos` es un array vacío si no es el formato esperado
            }
        } catch (error) {
            console.log('Error al obtener las tareas:', error);
        }
    };

    // Función para agregar una nueva tarea
    const addTask = async (e) => {
        e.preventDefault();
        if (nuevaTarea.trim() === "") return;

        const newTasks = [...todos, { label: nuevaTarea.trim(), done: false }];
        setTodos(newTasks);
        setNuevaTarea(""); // Limpiar el input

        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Auricel', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTasks),
            });
            if (!response.ok) throw new Error('Error al actualizar las tareas');
            console.log('Tareas actualizadas');
        } catch (error) {
            console.log('Error al actualizar las tareas:', error);
        }
    };

    // Función para eliminar una tarea
    const deleteTask = async (index) => {
        const newTasks = todos.filter((_, i) => i !== index);
        setTodos(newTasks);

        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Auricel', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTasks),
            });
            if (!response.ok) throw new Error('Error al actualizar las tareas');
            console.log('Tarea eliminada');
        } catch (error) {
            console.log('Error al eliminar la tarea:', error);
        }
    };

    // Función para eliminar todas las tareas
    const clearAllTasks = async () => {
        setTodos([]);

        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/Auricel', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([]),
            });
            if (!response.ok) throw new Error('Error al eliminar todas las tareas');
            console.log('Todas las tareas eliminadas');
        } catch (error) {
            console.log('Error al eliminar todas las tareas:', error);
        }
    };

    useEffect(() => {
        crearUser();
        obtnerArrayApi();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">Todo List</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Escribe tu tarea aquí"
                    className="form-control"
                    style={{ borderRadius: '10px', border: '2px solid blue' }}
                    onChange={(e) => setNuevaTarea(e.target.value)}
                    value={nuevaTarea}
                />
            </form>

            <ul className="list-group mt-3">
                {Array.isArray(todos) && todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo.label}
                        <i
                            className="fa-solid fa-trash-can text-danger"
                            onClick={() => deleteTask(index)}
                            style={{ cursor: "pointer" }}
                        ></i>
                    </li>
                ))}
            </ul>

            <div className="text-start fw-light mt-2">
                {todos.length} {todos.length === 1 ? "item" : "items"} left
            </div>
            <button className="btn btn-danger mt-3" onClick={clearAllTasks}>Limpiar todas las tareas</button>
        </div>
    );
};

