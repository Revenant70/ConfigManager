package com.app.spring.Entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class ConfigsEntityTest {
    @Test
    public void testGettersAndSetters() {
        // Create a Config instance
        ConfigsEntity config = new ConfigsEntity();

        // Set values using setters
        Long configId = 1L;
        String name = "Test Config";
        String content = "Test content";
        UserEntity user = new UserEntity();

        config.setConfigid(configId);
        config.setName(name);
        config.setContent(content);
        config.setUser(user);

        // Test getters
        assertEquals(configId, config.getConfigid());
        assertEquals(name, config.getName());
        assertEquals(content, config.getContent());
        assertEquals(user, config.getUser());
    }

    @Test
    public void testEqualsAndHashCode() {
        // Create two Config instances with the same attributes
        ConfigsEntity config1 = new ConfigsEntity();
        ConfigsEntity config2 = new ConfigsEntity();

        // Test equals
        assertTrue(config1.equals(config2));
        assertTrue(config2.equals(config1));

        // Test hash code
        assertEquals(config1.hashCode(), config2.hashCode());
    }

    @Test
    public void testToString() {
        // Create a Config instance
        ConfigsEntity config = new ConfigsEntity();

        // Test toString
        String expectedToString = "ConfigsEntity(configid=null, name=null, content=null, user=null)";
        assertEquals(expectedToString, config.toString());
    }
}
