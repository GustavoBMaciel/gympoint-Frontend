import styled from 'styled-components';
import { darken, lighten } from 'polished';

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
        background: #cccccc;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, '#cccccc')};
        }
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 0px 0;
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
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    color: #444;
  }

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 0 15px;
  }

  span {
    color: ${lighten(0.03, '#ee4d64')};
  }

  footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 15px;
    margin: 10px 0px 00px 0px;

    div {
      label {
        font-weight: bold;
        color: #444;
        margin: 10px 0px 10px 0px;
      }
    }
  }
`;
