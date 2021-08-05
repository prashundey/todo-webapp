package com.rest.webservices.restfulwebservices.helloworld;

import com.rest.webservices.restfulwebservices.helloworld.helloWorldBean;
import org.springframework.web.bind.annotation.*;

// Controller (handles http request)

@RestController
@CrossOrigin(origins="http://localhost:4200/")
public class HelloWorldController {

    @GetMapping(path="/helloworld")
    public String helloWorld() {
        return "Hello World";
    }

    @GetMapping(path="/helloworld-bean")
    public helloWorldBean HelloWorldBean() {
        return new helloWorldBean("Hello world");
    }

    @GetMapping(path="/helloworld-bean/path-variable/{name}")
    public helloWorldBean HelloWorldPathVariable(@PathVariable String name) {
        return new helloWorldBean("Hello " + name);
    }


}
