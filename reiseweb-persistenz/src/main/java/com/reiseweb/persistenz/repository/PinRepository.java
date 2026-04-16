package com.reiseweb.persistenz.repository;

import com.reiseweb.persistenz.entity.Pin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PinRepository extends JpaRepository<Pin, Long> {
}