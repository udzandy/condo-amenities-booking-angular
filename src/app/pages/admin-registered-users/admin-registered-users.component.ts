import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/user-dialog/user-dialog.component';
import { AdminRegisteredUsersService } from './admin-registered-users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationSuccessDialogComponent } from 'src/app/components/registration-success-dialog/registration-success-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-registered-users',
  templateUrl: './admin-registered-users.component.html',
  styleUrls: ['./admin-registered-users.component.scss']
})
export class AdminRegisteredUsersComponent implements OnInit{

  users: any[] = [];
  loading: boolean = false;
  filteredUsers: any[] = [];
  searchText: string = '';

  displayedColumns: string[] = [
    'profile',
    'fullName',
    'email',
    'mobile',
    'block',
    'floor',
    'unit',
    'status',
    'actions'
  ];

  constructor(
    private dialog: MatDialog,
    private service: AdminRegisteredUsersService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
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

        // DEFAULT TABLE DATA
      this.filteredUsers = response;

        this.loading = false;
      },
      error: (error: any) => {
        console.error('Load users error:', error);
        this.loading = false;
      }
    });

  }

//   filterUsers(): void {

//   const search = this.searchText.toLowerCase().trim();

//   this.filteredUsers = this.users.filter(user =>

//     (user.fullName || '')
//       .toLowerCase()
//       .includes(search)

//     ||

//     (user.email || '')
//       .toLowerCase()
//       .includes(search)

//     ||

//     (user.mobile || '')
//       .toLowerCase()
//       .includes(search)

//     ||

//     (user.block || '')
//       .toLowerCase()
//       .includes(search)

//     ||

//     (user.floor || '')
//       .toLowerCase()
//       .includes(search)

//     ||

//     (user.unit || '')
//       .toLowerCase()
//       .includes(search)

//   );

// }

filterUsers(): void {

  const search = this.searchText
    .toLowerCase()
    .trim();

  this.filteredUsers = this.users.filter(user =>

    String(user.fullName || '')
      .toLowerCase()
      .includes(search)

    ||

    String(user.email || '')
      .toLowerCase()
      .includes(search)

    ||

    String(user.mobile || '')
      .toLowerCase()
      .includes(search)

    ||

    String(user.block || '')
      .toLowerCase()
      .includes(search)

    ||

    String(user.floor || '')
      .toLowerCase()
      .includes(search)

    ||

    String(user.unit || '')
      .toLowerCase()
      .includes(search)

  );

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
  
      console.log('USER REGISTRATION PAYLOAD:', result);
  
      if (result.amenityId === undefined)
      {
        console.log(result);
  
        this.authService.register(result)
        .subscribe({
  
          next: (response) => {
  
            console.log(response);
  
            const firstName = result.firstName;

            this.snackBar.open(
                response.message,
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                });
  
            // SUCCESS DIALOG
            this.dialog.open(
              RegistrationSuccessDialogComponent,
              {
                width: '450px',
                disableClose: true,
                data: { firstName }
              });

              
  
            // CLEAR FORM
            // this.registrationForm.reset();

            this.loadUsers();
  
          },
          error: (err) => {
  
            console.log(err);
  
            this.snackBar.open(
              'Registration failed',
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
      else{
        console.log('AMENITY UPDATE PAYLOAD:', result);
  
        // this.service.updateUser(result.amenityId, result)
        // .subscribe({
  
        //   next: () => {
  
        //     this.snackBar.open(
        //       'Amenity updated successfully',
        //       '',
        //       {
        //         duration: 3000
        //       }
        //     );
  
        //     this.loadUsers();
  
        //   },
  
        //   error: (err) => {
  
        //     console.error(err);
  
        //     this.snackBar.open(
        //       'Failed to update amenity',
        //       '',
        //       {
        //         duration: 3000
        //       }
        //     );
  
        //   }
  
        // });
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

    this.service.deleteUser(user.userId).subscribe({

      next: (response) => {

        // alert('User deleted successfully.');
        this.snackBar.open(
                response.message,
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                });

        this.loadUsers();

      },

      error: (error: any) => {

        console.error('Delete error:', error);

        // alert('Failed to delete user.');

        this.snackBar.open(
            error.error.message,
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

  // =====================================================
  // Rject USER
  // =====================================================

  rejectUser(user: any): void {

    const confirmed = confirm(
      `Are you sure you want to reject ${user.fullName}?`
    );

    if (!confirmed) {
      return;
    }

    this.service.rejectUser(user.userId).subscribe({

      next: (response) => {

        // alert('User rejected successfully.');

        this.snackBar.open(
                response.message,
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                });

        this.loadUsers();

      },

      error: (error: any) => {

        console.error('Reject error:', error);

        // alert('Failed to reject user.');

        this.snackBar.open(
            error.error.message,
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

  // =====================================================
  // APPROVE USER
  // =====================================================

  approveUser(user: any): void {

    // const confirmed = confirm(
    //   `Are you sure you want to reject ${user.fullName}?`
    // );

    // if (!confirmed) {
    //   return;
    // }

    this.service.approveUser(user.userId).subscribe({

      next: (response) => {

        // alert('User approved.');

        this.snackBar.open(
                response.message,
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                });

        this.loadUsers();

      },

      error: (error: any) => {

        console.error('Approved error:', error);

        // alert('Failed to approve user.');

        this.snackBar.open(
            error.error.message,
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

}
