import axios from "axios";
import { API_URL } from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
        {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    executeJWTAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {username, password})
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(username, password))
    }

    registerSuccessfulLoginJWT(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        if (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) == null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return (user == null ? '' : user)
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) config.headers.authorization = token
                return config
            }
        )
    }
}

export default new AuthenticationService();
