import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import "./TodoComponent.css";

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    // REACT Lifecycle Method
    componentDidMount() {
        if (this.state.id === -1) return

        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => 
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                    }),
            )
            
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter valid Target Date'
        }

        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then( () => this.props.history.push('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then( () => this.props.history.push('/todos'))
        }
    }

    render() {
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik 
                        initialValues = {{description, targetDate}}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        validate = {this.validate}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form className="form">
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            ) 
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent