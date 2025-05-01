import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo2';
  authorized: boolean = false;
  constructor(private router: Router) {
    console.log('AppComponent initialized');
  }
  ngOnInit() {

     this.router.events.subscribe(() => {
      this.authorized = this.router.url.includes('admin');
      console.log(`Authorized: ${this.authorized}`);
    });
  }
}
