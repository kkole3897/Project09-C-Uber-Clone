import React from 'react';

import { WhiteSpace } from 'antd-mobile';

import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #56A902;
  width: 329px;
  height: 180px;
  border: none;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  border-radius: 20px;
  margin: 10px;
`;

const Title = styled.h1`
  width: 89px;
  height: 29px;
  left: calc(50% - 89px/2 - 2.5px);
  top: calc(50% - 29px/2 - 329.5px);

  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 120px;
`;

function SignUpSelectPage() {
  return (
    <Page>
      <Title>회원가입</Title>
      <Button>라이더 회원가입</Button>
      <WhiteSpace />
      <Button>드라이버 회원가입</Button>
    </Page>
  );
}

export default SignUpSelectPage;