const router = require("express").Router();
const {
  getAllPodcasts,
  getPodcastById,
  createPodcast,
  updatePodcast,
  deletePodcast,
  addToFavorites,
  removeFromFavorites,
  pausePodcast,
} = require("../controllers/podcasts");

router.get("/", getAllPodcasts);
router.get("/:id", getPodcastById);
router.post("/", createPodcast);
router.put("/:id", updatePodcast);
router.delete("/:id", deletePodcast);

router.post("/:id/favorite", addToFavorites);
router.delete("/:id/favorite", removeFromFavorites);

router.post("/:id/pause", pausePodcast);

module.exports = router;
