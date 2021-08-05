import { Component } from "react"
import AuthenticationService from "./AuthenticationService"

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    // Controlled Components (Username & Password Fields)
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        // console.log(this.state)
        // if(this.state.username === 'prashun' && this.state.password === 'pass') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     this.setState({
        //         showSuccessMessage: true,
        //         hasLoginFailed: false
        //     })
        // }
        // else {
        //     this.setState({
        //         showSuccessMessage: false,
        //         hasLoginFailed: true
        //     })
        //     console.log('failed')
        // }
        
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.history.push(`/welcome/${this.state.username}`)
        // }).catch(
        //     () => {
        //         this.setState({
        //             showSuccessMessage: false,
        //             hasLoginFailed: true
        //         })
        // })

        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
                AuthenticationService.registerSuccessfulLoginJWT(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() => {
                this.setState({
                    showSuccessMessage: false,
                    hasLoginFailed: true
                })
        })
    }

    render() {
        return(
            <div className="loginComponent">
                <h1>Login</h1>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                        </div>
                    </div>
                </div>

                <div className="container container-sm">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Succesful</div>}
                </div>
            </div>     
        )
    }
}

export default LoginComponent