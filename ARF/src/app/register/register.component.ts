import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  validateName,
  passwordValidate,
  validateAddress,
  validateEmail,
  validatePhoneNumber
} from "./validator/register.validator";
import {LOGIN_STATUS, REGISTERED_SUCCESS, SUCCESS} from "../core/constant/authen.constant";
import {Router} from "@angular/router";
import {IAlert} from "../core/model/alert.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  alert: IAlert;
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
    inputType: 'date'
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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.formAcc = this.fb.group({
        firstName: [],
        lastName: [],
        email: [],
        birthdate: [],
        gender: ['male'],
        phone: [],
        address: [],
        password: [],
        confirm: [],
      },
      {
        validators: [validateName, validateEmail, validatePhoneNumber, validateAddress, passwordValidate],
        updateOn: "blur"
      })
    // this.initFormTest();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.contextPassword.inputType = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {
    this.formAcc.markAsDirty();
    this.formAcc.markAllAsTouched();
    this.formAcc.updateValueAndValidity();
    setTimeout(() => {
        if (this.formAcc.valid) {
          sessionStorage.setItem(LOGIN_STATUS, this.formAcc.value);
          this.setAlertMessage("success", SUCCESS, REGISTERED_SUCCESS);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }
      }
      , 0
    )
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

  setAlertMessage(alertType: "success" | "error" | "warning" | null, title = "", message = "") {
    if (alertType) {
      this.alert = {
        alertType: alertType,
        title: title,
        message: message
      }
    } else {
      this.alert = null;
    }
  }


  initFormTest = () =>
    this.formAcc = this.fb.group({
        firstName: ['abc'],
        lastName: ['def'],
        email: ['abc@gmail.com'],
        birthdate: [],
        gender: ['male'],
        phone: ['0923456789'],
        address: ['abc abc abc'],
        password: ['a1234567'],
        confirm: ['a1234567'],
      },
      {
        validators: [validateName, validateEmail, validatePhoneNumber, validateAddress, passwordValidate],
        updateOn: "blur"
      })

}
