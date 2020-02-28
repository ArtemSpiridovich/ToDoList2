import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodoList} from "./redux/reducer";

class App extends React.Component {

    addTodoList = (title) => {
        this.props.addTodoList(title)
    }

    componentDidMount() {
        this.props.getTodoList()
    }

    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList id={tl.id} key={tl.id} title={tl.title} tasks={tl.tasks} />)

        return (
            <div className='content'>
                <div className='header'>
                    <AddNewItemForm titleButton='Add To Do List' addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const ConnectedApp = connect(mapStateToProps, {getTodoList, addTodoList})(App);
export default ConnectedApp;

