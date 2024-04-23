package com.app.spring.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.app.spring.Entity.ResetToken;
import com.app.spring.Entity.UserEntity;

@DataJpaTest
public class ResetTokenRepositoryTest {

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveResetToken() {

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("john_doe");
        userEntity.setEmail("john@example.com");
        userEntity.setPassword("password123");
        userRepository.save(userEntity);

        ResetToken resetToken = new ResetToken();
        resetToken.setToken("testtoken");
        resetToken.setExpiryDate(new Date());
        resetToken.setUser(userEntity);

        ResetToken savedToken = resetTokenRepository.save(resetToken);

        assertNotNull(savedToken);
        assertNotNull(savedToken.getToken());
        assertNotNull(savedToken.getExpiryDate());
        assertEquals("testtoken", savedToken.getToken());
        assertEquals(resetToken.getExpiryDate(), savedToken.getExpiryDate());
    }

    @Test
    void testFindResetTokenByToken() {

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("john_doe");
        userEntity.setEmail("john@example.com");
        userEntity.setPassword("password123");
        userRepository.save(userEntity);

        ResetToken resetToken = new ResetToken();
        resetToken.setToken("testtoken");
        resetToken.setExpiryDate(new Date());
        resetToken.setUser(userEntity);
        resetTokenRepository.save(resetToken);

        ResetToken foundToken = resetTokenRepository.findByToken("testtoken");

        assertNotNull(foundToken);
        assertEquals("testtoken", foundToken.getToken());
    }

    @Test
    void testDeleteResetToken() {

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("john_doe");
        userEntity.setEmail("john@example.com");
        userEntity.setPassword("password123");
        userRepository.save(userEntity);

        ResetToken resetToken = new ResetToken();
        resetToken.setToken("testtoken");
        resetToken.setExpiryDate(new Date());
        resetToken.setUser(userEntity);
        ResetToken savedToken = resetTokenRepository.save(resetToken);

        resetTokenRepository.delete(savedToken);

        assertFalse(resetTokenRepository.existsById("testtoken"));
    }

}
