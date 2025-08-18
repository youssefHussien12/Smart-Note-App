// controllers/note.controller.js

import { Note } from "../../../db/models/note.model.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/AppError.js";


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
const getAllNotes = async (req, res ,next) => {
    let apiFeatures = new ApiFeatures(Note.find(), req.query)
        .pagination().filter().sort().fields().search()
    let notes = await apiFeatures.mongooseQuery   
    res.status(200).json({ message: "success",page:apiFeatures.pageNumber, notes });
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
export {
    createNote,
    getAllNotes,
    deleteNote
}