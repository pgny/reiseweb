
  import { Component, OnInit, signal } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { ActivatedRoute, Router, RouterLink } from '@angular/router';
  import { PinApiService } from '../../services/pin-api.service';
  import { Pin } from '../../models/pin.model';

  @Component({
    selector: 'app-pin-detail',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './pin-detail.html',
    styleUrl: './pin-detail.css',
  })
  export class PinDetailComponent implements OnInit {
    pin = signal<Pin | null>(null);
    loading = signal(true);
    editing = signal(false);

    editTitle = '';
    editNotes = '';
    editDate = '';
    editRating = 0;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private pinApiService: PinApiService
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPin(+id);
      }
    }

    loadPin(id: number): void {
      this.loading.set(true);
      this.pinApiService.getPin(id).subscribe({
        next: (pin: Pin) => {
          this.pin.set(pin);
          this.loading.set(false);
        },
        error: (err: Error) => {
          console.error('Error loading pin:', err);
          this.loading.set(false);
          this.router.navigate(['/']);
        }
      });
    }

    startEditing(): void {
      const p = this.pin();
      if (p) {
        this.editTitle = p.title;
        this.editNotes = p.notes || '';
        this.editDate = p.visitDate || '';
        this.editRating = p.rating || 0;
        this.editing.set(true);
      }
    }

    cancelEditing(): void {
      this.editing.set(false);
    }

    saveChanges(): void {
      const p = this.pin();
      if (!p) return;

      const updated = {
        ...p,
        title: this.editTitle,
        notes: this.editNotes,
        visitDate: this.editDate,
        rating: this.editRating
      };

      this.pinApiService.updatePin(p.id, updated).subscribe({
        next: (pin: Pin) => {
          this.pin.set(pin);
          this.editing.set(false);
        },
        error: (err: Error) => console.error('Error updating pin:', err)
      });
    }

    deletePin(): void {
      const p = this.pin();
      if (!p) return;

      if (confirm('Möchten Sie diesen Pin wirklich löschen?')) {
        this.pinApiService.deletePin(p.id).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err: Error) => console.error('Error deleting pin:', err)
        });
      }
    }

    formatDate(dateStr: string): string {
      return new Date(dateStr).toLocaleDateString('de-DE', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }
