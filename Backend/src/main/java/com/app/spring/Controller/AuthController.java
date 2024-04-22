package com.app.spring.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.spring.Entity.ResetToken;
import com.app.spring.Entity.UserEntity;
import com.app.spring.Service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/api/users")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserEntity userSignupEntity) {
        if(authService.doesUserExist(userSignupEntity)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        if(authService.signup(userSignupEntity) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        };

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity userEntity) {
        if(!(authService.doesUserExist(userEntity))) {
            return new ResponseEntity<String>("User does not exist", HttpStatus.NOT_FOUND);
        }
        if(!(authService.passwordsMatch(userEntity))) {
            return new ResponseEntity<String>("Passwords did not match", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("login successful", HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody UserEntity userEntity) {
        try {
            authService.forgotPassword(userEntity.getEmail());
            return new ResponseEntity<String>("Confirmation code sent", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("User Email doesn't exist", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/authenticate-token")
    public ResponseEntity<?> authenticateToken(@RequestBody ResetToken resetToken) {
        try {
            authService.authenticateToken(resetToken);
            return new ResponseEntity<>("Token Successfully authenticated", HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            return new ResponseEntity<>("There was a problem authenticating reset token", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
}
