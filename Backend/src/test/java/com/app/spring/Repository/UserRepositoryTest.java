package com.app.spring.Repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.app.spring.Entity.UserEntity;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("john_doe");
        userEntity.setEmail("john@example.com");
        userEntity.setPassword("password123");

        UserEntity savedEntity = userRepository.save(userEntity);

        assertEquals(userEntity.getUsername(), savedEntity.getUsername());

    }

    @Test
    void testFindUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("john_doe");
        userEntity.setEmail("john@example.com");
        userEntity.setPassword("password123");
        userRepository.save(userEntity);

        UserEntity foundEntity = userRepository.findByEmail("john@example.com");
        assertNotNull(foundEntity);

        foundEntity = userRepository.findByUsername("john_doe");
        assertNotNull(foundEntity);
    }

    @Test
    void testUpdateUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("testuser");
        userEntity.setEmail("test@example.com");
        userEntity.setPassword("password");
        UserEntity savedUser = userRepository.save(userEntity);

        savedUser.setEmail("newemail@example.com");
        UserEntity updatedUser = userRepository.save(savedUser);

        assertNotNull(updatedUser);
        assertEquals(savedUser.getUserid(), updatedUser.getUserid());
        assertEquals("newemail@example.com", updatedUser.getEmail());
    }

    @Test
    void testDeleteUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("testuser");
        userEntity.setEmail("test@example.com");
        userEntity.setPassword("password");

        UserEntity savedEntity = userRepository.save(userEntity);

        userRepository.delete(savedEntity);

        assertFalse(userRepository.existsById(savedEntity.getUserid()));
    }
}
