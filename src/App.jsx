import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/todo`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Kunde inte hämta todos:", error));
  }, [apiUrl]);

  const addTodo = async (event) => {
    event.preventDefault();

    if (!task.trim()) return;

    const response = await fetch(`${apiUrl}/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
      }),
    });

    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${apiUrl}/api/todo/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <main className="todo-container">
      <h1>Todo</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Ny todo..."
        />

        <button type="submit">Lägg till</button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <label key={todo.id} className="todo">
            <input type="checkbox" onChange={() => deleteTodo(todo.id)} />
            {todo.task}
          </label>
        ))}
      </div>
    </main>
  );
}

export default App;
