import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if(task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function addTask(taskName: string) {
        let newTask = {id: v1(), title: taskName, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
