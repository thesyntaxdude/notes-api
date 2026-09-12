import {
  listAllNotes,
  findNoteById,
  create,
  update,
  remove,
} from "../services/notesService.js";
import AppError from "../utils/AppError.js";
import { sanitizeNoteData } from "../middleware/sanitizeNoteData.js";

export async function getAllNotes() {
  const allNotes = await listAllNotes();
  let activeNotes = [];
  allNotes.forEach((note) => {
    if (note.deleted != true) {
      activeNotes.push(note);
    }
  });
  return activeNotes;
}

export async function getNote(req) {
  const id = req.params.id;
  const note = await findNoteById(id);
  if (!note || note.deleted === true) {
    throw new AppError(`Note with id "${id}" not found.`, 404);
  }
  return note;
}

export function createNote(req) {
  if (!req.body) {
    throw new AppError("You need to add the note details!", 400);
  }
  if (!req.body.title || !req.body.content) {
    throw new AppError("All fields are required.");
  }
  const noteData = sanitizeNoteData(req.body.title, req.body.content);
  const note = create(noteData.title, noteData.content);
  return note;
}

export async function updateNote(req) {
  if (!req.body) {
    throw new AppError("You need to add the note details!", 400);
  }
  const id = req.params.id;
  const updatedNote = {
    title: req.body.title ? req.body.title.toUpperCase().trim() : "",
    content: req.body.content ? req.body.content.trim() : "",
  };
  const note = await update(id, updatedNote);
  return note;
}

export function deleteNote(req) {
  const id = req.params.id;
  remove(id);
  return `note deleted successfully`;
}
