const { getByName } = require("../controllers/videogamesControllers");

const getVideoGameByName = async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      const response = await getByName(name);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    next();
  }
};

module.exports = { getVideoGameByName };
