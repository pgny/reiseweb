package com.reiseweb.rest.controller;

import com.reiseweb.rest.mapper.PinImageMapper;
import com.reiseweb.rest.model.PinImageDTO;
import com.reiseweb.service.PinImageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
public class PinImageController {

    private final PinImageService pinImageService;

    public PinImageController(PinImageService pinImageService) {
        this.pinImageService = pinImageService;
    }

    @GetMapping("/pin/{pinId}")
    public List<PinImageDTO> getImagesForPin(@PathVariable Long pinId) {
        return pinImageService.findByPinId(pinId).stream()
                .map(PinImageMapper::toDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Long id) {
        pinImageService.deleteById(id);
    }
}