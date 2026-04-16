package com.reiseweb.persistenz.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pin_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PinImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String contentType;

    @Lob
    @Column(nullable = false)
    private byte[] data;

    @Column
    private LocalDateTime uploadedAt;

    @ManyToOne
    @JoinColumn(name = "pin_id", nullable = false)
    private Pin pin;

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
}