import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit(): void {
  }
  Dashboardpage(){
    this.router.navigate(['/dashboard'])
  }
  Repositorypage(){
    this.router.navigate(['/repository'])
  }
  Monitoringpage(){
    this.router.navigate(['/monitor'])
  }
  Reportspage(){
    this.router.navigate(['/report'])
  }

}
