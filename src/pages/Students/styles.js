import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  max-width: 900px;
  margin: 50px auto;
  width: 100%;

  header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      margin: 10px 50px 10px 0;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #444444;
    }

    div {
      display: flex;
      height: 100%;
      align-items: center;

      a {
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 16px 0;
        height: 36px;
        width: 142px;
        background: #ee4d64;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, '#ee4d64')};
        }
      }

      form {
        input {
          margin-top: 5px;
          height: 36px;
          background: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 4px;
          padding: 0 15px;
        }
      }
    }
  }
`;

export const List = styled.table`
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  tr {
    th {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      text-align: start;
      color: #444444;
    }

    td {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: #666666;
    }

    #age {
      text-align: center;
    }

    #actions {
      text-align: center;
    }

    #edit {
      border: 0;
      background: none;
      margin-right: 5px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      text-align: right;
      color: #4d85ee;
    }

    #delete {
      border: 0;
      background: none;
      margin-left: 5px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      text-align: right;
      color: #de3b3b;
    }
  }
`;

export const ChangePage = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  bottom: 0;
  justify-content: space-around;
`;

export const Button = styled.button`
  background: none;
  border: 0;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;
