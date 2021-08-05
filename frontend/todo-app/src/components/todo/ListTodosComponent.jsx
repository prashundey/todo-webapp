import moment from "moment"
import { Component } from "react"
import TodoDataService from "../../api/todo/TodoDataService"
import AuthenticationService from "./AuthenticationService"


class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message: ''
        }

        this.refreshTodos = this.refreshTodos.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    
    // REACT Lifecycle Method
    // Do not call API from constructor. Initally Todo list is empty => Intital Render Blank
    componentDidMount() { // Triggers Rerender
        this.refreshTodos()
    }

    // Refers to TodoDataService to make API calls

    // GET
    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(response => this.setState({
                        todos : response.data
                    })
            )
    }

    // DELETE 
    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({ message : `Delete of todo ${id} successful`})
                this.refreshTodos()
            }
        )
    }

    // PUT
    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`)
    }

    // POST
    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }




    render() {
        return (
            <div className="ListTodosComponent">
                <h1>TODO LIST</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                this.state.todos.map (
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('MM-DD-YYYY')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>UPDATE</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>
                                            DELETE</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>ADD</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent