package com.app.spring.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.spring.Entity.UserEntity;

@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserid(Long userid);
    UserEntity findByUsername(@Param("username") String username);
    UserEntity findByEmail(String email);
}
