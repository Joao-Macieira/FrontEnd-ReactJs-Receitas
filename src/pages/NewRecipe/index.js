import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import history from '../../services/history';

import { Title, Container, Form } from './styled';

export default function NewRecipe() {
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

    const { data } = await axios.post('/recipe', {
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
        <Title>Cadastre sua Receita</Title>
        Categoria:
        <select onChange={(e) => setCategoryId(e.target.value)}>
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
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="numberArea">
          <label htmlFor="time">
            Tempo de preparo (em minutos):{' '}
            <input
              type="number"
              placeholder="Tempo de preparo..."
              onChange={(e) => setPreparationTime(e.target.value)}
            />
          </label>

          <label htmlFor="portion">
            Porções:{' '}
            <input
              type="number"
              placeholder="Porções..."
              onChange={(e) => setPortions(e.target.value)}
            />
          </label>
        </div>
        <label htmlFor="method">
          Modo de preparo:{' '}
          <small>
            Separe o modo de preparo com vírgulas apenas, não use números, hífen
            e etc
          </small>
          <textarea
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
            placeholder="Ingredientes..."
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>
        <button type="submit">Criar</button>
      </Form>
    </Container>
  );
}
