package com.app.spring.Entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "config")
@Data
@DynamicInsert
@DynamicUpdate
public class ConfigsEntity {

    public static Object getName;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "configid")
    private Long configid;

    @Column(name = "name")
    private String name;

    @Column(columnDefinition = "LONGTEXT", name="content")
    private String content;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userid", referencedColumnName = "userid", nullable = false)
    private UserEntity user;
}
