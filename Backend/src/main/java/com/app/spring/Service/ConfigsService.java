package com.app.spring.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.spring.Entity.ConfigsEntity;
import com.app.spring.Repository.ConfigsRepository;

import jakarta.persistence.EntityNotFoundException;

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

    public void updateConfig(Long configId, ConfigsEntity configsEntity) {
        try {
            Optional<ConfigsEntity> dbConfigEntity = configsRepository.findByConfigid(configId);
            if (dbConfigEntity != null) {
                if (!(configsEntity.getName().isEmpty())) {
                    dbConfigEntity.get().setName(configsEntity.getName());
                }
                if (!configsEntity.getContent().isEmpty()) {
                    dbConfigEntity.get().setContent(configsEntity.getContent());
                }
                configsRepository.save(dbConfigEntity.get());
            }

        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.out.println(e.getLocalizedMessage());
        }
    }
}
