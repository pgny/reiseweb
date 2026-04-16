package com.reiseweb.rest.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountryDTO {
    private Long id;
    private String code;
    private String name;
    private String nameGerman;
    private String continent;
    private String capital;
    private String description;
    private String descriptionGerman;
    private int cityCount;
}
