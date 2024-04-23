package com.app.spring.Entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ResetTokenEntityTest {
    
    private ResetToken resetToken;

    @BeforeEach
    public void setUp() {
        resetToken = new ResetToken();
    }

    @Test
    public void testGetAndSetToken() {
        String token = "testToken";
        resetToken.setToken(token);
        assertEquals(token, resetToken.getToken());
    }

    @Test
    public void testGetAndSetExpiryDate() {
        Date expiryDate = new Date();
        resetToken.setExpiryDate(expiryDate);
        assertEquals(expiryDate, resetToken.getExpiryDate());
    }

    @Test
    public void testGetAndSetUser() {
        UserEntity user = new UserEntity();
        resetToken.setUser(user);
        assertEquals(user, resetToken.getUser());
    }

    @Test
    public void testConstructorWithArgs() {
        String token = "testToken";
        Date expiryDate = new Date();
        UserEntity user = new UserEntity();
        
        ResetToken resetToken = new ResetToken(token, expiryDate, user);
        
        assertEquals(token, resetToken.getToken());
        assertEquals(expiryDate, resetToken.getExpiryDate());
        assertEquals(user, resetToken.getUser());
    }

    @Test
    public void testEqualsAndHashCode() {
        String token1 = "token1";
        String token2 = "token2";
        Date expiryDate = new Date();
        UserEntity user1 = new UserEntity();
        UserEntity user2 = new UserEntity();
        
        ResetToken resetToken1 = new ResetToken(token1, expiryDate, user1);
        ResetToken resetToken2 = new ResetToken(token1, expiryDate, user1);
        ResetToken resetToken3 = new ResetToken(token2, expiryDate, user2);
        
        assertEquals(resetToken1, resetToken2); 
        assertNotEquals(resetToken1, resetToken3); 
        assertEquals(resetToken1.hashCode(), resetToken2.hashCode()); 
    }
}
