const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dbPath = path.resolve(__dirname, "../../assets/db.json");

const baseURL = "https://pokeapi.co/api/v2";
const fibonacciSequence = require("./generalHelper");

const getPokemonList = async () => {
  let response = await axios.get(`${baseURL}/pokemon`);
  let pokemon = response.data.results.map((item, index) => ({
    id: index + 1,
    name: item.name,
    url: item.url,
  }));

  return Promise.resolve(pokemon);
};

const getMyPokemonList = async () => {
  let pokemonList = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  return Promise.resolve(pokemonList);
};

const getPokemonDetail = async (dataObject) => {
  const { pokemonName } = dataObject;
  let response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
  let data = response.data;
  return Promise.resolve(data);
};

const catchPokemon = async (dataObject) => {
  const { pokemonName } = dataObject;
  console.log(dataObject, "<<< dataobject");
  const pokemonList = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  let response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
  let { name } = response.data;
  let messageInfo = "";
  //   console.log(response.data);
  const id = pokemonList.pokemon.length + 1;
  const catchChance = Math.random();
  let pokemon = {};

  if (catchChance > 0.5) {
    pokemon = {
      id,
      pokemonName: name,
      nickname: name,
    };
    messageInfo = "You have successfully caught " + name;
    pokemonList.pokemon.push(pokemon);
  } else {
    pokemon = "Not Caught";
    messageInfo = "You failed to catch " + name;
  }
  fs.writeFileSync(dbPath, JSON.stringify(pokemonList));
  console.log(catchChance);
  return Promise.resolve({ catchChance, messageInfo, pokemon, pokemonList });
};
const releasePokemon = async (dataObject) => {
  const { id } = dataObject;
  console.log(dataObject);
  const pokemonList = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  const pokeIndex = pokemonList.pokemon.findIndex(
    (pokemonList) => pokemonList.id === id
  );
  console.log(pokeIndex);
  let messageInfo = "";

  const isPrime = (num) => {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  };

  const catchChance = Math.floor(Math.random() * 100);

  if (isPrime(catchChance)) {
    messageInfo = "You have successfully released " + id;
    pokemonList.pokemon.splice(pokeIndex - 1, 1);
  } else {
    messageInfo = "You failed to release " + id;
  }

  fs.writeFileSync(dbPath, JSON.stringify(pokemonList));
  console.log(catchChance);

  return Promise.resolve({ catchChance, messageInfo, pokemonList });
};

const renamePokemon = async (dataObject) => {
  const { id, nickname } = dataObject;
  try {
    let pokemonList = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    if (id) {
      pokemonList.pokemon.map((item) => {
        item.nickname = nickname || item.nickname;
      });
      fs.writeFileSync(dbPath, JSON.stringify(pokemonList));
      return Promise.resolve("Pokemon Rename", pokemonList);
    } else {
      return Promise.resolve("Please input valid", pokemonList);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPokemonList,
  getMyPokemonList,
  getPokemonDetail,
  catchPokemon,
  releasePokemon,
  renamePokemon,
};
