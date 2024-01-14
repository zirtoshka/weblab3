package com.zirtoshka.pupa.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo-controller")
@CrossOrigin(origins = "http://localhost:4200")

public class DemoController {
    @GetMapping
    public ResponseEntity<String> sayHello(){
        System.out.println("it's method sayHello");
        return ResponseEntity.ok("hello from secured endpoint");
    }
}

