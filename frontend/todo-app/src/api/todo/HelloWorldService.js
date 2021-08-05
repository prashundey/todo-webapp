import axios from "axios"

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get('http://localhost:8080/helloworld')
    }

    executeHelloWorldBEANService() {
        return axios.get('http://localhost:8080/helloworld-bean')
    }

    executeHelloWorldPathVariableService(name) {
        return axios.get(`http://localhost:8080/helloworld-bean/path-variable/${name}`)
    }
}

export default new HelloWorldService()