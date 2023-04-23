const { getAllGames } = require("../controllers/videogamesControllers");

const getVideoGames = async (req, res) => {
  try {
    const response = await getAllGames();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getVideoGames };
