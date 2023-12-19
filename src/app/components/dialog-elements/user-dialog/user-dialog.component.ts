import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() userEmail: string = '';
  password: string = '';
  confPassword: string = '';

  constructor(private userService: UserService) { }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if(this.isTheSamePassword()) {
      this.editUser();
    } else alert('A senha deve ser a mesma!');
  }

  isTheSamePassword(): boolean {
    return this.password === this.confPassword;
  }

  editUser(): void {
    this.userService.editUser(this.userId, {
      name: this.userName,
      email: this.userEmail,
    }).subscribe({
      next: () => {
        this.confirmButtonClick.emit();
      },
      error: () => alert('Ops, algo deu errado, verifique os campos ou tente novamente mais tarde.')
    });
  }

}
