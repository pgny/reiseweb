package com.reiseweb.persistenz.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pins")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String notes;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column
    private LocalDate visitDate;

    @Column
    private Integer rating; //muss null sein können

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "country_id")
    // nullable, weil nicht jeder Punkt auf der Welt einem Land zugeordnet werden kann (muss noch gucken was die API in solchen Fällen macht)
    private Country country;

    @ManyToOne
    @JoinColumn(name = "city_id") // nullable, weil man ist nicht immer in einer Stadt
    private City city;

    @OneToMany(mappedBy = "pin", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PinImage> images = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
