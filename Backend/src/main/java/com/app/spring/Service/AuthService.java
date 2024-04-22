package com.app.spring.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.spring.Entity.Role;
import com.app.spring.Entity.UserEntity;
import com.app.spring.Repository.UserRepository;

// /api/users/signup

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity signup(UserEntity userEntity) {
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        userEntity.setRole(Role.USER);
        userRepository.save(userEntity);
        return userEntity;
    }

    public UserEntity login(UserEntity userEntity) {
        
        return userEntity;
    }

    public boolean doesUserExist(UserEntity userEntity) {
        if (userRepository.findByUsername(userEntity.getUsername()) == null) {
            return false;
        } else {
            return true;
        }

    }

    public boolean passwordsMatch(UserEntity userEntity) {
        UserEntity dbUser = userRepository.findByUsername(userEntity.getUsername());
        if(passwordEncoder.matches(userEntity.getPassword(), dbUser.getPassword())) {
            return true;
        }
        return false;
    }

}
