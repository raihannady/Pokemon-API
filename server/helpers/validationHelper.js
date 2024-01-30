const Joi = require("joi");
const Boom = require("boom");

const pokemonListValidation = (data) => {
  const schema = Joi.object({
    pokemonName: Joi.string().optional().description("Pokemon name"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
const releaseValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().optional().description("Pokemon ID"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const renameValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().optional().description("Pokemon ID"),
    nickname: Joi.string().optional().description("Pokemon Nickname"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
const catchValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().optional().description("Pokemon ID"),
    nickname: Joi.string().optional().description("Pokemon Nickname"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  pokemonListValidation,
  releaseValidation,
  renameValidation,
  catchValidation,
};
