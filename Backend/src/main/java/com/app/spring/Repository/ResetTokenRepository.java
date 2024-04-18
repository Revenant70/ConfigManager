package com.app.spring.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.app.spring.Entity.ResetToken;

@Repository
@EnableJpaRepositories
public interface ResetTokenRepository extends JpaRepository<ResetToken, String> {
    ResetToken findByToken(String token);
    void deleteByToken(String token);
}
