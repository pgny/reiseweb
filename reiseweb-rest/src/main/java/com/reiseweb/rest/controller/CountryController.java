package com.reiseweb.rest.controller;

import com.reiseweb.persistenz.entity.Country;
import com.reiseweb.rest.mapper.CountryMapper;
import com.reiseweb.rest.model.CountryDTO;
import com.reiseweb.service.CountryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<CountryDTO> getAllCountries() {
        return countryService.findAll().stream()
                .map(CountryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CountryDTO getCountryById(@PathVariable Long id) {
        return countryService.findById(id).map(CountryMapper::toDTO).orElse(null);
    }

    @PostMapping
    public Country createCountry(@RequestBody Country country) {
        return countryService.save(country);
    }

    @PutMapping("/{id}")
    public Country updateCountry(@PathVariable Long id, @RequestBody Country country) {
        country.setId(id);
        return countryService.save(country);
    }

    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable Long id) {
        countryService.deleteById(id);
    }
}