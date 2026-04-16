package com.reiseweb.rest.mapper;

import com.reiseweb.persistenz.entity.City;
import com.reiseweb.rest.model.CityDTO;

public class CityMapper {

    public static CityDTO toDTO(City city) {
        return CityDTO.builder()
                .id(city.getId())
                .name(city.getName())
                .nameGerman(city.getNameGerman())
                .latitude(city.getLatitude())
                .longitude(city.getLongitude())
                .countryCode(city.getCountry() != null ? city.getCountry().getCode() : null)
                .countryName(city.getCountry() != null ? city.getCountry().getName() : null)
                .build();
    }
}