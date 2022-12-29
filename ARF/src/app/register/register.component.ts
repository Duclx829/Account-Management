import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {
  validateName,
  passwordValidate,
  validateAddress,
  validateEmail,
  validatePhoneNumber
} from "./validator/register.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {
  }
  showPassword = false;
  formAcc: FormGroup;
  formGender: FormGroup;
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

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGender = this.fb.group({
      genderMale: [''],
      genderFemale: ['']
    });
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
        // if (this.formAcc.valid) {
          console.log(this.formAcc.controls['gender'].value)
        // }
      }
      , 0
    )
  }

  initFormTest = () =>
    this.formAcc = this.fb.group({
        firstName: ['abc'],
        lastName: ['def'],
        email: ['abc@gmail.com'],
        phone: ['0923456789'],
        address: ['abc abc abc'],
        password: ['a1234567'],
        confirm: [''],
      },
      {
        validators: [validateName, validateEmail, validatePhoneNumber, validateAddress, passwordValidate],
        updateOn: "change"
      })
}
