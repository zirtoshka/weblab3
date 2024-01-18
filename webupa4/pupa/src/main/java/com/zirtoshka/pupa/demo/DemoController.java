package com.zirtoshka.pupa.demo;


import com.zirtoshka.pupa.config.JwtService;
import com.zirtoshka.pupa.user.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/demo-controller")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class DemoController {

    private final JwtService jwtService;
    private final UserRepository repository;

    @GetMapping
    public ResponseEntity<String> sayHello(){
        final HttpHeaders httpHeaders= new HttpHeaders();
        System.out.println("it's method sayHello");
        return new ResponseEntity<>("{\"message\": \"Hello from secured endpoint\"}", httpHeaders, HttpStatus.OK);
    }
    @PostMapping("/addShot")
    public ResponseEntity<String> addShot(
            @RequestHeader("Authorization") String token
    ){
        String jwt = token.substring(7);
        String username = jwtService.extractUsername(jwt);
        if (repository.findByName(username)==null){
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }


        return ResponseEntity.ok(username);

    }
}

