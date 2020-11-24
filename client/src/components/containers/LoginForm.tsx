import React from 'react';

import LoginInput from '../presentational/LoginInput';

import { setLoginEmail, setLoginPassword, requestLogin } from '../../slice';

import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button } from 'antd-mobile';

function LoginForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const handleChangeEmail = async (e: any) => {
    dispatch(setLoginEmail(e.target.value));
  };
  const handleChangePassword = (e: any) => {
    dispatch(setLoginPassword(e.target.value));
  };

  const loginButton = () => {
    requestLogin(client);
  };

  return (
    <>
      <LoginInput type="text" handleChange={handleChangeEmail} />
      <LoginInput type="password" handleChange={handleChangePassword}/>
      <Button onClick={loginButton}>로그인</Button>
    </>
  );
}

export default LoginForm;
