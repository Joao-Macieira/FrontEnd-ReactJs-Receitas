import styled from 'styled-components';

import * as colors from '../../config/Colors';

export const Title = styled.h1`
  color: ${colors.primaryDarkColor};
  margin-bottom: 4px;
`;

export const SubTitle = styled.h3`
  color: ${colors.primaryColor};
`;

export const Paragrafo = styled.p`
  color: #f00;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
  background: #fff;
  font-size: 16px;
  color: #000;
  letter-spacing: 1px;

  .newRecipeArea {
    line-height: 48px;
    color: ${colors.primaryColor};
    font-size: 24px;

    button {
      padding: 4px 8px;
      font-size: 16px;
    }
  }

  select {
    font-size: 16px;
    padding: 4px 8px;
    margin: 8px 4px;
  }
`;

export const RecipesArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  border-bottom: 1px solid ${colors.secondaryColor};

  .leftSide {
    width: 100%;
    max-width: 400px;
    padding-right: 4px;

    .autorArea {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    .detailsArea {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      margin-top: 8px;
    }
  }

  .rightSide {
    width: 100%;
    max-width: 400px;
  }

  .downSide {
  }
`;
