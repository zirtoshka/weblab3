package com.zirtoshka.pupa.demo;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zirtoshka.pupa.config.JwtService;
import com.zirtoshka.pupa.shot.AreaChecker;
import com.zirtoshka.pupa.shot.Coordinates;
import com.zirtoshka.pupa.shot.Shot;
import com.zirtoshka.pupa.shot.ShotRepository;
import com.zirtoshka.pupa.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/demo-controller")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class DemoController {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ShotRepository shotRepository;

    @GetMapping
    public ResponseEntity<String> sayHello(){
        final HttpHeaders httpHeaders= new HttpHeaders();
        System.out.println("it's method sayHello");
        return new ResponseEntity<>("{\"message\": \"Hello from secured endpoint\"}", httpHeaders, HttpStatus.OK);
    }
    @Transactional
    @PostMapping("/addShot")
    public ResponseEntity<String> addShot(
            @RequestHeader("Authorization") String header,
           @Valid @RequestBody Coordinates coordinates
            ){
        String username =getUsername(header);
        if (userRepository.findByName(username).isEmpty()){
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        Shot shot = new Shot();
        shot.setX(coordinates.getX());
        shot.setY(coordinates.getY());
        shot.setR(coordinates.getR());
        shot.setOwnername(username);
        shot.setCreateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
        shot.setKill(AreaChecker.checkIsKill(coordinates.getX(), coordinates.getY(),coordinates.getR()));
        shotRepository.save(shot);
        return ResponseEntity.ok("{\"message\":\"" +username+"'s shot is ok\"}");
    }

    @GetMapping("/getShots")
    public ResponseEntity<String> getShots(
            @RequestHeader("Authorization") String header
            ) throws JsonProcessingException {
        String username =getUsername(header);
        System.out.println(username);
        if (userRepository.findByName(username).isEmpty()){
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        List<Shot> shots = shotRepository.findAllByOwnername(username);
        ObjectMapper mapper = new ObjectMapper(); // Создание экземпляра ObjectMapper
        String json = mapper.writeValueAsString(shots); // Преобразование списка объектов в JSON
        return ResponseEntity.ok(json);
    }

    @DeleteMapping()
    @Transactional
    public ResponseEntity<?> clearShots(
            @RequestHeader("Authorization") String header
    ){
        String username =getUsername(header);
        System.out.println(username);
        if (userRepository.findByName(username).isEmpty()){
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        shotRepository.deleteShotsByOwnername(username);
        return ResponseEntity.noContent().build();

    }



    private String getUsername(String header){
        String jwt = header.substring(7);
        String username = jwtService.extractUsername(jwt);
        return username;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
//        response ex: {"r":"r must be greater than or equal to 0.0"}
    }
}

