package com.reiseweb.rest.mapper;

import com.reiseweb.persistenz.entity.City;
import com.reiseweb.persistenz.entity.Country;
import com.reiseweb.persistenz.entity.Pin;
import com.reiseweb.rest.model.PinDTO;

import java.util.Collections;
import java.util.stream.Collectors;

public class PinMapper {

    public static PinDTO toDTO(Pin pin) {
        Country country = pin.getCountry();
        City city = pin.getCity();

        return PinDTO.builder()
                .id(pin.getId())
                .title(pin.getTitle())
                .notes(pin.getNotes())
                .latitude(pin.getLatitude())
                .longitude(pin.getLongitude())
                .visitDate(pin.getVisitDate())
                .rating(pin.getRating())
                .countryCode(country != null ? country.getCode() : null)
                .countryName(country != null ? country.getName() : null)
                .cityName(city != null ? city.getName() : null)
                .images(pin.getImages() != null
                        ? pin.getImages().stream()
                        .map(PinImageMapper::toDTO)
                        .collect(Collectors.toList())
                        : Collections.emptyList())
                .build();
    }
}
