package com.reiseweb.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate;

    public GeocodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, String> reverseGeocode(double lat, double lng) {
        String url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat
                + "&lon=" + lng
                + "&format=json&accept-language=de";

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "ReisewebApp/1.0");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        @SuppressWarnings("unchecked")
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, (Class) Map.class);
        Map<String, Object> response = responseEntity.getBody();

        if (response == null || !response.containsKey("address")) {
            return Map.of();
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> address = (Map<String, Object>) response.get("address");

        String countryCode = address.getOrDefault("country_code", "").toString().toUpperCase();
        String countryName = address.getOrDefault("country", "").toString();
        String cityName = address.getOrDefault("city",
                address.getOrDefault("town",
                        address.getOrDefault("village", ""))).toString();

        return Map.of(
                "countryCode", countryCode,
                "countryName", countryName,
                "cityName", cityName
        );
    }
}
