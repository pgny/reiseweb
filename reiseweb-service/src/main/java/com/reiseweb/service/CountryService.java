package com.reiseweb.service;

import com.reiseweb.persistenz.entity.Country;
import com.reiseweb.persistenz.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    public Optional<Country> findById(Long id) {
        return countryRepository.findById(id);
    }

    public Country save(Country country) {
        return countryRepository.save(country);
    }

    public void deleteById(Long id) {
        countryRepository.deleteById(id);
    }
}
