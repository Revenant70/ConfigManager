package com.app.spring.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.app.spring.Entity.UserEntity;
import com.app.spring.Repository.ResetTokenRepository;
import com.app.spring.Repository.UserRepository;

public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ResetTokenRepository resetTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JavaMailSender emailSender;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLogin() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();

        // Perform the method to test
        UserEntity loggedInUser = authService.login(userEntity);

        // Verify that the same user is returned
        assertEquals(userEntity, loggedInUser);
    }

    @Test
    public void testDoesUserExist_UserExists() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("existingUser");

        // Mock dependencies behavior
        when(userRepository.findByUsername(userEntity.getUsername())).thenReturn(userEntity);

        // Perform the method to test
        boolean userExists = authService.doesUserExist(userEntity);

        // Verify that user exists
        assertTrue(userExists);
        verify(userRepository, times(1)).findByUsername(userEntity.getUsername());
    }

    @Test
    public void testDoesUserExist_UserDoesNotExist() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("nonExistingUser");

        // Mock dependencies behavior
        when(userRepository.findByUsername(userEntity.getUsername())).thenReturn(null);

        // Perform the method to test
        boolean userExists = authService.doesUserExist(userEntity);

        // Verify that user does not exist
        assertFalse(userExists);
        verify(userRepository, times(1)).findByUsername(userEntity.getUsername());
    }

    @Test
    public void testPasswordsMatch_PasswordsMatch() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("testUser");
        userEntity.setPassword("testPassword");

        // Mock dependencies behavior
        when(userRepository.findByUsername(userEntity.getUsername())).thenReturn(userEntity);
        when(passwordEncoder.matches(userEntity.getPassword(), userEntity.getPassword())).thenReturn(true);

        // Perform the method to test
        boolean passwordsMatch = authService.passwordsMatch(userEntity);

        // Verify that passwords match
        assertTrue(passwordsMatch);
        verify(userRepository, times(1)).findByUsername(userEntity.getUsername());
        verify(passwordEncoder, times(1)).matches(userEntity.getPassword(), userEntity.getPassword());
    }

    @Test
    public void testResetPassword_Success() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setUserid(123L);
        userEntity.setPassword("newPassword");
        UserEntity dbUserEntity = new UserEntity();
        dbUserEntity.setUserid(123L);
        dbUserEntity.setPassword("oldPassword");

        // Mock dependencies behavior
        when(userRepository.findByUserid(userEntity.getUserid())).thenReturn(dbUserEntity);
        when(userRepository.save(any())).thenAnswer(invocation -> {
            dbUserEntity.setPassword("newPassword"); 
            return dbUserEntity;
        });

        // Perform the method to test
        authService.resetPassword(userEntity);

        // Verify that the password is reset and user is saved
        assertEquals("newPassword", dbUserEntity.getPassword());
        verify(userRepository, times(1)).save(dbUserEntity);
    }
}
