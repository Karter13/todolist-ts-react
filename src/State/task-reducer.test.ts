import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, taskReducer} from './task-reducer';


test('correct task should be added', () => {
    let taskListID1 = v1();
    let taskListID2 = v1();

    const startState: TasksStateType = {
        [taskListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [taskListID2]: [
            {id: v1(), title: 'SaSS', isDone: false},
            {id: v1(), title: 'React API', isDone: false},
            {id: v1(), title: 'Redax', isDone: false},
        ],
    };

    const endState = taskReducer(startState, AddTaskAC(taskListID1));

    expect(endState[taskListID1][3].title).toBe('SaSS');

});

test('correct task should be remove', () => {
    let taskListID1 ='taskListID1';

    let id = '1';

    const startState: TasksStateType = {
        'taskListID1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'CSS', isDone: false},
        ],
        "taskListID2" : [
            {id: '1', title: 'SaSS', isDone: false},
            {id: '2', title: 'React API', isDone: false},
            {id: '3', title: 'Redax', isDone: false},
        ],
    };

    const endState = taskReducer(startState, RemoveTaskAC(taskListID1, id));

    expect(endState[taskListID1].length).toBe(2);
    expect(endState[taskListID1][1].title).toBe('CSS');

});

test('correct change task title', () => {
    let taskListID2 = "taskListID2";

    let id = '1';
    let title = 'React-Redux';

    const startState: TasksStateType = {
        'taskListID1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'CSS', isDone: false},
        ],
        "taskListID2" : [
            {id: '1', title: 'SaSS', isDone: false},
            {id: '2', title: 'React API', isDone: false},
            {id: '3', title: 'Redax', isDone: false},
        ],
    };

    const endState = taskReducer(startState, ChangeTaskTitleAC(taskListID2, id, title));

    expect(endState[taskListID2].length).toBe(3);
    expect(endState[taskListID2][0].title).toBe('React-Redux');

});

test('correct change task status', () => {
    let taskListID2 = "taskListID2";
    let id = '1';
    let isDone = true;

    const startState: TasksStateType = {
        'taskListID1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'CSS', isDone: false},
        ],
        "taskListID2" : [
            {id: '1', title: 'SaSS', isDone: false},
            {id: '2', title: 'React API', isDone: false},
            {id: '3', title: 'Redax', isDone: false},
        ],
    };

    const endState = taskReducer(startState, ChangeTaskStatusAC(taskListID2, id, isDone));

    expect(endState[taskListID2].length).toBe(3);
    expect(endState[taskListID2][0].isDone).toBe(true);

});
