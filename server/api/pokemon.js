const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const PokemonHelper = require("../helpers/pokemonHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/pokemon.js";

const list = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.query);

    const { name } = request.query;
    const response = await PokemonHelper.getPokemonList({ name });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const mylist = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.query);

    const { name } = request.query;
    const response = await PokemonHelper.getMyPokemonList({ name });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const detail = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.params);

    const { pokemonName } = request.params;
    const response = await PokemonHelper.getPokemonDetail({ pokemonName });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "detail", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const catchPokemon = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.params);

    const { pokemonName } = request.params;
    const response = await PokemonHelper.catchPokemon({ pokemonName });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "catch", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const releasePokemon = async (request, reply) => {
  try {
    Validation.releaseValidation(request.params);

    const { id } = request.params;
    const response = await PokemonHelper.releasePokemon({ id });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "release", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const renamePokemon = async (request, reply) => {
  try {
    Validation.renameValidation(request.body);

    const { id, nickname } = request.body;
    const response = await PokemonHelper.renamePokemon({ id, nickname });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "rename", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/list", list);
Router.get("/mylist", mylist);
Router.get("/detail/:pokemonName", detail);
Router.get("/catch/:pokemonName", catchPokemon);
Router.delete("/release/:id", releasePokemon);
Router.patch("/rename", renamePokemon);

module.exports = Router;
