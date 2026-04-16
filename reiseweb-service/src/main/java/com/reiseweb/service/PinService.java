package com.reiseweb.service;

import com.reiseweb.persistenz.entity.City;
import com.reiseweb.persistenz.entity.Country;
import com.reiseweb.persistenz.entity.Pin;
import com.reiseweb.persistenz.repository.CityRepository;
import com.reiseweb.persistenz.repository.CountryRepository;
import com.reiseweb.persistenz.repository.PinRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PinService {

    private final PinRepository pinRepository;
    private final CountryRepository countryRepository;
    private final CityRepository cityRepository;
    private final GeocodingService geocodingService;

    public PinService(PinRepository pinRepository, CountryRepository countryRepository,
                      CityRepository cityRepository, GeocodingService geocodingService) {
        this.pinRepository = pinRepository;
        this.countryRepository = countryRepository;
        this.cityRepository = cityRepository;
        this.geocodingService = geocodingService;
    }

    public List<Pin> findAll() {
        return pinRepository.findAll();
    }

    public Optional<Pin> findById(Long id) {
        return pinRepository.findById(id);
    }

    public Pin save(Pin pin) {
        Map<String, String> location = geocodingService.reverseGeocode(pin.getLatitude(), pin.getLongitude());

        String countryCode = location.get("countryCode");
        String countryName = location.get("countryName");
        String cityName = location.get("cityName");

        if (countryCode != null && !countryCode.isEmpty()) {
            Country country = countryRepository.findByCode(countryCode)
                    .orElseGet(() -> countryRepository.save(
                            Country.builder()
                                    .code(countryCode)
                                    .name(countryName)
                                    .build()
                    ));
            pin.setCountry(country);
        }

        if (cityName != null && !cityName.isEmpty() && pin.getCountry() != null) {
            City city = cityRepository.findByNameAndCountry(cityName, pin.getCountry())
                    .orElseGet(() -> cityRepository.save(
                            City.builder()
                                    .name(cityName)
                                    .latitude(pin.getLatitude())
                                    .longitude(pin.getLongitude())
                                    .country(pin.getCountry())
                                    .build()
                    ));
            pin.setCity(city);
        }
        return pinRepository.save(pin);
    }

    public void deleteById(Long id) {
        pinRepository.deleteById(id);
    }
}