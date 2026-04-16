package com.reiseweb.rest.model;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PinImageDTO {
    private Long id;
    private String fileName;
    private LocalDateTime uploadedAt;
}