package com.app.spring.Repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.app.spring.Entity.ConfigsEntity;


@Repository
@EnableJpaRepositories
public interface ConfigsRepository extends JpaRepository<ConfigsEntity, Long>  {
    Optional<List<ConfigsEntity>> findByUserUsername(String username);
    Optional<ConfigsEntity> findByConfigid(Long configid);
}
