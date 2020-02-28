import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    headers: {
        'API-KEY': '03b7c8a3-c090-4973-97f1-0b2f1558bdc8'
    }
})


export const api = {
    addTask(newTaskTitle, todolistId) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title: newTaskTitle})
    },
    addTodolist(title) {
        return instance.post(`todo-lists`, {title})
    },
    getTodolists() {
        return instance.get(`todo-lists`)
    },
    getTasks(id) {
        return instance.get(`todo-lists/${id}/tasks`)
    },
    changeTask(todolistId, taskId, task, obj) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, ...obj})
    },
    deleteTodolist(todolistId) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTodolist(title, todolistId) {
        return instance.put(`todo-lists/${todolistId}`, title)
    }
}

