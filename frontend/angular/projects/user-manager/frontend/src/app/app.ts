import { Component } from '@angular/core';
import { UserManagerComponent } from './components/user-manager/user-manager.component';

@Component({
  selector: 'app-root',
  imports: [UserManagerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
