package com.reiseweb.service;

import com.reiseweb.persistenz.entity.PinImage;
import com.reiseweb.persistenz.repository.PinImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PinImageService {

    private final PinImageRepository pinImageRepository;

    public PinImageService(PinImageRepository pinImageRepository) {
        this.pinImageRepository = pinImageRepository;
    }

    public List<PinImage> findAll() {
        return pinImageRepository.findAll();
    }

    public Optional<PinImage> findById(Long id) {
        return pinImageRepository.findById(id);
    }

    public List<PinImage> findByPinId(Long pinId) {
        return pinImageRepository.findByPinId(pinId);
    }

    public PinImage save(PinImage pinImage) {
        return pinImageRepository.save(pinImage);
    }

    public void deleteById(Long id) {
        pinImageRepository.deleteById(id);
    }
}
