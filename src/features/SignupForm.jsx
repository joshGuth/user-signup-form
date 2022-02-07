import React, { useState } from 'react';
import styles from './signupForm.module.css';

export const SignupForm = () => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmittedSuccessfully(true);
  };
  const formIsValid =
    username &&
    password &&
    passwordConfirmation &&
    password === passwordConfirmation;

  return (
    <div className={styles.formContainer}>
      {isSubmittedSuccessfully ? (
        <div>You've Successfully Signed Up</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Username"
              type="text"
              id="username"
              required
            />
          </div>
          <div className={styles.formField}>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Password"
              type="password"
              id="password"
              required
            />
          </div>
          <div className={styles.formField}>
            <input
              onChange={(event) => {
                setPasswordConfirmation(event.target.value);
              }}
              placeholder="Confirm Password"
              type="password"
              id="passwordConfirmation"
              required
            />
          </div>
          {passwordConfirmation !== password && (
            <div className="passwordsMatchText">Passwords Do Not Match</div>
          )}
          {passwordConfirmation && passwordConfirmation === password && (
            <div id="passwordsMatchText">Passwords Match</div>
          )}
          <button
            disabled={!formIsValid}
            className={styles.button}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};
