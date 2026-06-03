import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.css'
})
export class UserGridComponent {
  @Input() users: User[] = [];
  @Input() loading = false;
  @Input() errorMessage = '';

  @Output() refresh = new EventEmitter<void>();
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();

  refreshUsers(): void {
    this.refresh.emit();
  }

  editUser(user: User): void {
    this.edit.emit(user);
  }

  deleteUser(userId?: number): void {
    if (userId === undefined) {
      return;
    }

    this.delete.emit(userId);
  }
}
