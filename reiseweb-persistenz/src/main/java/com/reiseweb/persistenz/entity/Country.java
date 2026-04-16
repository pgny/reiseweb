package com.reiseweb.persistenz.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "countries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column
    private String nameGerman;

    private String continent;
    private String capital;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String descriptionGerman;

    @Column(length = 10000)
    private String aiRecommendation;

    @Column
    private String aiRecommendationLang;

    @OneToMany(mappedBy = "country")
    @JsonManagedReference
    private List<City> cities;
}
