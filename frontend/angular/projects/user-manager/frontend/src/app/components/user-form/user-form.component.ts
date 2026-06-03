import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../user';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input({ required: true }) formModel!: User;
  @Input() editingUserId: number | null = null;
  @Input() submitting = false;

  @Output() formModelChange = new EventEmitter<User>();
  @Output() save = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  updateField<K extends keyof User>(field: K, value: User[K]): void {
    this.formModelChange.emit({
      ...this.formModel,
      [field]: value
    });
  }

  submitForm(): void {
    this.save.emit();
  }

  resetForm(): void {
    this.reset.emit();
  }
}
