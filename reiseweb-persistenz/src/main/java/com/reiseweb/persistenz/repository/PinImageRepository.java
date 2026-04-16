package com.reiseweb.persistenz.repository;

import com.reiseweb.persistenz.entity.PinImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PinImageRepository extends JpaRepository<PinImage, Long> {
    List<PinImage> findByPinId(Long pinId);
}