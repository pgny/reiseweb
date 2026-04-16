import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';                                                     
  import { MapService } from '../../services/map.service';
  import { PinListComponent } from '../pin-list/pin-list';
  import { CountryInfoComponent } from '../country-info/country-info';
  import { PinApiService } from '../../services/pin-api.service';
  import { Pin } from '../../models/pin.model';
  import { FormsModule } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import * as L from 'leaflet';

  @Component({
    selector: 'app-map',
    imports: [PinListComponent, CountryInfoComponent, FormsModule],                                                                                        
    templateUrl: './map.html',                              
    styleUrl: './map.css',
  })
  export class MapComponent implements AfterViewInit, OnInit {
    pins: Pin[] = [];
    selectedPinId: number | null = null;
    sidebarTab: 'pins' | 'country' = 'pins';
    selectedCountryCode: string | null = null;
    pinMode = false;
    loading = false;
    showForm = false;
    newPin = { title: '', notes: '', latitude: 0, longitude: 0, rating: 0, visitDate: '' }; 
    private markers: Map<number, L.Marker> = new Map();
                                                                                                                        
    constructor(
      private mapService: MapService,
      private pinApiService: PinApiService,
      private cdr: ChangeDetectorRef,
      private http: HttpClient
    ) {}

    ngOnInit(): void {                                                                                                  
      this.loadPins();
    }                                                                                                                   
                                                            
    ngAfterViewInit(): void {
      this.mapService.initMap('map');
      this.loadCountryLayer();
      this.mapService.onMapClick((lat, lng) => {
        if (!this.pinMode) return;
        this.newPin = { title: '', notes: '', latitude: lat, longitude: lng, rating: 0, visitDate: '' };
        this.showForm = true;
        this.cdr.detectChanges();
      });
    }

    loadCountryLayer(): void {
      const visitedCodes = [...new Set(this.pins.map(p => p.countryCode).filter(Boolean))];
      this.http.get('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .subscribe((geoJson: any) => {
          this.mapService.addCountryLayer(geoJson, visitedCodes, (code: string, lat: number, lng: number) => {
            if (this.pinMode) {
              this.newPin = { title: '', notes: '', latitude: lat, longitude: lng, rating: 0, visitDate: '' };
              this.showForm = true;
              this.cdr.detectChanges();
              return;
            }
            this.selectedCountryCode = code;
            this.sidebarTab = 'country';
            this.cdr.detectChanges();
          });
        });
    }

    loadPins(): void {
      this.loading = true;
      this.pinApiService.getPins().subscribe({
        next: (pins: Pin[]) => {                                                                                               
          this.pins = pins;
          this.displayMarkers();
          this.loadCountryLayer();
          this.loading = false;
          this.cdr.detectChanges();                                                                                     
        },                                                  
        error: (err: Error) => {
          console.error('Failed to load pins:', err);                                                                   
          this.loading = false;
        }                                                                                                               
      });                                                   
    }

    onPinSelected(pin: Pin): void {
    this.selectedPinId = pin.id;
    const marker = this.markers.get(pin.id);
    if (marker) {
      this.mapService.getMap().flyTo([pin.latitude, pin.longitude], 10);
    }
  }                                                                                                                 
   
    onPinDeleted(pinId: number): void {                                                                                 
      this.pinApiService.deletePin(pinId).subscribe(() => {    
        this.loadPins();
      });
    }

    savePin(): void {
    this.pinApiService.createPin(this.newPin as any).subscribe({
      next: () => {
        this.showForm = false;
        this.cdr.detectChanges()
        this.loadPins();
      },
      error: (err: Error) => {
        console.error('Failed to create pin:', err);
        }
      });
    }

    togglePinMode(): void {
      this.pinMode = !this.pinMode;
      this.cdr.detectChanges();
    }

    cancelForm(): void {
      this.showForm = false;
    }

    displayMarkers(): void {
    this.markers.forEach(marker => this.mapService.removePin(marker));
    this.markers.clear();

    for (const pin of this.pins) {
      const marker = this.mapService.addPin(pin.latitude, pin.longitude, pin.title);
      marker.on('click', () => {
        this.selectedPinId = pin.id;
        this.cdr.detectChanges();
      });
      this.markers.set(pin.id, marker);
      }
    }
  }
