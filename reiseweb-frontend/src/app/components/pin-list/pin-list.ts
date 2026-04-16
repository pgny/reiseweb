import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { RouterLink } from '@angular/router';
  import { Pin } from '../../models/pin.model';

  @Component({
    selector: 'app-pin-list',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './pin-list.html',
    styleUrl: './pin-list.css',
  })
  export class PinListComponent {
    @Input() pins: Pin[] = [];
    @Input() loading = false;
    @Input() selectedPinId: number | null = null;

    @Output() pinSelected = new EventEmitter<Pin>();
    @Output() pinDeleted = new EventEmitter<number>();

    searchQuery = '';
    filteredPins = signal<Pin[]>([]);

    ngOnInit(): void {
      this.filterPins();
    }

    ngOnChanges(): void {
    this.filterPins();
    if (this.selectedPinId) {
      setTimeout(() => {
        const el = document.getElementById('pin-' + this.selectedPinId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }

    filterPins(): void {
      if (!this.searchQuery) {
        this.filteredPins.set(this.pins);
        return;
      }

      const query = this.searchQuery.toLowerCase();
      const filtered = this.pins.filter(pin =>
        pin.title.toLowerCase().includes(query) ||
        pin.notes?.toLowerCase().includes(query) ||
        pin.cityName?.toLowerCase().includes(query) ||
        pin.countryName?.toLowerCase().includes(query)
      );
      this.filteredPins.set(filtered);
    }

    uniqueCountries(): number {
      const codes = new Set(this.pins.map(p => p.countryCode).filter(Boolean));
      return codes.size;
    }

    onPinClick(pin: Pin): void {
      this.pinSelected.emit(pin);
    }

    onDeleteClick(pinId: number): void {
      if (confirm('Möchten Sie diesen Pin wirklich löschen?')) {
        this.pinDeleted.emit(pinId);
      }
    }

    formatDate(dateStr: string): string {
      return new Date(dateStr).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    truncateNotes(notes: string): string {
      const maxLength = 100;
      if (notes.length <= maxLength) return notes;
      return notes.substring(0, maxLength) + '...';
    }
  }
