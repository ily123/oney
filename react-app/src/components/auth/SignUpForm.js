import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useHistory } from "react-router";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const handleCancel = () => {
    history.push('/')
  }
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className = "form-Div">
      <form onSubmit={onSignUp} className="form_placing">
        <div className="errors_div">
          {errors.map((error, ind) => (
            <div key={ind} className='errorItem'>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            // required={true}
          ></input>
        </div>
        <div className="button_div">
        <button className='submit-button' type='submit'>Sign Up</button>
        <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
              Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
