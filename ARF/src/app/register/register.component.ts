import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  validateName,
  passwordValidate,
  validateAddress,
  validateEmail,
  validatePhoneNumber, validateBirthDate
} from "../core/helper/register.validator";
import {LOGIN_STATUS, REGISTERED_SUCCESS, SUCCESS} from "../core/constant/authen.constant";
import {Router} from "@angular/router";
import {INotification} from "../core/model/notify.model";
import {DatePipe} from "@angular/common";
import {IAccount} from "../core/model/account.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  notification: INotification;
  showPassword = false;
  formAcc: FormGroup;
  contextFirstName = {
    inputId: 'firstName',
    controlName: 'firstName',
    labelName: 'First Name',
    maxLength: 30,
    inputType: 'text'
  };
  contextLastName = {
    inputId: 'lastName',
    controlName: 'lastName',
    labelName: 'Last Name',
    maxLength: 30,
    inputType: 'text'
  };
  contextEmail = {
    inputId: 'email',
    controlName: 'email',
    labelName: 'Email',
    maxLength: 50,
    inputType: 'text'
  };
  contextBirthDate = {
    inputId: 'bod',
    controlName: 'birthdate',
    labelName: 'Birth Date',
    inputType: 'date',
    maxValue: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }
  contextPhone = {
    inputId: 'phone',
    controlName: 'phone',
    labelName: 'Phone',
    maxLength: 10,
    inputType: 'text'
  };
  contextAddress = {
    inputId: 'address',
    controlName: 'address',
    labelName: 'Address',
    maxLength: 100,
    inputType: 'text'
  };
  contextPassword = {
    inputId: 'password',
    controlName: 'password',
    labelName: 'Password',
    maxLength: 30,
    inputType: 'password'
  };
  contextConfirm = {
    inputId: 'confirm',
    controlName: 'confirm',
    labelName: 'Confirm',
    maxLength: 30,
    inputType: 'password'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.formAcc = this.fb.group({
        firstName: [],
        lastName: [],
        email: ['', [validateEmail]],
        birthdate: ['', [validateBirthDate]],
        gender: ['Male'],
        phone: ['', [validatePhoneNumber]],
        address: ['', [validateAddress]],
        password: [],
        confirm: [],
      },
      {
        validators: [validateName, passwordValidate],
        updateOn: "blur"
      })
    this.initFormTest();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.contextPassword.inputType = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {

    Object.keys(this.formAcc.controls).forEach(field => {
      const control = this.formAcc.get(field);
      control.markAsDirty();
      control.updateValueAndValidity();
    })
    this.formAcc.markAllAsTouched();
    this.formAcc.updateValueAndValidity();
    setTimeout(() => {
        if (this.formAcc.valid) {
          localStorage.setItem(LOGIN_STATUS, JSON.stringify(this.getAccountInfo()));
          this.setAlertMessage("success", SUCCESS, REGISTERED_SUCCESS);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }
      }
      , 0
    )
  }

  getAccountInfo(): IAccount {
    const fullName = [
      this.getControlValue('firstName'),
      this.getControlValue('lastName')
    ].join(' ');
    return {
      fullName: fullName,
      birthDate: this.getControlValue('birthdate'),
      gender: this.getControlValue('gender'),
      phone: this.getControlValue('phone'),
      email: this.getControlValue('email'),
      address: this.getControlValue('address'),
      password: this.getControlValue('password')
    }
  }

  getControlValue(controlName: string): string {
    return this.formAcc.get(controlName).value;
  }

  getNameAlert() {
    const firstNameControlErr = this.formAcc.get("firstName").errors;
    const lastNameControlErr = this.formAcc.get('lastName').errors;
    if (firstNameControlErr) return firstNameControlErr;

    if (lastNameControlErr) return lastNameControlErr;

    return null;
  }

  getPasswordAlert() {
    const passwordControlErr = this.formAcc.get("password").errors;
    const confirmControlErr = this.formAcc.controls['confirm'].errors;
    if (passwordControlErr) return passwordControlErr;

    if (confirmControlErr) return confirmControlErr;

    return null;
  }

  setAlertMessage(notifyType: "success" | "error" | "warning" | null, title = "", message = "") {
    if (notifyType) {
      this.notification = {
        notifyType: notifyType,
        title: title,
        message: message
      }
    } else {
      this.notification = null;
    }
  }

  initFormTest = () =>
    this.formAcc = this.fb.group({
        firstName: ['Duc'],
        lastName: ['Le'],
        email: ['ducle@gmail.com', [validateEmail]],
        birthdate: ['', [validateBirthDate]],
        gender: ['Male'],
        phone: ['0327454684', [validatePhoneNumber]],
        address: ['Ha noi', [validateAddress]],
        password: ['duc123456'],
        confirm: ['duc123456'],
      },
      {
        validators: [validateName, passwordValidate],
        updateOn: "blur"
      })
}
