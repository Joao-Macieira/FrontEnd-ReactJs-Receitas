import React, { useState, useEffect } from 'react';

import api from '../../services/axios';

import { Title, SubTitle, Container, RecipesArea } from './styled';

export default function Login() {
  const [filter, setFilter] = useState('');

  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/category');

      setCategories(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/recipes?categoria=${filter}`);

      setRecipes(data);
    })();
  }, [filter]);

  return (
    <Container>
      <Title>Receitas</Title>
      <p>Procurando uma especialidade?</p>
      Busque em nossas categorias:
      <select onChange={(e) => setFilter(e.target.value)}>
        <option key={0} value="">
          Selecione a categoria
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.nome}
          </option>
        ))}
      </select>
      <hr />
      {recipes.map((recipe) => (
        <RecipesArea key={recipe.id}>
          <div className="leftSide">
            <Title>{recipe.nome}</Title>
            <div className="autorArea">
              <span>Autor: {recipe.autor}</span>
              <span>Categoria: {recipe.categoria}</span>
            </div>
            <div className="detailsArea">
              <span>Nº de Porções: {recipe.porcoes}</span>
              <span>
                Tempo de preparo: {recipe.tempo_preparo_minutos} minutos
              </span>
            </div>
          </div>
          <div className="rightSide">
            <SubTitle>Modo de Preparo</SubTitle>
            <ul>
              {recipe.modo_preparo.split(',').map((prepair) => (
                <li key={prepair}>{prepair}</li>
              ))}
            </ul>
          </div>
          <div className="downSide">
            <SubTitle>Ingredientes</SubTitle>
            <ul>
              {recipe.ingredientes.split(',').map((ingrediente) => (
                <li key={ingrediente}>{ingrediente}</li>
              ))}
            </ul>
          </div>
        </RecipesArea>
      ))}
    </Container>
  );
}