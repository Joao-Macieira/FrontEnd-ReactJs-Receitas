import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import history from '../../services/history';

import { Title, Container, Form } from './styled';

export default function EditRecipe({ match }) {
  const { id } = match.params;

  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [portions, setPortions] = useState('');
  const [method, setMethod] = useState('');
  const [ingredients, setIngredients] = useState('');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/category');

      setCategories(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/recipe/${id}`);

      setCategoryId(data.id_categorias);
      setName(data.nome);
      setPreparationTime(data.tempo_preparo_minutos);
      setPortions(data.porcoes);
      setMethod(data.modo_preparo);
      setIngredients(data.ingredientes);
    })();

    // eslint-disable-next-line
  }, []);

  function handleBack() {
    history.push('/minha-conta');
  }

  async function handlerSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!categoryId) {
      toast.error('Selecione a categoria da receita');

      formErrors = true;
    }

    if (!method) {
      toast.error('Descreva o método de preparo da receita');

      formErrors = true;
    }

    if (formErrors) return;

    const { data } = await axios.put(`/recipe/${id}`, {
      categoryId,
      name,
      preparationTime,
      portions,
      method,
      ingredients,
    });

    if (data.error) {
      toast.error(data.error);
    } else {
      history.push('/minha-conta');
    }
  }

  return (
    <Container>
      <Form onSubmit={handlerSubmit}>
        <Title>Melhore a sua Receita</Title>
        <button className="backButton" type="button" onClick={handleBack}>
          Página anterior
        </button>
        Categoria:
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option key={0} value="">
            Selecione a categoria
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
        <label htmlFor="name">
          Nome da Receita:{' '}
          <input
            type="text"
            placeholder="Nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="numberArea">
          <label htmlFor="time">
            Tempo de preparo (em minutos):{' '}
            <input
              type="number"
              value={preparationTime}
              placeholder="Tempo de preparo..."
              onChange={(e) => setPreparationTime(e.target.value)}
            />
          </label>

          <label htmlFor="portion">
            Porções:{' '}
            <input
              type="number"
              value={portions}
              placeholder="Porções..."
              onChange={(e) => setPortions(e.target.value)}
            />
          </label>
        </div>
        <label htmlFor="method">
          Modo de preparo:{' '}
          <small>
            Separe o modo de preparo com vírgulas APENAS, não use números, hífen
            e etc
          </small>
          <textarea
            value={method}
            placeholder="Modo de preparo..."
            onChange={(e) => setMethod(e.target.value)}
          />
        </label>
        <label htmlFor="ingredients">
          Ingredientes:{' '}
          <small>
            Separe os ingredientes com vírgulas APENAS, não use números, hífen e
            etc
          </small>
          <textarea
            value={ingredients}
            placeholder="Ingredientes..."
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>
        <button type="submit">Melhorar</button>
      </Form>
    </Container>
  );
}

EditRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
