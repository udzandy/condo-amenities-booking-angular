import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent
implements OnInit {

  summary: any;

  recentBookings: any[] = [];

  auditLogs: any[] = [];

  loading = false;

  constructor(
    private dashboardService:
    AdminDashboardService
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.loading = true;

    this.dashboardService
      .getSummary()
      .subscribe({

        next: (data) => {

          this.summary = data;

        }

      });

    this.dashboardService
      .getRecentBookings()
      .subscribe({

        next: (data) => {

          this.recentBookings = data;

        }

      });

    this.dashboardService
      .getAuditLogs()
      .subscribe({

        next: (data) => {

          this.auditLogs = data;

          this.loading = false;

        }

      });

  }

}