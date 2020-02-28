import {api} from "./common/api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLIST = "TodoList/Reducer/SET-TODOLIST";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const UPDATE_TODOLIST = "TodoList/Reducer/UPDATE_TODOLIST";

const initialState = {
    "todolists": [
        //     {
        //         "id": 0, "title": "every day",
        //         tasks: [
        //             {"title": "css11", "isDone": false, "priority": "low", "id": 0},
        //             {"title": "js", "isDone": false, "priority": "low", "id": 1},
        //             {"title": "react", "isDone": false, "priority": "low", "id": 2},
        //             {"title": "sasasa", "isDone": false, "priority": "low", "id": 3},
        //             {"title": "yoaa", "isDone": false, "priority": "low", "id": 4},
        //             {"title": "sddsdsds", "isDone": false, "priority": "low", "id": 5}]
        //     },
        //     {"id": 1, "title": "tomorrow", tasks: []},
        //     {"id": 2, "title": "weewwe`", tasks: []},
        //     {"id": 3, "title": "dddd", tasks: []}
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            debugger
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            }
        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TODOLIST:

            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    debugger
                    if (tl.id === action.todolistId) {
                        return {...tl, title: action.todolistTitle}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.task.id) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    console.log("reducer: ", action);
    return state;
}

const updateTaskac = (task, obj, todolistId) => ({type: UPDATE_TASK, task, obj, todolistId})
const updateTodolistac = (todolistTitle, todolistId) => ({type: UPDATE_TODOLIST, todolistTitle, todolistId})
const deleteTodolistac = (todolistId) => ({type: DELETE_TODOLIST, todolistId})
const deleteTaskac = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId})
const addTaskac = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId})
const setTodolistsac = (todolists) => ({type: SET_TODOLIST, todolists})
const setTasksac = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId})
const addTodolistac = (newTodolist) => ({type: ADD_TODOLIST, newTodolist})

export const getTodoList = () => {
    return (dispatch) => {
        api.getTodolists().then(res => {
            dispatch(setTodolistsac(res.data));
        });
    }
}

export const addTodoList = (title) => {
    return (dispatch) => {
        api.addTodolist(title).then(res => {
            let todolist = res.data.data.item;
            dispatch(addTodolistac(todolist))
        })
    }
}

export const getTasks = (id) => {
    return (dispatch) => {
        api.getTasks(id).then(res => {
            let allTasks = res.data.items
            dispatch(setTasksac(allTasks, id))
        });
    }
}

export const addTask = (newText, id) => {
    return (dispatch) => {
        api.addTask(newText, id).then(res => {
            let newTask = res.data.data.item;
            dispatch(addTaskac(newTask, id));
        })
    }
}

export const changeTaskTC = (task, obj, id, taskId) => {
    return (dispatch) => {
        api.changeTask(id, taskId, task, obj).then(res => {
            dispatch(updateTaskac(res.data.data.item, obj, id));
        })
    }
}

export const changeTodolist = (title, id) => {
    return (dispatch) => {
        api.changeTodolist(title, id).then(res => {
            if(res.data.resultCode === 0){
                dispatch(updateTodolistac(title, id))
            }
        })
    }
}

export const deleteTodolist = (id) => {
    return (dispatch) => {
        api.deleteTodolist(id).then(() => {
            dispatch(deleteTodolistac(id));
        });
    }
}

export const deleteTask = (id, taskId) => {
    return (dispatch) => {
        api.deleteTask(id, taskId).then((res) => {
            dispatch(deleteTaskac(id, taskId));
        })
}
}

export default reducer;
