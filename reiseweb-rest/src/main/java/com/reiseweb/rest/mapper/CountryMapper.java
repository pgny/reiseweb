package com.reiseweb.rest.mapper;

import com.reiseweb.persistenz.entity.Country;
import com.reiseweb.rest.model.CountryDTO;

public class CountryMapper {

    public static CountryDTO toDTO(Country country) {
        return CountryDTO.builder()
                .id(country.getId())
                .code(country.getCode())
                .name(country.getName())
                .nameGerman(country.getNameGerman())
                .continent(country.getContinent())
                .capital(country.getCapital())
                .description(country.getDescription())
                .descriptionGerman(country.getDescriptionGerman())
                .cityCount(country.getCities() != null ? country.getCities().size() : 0)
                .build();
    }
}