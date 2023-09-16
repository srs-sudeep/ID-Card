/* eslint-env es6 */
/* eslint-disable no-console */
const Podcast = require("../models/Podcast");
const User = require("../models/User");

exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching podcasts.", error });
  }
};

// Other CRUD operations for podcasts here

exports.addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.favorites.push(req.params.id);
    await user.save();

    res.json({ message: "Podcast added to favorites.", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding podcast to favorites.", error });
  }
};

exports.removeFromFavorites = async (req, res) => {
  // Your remove from favorites logic here
};

exports.pausePodcast = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.pausedPodcast = {
      podcast: req.params.id,
      position: req.body.position,
    };
    await user.save();

    res.json({ message: "Podcast paused.", user });
  } catch (error) {
    res.status(500).json({ message: "Error pausing podcast.", error });
  }
};

exports.getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found." });
    }
    res.json(podcast);
  } catch (error) {
    res.status(500).json({ message: "Error fetching podcast.", error });
  }
};

exports.createPodcast = async (req, res) => {
  try {
    const { name, description, category, type, speaker, fileUrl } = req.body;
    const newPodcast = new Podcast({
      name,
      description,
      category,
      type,
      speaker,
      fileUrl,
    });

    await newPodcast.save();
    res.status(201).json({ message: "Podcast created.", podcast: newPodcast });
  } catch (error) {
    res.status(500).json({ message: "Error creating podcast.", error });
  }
};

exports.updatePodcast = async (req, res) => {
  try {
    const { name, description, category, type, speaker, fileUrl } = req.body;
    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      { name, description, category, type, speaker, fileUrl },
      { new: true }
    );

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found." });
    }

    res.json({ message: "Podcast updated.", podcast });
  } catch (error) {
    res.status(500).json({ message: "Error updating podcast.", error });
  }
};

exports.deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found." });
    }

    res.json({ message: "Podcast deleted.", podcast });
  } catch (error) {
    res.status(500).json({ message: "Error deleting podcast.", error });
  }
};
