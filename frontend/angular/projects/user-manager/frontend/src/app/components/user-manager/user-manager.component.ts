import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserGridComponent } from '../user-grid/user-grid.component';

@Component({
  selector: 'app-user-manager',
  imports: [UserFormComponent, UserGridComponent],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit {
  users: User[] = [];
  loading = false;
  submitting = false;
  errorMessage = '';

  formModel: User = this.createEmptyUser();
  editingUserId: number | null = null;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load users from the server.';
      }
    });
  }

  updateFormModel(formModel: User): void {
    this.formModel = formModel;
  }

  saveUser(): void {
    if (!this.formModel.name || !this.formModel.gender || !this.formModel.age) {
      this.errorMessage = 'Please fill all user fields.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const request$ = this.editingUserId === null
      ? this.userService.createUser(this.formModel)
      : this.userService.updateUser(this.editingUserId, this.formModel);

    request$.subscribe({
      next: () => {
        this.submitting = false;
        this.resetForm();
        this.loadUsers();
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Could not save user changes.';
      }
    });
  }

  editUser(user: User): void {
    this.editingUserId = user.id ?? null;
    this.formModel = {
      name: user.name,
      age: user.age,
      gender: user.gender
    };
  }

  deleteUser(userId: number): void {
    this.errorMessage = '';
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        if (this.editingUserId === userId) {
          this.resetForm();
        }
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'Could not delete user.';
      }
    });
  }

  resetForm(): void {
    this.editingUserId = null;
    this.formModel = this.createEmptyUser();
  }

  private createEmptyUser(): User {
    return {
      name: '',
      age: 18,
      gender: 'Male'
    };
  }
}
