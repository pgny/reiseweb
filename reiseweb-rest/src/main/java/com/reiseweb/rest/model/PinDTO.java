package com.reiseweb.rest.model;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PinDTO {
    private Long id;
    private String title;
    private String notes;
    private double latitude;
    private double longitude;
    private LocalDate visitDate;
    private Integer rating;
    private String countryCode;
    private String countryName;
    private String cityName;
    private List<PinImageDTO> images;
}
