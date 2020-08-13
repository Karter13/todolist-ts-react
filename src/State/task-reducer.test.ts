import {v1} from 'uuid';
import {TaskStateType} from '../App';
import {taskReducer} from './task-reducer';


test('correct task should be added', () => {
    let taskListID1 = v1();
    let taskListID2 = v1();

    const startState: TaskStateType = {
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

    const endState = taskReducer(startState, {type: 'ADD_TASK', taskListID: taskListID1});

    expect(endState[taskListID1][3].title).toBe('SaSS');

});

test('correct task should be remove', () => {
    let taskListID1 = v1();
    let taskListID2 = v1();

    let titleRemove = 'HTML';

    const startState: TaskStateType = {
        [taskListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ]
    };

    const endState = taskReducer(startState, {type: 'REMOVE_TASK', taskListID: taskListID1, taskTitle: titleRemove});

    // expect(endState[taskListID1].length).toBe(2);
    expect(endState[taskListID1][1].title).toBe('CSS');

});
