package com.app.spring.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.spring.Entity.ConfigsEntity;
import com.app.spring.Repository.ConfigsRepository;

@Service
public class ConfigsService {

    @Autowired
    private ConfigsRepository configsRepository;
    
    public void createConfig(ConfigsEntity configsEntity) {
        configsRepository.save(configsEntity);
    }

    public Optional<List<ConfigsEntity>> getUserConfigs(String username) {
        Optional<List<ConfigsEntity>> configs = configsRepository.findByUserUsername(username);
        return configs;
    }
}
