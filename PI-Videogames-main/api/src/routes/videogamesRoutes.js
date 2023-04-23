const { Router } = require("express");
const { getVideoGames } = require("../handlers/getVideoGames");
const { getVideoGameById } = require("../handlers/getVideoGameById");
const { getVideoGameByName } = require("../handlers/getVideoGameByName");
const { postVideoGame } = require("../handlers/postVideoGame");
const genresListMiddleware = require("../middlewares/genresList.Middleware");
const postValidationMiddlware = require("../middlewares/postValidation.Middleware");

const router = Router();

router.get("/", genresListMiddleware, getVideoGameByName, getVideoGames);
//router.get("/search/", getVideoGameByName);
router.get("/:id", genresListMiddleware, getVideoGameById);
router.post("/", genresListMiddleware, postValidationMiddlware, postVideoGame);

module.exports = router;
