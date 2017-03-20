import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';

import canonize from './canonize';

const __DEV__ = true;

const app = express();

app.use(cors());

app.get('/calc', (req, res) => {
  var a, b;

  if (!req.query.a) {
    a = 0;
  } else {
    try {
      a = Number(req.query.a);
    } catch(e) {
      a = 0;
    }
  }

  if (!req.query.b) {
    b = 0;
  } else {
    try {
      b = Number(req.query.b);
    } catch(e) {
      b = 0;
    }
  }

  const sum = a + b;

  res.send(sum.toString());
});

app.get('/canonize', (req, res) => {
  if (!req.query.username) {
    return res.send('Invalid username');
  }

  const username = canonize(req.query.username);

  res.send(username);

  // res.json({
  //   url: req.query.username,
  //   username
  // });
});

const baseUrl = 'http://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'height', 'weight'];

async function getPokemons(url, i = 0) {
  console.log('getPokemons', url, i);

  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;

  if (__DEV__ && i > 1) {
    return pokemons;
  }

  if (page.next) {
    const pokemons2 = await getPokemons(page.next, i + 1);
    return [
      ...pokemons,
      ...pokemons2
    ]
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log('getPokemon', url);

  const response = await fetch(url);
  const pokemon = await response.json();

  return pokemon;
}

app.get('/', async (req, res) => {
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonsPromises = pokemonsInfo.map(info => {
      return getPokemon(info.url);
    });

    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map(pokemon => {
      return _.pick(pokemon, pokemonFields);
    })

    const sortedPokemons = _.sortBy(pokemons, (pokemon) => {
      return -pokemon.weight;
    });
    return res.json(sortedPokemons);
  } catch(e) {
    console.log(e);
    res.json({ e });
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
