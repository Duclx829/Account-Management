import {AbstractControl} from "@angular/forms";


let firstNameControl: AbstractControl | null;
let lastNameControl: AbstractControl | null;
let emailControl: AbstractControl | null;
let phoneControl: AbstractControl | null;
let addressControl: AbstractControl | null;
let passwordControl: AbstractControl | null;
let confirmControl: AbstractControl | null;

/**
 * Validate for first name input
 * Control: firstName
 * @param c: AbstractControl
 */
export function nameValidate(c: AbstractControl) {
  if (c.pristine) return null;
  firstNameControl = c.get('firstName');
  lastNameControl = c.get("lastName");
  const firstNameValue = firstNameControl?.value;
  const lastNameValue = lastNameControl?.value;
  let message = "";
  if (firstNameControl?.touched && lastNameControl?.touched) {
    if (firstNameValue === '' && lastNameValue === '') {
      message = "Enter first name and surname"
      setNameError({required: true}, {required: true}, message);
      return {invalid: true}
    }
  }
  if (firstNameValue === '' && firstNameControl?.touched) {
    message = "Enter first name"
    setNameError({required: true}, null, message);
    return {invalid: true}
  }
  // if(includeExtraSpace(firstNameValue)){
  //   message = "Name cannot contain "
  //   setNameError({required: true}, null, message);
  //   return {invalid: true}
  // }
  if (lastNameValue === '' && lastNameControl?.touched) {
    lastNameControl?.setErrors({required: true});
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
  } else if (lastNameErr) {
    Object.assign(lastNameErr, {message: msg});
  }
  firstNameControl?.setErrors(firstNameErr);
  lastNameControl?.setErrors(lastNameErr);
}

export function validateEmail(c: AbstractControl) {
  if (c.pristine) return null;
  emailControl = c.get("email");
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailControl?.touched) return null;
  if (emailControl?.value === '') {
    emailControl?.setErrors({required: true, message: 'Choose a Gmail address'});
    return {invalid: true}
  }
  if (!emailReg.test(emailControl?.value)) {
    emailControl?.setErrors({invalid: true, message: 'Try again with a valid Gmail address'});
    return {invalid: true}
  }
  emailControl?.setErrors(null);
  return null;
}

export function validatePhoneNumber(c: AbstractControl) {
  if (c.pristine) return null;
  phoneControl = c.get("phone");
  const phoneReg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (!phoneControl?.touched) return null;
  if (phoneControl?.value === '') {
    phoneControl.setErrors({required: true, message: 'Enter phone number'});
    return {invalid: true}
  }
  if (!phoneReg.test(phoneControl?.value)) {
    phoneControl?.setErrors({invalid: true, message: 'Invalid phone number format'});
    return {invalid: true}
  }
  phoneControl?.setErrors(null);
  return null;
}

export function validateAddress(c: AbstractControl) {
  if (c.pristine) return null;
  addressControl = c.get("address");
  const addressReg = /^[a-zA-Z0-9\s,'-]*$/;
  // includeExtraSpace(addressControl?.value)
  if (!addressControl?.touched) return null;
  if (addressControl?.value === '') {
    addressControl.setErrors({required: true, message: 'Enter address'});
    return {invalid: true}
  }
  if (!addressReg.test(addressControl?.value)) {
    addressControl?.setErrors({
      invalid: true,
      message: 'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed'
    });
    return {invalid: true}
  }
  addressControl?.setErrors(null);
  return null;
}

export function passwordValidate(c: AbstractControl) {
  if (c.pristine) return null;
  passwordControl = c.get('password');
  confirmControl = c.get('confirm');
  let message = "";
  let score = 0;
  if (!passwordControl?.touched) return null;
  if (passwordControl?.value === '') {
    if (confirmControl?.touched) {
      confirmControl?.markAsUntouched();
    }
    message = "Enter a password"
    setPasswordAndConfirmError({required: true}, null, message);
    return {invalid: true};
  }
  if (passwordControl?.value.length < 8) {
    message = "Use 8 characters or more for your password";
    setPasswordAndConfirmError({lengthRequired: true}, null, message);
    return {invalid: true};
  }
  if (passwordControl?.value.includes(' ')) {
    message = "Password does not allow spaces";
    setPasswordAndConfirmError({lengthRequired: true}, null, message);
    return {invalid: true};
  }

  score += /[A-Z]/.test(passwordControl?.value) ? 1 : 0;
  score += /[a-z]/.test(passwordControl?.value) ? 1 : 0;
  score += /[0-9]/.test(passwordControl?.value) ? 1 : 0;
  score += /[$&()*,@\[\]^_{}~]/.test(passwordControl?.value) ? 1 : 0;
  if (score < 2) {
    message = "Password must contain at least two of the following: uppercase letters, lowercase letters, numbers, or symbols.";
    setPasswordAndConfirmError({lengthRequired: true}, null, message);
    return {invalid: true};
  }
  if (!confirmControl?.touched) return null;
  if (confirmControl?.value === '') {
    message = "Confirm your password";
    setPasswordAndConfirmError({}, {required: true}, message);
    return {invalid: true};
  }

  if (passwordControl?.value !== confirmControl?.value) {
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
  passwordControl?.setErrors(passwordError);
  confirmControl?.setErrors(confirmError);
}

// function includeExtraSpace(value: string) {
//   let splitStr = value.split('  ');
//   return (splitStr.length > 1)
// }
