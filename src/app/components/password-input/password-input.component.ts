import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  password: string = '';
  isPasswordVisible: boolean = false;
  hideController = signal<string>('hidden');

  passwordOutput = output<string>();

  onIconClick() {
    if (this.hideController() === 'hidden') {
      this.hideController.set('show');
    } else if (this.hideController() === 'show') {
      this.hideController.set('hidden');
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  emitPassword(){
    this.passwordOutput.emit(this.password);
  }
}
