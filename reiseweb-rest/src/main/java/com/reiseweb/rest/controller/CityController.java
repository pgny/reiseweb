package com.reiseweb.rest.controller;

import com.reiseweb.persistenz.entity.City;
import com.reiseweb.rest.mapper.CityMapper;
import com.reiseweb.rest.model.CityDTO;
import com.reiseweb.service.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/cities")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public List<CityDTO> getAllCities() {
        return cityService.findAll().stream()
                .map(CityMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CityDTO getCityById(@PathVariable Long id) {
        return cityService.findById(id).map(CityMapper::toDTO).orElse(null);
    }

    @PostMapping
    public City createCity(@RequestBody City city) {
        return cityService.save(city);
    }

    @PutMapping("/{id}")
    public City updateCity(@PathVariable Long id, @RequestBody City city) {
        city.setId(id);
        return cityService.save(city);
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable Long id) {
        cityService.deleteById(id);
    }
}
