import { AuthService } from './../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

ngOnInit(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  
}
  onSubmit() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
           this.toastr.success('Login successful');
          this.router.navigate(['/books']);
        },
        error: err => {
           this.toastr.error('Invalid email or password');
        }
      });

    }
  }
}
