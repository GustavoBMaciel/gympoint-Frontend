import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  width: 360px;
  height: 448px;
  left: 540px;
  top: 226px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  img {
    margin-top: 50px;
  }

  h1 {
    position: absolute;
    height: 35px;
    left: 0%;
    right: 0%;
    margin-top: 15px;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 29.8607px;
    line-height: 35px;
    color: #ee4d64;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    place {
    }

    #emailLbl {
      position: absolute;
      height: 16px;
      margin-left: 30px;
      top: calc(50% - 16px / 2 - 26.5px);

      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;

      color: #444444;
    }

    #passwordLbl {
      position: absolute;
      height: 16px;
      margin-left: 30px;
      margin-top: 140px;

      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;

      color: #444444;
    }

    #email {
      height: 44px;
      padding: 0 15px;
      margin: 80px 30px 20px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;

      &::placeholder {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #999999;
      }
    }
    #password {
      height: 44px;
      padding: 0 15px;
      margin: 20px 30px 20px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;

      &::placeholder {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #999999;
      }
    }

    button {
      margin: 0px 30px 20px;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#EE4D64')};
      }
    }
  }
`;
