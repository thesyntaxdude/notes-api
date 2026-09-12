import express from "express";
import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    res.json(await getAllNotes());
  })
  .post((req, res) => {
    res.status(201).json(createNote(req));
  });

router
  .route("/:id")
  .get(async (req, res) => {
    res.json(await getNote(req));
  })
  .put(async (req, res) => {
    res.json(await updateNote(req));
  })
  .delete((req, res) => {
    res.json(deleteNote(req));
  });

export default router;
