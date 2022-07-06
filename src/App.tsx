import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Comp/TodoTask";

import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChnage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(
      todo.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChnage}
          />
          <input
            type="number"
            placeholder="Deadline (in days)..."
            name="deadline"
            value={deadline}
            onChange={handleChnage}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todo.map((item: ITask, key: number) => {
          return <TodoTask task={item} completeTask={completeTask} key={key} />;
        })}
      </div>
    </div>
  );
};

export default App;
