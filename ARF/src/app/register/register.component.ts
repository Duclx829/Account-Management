import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  nameValidate,
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
  formAcc: FormGroup = this.fb.group({});

  contextFirstName = {
    controlName: 'firstName',
    labelName: 'First Name',
    maxLength: 30,
    type: 'text'

  };
  contextLastName = {
    controlName: 'lastName',
    labelName: 'Last Name',
    maxLength: 30,
    type: 'text'

  };
  contextEmail = {
    controlName: 'email',
    labelName: 'Email',
    maxLength: 50,
    type: 'text'
  };
  contextBirthDate = {
    controlName: 'birthdate',
    labelName: 'Birth Date',
    type: 'date'
  }
  contextGenderMale = {
    controlName: 'genderMale',
    labelName: 'Male',
    type: 'radio'
  }
  contextGenderFemale = {
    controlName: 'genderFemale',
    labelName: 'Female',
    type: 'radio'
  }
  contextPhone = {
    controlName: 'phone',
    labelName: 'Phone',
    maxLength: 10,
    type: 'text'
  };
  contextAddress = {
    controlName: 'address',
    labelName: 'Address',
    maxLength: 100,
    type: 'text'
  };
  contextPassword = {
    controlName: 'password',
    labelName: 'Password',
    maxLength: 30,
    type: 'password'
  };
  contextConfirm = {
    controlName: 'confirm',
    labelName: 'Confirm',
    maxLength: 30,
    type: 'password'
  };

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formAcc = this.fb.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        birthdate: ['bod'],
        gender: this.fb.group({
          genderMale: ['male'],
          genderFemale: ['female']
        }),
        phone: [''],
        address: [''],
        password: [''],
        confirm: [''],
      },
      {
        validators: [nameValidate, validateEmail, validatePhoneNumber, validateAddress, passwordValidate],
        updateOn: "blur"
      })
    // this.initFormTest();
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
    this.contextPassword.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {
    this.formAcc.markAsDirty();
    this.formAcc.markAllAsTouched();
    this.formAcc.updateValueAndValidity();
    setTimeout(() => {
        if (this.formAcc.valid) {
          alert('Submited')
        }
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
        validators: [nameValidate, validateEmail, validatePhoneNumber, validateAddress, passwordValidate],
        updateOn: "change"
      })
}
