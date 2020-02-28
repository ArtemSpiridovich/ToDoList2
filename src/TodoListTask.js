import React from 'react';
import './App.css';

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
        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        let priority = '';
        switch (this.props.task.priority) {
            case 0:
                priority = 'Low';
                break;
            case 1:
                priority = 'Middle';
                break;
            case 2:
                priority = 'Hi';
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
                    <input type="checkbox" checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true} value={this.state.title} />
                        : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>
                    }, priority: {priority} <button onClick={this.onDeleteTask}>X</button>
                </div>
        );
    }
}

export default TodoListTask;

