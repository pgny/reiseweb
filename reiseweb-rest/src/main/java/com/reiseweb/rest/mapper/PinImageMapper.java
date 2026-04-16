package com.reiseweb.rest.mapper;

import com.reiseweb.persistenz.entity.PinImage;
import com.reiseweb.rest.model.PinImageDTO;

public class PinImageMapper {

    public static PinImageDTO toDTO(PinImage image) {
        return PinImageDTO.builder()
                .id(image.getId())
                .fileName(image.getFileName())
                .uploadedAt(image.getUploadedAt())
                .build();
    }
}
