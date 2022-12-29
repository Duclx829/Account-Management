import {AbstractControl} from "@angular/forms";

let firstNameControl: AbstractControl | null;
let lastNameControl: AbstractControl | null;
let emailControl: AbstractControl | null;
let phoneControl: AbstractControl | null;
let addressControl: AbstractControl | null;
let passwordControl: AbstractControl | null;
let confirmControl: AbstractControl | null;
const EMAIL_REG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REG = /((09|03|07|08|05)+([0-9]{8})\b)/g;
const ADDRESS_REG = /^[a-zA-Z0-9\s,'-]*$/;
const UPPER_CASE_REG = /[A-Z]/;
const LOWER_CASE_REG = /[a-z]/;
const NUMBER_ONLY_REG = /[0-9]/;
const SPECIAL_CHARACTER_REG = /[$&()*,@\[\]^_{}~]/;
const PASSWORD_MIN_LENGTH = 8;


export function validateName(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  firstNameControl = formGroup.get('firstName');
  lastNameControl = formGroup.get("lastName");
  const firstNameValue = firstNameControl.value;
  const lastNameValue = lastNameControl.value;
  let message = "";
  if (firstNameControl.touched && lastNameControl.touched) {
    if (!firstNameValue && !lastNameValue) {
      message = "Enter first name and surname"
      setNameError({required: true}, {required: true}, message);
      return {invalid: true}
    }
  }
  if (!firstNameValue && firstNameControl.touched) {
    message = "Enter first name"
    setNameError({required: true}, null, message);
    return {invalid: true}
  }
  if (!lastNameValue && lastNameControl.touched) {
    lastNameControl.setErrors({required: true});
    message = "Enter last name"
    setNameError(null, {required: true}, message);
    return {invalid: true}
  }
  setNameError(null, null);
  return null;
}

function setNameError(firstNameErr: object | null, lastNameErr: object | null, msg = "") {
  if (firstNameErr) {
    Object.assign(firstNameErr, {message: msg});
  }
  if (lastNameErr) {
    Object.assign(lastNameErr, {message: msg});
  }
  firstNameControl.setErrors(firstNameErr);
  lastNameControl.setErrors(lastNameErr);
}

export function validateEmail(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  emailControl = formGroup.get("email");
  if (!emailControl.touched) return null;
  if (!emailControl.value) {
    emailControl.setErrors({
      required: true,
      message: 'Choose a Gmail address'
    });
    return {invalid: true}
  }
  if (!EMAIL_REG.test(emailControl.value)) {
    emailControl.setErrors({
      invalid: true,
      message: 'Try again with a valid Gmail address'
    });
    return {invalid: true}
  }
  emailControl.setErrors(null);
  return null;
}

export function validatePhoneNumber(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  phoneControl = formGroup.get("phone");
  if (!phoneControl.touched) return null;
  if (!phoneControl.value) {
    phoneControl.setErrors({required: true, message: 'Enter phone number'});
    return {invalid: true}
  }
  if (!PHONE_REG.test(phoneControl.value)) {
    phoneControl.setErrors({invalid: true, message: 'Invalid phone number format'});
    return {invalid: true}
  }
  phoneControl.setErrors(null);
  return null;
}

export function validateAddress(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  addressControl = formGroup.get("address");
  if (!addressControl.touched) return null;
  if (!addressControl.value) {
    addressControl.setErrors({
      required: true,
      message: 'Enter address'
    });
    return {invalid: true}
  }
  if (!ADDRESS_REG.test(addressControl.value)) {
    addressControl.setErrors({
      invalid: true,
      message: 'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed'
    });
    return {invalid: true}
  }
  addressControl.setErrors(null);
  return null;
}

export function passwordValidate(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  passwordControl = formGroup.get('password');
  confirmControl = formGroup.get('confirm');
  let message = "";
  let score = 0;
  if (!passwordControl.touched) return null;
  if (!passwordControl.value) {
    if (confirmControl.touched) {
      confirmControl.markAsUntouched();
    }
    message = "Enter a password"
    setPasswordAndConfirmError({required: true}, null, message);
    return {invalid: true};
  }
  if (passwordControl.value && passwordControl.value.length < PASSWORD_MIN_LENGTH) {
    message = "Use 8 characters or more for your password";
    setPasswordAndConfirmError({lengthRequired: true}, null, message);
    return {invalid: true};
  }
  if (passwordControl.value && passwordControl.value.includes(' ')) {
    message = "Password does not allow spaces";
    setPasswordAndConfirmError({lengthRequired: true}, null, message);
    return {invalid: true};
  }

  score += UPPER_CASE_REG.test(passwordControl.value) ? 1 : 0;
  score += LOWER_CASE_REG.test(passwordControl.value) ? 1 : 0;
  score += NUMBER_ONLY_REG.test(passwordControl.value) ? 1 : 0;
  score += SPECIAL_CHARACTER_REG.test(passwordControl.value) ? 1 : 0;

  if (score < 2) {
    message = "Password must contain at least two of the following: uppercase letters, lowercase letters, numbers, or symbols.";
    setPasswordAndConfirmError({lengthRequired: true}, null, message);
    return {invalid: true};
  }
  if (!confirmControl.touched) return null;
  if (!confirmControl.value) {
    message = "Confirm your password";
    setPasswordAndConfirmError({}, {required: true}, message);
    return {invalid: true};
  }

  if (passwordControl.value !== confirmControl.value) {
    message = "Those passwords didn’t match. Try again";
    setPasswordAndConfirmError({notMatch: true}, {notMatch: true}, message);
    return {invalid: true};
  }

  setPasswordAndConfirmError(null, null);
  return null;
}

function setPasswordAndConfirmError(passwordError: object | null, confirmError: object | null, msg = "") {
  if (passwordError) {
    Object.assign(passwordError, {message: msg})
  }
  passwordControl.setErrors(passwordError);
  confirmControl.setErrors(confirmError);
}
