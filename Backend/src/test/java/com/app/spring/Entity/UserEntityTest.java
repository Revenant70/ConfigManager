package com.app.spring.Entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class UserEntityTest {

    private UserEntity user;

    @BeforeEach
    public void setUp() {
        user = new UserEntity();
    }

    @Test
    public void testGettersAndSetters() {
        user.setUsername("john_doe");
        assertEquals("john_doe", user.getUsername());

        user.setPassword("password123");
        assertEquals("password123", user.getPassword());

        user.setEmail("john@example.com");
        assertEquals("john@example.com", user.getEmail());

        user.setEnabled(true);
        assertTrue(user.isEnabled());

        user.setRole(Role.USER);
        assertEquals(Role.USER, user.getRole());
    }

    @Test
    public void testGetAuthorities() {

        user.setRole(Role.ADMIN);
        assertEquals(1, user.getAuthorities().size());
        assertTrue(user.getAuthorities().contains(new SimpleGrantedAuthority(Role.ADMIN.name())));

        user.setRole(Role.USER);
        assertEquals(1, user.getAuthorities().size());
        assertTrue(user.getAuthorities().contains(new SimpleGrantedAuthority(Role.USER.name())));
    }

    @Test
    public void testUserDetailsMethods() {
       
        assertTrue(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertTrue(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }

    @Test
    public void testEqualsAndHashCode() {
        
        UserEntity user1 = new UserEntity();
        user1.setUsername("user1");
        user1.setPassword("password");
        user1.setEmail("user1@example.com");

        UserEntity user2 = new UserEntity();
        user2.setUsername("user1");
        user2.setPassword("password");
        user2.setEmail("user1@example.com");

        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testToString() {
       
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        user.setPassword("password");
        user.setRole(Role.USER);
        assertEquals("UserEntity(userid=null, username=john_doe, password=password, email=john@example.com, enabled=true, role=USER)", user.toString());
    }

}