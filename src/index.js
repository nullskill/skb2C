import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';

import canonize from './canonize';

const __DEV__ = true;

const app = express();

app.use(cors());

app.get('/creds', (req, res) => {

  var result = 'Invalid fullname';

  if (!req.query.fullname) {
    return res.send(result);
  }
  
  const fullname = req.query.fullname;

  // const re = /^([a-zа-яё\s]+)$/i;
  const re = /[0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  const Reg = new RegExp(re);

  if (Reg.test(fullname)) {
    return res.send(result);
  }

  const arr = fullname.split(' ');

  switch(arr.length) {
    case 3:
      result = arr[2] + ' ' + arr[0].charAt(0) + '.' + ' ' + arr[1].charAt(0) + '.';
      return res.send(result);
      break;
    case 2:
      result = arr[1] + ' ' + arr[0].charAt(0) + '.';
      return res.send(result);
      break;
    case 1:
      result = arr[0];
      return res.send(result);
      break;
    default:
      return res.send(result);
  }
});

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
