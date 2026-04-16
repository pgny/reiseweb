import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private map!: L.Map;
  private countriesLayer: L.GeoJSON | null = null;

  private readonly nameToAlpha2: { [key: string]: string } = {
    'France': 'FR', 'Norway': 'NO', 'Kosovo': 'XK', 'Somaliland': 'SO',
    'Northern Cyprus': 'CY', 'Cyprus No Mans Area': 'CY'
  };

  private fixMarkerIcons(): void {
    const iconDefault = L.icon({
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  initMap(containerId: string): void {
    this.fixMarkerIcons()
    this.map = L.map(containerId, {
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1.0
    }).setView([30, 0], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addPin(lat: number, lng: number, title: string): L.Marker {
    return L.marker([lat, lng])
      .addTo(this.map);
  }

  removePin(marker: L.Marker): void {
    marker.removeFrom(this.map);
  }

  getMap(): L.Map {
    return this.map;
  }
  
  onMapClick(callback: (lat: number, lng: number) => void): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      callback(e.latlng.lat, e.latlng.lng);
    });
  }

  addCountryLayer(
    geoJson: any,
    visitedCountryCodes: string[],
    onCountryClick: (countryCode: string, lat: number, lng: number) => void
  ): void {
    if (this.countriesLayer) {
      this.map.removeLayer(this.countriesLayer);
    }

    this.countriesLayer = L.geoJSON(geoJson, {
      style: (feature) => {
        const code = this.getCountryCode(feature?.properties);
        const isVisited = code ? visitedCountryCodes.includes(code) : false;
        return {
          fillColor: isVisited ? '#27ae60' : '#3498db',
          fillOpacity: isVisited ? 0.4 : 0.1,
          color: '#2c3e50',
          weight: 1
        };
      },
      onEachFeature: (feature, layer) => {
        const code = this.getCountryCode(feature?.properties);
        const name = feature?.properties?.name || feature?.properties?.NAME || feature?.properties?.ADMIN;

        layer.on({
          mouseover: (e) => {
            if (this.map.getZoom() < 7) {
              e.target.setStyle({ fillOpacity: 0.5, weight: 2 });
            }
          },
          mouseout: (e) => {
            if (!this.countriesLayer) return;
            const zoom = this.map.getZoom();
            if (zoom >= 7) {
              e.target.setStyle({ fillOpacity: 0, weight: 0 });
            } else if (zoom >= 5) {
              e.target.setStyle({ fillOpacity: 0.1, weight: 0.5 });
            } else {
              this.countriesLayer.resetStyle(e.target);
            }
          },
          click: (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e);
            if (code) {
              onCountryClick(code, e.latlng.lat, e.latlng.lng);
            }
          }
        });
      }
    });

    this.countriesLayer.addTo(this.map);
    this.countriesLayer.bringToBack();

    this.map.on('zoomend', () => {
      if (!this.countriesLayer) return;
      const zoom = this.map.getZoom();
      if (zoom >= 7) {
        this.countriesLayer.setStyle({ fillOpacity: 0, weight: 0 });
      } else if (zoom >= 5) {
        this.countriesLayer.setStyle({ fillOpacity: 0.1, weight: 0.5 });
      } else {
        this.countriesLayer.eachLayer((layer: any) => {
          this.countriesLayer!.resetStyle(layer);
        });
      }
    });
  }

  private getCountryCode(properties: any): string | null {
    if (!properties) return null;

    let code = properties['ISO3166-1-Alpha-2'] || properties['ISO_A2'];

    if (!code || code === '-99') {
      const name = properties.name || properties.NAME || properties.ADMIN;
      if (name && this.nameToAlpha2[name]) {
        code = this.nameToAlpha2[name];
      }
    }

    if (!code || code === '-99') return null;
    return code;
  }
}
