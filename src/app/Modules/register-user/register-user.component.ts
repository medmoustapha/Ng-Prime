import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../core/services/user-data.service';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { birthDateValidator } from '../../core/validators/birthdate.validators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userform: FormGroup;

  name: string;

  emailId: string;

  password: string;

  constructor(private userService: UserDataService, private router: Router, private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'emailId': new FormControl('', [Validators.required, Validators.email]),
      'birthDate': new FormControl('', [Validators.required, birthDateValidator])
    });
  }

  onClickRegisterUser() {
    let isRegistered: boolean = this.userService.addUser(this.userform.controls["name"].value,
      this.userform.controls["password"].value,
      this.userform.controls["emailId"].value,
      this.userform.controls["birthDate"].value);
    if (isRegistered) {
      this.router.navigate(['/login']);
      this.toastService.addSingle("success", "", "User registered.")
    }
  }

  onClickGoToLogin() {
    this.router.navigate(['/login']);
  }

}

