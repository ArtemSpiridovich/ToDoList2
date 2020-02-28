import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeTaskTC, changeTodolist, deleteTask, deleteTodolist, getTasks} from "./reducer";


class TodoList extends React.Component {

    componentDidMount() {
        this.props.getTasks(this.props.id)
    }

    state = {
        filterValue: "All"
    };

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
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

    changeStatus = (taskId, isDone) => {
        this.changeTaskThis(taskId, {status: isDone});
    }

    changeTitle = (taskId, title) => {
        this.changeTaskThis(taskId, {title: title});
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
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle onClick={this.activatedEditMode} title={this.props.title}
                                         onDelete={this.deleteTodolist} changeTodolist={this.changeTodolist}/>
                    <AddNewItemForm addItem={this.addTask}/>

                </div>

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
                               })}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const ConnectedTodolist =
    connect(null, {addTask, getTasks, changeTaskTC, changeTodolist, deleteTodolist, deleteTask})
    (TodoList);

export default ConnectedTodolist;

