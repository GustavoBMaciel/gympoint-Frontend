import styled from 'styled-components';

export const Container = styled.div`
  max-width: 650px;
  width: 100%;
  margin: 30px auto;

  h2 {
    color: #444;
    margin-bottom: 25px;
  }
`;

export const BigBox = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  h3 {
    color: #444;
    margin-bottom: 20px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;

    p {
      font-size: 16px;
      color: #666666;
    }

    button {
      color: #4d85ee;
      font-size: 15px;
      border: 0;
      background: none;
    }
  }

  div + div {
    border-top: 1px solid #eee;
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
