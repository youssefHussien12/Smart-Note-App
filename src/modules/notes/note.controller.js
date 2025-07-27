// controllers/note.controller.js

import { Note } from "../../../db/models/note.model.js";


// POST /notes
 const createNote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;
    const note = await Note.create({
        title,
        content,
        ownerId: userId,
    });
    const createdNote = await note.save()
    res.status(201).json({ message: "Note created", createdNote });
    if (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET /notes
const getAllNotes = async (req, res) => {
    let notes = await Note.find({ user: req.user.userId })
    res.status(200).json({ message: "success", notes })
}



// DELETE /notes/:id
const deleteNote = async (req, res) => {
    const note = await Note.findOneAndDelete({
        _id: req.params.id,
        ownerId: req.user._id,
    });
    if (!note)
        return res.status(404).json({ message: "Note not found or not owned by you" });

    res.status(200).json({ message: "Note deleted successfully" });
    if (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }

};
export{
    createNote,
    getAllNotes,
    deleteNote
}