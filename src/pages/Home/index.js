import React, { useState, useEffect, useContext } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { Context } from '../../Context/AuthContext';

import axios from '../../services/axios';

import { Impression } from '../../Helpers/printRecipes';

import { Title, SubTitle, Container, RecipesArea } from './styled';
import history from '../../services/history';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Home() {
  const { authenticated } = useContext(Context);

  const [filter, setFilter] = useState('');

  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/category');

      setCategories(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/recipes?categoria=${filter}`);

      setRecipes(data);
    })();
  }, [filter]);

  async function handleView(id) {
    if (!authenticated) {
      history.push('/login');
    } else {
      const { data } = await axios.get(`/recipe/${id}`);
      const impressionClass = new Impression(data);
      const document = await impressionClass.documentPrepare();
      pdfMake.createPdf(document).open({}, window.open('', '_blank'));
    }
  }

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
          <div className="Recipes">
            <div className="leftSide">
              <Title>{recipe.nome}</Title>
              <div className="detailsArea">
                <span>Autor: {recipe.autor}</span>
                <span>Categoria: {recipe.categoria}</span>

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

            <div className="actionArea">
              <button
                className="printOut"
                type="button"
                onClick={() => handleView(recipe.id)}
              >
                Imprimir Receita
              </button>
            </div>
          </div>
        </RecipesArea>
      ))}
    </Container>
  );
}
