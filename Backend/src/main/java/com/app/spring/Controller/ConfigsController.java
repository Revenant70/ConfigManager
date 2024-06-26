package com.app.spring.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.SyncTaskExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.app.spring.Entity.ConfigsEntity;
import com.app.spring.Repository.UserRepository;
import com.app.spring.Service.ConfigsService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@Controller
@RequestMapping("/api")
public class ConfigsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfigsService configsService;
    
    @PostMapping("/config")
    public ResponseEntity<String> createNewConfig(@RequestBody ConfigsEntity configsEntity, Authentication authentication) {
        try {
            System.out.println(authentication.getName());
            String logginUser = authentication.getName();
            configsEntity.setUser(userRepository.findByUsername(logginUser));
            configsService.createConfig(configsEntity);
        } catch (Exception exception) {
            System.out.println(exception.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getLocalizedMessage());
        }
        
        return new ResponseEntity<>("New config created successfully", HttpStatus.CREATED);
    }

    @GetMapping("/config")
    public ResponseEntity<?> getUserConfigs(Authentication authentication) {
        System.out.println(authentication + "\n\n");
        Optional<List<ConfigsEntity>> configs;
        try {
            configs = configsService.getUserConfigs(authentication.getName());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return new ResponseEntity<>("There was an internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(configs, HttpStatus.OK);
    }

    @PutMapping("config/{id}")
    public ResponseEntity<?> editUserConfig(@PathVariable Long id, @RequestBody ConfigsEntity configsEntity) {
        try {
            System.out.println(id + " " + configsEntity);
            configsService.updateConfig(id, configsEntity);
            return new ResponseEntity<>("Config updated successfully", HttpStatus.OK);
       } catch(Exception exception) {
            System.out.println(exception);
        return new ResponseEntity<>("Couldn't update config", HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    
    @DeleteMapping("config/{id}")
    public ResponseEntity<?> deleteUserConfig(@PathVariable Long id) {
        try {
            configsService.deleteConfig(id);
            return new ResponseEntity<>("Config deleted successfully", HttpStatus.OK);
       } catch(Exception exception) {
            System.out.println(exception);
        return new ResponseEntity<>("Couldn't delete config", HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    
    

}
