package com.reiseweb.rest.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CityDTO {
    private Long id;
    private String name;
    private String nameGerman;
    private Double latitude;
    private Double longitude;
    private String countryCode;
    private String countryName;
}