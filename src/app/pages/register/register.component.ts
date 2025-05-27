import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  cpf = '';
  dob = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {

    if (this.username.length < 3){
      this.error = ('O nome deve conter pelo menos 3 caracteres');
      return;
    }

    const emailParts = this.email.split('@');

    if (emailParts.length !== 2) {
      this.error = ('E-mail inválido');
      return;
    }

    const antesAt = emailParts[0];
    const depoisAt = emailParts[1].split('.')[0];

    if (antesAt.length < 7 || depoisAt.length < 5) {
      this.error = ('O e-mail deve ter 7 letras antes do @ e 5 depois');
      return;
    }

    this.error = '';

    const caracteresesp = /^\d+$/;

    if (this.cpf.length < 11 || !caracteresesp.test(this.cpf) ){
      this.error = ('O CPF deve conter apenas números e ter pelo menos 11 dígitos');
      return;
    }

    if (!this.dob) {
    this.error = 'A data de nascimento é obrigatória';
    return;
  }

    if (this.password.length < 5){
      this.error = ('A senha deve conter pelo menos 5 caracteres')
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'As senhas devem ser iguais';
      return;
    }
    
    if (this.authService.register(this.username, this.email, this.cpf, this.dob, this.password)) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'Username or email already exists';
    }
  }
}
