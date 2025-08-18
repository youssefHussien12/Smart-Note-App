import { Router } from "express";
import { isAuthenticated } from "../auth/auth.controller.js";
import { createNote, deleteNote, getAllNotes } from "./note.controller.js";
import { catchError } from "../../middleware/catchError.js";

const noteRouter = Router();

noteRouter.route("/notes").get(isAuthenticated, catchError(getAllNotes)).post(isAuthenticated, catchError(createNote))
noteRouter.delete("/notes/:id", isAuthenticated, catchError(deleteNote));

export default noteRouter;