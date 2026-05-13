import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/user-dialog/user-dialog.component';
import { AdminRegisteredUsersService } from './admin-registered-users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-registered-users',
  templateUrl: './admin-registered-users.component.html',
  styleUrls: ['./admin-registered-users.component.scss']
})
export class AdminRegisteredUsersComponent implements OnInit{

  users: any[] = [];

  loading: boolean = false;

  displayedColumns: string[] = [
    'profile',
    'fullName',
    'email',
    'phoneNumber',
    'unitNo',
    'role',
    'status',
    'actions'
  ];

  constructor(
    private dialog: MatDialog,
    private service: AdminRegisteredUsersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  // =====================================================
  // LOAD USERS
  // =====================================================

  loadUsers(): void {

    this.loading = true;

    this.service.getUsers().subscribe({

      next: (response: any) => {

        this.users = response;
        this.loading = false;

      },

      error: (error: any) => {

        console.error('Load users error:', error);

        this.loading = false;

      }

    });

  }

  // ============================================
    // DIALOGS
    // ============================================
  
    openUserDialog(item?: any): void {
  
    const dialogRef = this.dialog.open(
      UserDialogComponent,
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
  
        this.service.createUser(result)
          .subscribe({
  
            next: () => {
  
              this.snackBar.open(
                'Amenity created successfully',
                '',
                {
                  duration: 3000
                }
              );
  
              this.loadUsers();
  
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
  
        this.service.updateUser(result.amenityId, result)
        .subscribe({
  
          next: () => {
  
            this.snackBar.open(
              'Amenity updated successfully',
              '',
              {
                duration: 3000
              }
            );
  
            this.loadUsers();
  
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

  // =====================================================
  // OPEN ADD USER DIALOG
  // =====================================================

  addUser(): void {

    const dialogRef = this.dialog.open(UserDialogComponent, {

      width: '600px',

      disableClose: true,

      data: null

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadUsers();

      }

    });

  }

  // =====================================================
  // OPEN EDIT USER DIALOG
  // =====================================================

  editUser(user: any): void {

    const dialogRef = this.dialog.open(UserDialogComponent, {

      width: '600px',

      disableClose: true,

      data: user

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadUsers();

      }

    });

  }

  // =====================================================
  // DELETE USER
  // =====================================================

  deleteUser(user: any): void {

    const confirmed = confirm(
      `Are you sure you want to delete ${user.fullName}?`
    );

    if (!confirmed) {
      return;
    }

    this.service.deleteUser(user.id).subscribe({

      next: () => {

        alert('User deleted successfully.');

        this.loadUsers();

      },

      error: (error: any) => {

        console.error('Delete error:', error);

        alert('Failed to delete user.');

      }

    });

  }

  // =====================================================
  // TOGGLE USER STATUS
  // =====================================================

  toggleStatus(user: any): void {

    const updatedUser = {

      ...user,

      isActive: !user.isActive

    };

    this.service.updateUser(updatedUser.Id, updatedUser).subscribe({

      next: () => {

        user.isActive = updatedUser.isActive;

      },

      error: (error: any) => {

        console.error('Status update error:', error);

      }

    });

  }

  // =====================================================
  // REFRESH PAGE
  // =====================================================

  refresh(): void {

    this.loadUsers();

  }

}
