import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import axios from '../../services/axios';

import { Title, SubTitle, Container, RecipesArea } from './styled';

export default function MyRecipes() {
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
      const { data } = await axios.get(`/myrecipes?categoria=${filter}`);

      setRecipes(data);
    })();
  }, [filter]);

  function newRecipeHandler() {
    window.location.href = '/nova-receita';
  }

  function handleEdit(id) {
    window.location.href = `/receita/${id}`;
  }

  function handleDeleteAsk(e) {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;

    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  }

  async function handleDelete(id) {
    let formError = false;

    if (!id) {
      toast.error('Error na exclusão');

      formError = true;
    }

    if (formError) return;

    const { data } = await axios.delete(`/recipe/${id}`);

    if (data.error) {
      toast.error(data.error);
    } else {
      window.location.reload();
    }
  }

  return (
    <Container>
      <Title>Minhas Receitas</Title>
      <span className="newRecipeArea">
        Cadastre um receita nova:{' '}
        <button type="button" onClick={newRecipeHandler}>
          Cadastrar nova receita
        </button>
      </span>
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
              <button className="printOut" type="button">
                Imprimir
              </button>
              <button
                className="edit"
                type="button"
                onClick={() => handleEdit(recipe.id)}
              >
                Editar
              </button>
              <button type="button" onClick={handleDeleteAsk}>
                Excluir
              </button>
              <FaTrash
                className="deleteConfirm"
                onClick={() => handleDelete(recipe.id)}
                size={24}
                display="none"
                cursor="pointer"
              />
            </div>
          </div>
        </RecipesArea>
      ))}
    </Container>
  );
}
