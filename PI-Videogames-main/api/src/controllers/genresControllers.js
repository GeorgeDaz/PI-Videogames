const { Genre } = require("../db");

const getAllGenres = async () => {
  const dbGenres = await Genre.findAll();
  return dbGenres;
};

module.exports = { getAllGenres };
