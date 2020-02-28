import React from 'react';
import './App.css';

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        todolistName: this.props.title
    }

    onTodolistNameChanged = (e) => {
        this.setState({
            todolistName: e.currentTarget.value
        })
    }

    activatedEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.props.changeTodolist(this.state.todolistName)
        this.setState({
            editMode: false
        })
    }

    render = () => {
        return <div>{this.state.editMode
            ? <input onBlur={this.deactivateEditMode} onChange={this.onTodolistNameChanged} autoFocus={true}
                     value={this.state.todolistName}/>
            : <div onClick={this.activatedEditMode}>
                <h3 className="todoList-header__title">{this.props.title}

                </h3>
            </div>
        }<button onClick={this.props.onDelete}>X</button></div>
    }
}

export default TodoListTitle;

