import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'To Do List';

  constructor(private router: Router) {}

  public connect(): boolean {
    return sessionStorage.getItem('isConnected') == 'true';
  }
}
