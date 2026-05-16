import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmenityDialogComponent } from 'src/app/components/amenity-dialog/amenity-dialog.component';
import { SlotDialogComponent } from 'src/app/components/slot-dialog/slot-dialog.component';
import { UnitDialogComponent } from 'src/app/components/unit-dialog/unit-dialog.component';
import { AdminAmenityManagementService } from './admin-amenity-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-amenity-management',
  templateUrl: './admin-amenity-management.component.html',
  styleUrls: ['./admin-amenity-management.component.scss']
})
export class AdminAmenityManagementComponent implements OnInit {

  amenities: any[] = [];

  units: any[] = [];

  slots: any[] = [];

  constructor(private service: AdminAmenityManagementService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.loadAll();

  }

  loadAll(): void {

  this.loadAmenities();
  this.loadUnits();
  this.loadSlots();

}

  // ============================================
  // LOAD DATA
  // ============================================

  loadAmenities(): void {

    this.service.getAmenities()
      .subscribe({
        next: (data) => {

          console.log('Amenities:', data);

          this.amenities = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  loadUnits(): void {

    this.service.getUnits()
      .subscribe({

        next: (data) => {

          console.log('Units:', data);

          this.units = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  loadSlots(): void {

    this.service.getSlots()
      .subscribe({

        next: (data) => {

          console.log('Slots:', data);

          this.slots = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  // ============================================
  // DIALOGS
  // ============================================

  openAmenityDialog(item?: any): void {

  const dialogRef = this.dialog.open(
    AmenityDialogComponent,
    {
      width: '500px',
      data: item
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    console.log('AMENITY CREATE PAYLOAD:', result);

    if (result.amenityId === undefined)
    {
      console.log(result);

      this.service.createAmenity(result)
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Amenity created successfully',
              '',
              {
                duration: 3000
              }
            );

            this.loadAmenities();

          },

          error: (err) => {

            console.error(err);

            this.snackBar.open(
              'Failed to create amenity',
              '',
              {
                duration: 3000
              }
            );

          }

        });
    }
    else{
      console.log('AMENITY UPDATE PAYLOAD:', result);

      this.service.updateAmenity(result.amenityId, result)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Amenity updated successfully',
            '',
            {
              duration: 3000
            }
          );

          this.loadAmenities();

        },

        error: (err) => {

          console.error(err);

          this.snackBar.open(
            'Failed to update amenity',
            '',
            {
              duration: 3000
            }
          );

        }

      });
    }
  });

}

  openUnitDialog(item?: any): void {

  const dialogRef = this.dialog.open(
    UnitDialogComponent,
    {
      width: '500px',
      data: {
        item: item,
        amenities: this.amenities
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    console.log('UNIT CREATE PAYLOAD:', result);

    // SAVE API HERE
    if (result.unitId === undefined)
    {
      console.log(result);

      this.service.createUnit(result)
        .subscribe({

          next: () => {

            this.snackBar.open(
              'Unit created successfully',
              '',
              {
                duration: 3000
              }
            );

            this.loadUnits();

          },

          error: (err) => {

            console.error(err);

            this.snackBar.open(
              'Failed to create Unit',
              '',
              {
                duration: 3000
              }
            );

          }

        });
    }
    else{
      console.log('UNIT UPDATE PAYLOAD:', result);

      this.service.updateUnit(result.unitId, result)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Unit updated successfully',
            '',
            {
              duration: 3000
            }
          );

          this.loadUnits();

        },

        error: (err) => {

          console.error(err);

          this.snackBar.open(
            'Failed to update unit',
            '',
            {
              duration: 3000
            }
          );

        }

      });
    }

  });

}

  openSlotDialog(item?: any): void {

  const dialogRef = this.dialog.open(
    SlotDialogComponent,
    {
      width: '500px',
      data: {
        item: item,
        amenities: this.amenities,
        units: this.units
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    console.log(result);

    // SAVE API HERE
    console.log('SLOT CREATE PAYLOAD:', result);

    // SAVE API HERE
    if (result.slotId === undefined)
    {
      console.log(result);

      this.service.createSlot(result)
        .subscribe({

          next: () => {

            this.snackBar.open(
              'Unit created successfully',
              '',
              {
                duration: 3000
              }
            );

            this.loadSlots();

          },

          error: (err) => {

            console.error(err);

            this.snackBar.open(
              'Failed to create slot',
              '',
              {
                duration: 3000
              }
            );

          }

        });
    }
    else{
      console.log('SLOT UPDATE PAYLOAD:', result);

      this.service.updateSlot(result.slotId, result)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Slot updated successfully',
            '',
            {
              duration: 3000
            }
          );

          this.loadSlots();

        },

        error: (err) => {

          console.error(err);

          this.snackBar.open(
            'Failed to update slot',
            '',
            {
              duration: 3000
            }
          );

        }

      });
    }

  });

}

  // =========================================================
  // ADD AMENITY
  // =========================================================

  // addAmenity(): void {

  //   const dialogRef = this.dialog.open(
  //     AmenityDialogComponent,
  //     {
  //       width: '550px',
  //       data: null
  //     }
  //   );

  //   dialogRef.afterClosed()
  //     .subscribe(result => {

  //       if (!result) return;

  //       this.service.createAmenity(result)
  //         .subscribe({

  //           next: () => {

  //             this.snackBar.open(
  //               'Amenity created successfully',
  //               '',
  //               {
  //                 duration: 3000
  //               }
  //             );

  //             this.loadAmenities();

  //           }

  //         });

  //     });

  // }

  // =========================================================
  // EDIT AMENITY
  // =========================================================

  // editAmenity(amenity: any): void {

  //   const dialogRef = this.dialog.open(
  //     AmenityDialogComponent,
  //     {
  //       width: '550px',
  //       data: amenity
  //     }
  //   );

  //   dialogRef.afterClosed()
  //     .subscribe(result => {

  //       if (!result) return;

  //       this.service
  //         .updateAmenity(
  //           amenity.amenityId,
  //           result
  //         )
  //         .subscribe({

  //           next: () => {

  //             this.snackBar.open(
  //               'Amenity updated successfully',
  //               '',
  //               {
  //                 duration: 3000
  //               }
  //             );

  //             this.loadAmenities();

  //           }

  //         });

  //     });

  // }

  // =========================================================
  // DELETE AMENITY
  // =========================================================

  deleteAmenity(amenity: any): void {

    const confirmed = confirm(
      'Delete this amenity?'
    );

    if (!confirmed)
      return;

    this.service.deleteAmenity(amenity.amenityId)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Amenity deleted',
            '',
            {
              duration: 3000
            }
          );

          this.loadAll();

        }

      });

  }

  // =========================================================
  // ADD UNIT
  // =========================================================

  // addUnit(): void {

  //   const dialogRef3 = this.dialog.open(
  //     UnitDialogComponent,
  //     {
  //       width: '500px',
  //       data: {
  //         amenities: this.amenities
  //       }
  //     }
  //   );

  //   dialogRef3.afterClosed()
  //     .subscribe(result => {

  //       if (!result) return;

  //       this.service.createUnit(result)
  //         .subscribe({

  //           next: () => {

  //             this.snackBar.open(
  //               'Unit created successfully',
  //               '',
  //               {
  //                 duration: 3000
  //               }
  //             );

  //             this.loadUnits();

  //           }

  //         });

  //     });

  // }

  // =========================================================
  // EDIT UNIT
  // =========================================================

  // editUnit(unit: any): void {

  //   const dialogRef = this.dialog.open(
  //     UnitDialogComponent,
  //     {
  //       width: '500px',
  //       data: {
  //         ...unit,
  //         amenities: this.amenities
  //       }
  //     }
  //   );

  //   dialogRef.afterClosed()
  //     .subscribe(result => {

  //       if (!result) return;

  //       this.service.updateUnit(
  //         unit.unitId,
  //         result
  //       )
  //       .subscribe({

  //         next: () => {

  //           this.snackBar.open(
  //             'Unit updated successfully',
  //             '',
  //             {
  //               duration: 3000
  //             }
  //           );

  //           this.loadUnits();

  //         }

  //       });

  //     });

  // }

  // =========================================================
  // DELETE UNIT
  // =========================================================

  deleteUnit(unit: any): void {

    if (!confirm('Delete this unit?'))
      return;

    this.service.deleteUnit(unit.unitId)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Unit deleted',
            '',
            {
              duration: 3000
            }
          );

          this.loadAll();

        }

      });

  }

  // =========================================================
  // ADD SLOT
  // =========================================================

  // addSlot(): void {

  //   const dialogRef = this.dialog.open(
  //     SlotDialogComponent,
  //     {
  //       width: '550px',
  //       data: {
  //         amenities: this.amenities,
  //         units: this.units
  //       }
  //     }
  //   );

  //   dialogRef.afterClosed()
  //     .subscribe(result => {

  //       if (!result) return;

  //       this.service.createSlot(result)
  //         .subscribe({

  //           next: () => {

  //             this.snackBar.open(
  //               'Slot created successfully',
  //               '',
  //               {
  //                 duration: 3000
  //               }
  //             );

  //             this.loadSlots();

  //           }

  //         });

  //     });

  // }

  // =========================================================
  // EDIT SLOT
  // =========================================================

  // editSlot(slot: any): void {

  //   const dialogRef = this.dialog.open(
  //     SlotDialogComponent,
  //     {
  //       width: '550px',
  //       data: {
  //         ...slot,
  //         amenities: this.amenities,
  //         units: this.units
  //       }
  //     }
  //   );

  //   dialogRef.afterClosed()
  //     .subscribe(result => {

  //       if (!result) return;

  //       this.service.updateSlot(
  //         slot.slotId,
  //         result
  //       )
  //       .subscribe({

  //         next: () => {

  //           this.snackBar.open(
  //             'Slot updated successfully',
  //             '',
  //             {
  //               duration: 3000
  //             }
  //           );

  //           this.loadSlots();

  //         }

  //       });

  //     });

  // }

  // =========================================================
  // DELETE SLOT
  // =========================================================

  deleteSlot(slot: any): void {

    if (!confirm('Delete this slot?'))
      return;

    this.service.deleteSlot(slot.slotId)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Slot deleted',
            '',
            {
              duration: 3000
            }
          );

          this.loadAll();

        }

      });

  }
  

}
