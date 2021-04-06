import styled from 'styled-components';

import * as colors from '../../config/Colors';

export const Title = styled.h1`
  color: ${colors.primaryColor};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px auto;
`;

export const Form = styled.form`
  width: 90%;
  max-width: 600px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  font-size: 20px;
  padding: 16px;

  h1 {
    text-align: center;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  small {
    font-size: 16px;
    text-align: center;
    margin-top: 8px;

    a {
      color: #000;
    }
  }
`;
