import styled from 'styled-components';

import { primaryColor } from '../../config/Colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;

    p {
      margin-right: 4px;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    display: flex;
    align-items: center;
  }
`;
