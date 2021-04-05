import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import MyRecipes from '../pages/MyRecipes';
import NewRecipe from '../pages/NewRecipe';
import EditRecipe from '../pages/EditRecipe';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/cadastro" component={Cadastro} />
      <MyRoute isPrivate exact path="/minha-conta" component={MyRecipes} />
      <MyRoute isPrivate exact path="/nova-receita" component={NewRecipe} />
      <MyRoute isPrivate exact path="/receita/:id" component={EditRecipe} />
      <MyRoute exact path="*" component={Page404} />
    </Switch>
  );
}
