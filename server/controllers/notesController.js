const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.create({ title, body, user: req.user._id });
    res.status(201).json({ note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Failed to create note" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, body },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Failed to update note" });
  }
};

module.exports = { fetchNotes, createNote, updateNote };
