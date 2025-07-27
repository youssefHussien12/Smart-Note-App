import { Router } from "express";
import { isAuthenticated } from "../auth/auth.controller.js";
import { createNote, deleteNote, getAllNotes } from "./note.controller.js";

const noteRouter = Router();

noteRouter.route("/notes").get(isAuthenticated,getAllNotes).post(isAuthenticated,createNote)
noteRouter.delete("/notes/:id", isAuthenticated,deleteNote);

export default noteRouter;