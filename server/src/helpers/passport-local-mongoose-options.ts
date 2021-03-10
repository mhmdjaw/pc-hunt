const passwordValidator = (
  password: string,
  cb: (error?: string) => string
): string => {
  if (!someValidationErrorExists(password)) {
    return cb(
      "Your password should have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }
  // return an empty cb() on success
  return cb();
};

const someValidationErrorExists = (password: string): boolean => {
  const passwordRegex = /^(?=.*\d)(?=.*[ !"#$%&'()*+,-./:\\;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const options = {
  usernameField: "email",
  errorMessages: {},
  limitAttempts: true,
  maxAttempts: 5,
  passwordValidator: passwordValidator,
};

options.errorMessages = {
  MissingUsernameError: "No email was given",
  IncorrectPasswordError: "Password or email are incorrect",
  IncorrectUsernameError: "Password or email are incorrect",
  UserExistsError: "A user with the given email is already registered",
};
