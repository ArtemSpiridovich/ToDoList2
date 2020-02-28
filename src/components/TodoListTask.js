import React from 'react';
import s from './TodolistTask.module.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task, status);
    }

    onTitleChanged = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    }

    state = {
        editMode: false,
        title: this.props.task.title
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode= () => {
        this.props.changeTitle(this.props.task, this.state.title)
        this.setState({editMode: false});
    }
    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    }
    render = () => {
        let containerCssClass = this.props.task.status ? `${s.todoListTaskDone}` : `${s.todoListTask}`;
        let priority = '';
        switch (this.props.task.priority) {
            case 0:
                priority = 'Low';
                break;
            case 1:
                priority = 'Middle';
                break;
            case 2:
                priority = 'High';
                break;
            case 3:
                priority = 'Urgently';
                break;
            case 4:
                priority = 'Later';
                break;
        }
        return (
                <div className={containerCssClass}>
                    <input type="checkbox" checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input className={s.inputChange} onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.state.title} />
                        : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                    }<span>,</span> <span>priority: {priority}</span> <button className={s.deleteTask} title='delete Task' onClick={this.onDeleteTask}>X</button>
                </div>
        );
    }
}

export default TodoListTask;

