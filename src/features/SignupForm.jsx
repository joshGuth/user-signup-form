import React, { useState } from 'react';

export const SignupForm = () => {
  const [errors, setErrors] = useState([]);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const userDatabase = [
    {
      username: 'Joe1',
      password: 'password123'
    },
    {
      username: 'User2',
      password: 'pass1234'
    }
  ];

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
      setIsSubmittedSuccessfully(true);
      setErrors([]);
    }
  };

  const errorMessages = {
    usernameTaken: 'A user already exists with this username',
    passwordConfirmationError: 'The passwords entered do not match'
  };

  return (
    <div>
      {isSubmittedSuccessfully ? (
        <div>User successfully logged in</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" required />
          {renderErrorMessage('username')}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          {renderErrorMessage('password')}
          <input type="password" id="passwordConfirmation" required />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};
