import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 5px;
      padding-right: 5px;
    }

    strong {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      color: #ee4d64;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999;
      margin-right: 10px;
      padding-right: 10px;

      &:hover {
        color: #333;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    button {
      background: none;
      border: 0;
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #ee4d64;
    }
  }
`;
