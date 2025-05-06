import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'creditcardadmin';
  sidebarOpen = true;

  ngOnInit() {
    this.updateSidebarState(window.innerWidth);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
//media query ts
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSidebarState(event.target.innerWidth);
  }

  updateSidebarState(width: number): void {
    // Automatically close the sidebar on small screens
    this.sidebarOpen = width > 768;
  }
}
