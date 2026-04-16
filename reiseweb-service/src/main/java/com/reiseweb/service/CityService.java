package com.reiseweb.service;

import com.reiseweb.persistenz.entity.City;
import com.reiseweb.persistenz.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> findAll() {
        return cityRepository.findAll();
    }

    public Optional<City> findById(Long id) {
        return cityRepository.findById(id);
    }

    public City save(City city) {
        return cityRepository.save(city);
    }

    public void deleteById(Long id) {
        cityRepository.deleteById(id);
    }
}
