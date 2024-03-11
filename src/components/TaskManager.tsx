import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";
interface Task{
  id: string,
  title: string
}

export const useTaskManager=()=>{
  const [tasks, setTasks] = useState<Task[]>([]);
 const [searchKeyword, setSearchKeyword] = useState<string>("");
 const [title, setTitle] = useState<string>("");

 const addTask = (title: string): void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
 };

 const completeTask = (id: string): void => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
 };

 const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    const newTasks = tasks.map((task: Task) => task.id === id ? { ...task, ...taskUpdate } : task);
    setTasks(newTasks);
 };

 const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
 );

 const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
 };

 return { title, addTask, completeTask, updateTask, filteredTasks, handleSearch, setTitle };
}
// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // remove task from list
  const completeTask = (id: string) :void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id :string, taskUpdate: Partial<Task>) :void => {
    const newTasks = tasks.map((task) => task.id === id ? { ...task, ...taskUpdate } : task);
    setTasks(newTasks);
  };

  const addTask = () : void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) :void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task : Task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
