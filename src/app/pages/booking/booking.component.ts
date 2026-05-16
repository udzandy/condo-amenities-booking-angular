import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmDialogComponent } from '../../components/booking-confirm-dialog/booking-confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../booking/booking.service';
import { AmenityBookingConfig } from 'src/app/models/booking.model';
import { CreateBookingRequest } from 'src/app/models/create-booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  availabilityData: any[] = [];
  amenity!: string;
  amenitySlug!: string;
  selectedDate: Date = new Date();
  currentAmenity!: AmenityBookingConfig;
  selectedSlot: {unitId: number; unit: string; slotId: number; time: string; } | null = null;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
  // Subscribe to route param changes
  this.route.paramMap.subscribe(params => {
    this.amenitySlug = params.get('amenity')!;

    console.log(this.amenitySlug);

    // Initialize selectedDate as today
    this.selectedDate = new Date();

    this.loadAmenityConfig();

    // Reset selected slot
    // this.selectedSlot = null;
  });
}

  // -------------------
  // HELPER: format date to YYYY-MM-DD in LOCAL time (avoids timezone shift)
  formatDateLocal(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date >= today;
  };

  isFullyBooked(date: Date): boolean {
    const dateStr = this.formatDateLocal(date);

    const booked = this.currentAmenity?.bookedSlots?.[dateStr] || [];

    const totalSlots =
      this.currentAmenity?.units?.reduce(
        (sum, u) => sum + u.slots.length,
        0
      ) || 0;

    return booked.length >= totalSlots;
  }

  // -------------------
  onDateSelected(date: Date | null) {

    if (!date) return;

    this.selectedDate = date;
    this.loadAmenityConfig(); // reload slots per date
  }

  isSlotBooked(date: Date | null, unit: string, time: string): boolean {

    const currentUnit = this.currentAmenity.units.find(
      x => x.name === unit
    );

    if (!currentUnit) return false;

    const slot = currentUnit.slots.find(
      (x: any) => x.time === time
    );

    return slot?.isBooked ?? false;

  }

  // -------------------
  // Highlight fully booked dates only
  dateClass = (date: Date) => {
    const dateStr = this.formatDateLocal(date);
    const bookedSlots = this.currentAmenity.bookedSlots[dateStr] || [];
    const allSlots = this.currentAmenity.units.flatMap((unit: any) =>
      unit.slots.map((slot: any) => ({ unit: unit.name, time: slot.time }))
    );

    if (bookedSlots.length === allSlots.length) {
      return 'fully-booked-date';
    }

    return '';
  }

  selectSlot(unit: any, slot: any): void {

    this.selectedSlot = {
      unitId: unit.unitId,
      unit: unit.name,
      slotId: slot.slotId,
      time: slot.time
    };

  }

  isSelectedSlot(unit: string, time: string): boolean {
    return (
      this.selectedSlot?.unit === unit &&
      this.selectedSlot?.time === time
    );
  }

  openConfirmDialog(): void {
    if (!this.selectedSlot) return;

    const dialogRef = this.dialog.open(BookingConfirmDialogComponent, {
      width: '420px',
      data: {
        amenityLabel: this.currentAmenity.unitsLabel,
        unit: this.selectedSlot.unit,
        time: this.selectedSlot.time,
        date: this.selectedDate
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.saveBooking();
      }
    });
  }

  saveBooking(): void {
    if (!this.selectedSlot) return;

    const userId = localStorage.getItem('userId') ?? '';

    const payload: CreateBookingRequest = {
    userId: userId,
    amenityId: this.currentAmenity.amenityId,
    unitId: this.selectedSlot.unitId,
    slotId: this.selectedSlot.slotId,
    bookingDate: this.formatDateLocal(this.selectedDate)
  };

  console.log(payload);

    this.bookingService.createBooking(payload).subscribe({
      next: (response) => {
        this.snackBar.open(
                response.message,
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['snackbar-success']
                });

                this.selectedSlot = null;

              // REFRESH LIST
              this.loadAmenityConfig();

              // REDIRECT TO AMENITIES PAGE
              this.router.navigate(['/amenities']);
      },
      error: (err) => {
        console.log(err);

        this.snackBar.open(
          err?.error?.message || 'Failed to book',
          '',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
      }
    });
  }

  loadAmenityConfig() {
    const dateStr = this.formatDateLocal(this.selectedDate!);

    this.bookingService
      .getAmenityBookingConfig(this.amenitySlug, dateStr)
      .subscribe({
        next: (data: AmenityBookingConfig) => {
          this.currentAmenity = data;
          this.selectedSlot = null;

        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to load booking data', '', {
            duration: 3000
          });
        }
      });
  }

  loadAvailability(): void {

    const dateStr = this.formatDateLocal(this.selectedDate);

    this.bookingService
      .getAvailability(this.amenitySlug, dateStr)
      .subscribe({

        next: (data) => {

          console.log('Availability:', data);

          this.availabilityData = data;

          this.mapAvailabilityToUI();

        },

        error: (err) => {

          console.error(err);

          this.snackBar.open(
            'Failed to load availability',
            '',
            {
              duration: 3000
            }
          );

        }

      });

  }

  mapAvailabilityToUI(): void {

    if (!this.currentAmenity) return;

    this.currentAmenity.units.forEach(unit => {

      const apiUnit = this.availabilityData.find(x => x.unitName === unit.name);

      if (!apiUnit) return;

      unit.slots.forEach(slot => {

        const apiSlot = apiUnit.slots.find(
          (s: any) =>
            `${s.startTime} - ${s.endTime}` === slot.time
        );

        slot.isBooked = apiSlot?.isBooked ?? false;
      });
    });

  }
}