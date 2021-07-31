import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ImageCachingService } from 'src/app/service/image-caching.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  mainLogo = ''
  isLoading = false;
  hidePassword = true;
  errorResponse = false;
  isFormSubmitted = false;
  isCredentialsValid = true;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    credential: this.fb.group({
      password: ['', Validators.required],
    })
  });

  constructor(
    private fb: FormBuilder,
    private imgCachingService: ImageCachingService,
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.mainLogo = this.imgCachingService.getImgElement('thairod-logo');
  }

  onLogIn(isGuest = false): void {
    this.loginForm.disable();
    this.isLoading = true;
    this.isFormSubmitted = true;
    this.isCredentialsValid = true;
    this.login();
  }

  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.controls.credential.get('password')?.value;
    this.authService.login(email, password).subscribe(
      response => this.handleSuccessfulLogIn(),
      errorResponse => this.handleErrorLogIn()
    );
  }

  handleSuccessfulLogIn(isAdmin = true): void {
    this.isLoading = false;
    this.toastrService.success('Logged in successfully');
    // this.router.navigate(['/admin/main/manage-account']);
  }

  handleErrorLogIn(): void {
    this.loginForm.enable();
    this.isLoading = false;
    this.isCredentialsValid = false;
    this.errorResponse = true;
    this.toastrService.warning('Logged in failed');
  }

  onClearInput() {
    this.loginForm.controls.email.setValue('');
    this.errorResponse = false;
  }

}
