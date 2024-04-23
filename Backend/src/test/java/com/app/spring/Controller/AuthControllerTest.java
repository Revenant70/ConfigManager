package com.app.spring.Controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.app.spring.Entity.ResetToken;
import com.app.spring.Entity.UserEntity;
import com.app.spring.Service.AuthService;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {
    
    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @Test
    public void testSignup_UserDoesNotExist_ReturnsCreated() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        when(authService.doesUserExist(userEntity)).thenReturn(false);
        when(authService.signup(userEntity)).thenReturn(userEntity);

        // Perform the method to test
        ResponseEntity<String> response = authController.signup(userEntity);

        // Verify the response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    public void testSignup_UserAlreadyExists_ReturnsConflict() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        when(authService.doesUserExist(userEntity)).thenReturn(true);

        // Perform the method to test
        ResponseEntity<String> response = authController.signup(userEntity);

        // Verify the response
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }

    @Test
    public void testLogin_ValidUser_ReturnsOk() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        when(authService.doesUserExist(userEntity)).thenReturn(true);
        when(authService.passwordsMatch(userEntity)).thenReturn(true);

        // Perform the method to test
        ResponseEntity<String> response = authController.login(userEntity);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("login successful", response.getBody());
    }

    @Test
    public void testLogin_UserNotFound_ReturnsNotFound() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        when(authService.doesUserExist(userEntity)).thenReturn(false);

        // Perform the method to test
        ResponseEntity<String> response = authController.login(userEntity);

        // Verify the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User does not exist", response.getBody());
    }

    @Test
    public void testLogin_PasswordsDoNotMatch_ReturnsBadRequest() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        when(authService.doesUserExist(userEntity)).thenReturn(true);
        when(authService.passwordsMatch(userEntity)).thenReturn(false);

        // Perform the method to test
        ResponseEntity<String> response = authController.login(userEntity);

        // Verify the response
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Passwords did not match", response.getBody());
    }

    @Test
    public void testForgotPassword_ValidEmail_ReturnsOk() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("test@example.com");
        doNothing().when(authService).forgotPassword("test@example.com");

        // Perform the method to test
        ResponseEntity<?> response = authController.forgotPassword(userEntity);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Confirmation code sent", response.getBody());
    }

    @Test
    public void testForgotPassword_InvalidEmail_ReturnsInternalServerError() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("test@example.com");
        doThrow(new RuntimeException("User Email doesn't exist")).when(authService).forgotPassword("test@example.com");

        // Perform the method to test
        ResponseEntity<?> response = authController.forgotPassword(userEntity);

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("User Email doesn't exist", response.getBody());
    }

    @Test
    public void testAuthenticateToken_ValidToken_ReturnsOk() {
        // Prepare test data
        ResetToken resetToken = new ResetToken();
        resetToken.setToken("validToken");
        doNothing().when(authService).authenticateToken(resetToken);

        // Perform the method to test
        ResponseEntity<?> response = authController.authenticateToken(resetToken);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Token Successfully authenticated", response.getBody());
    }

    @Test
    public void testAuthenticateToken_InvalidToken_ReturnsInternalServerError() {
        // Prepare test data
        ResetToken resetToken = new ResetToken();
        resetToken.setToken("invalidToken");
        doThrow(new RuntimeException("There was a problem authenticating reset token")).when(authService).authenticateToken(resetToken);

        // Perform the method to test
        ResponseEntity<?> response = authController.authenticateToken(resetToken);

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("There was a problem authenticating reset token", response.getBody());
    }

    @Test
    public void testResetPassword_ValidUser_ReturnsOk() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setUserid(123L);
        userEntity.setPassword("newPassword");
        doNothing().when(authService).resetPassword(userEntity);

        // Perform the method to test
        ResponseEntity<?> response = authController.resetPassword(userEntity);

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password successfully reset", response.getBody());
    }

    @Test
    public void testResetPassword_InvalidUser_ReturnsInternalServerError() {
        // Prepare test data
        UserEntity userEntity = new UserEntity();
        userEntity.setUserid(123L);
        userEntity.setPassword("newPassword");
        doThrow(new RuntimeException("There was a problem resetting user password")).when(authService).resetPassword(userEntity);

        // Perform the method to test
        ResponseEntity<?> response = authController.resetPassword(userEntity);

        // Verify the response
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("There was a problem resetting user password", response.getBody());
    }
}