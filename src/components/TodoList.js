import React from 'react';
import s from './Todolist.module.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskT, changeTaskTC, changeTodolist, deleteTask, deleteTodolist, getTasks} from "../redux/reducer";


class TodoList extends React.Component {

    componentDidMount() {
        debugger
        this.props.getTasks(this.props.id)
    }

    state = {
        filterValue: "All"
    };

    addTask = (newText) => {
        this.props.addTaskT(newText, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeTaskThis = (task, obj) => {
        debugger
        this.props.changeTaskTC(task, obj, this.props.id, task.id)
    }

    changeTodolist = (title) => {
        this.props.changeTodolist(title, this.props.id)
    }

    changeStatus = (taskId, status) => {
        this.changeTaskThis(taskId, {status});
    }

    changeTitle = (taskId, title) => {
        this.changeTaskThis(taskId, {title});
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)

    }

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className={s.content}>
                <div className="todoList-header">
                    <TodoListTitle onClick={this.activatedEditMode} title={this.props.title}
                                         onDelete={this.deleteTodolist} changeTodolist={this.changeTodolist}/>
                    <AddNewItemForm titleButton='Add task' addItem={this.addTask}/>

                </div>
                <div className={s.tasks}>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}
                                   tasks={tasks.filter(t => {
                                       if (this.state.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.state.filterValue === "Active") {
                                           return t.status === 0;
                                       }
                                       if (this.state.filterValue === "Completed") {
                                           return t.status === 2;
                                       }
                                   })}/></div>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const ConnectedTodolist =
    connect(null, {addTaskT, getTasks, changeTaskTC, changeTodolist, deleteTodolist, deleteTask})
    (TodoList);

export default ConnectedTodolist;

