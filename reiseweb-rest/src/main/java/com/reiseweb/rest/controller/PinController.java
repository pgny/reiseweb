package com.reiseweb.rest.controller;

import com.reiseweb.persistenz.entity.Pin;
import com.reiseweb.rest.mapper.PinMapper;
import com.reiseweb.rest.model.PinDTO;
import com.reiseweb.service.PinService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/pins")
public class PinController {

    private final PinService pinService;

    public PinController(PinService pinService) {
        this.pinService = pinService;
    }

    @GetMapping
    public List<PinDTO> getAllPins() {
        return pinService.findAll().stream()
                .map(PinMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PinDTO getPinById(@PathVariable Long id) {
        return pinService.findById(id).map(PinMapper::toDTO).orElse(null);
    }

    @PostMapping
    public Pin createPin(@RequestBody Pin pin) {
        return pinService.save(pin);
    }

    @PutMapping("/{id}")
    public Pin updatePin(@PathVariable Long id, @RequestBody Pin pin) {
        pin.setId(id);
        return pinService.save(pin);
    }

    @DeleteMapping("/{id}")
    public void deletePin(@PathVariable Long id) {
        pinService.deleteById(id);
    }
}