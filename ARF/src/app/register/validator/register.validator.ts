import {AbstractControl} from "@angular/forms";

let firstNameControl: AbstractControl | null;
let lastNameControl: AbstractControl | null;
let emailControl: AbstractControl | null;
let phoneControl: AbstractControl | null;
let addressControl: AbstractControl | null;
let passwordControl: AbstractControl | null;
let confirmControl: AbstractControl | null;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_PATTERN = /((09|03|07|08|05)+([0-9]{8})\b)/;
const ADDRESS_PATTERN = /^[a-zA-Z0-9\s,'-]*$/;
const UPPER_CASE_PATTERN = /[A-Z]/;
const LOWER_CASE_PATTERN = /[a-z]/;
const NUMBER_ONLY_PATTERN = /[0-9]/;
const SPECIAL_CHARACTER_PATTERN = /[$&()*,@\[\]^_{}~]/;
const PASSWORD_MIN_LENGTH = 8;

const FORM_INVALID_ERR = {
  invalid: true
};

const EMAIL_REQUIRED_ERR = {
  required: true,
  message: 'Choose a Gmail address'
};

const EMAIL_INVALID_ERR = {
  invalid: true,
  message: 'Try again with a valid Gmail address'
};

const PHONE_REQUIRED_ERR = {
  required: true,
  message: 'Enter phone number'
};

const PHONE_INVALID_ERR = {
  invalid: true,
  message: 'Invalid phone number format'
}

const ADDRESS_REQUIRED_ERR = {
  required: true,
  message: 'Enter address'
}

const ADDRESS_SPECIAL_ERR = {
  invalid: true,
  message: 'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed'
}

const PASSWORD_REQUIRED_ERR = {
  required: true,
  message: "Enter a password"
}

const PASSWORD_LENGTH_ERR = {
  lengthRequired: true,
  message: `Use ${PASSWORD_MIN_LENGTH} characters or more for your password`
}

const PASSWORD_SPACE_ERR = {
  invalid: true,
  message: "Password does not allow spaces"
}

const PASSWORD_STRENGTH_ERR = {
  isWeak: true,
  message: "Password must contain at least two of the following: uppercase letters, lowercase letters, numbers, or symbols."
}

const CONFIRM_REQUIRED_ERR = {
  required: true,
  message: "Confirm your password"
}

const PASSWORD_MATCH_ERR = {
  notMatch: true,
  message: "Those passwords didn’t match. Try again"
}

const NAME_REQUIRED_ERR = {
  required: true,
  message: "Enter first name and surname"
}

const FIRSTNAME_REQUIRED_ERR = {
  required: true,
  message: "Enter first name"
}

const LASTNAME_REQUIRED_ERR = {
  required: true,
  message: "Enter last name"
}

export function validateName(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;

  firstNameControl = formGroup.get('firstName');
  lastNameControl = formGroup.get("lastName");
  const firstNameValue = firstNameControl.value;
  const lastNameValue = lastNameControl.value;
  firstNameControl.setErrors(null);
  lastNameControl.setErrors(null);

  if (
    firstNameControl.touched
    && lastNameControl.touched
    && !firstNameValue
    && !lastNameValue
  ) {
    firstNameControl.setErrors(NAME_REQUIRED_ERR);
    lastNameControl.setErrors(NAME_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (!firstNameValue && firstNameControl.touched) {
    firstNameControl.setErrors(FIRSTNAME_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (!lastNameValue && lastNameControl.touched) {
    lastNameControl.setErrors(LASTNAME_REQUIRED_ERR);
    return FORM_INVALID_ERR
  }

  return null;
}

export function validateEmail(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;

  emailControl = formGroup.get("email");
  const emailControlValue = emailControl.value;

  if (!emailControl.touched) return null;

  if (!emailControlValue) {
    emailControl.setErrors(EMAIL_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (!EMAIL_PATTERN.test(emailControlValue)) {
    emailControl.setErrors(EMAIL_INVALID_ERR);
    return FORM_INVALID_ERR;
  }

  emailControl.setErrors(null);
  return null;
}

export function validatePhoneNumber(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;

  phoneControl = formGroup.get("phone");
  const phoneControlValue = phoneControl.value;

  if (!phoneControl.touched) return null;

  if (!phoneControlValue) {
    phoneControl.setErrors(PHONE_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (!PHONE_PATTERN.test(phoneControlValue)) {
    phoneControl.setErrors(PHONE_INVALID_ERR);
    return FORM_INVALID_ERR;
  }

  phoneControl.setErrors(null);
  return null;
}

export function validateAddress(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  addressControl = formGroup.get("address");
  const addressControlValue = addressControl.value
  if (!addressControl.touched) return null;

  if (!addressControlValue) {
    addressControl.setErrors(ADDRESS_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (!ADDRESS_PATTERN.test(addressControlValue)) {
    addressControl.setErrors(ADDRESS_SPECIAL_ERR);
    return FORM_INVALID_ERR;
  }

  addressControl.setErrors(null);
  return null;
}

export function passwordValidate(formGroup: AbstractControl) {
  if (formGroup.pristine) return null;
  passwordControl = formGroup.get('password');
  confirmControl = formGroup.get('confirm');
  const passwordControlValue = passwordControl.value;
  const confirmControlValue = confirmControl.value;
  let score = 0;
  passwordControl.setErrors(null);
  confirmControl.setErrors(null);

  if (!passwordControl.touched) return null;

  if (!passwordControlValue) {
    if (confirmControl.touched) {
      confirmControl.markAsUntouched();
    }

    passwordControl.setErrors(PASSWORD_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (passwordControlValue.length < PASSWORD_MIN_LENGTH) {
    passwordControl.setErrors(PASSWORD_LENGTH_ERR);
    return FORM_INVALID_ERR;
  }

  if (passwordControlValue.includes(' ')) {
    passwordControl.setErrors(PASSWORD_SPACE_ERR);
    return FORM_INVALID_ERR;
  }

  score += UPPER_CASE_PATTERN.test(passwordControl.value) ? 1 : 0;
  score += LOWER_CASE_PATTERN.test(passwordControl.value) ? 1 : 0;
  score += NUMBER_ONLY_PATTERN.test(passwordControl.value) ? 1 : 0;
  score += SPECIAL_CHARACTER_PATTERN.test(passwordControl.value) ? 1 : 0;

  if (score < 2) {
    passwordControl.setErrors(PASSWORD_STRENGTH_ERR);
    return FORM_INVALID_ERR;
  }

  if (!confirmControl.touched) return null;

  if (!confirmControlValue) {
    confirmControl.setErrors(CONFIRM_REQUIRED_ERR);
    return FORM_INVALID_ERR;
  }

  if (passwordControlValue !== confirmControlValue) {
    passwordControl.setErrors(PASSWORD_MATCH_ERR);
    return FORM_INVALID_ERR;
  }

  return null;
}
