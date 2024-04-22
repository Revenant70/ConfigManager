package com.app.spring.Service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.spring.Entity.ResetToken;
import com.app.spring.Entity.Role;
import com.app.spring.Entity.UserEntity;
import com.app.spring.Exception.TokenExpiredException;
import com.app.spring.Repository.ResetTokenRepository;
import com.app.spring.Repository.UserRepository;

import jakarta.transaction.Transactional;

// /api/users/signup

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String gmail;

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

    public void forgotPassword(String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            Date date = ResetTokenService.calculateExpiryDate();
            ResetToken token = ResetTokenService.generateToken(userEntity, date);

            String url = "https://configmanager.jacksonmcgillivary.dev/auth/forgotpassword/changepassword/" + 
                     userEntity.getUserid() + "/" + token.getToken();
            resetTokenRepository.save(token);

            String testurl = "http://localhost:5173/auth/forgotpassword/changepassword/" + 
            userEntity.getUserid() + "/" + token.getToken();
            resetTokenRepository.save(token);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(gmail);
            message.setTo(email);
            message.setSubject("reset password");
            message.setText("Click this link to reset your password: " + testurl);
            emailSender.send(message);
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }

    }

    @Transactional
    public void authenticateToken(ResetToken resetToken) {
        try {
            ResetToken dbResetToken = resetTokenRepository.findByToken(resetToken.getToken());
            Date currentDate = new Date();
            if(currentDate.before(dbResetToken.getExpiryDate())) {
                resetTokenRepository.deleteByToken(dbResetToken.getToken());
            } else {
                throw new TokenExpiredException("Password reset token has expired");
            }
        } catch(Exception e) {
            e.printStackTrace();
            System.out.println(e.getLocalizedMessage());
        }
    }

}
