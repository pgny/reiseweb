package com.reiseweb.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.reiseweb.persistenz.entity")
@ComponentScan({"com.reiseweb.rest", "com.reiseweb.service"})
@EnableJpaRepositories("com.reiseweb.persistenz.repository")
public class ReisewebRestApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReisewebRestApplication.class, args);
    }
}