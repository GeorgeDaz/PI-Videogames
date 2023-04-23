const { createVideogameDB } = require("../controllers/videogamesControllers");

const postVideoGame = async (req, res) => {
  const {
    id,
    name,
    description,
    platforms,
    image,
    releaseDate,
    rating,
    genres,
  } = req.body;
  try {
    const response = await createVideogameDB(
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
      genres
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postVideoGame };
