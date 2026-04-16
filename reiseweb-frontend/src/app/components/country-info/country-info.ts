import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryApiService } from '../../services/country-api.service';
import { ExternalCountryInfo } from '../../models/country.model';

@Component({
  selector: 'app-country-info',
  imports: [CommonModule],
  templateUrl: './country-info.html',
  styleUrl: './country-info.css',
})
export class CountryInfoComponent {
  private currentCode: string | null = null;

  @Input() set countryCode(code: string | null) {
    if (code && code !== this.currentCode) {
      this.currentCode = code;
      this.loadCountryInfo(code);
    }
  }

  countryInfo = signal<ExternalCountryInfo | null>(null);
  loading = signal(false);

  constructor(private countryApiService: CountryApiService) {}

  loadCountryInfo(code: string): void {
    this.loading.set(true);
    this.countryInfo.set(null);

    this.countryApiService.getExternalCountryInfo(code).subscribe({
      next: (info: ExternalCountryInfo) => {
        this.countryInfo.set(info);
        this.loading.set(false);
      },
      error: (err: Error) => {
        console.error('Error loading country info:', err);
        this.loading.set(false);
      }
    });
  }

  formatPopulation(pop: number): string {
    if (pop >= 1000000000) {
      return (pop / 1000000000).toFixed(1) + ' Mrd.';
    }
    if (pop >= 1000000) {
      return (pop / 1000000).toFixed(1) + ' Mio.';
    }
    if (pop >= 1000) {
      return (pop / 1000).toFixed(0) + ' Tsd.';
    }
    return pop.toString();
  }

  formatArea(area: number): string {
    return area.toLocaleString('de-DE');
  }
}
