const { Router } = require("express");
const { getGenres } = require("../handlers/getGenres");
const genresListMiddleware = require("../middlewares/genresList.Middleware");

const router = Router();

router.get("/", genresListMiddleware, getGenres);

module.exports = router;
