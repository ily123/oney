import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { Redirect } from 'react-router-dom';
// import { login } from '../../store/session';
import * as sessionActions from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const email = 'demo@aa.io';
    const password = 'password';
    dispatch(sessionActions.login(
      email, password
    ))
  }

  const handleCancel = () => {
    history.push('/')
}

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className = "form-Div">
      <form onSubmit={onLogin} className="form_placing">
        <div className="errors_div">
          {errors.map((error, ind) => (
            <div key={ind} className='errorItem'>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="button_div">
          <button className="submit-button" type='submit'>Login</button>
          <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
              Cancel
          </button>
          <button className="submit-button" onClick={handleDemoLogin} type="submit">Demo</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
