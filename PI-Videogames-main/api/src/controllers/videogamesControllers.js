const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_URL, API_KEY } = process.env;
const { Op } = require("sequelize");

const createVideogameDB = async (
  name,
  description,
  platforms,
  image,
  releaseDate,
  rating,
  genres
) => {
  return await Videogame.create({
    name,
    description,
    platforms,
    image,
    releaseDate,
    rating,
    genres,
  });
};

const getById = async (id, source) => {
  if (source === "api") {
    const result = (await axios.get(`${API_URL}/games/${id}?key=${API_KEY}`))
      .data;
    return {
      id: result.id,
      name: result.name,
      image: result.background_image,
      description: result.description,
      release: result.released,
      rating: Math.floor(result.rating),
      platforms: result.platforms.map((p) => p.platform.name).join(", "),
      genres: result.genres.map((g) => {
        return { name: g.name };
      }),
    };
  } else {
    const result = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return result;
  }
};

const getByName = async (name) => {
  const foundDbVGames = await Videogame.findAll({
    attributes: ["id", "image", "name"],
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  const axiosResponse = await axios.get(
    `${API_URL}/games?key=${API_KEY}&search=${name}`
  );
  const foundApiVGames = axiosResponse.data.results.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      image: vg.background_image,
      genres: vg.genres.map((g) => {
        return { name: g.name };
      }),
    };
  });

  const foundVGames = [...foundDbVGames, ...foundApiVGames].slice(0, 15);
  return foundVGames;
};

const getAllGames = async (req, res) => {
  const dbVGames = await Videogame.findAll({
    attributes: ["id", "name", "image", "rating"],
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const urls = [];
  for (let i = 1; i <= 5; i++) {
    urls.push(axios.get(`${API_URL}/games?key=${API_KEY}&page=${i}`));
  }
  const axiosAllResponses = await Promise.all(urls);
  const apiVGames = axiosAllResponses
    .map((r) => r.data.results)
    .flat()
    .map((vg) => {
      return {
        id: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => {
          return { name: g.name };
        }),
      };
    });
  const allGames = [...dbVGames, ...apiVGames].slice(0, 100);
  console.log(allGames.length);

  return allGames;
};
module.exports = { createVideogameDB, getById, getByName, getAllGames };
