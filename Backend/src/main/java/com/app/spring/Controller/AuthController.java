package com.app.spring.Controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.spring.Entity.UserEntity;
import com.app.spring.Service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/api")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/users/signup")
    public ResponseEntity<String> signup(@RequestBody UserEntity userSignupEntity) {
        if(authService.doesUserExist(userSignupEntity)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        if(authService.signup(userSignupEntity) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        };

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/users/login")
    public ResponseEntity<String> login(@RequestBody UserEntity userEntity) {
        if(!(authService.doesUserExist(userEntity))) {
            return new ResponseEntity<String>("User does not exist", HttpStatus.NOT_FOUND);
        }
        if(!(authService.passwordsMatch(userEntity))) {
            return new ResponseEntity<String>("Passwords did not match", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("login successful", HttpStatus.OK);
    }
    
}
