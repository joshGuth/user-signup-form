import React, { useState } from 'react';
import styles from './signupForm.module.css';

export const SignupForm = () => {
  const [errors, setErrors] = useState([]);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const userDatabase = [];

  const validateForm = (username, password, passwordConfirmation) => {
    if (userDatabase.find((user) => user.username == username.value)) {
      setErrors((errors) => [
        ...errors,
        { name: 'username', message: errorMessages.usernameTaken }
      ]);
    }
    if (password.value !== passwordConfirmation.value) {
      setErrors((errors) => [
        ...errors,
        {
          name: 'password',
          message: errorMessages.passwordConfirmationError
        }
      ]);
    }

    if (errors.length) {
      return false;
    } else {
      return true;
    }
  };

  const renderErrorMessage = (errorName) => {
    const error = errors.find(({ name }) => name === errorName);
    if (error) {
      return <div>{error.message}</div>;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var { username, password, passwordConfirmation } = document.forms[0];
    const formIsValid = validateForm(username, password, passwordConfirmation);
    console.log(formIsValid);
    if (formIsValid) {
      userDatabase.push({ username, password });
      setIsSubmittedSuccessfully(true);
      setErrors([]);
    }
  };

  const errorMessages = {
    usernameTaken: 'A user already exists with this username',
    passwordConfirmationError: 'The passwords entered do not match'
  };

  return (
    <div className={styles.formContainer}>
      {isSubmittedSuccessfully ? (
        <div>Thank you for signing up.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input placeholder="Username" type="text" id="username" required />
            {renderErrorMessage('username')}
          </div>
          <div className={styles.formField}>
            <input
              placeholder="Password"
              type="password"
              id="password"
              required
            />
            {renderErrorMessage('password')}
          </div>
          <div className={styles.formField}>
            <input
              placeholder="Confirm Password"
              type="password"
              id="passwordConfirmation"
              required
            />
          </div>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};
