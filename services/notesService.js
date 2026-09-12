import { v4 as uuidv4 } from "uuid";
import AppError from "../utils/AppError.js";

const notes = [
  {
    id: "1acd600f-3824-470b-9fcb-5d364d1561ba",
    title: "test note 1",
    content: "Test content 101",
  },
  {
    id: "d12bfb35-fd51-4dfa-9865-301d6168d78c",
    title: "test note 2",
    content: "Test content 101",
  },
  {
    id: "470b-9fcb-4dfa-9865-301d6168d78c",
    title: "test note 3",
    content: "Test content 101",
  },
  {
    id: "3acd600f-3824-470b-9fcb-5d364d1561be",
    title: "deleted note",
    content: "Test content 101",
  },
];

export function listAllNotes() {
  return new Promise((resolve, reject) => {
    resolve(notes);
  });
}

export function findNoteById(id) {
  return new Promise((resolve, reject) => {
    const note = notes.find((item) => item.id === id);
    if (note) {
      resolve(note);
    } else {
      reject(new AppError("note not found", 404));
    }
  });
}

export function create(title, content) {
  const note = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(note);
  return note;
}

export function update(id, updatedNote) {
  return new Promise(async (resolve, reject) => {
    const note = await findNoteById(id);
    if (note) {
      const index = notes.findIndex((item) => item.id === id);
      notes.splice(index, 1, {
        id: note.id,
        title: updatedNote.title || note.title,
        content: updatedNote.content || note.content,
        createdAt: note.createdAt,
      });
      resolve(notes[index]);
    } else {
      reject(new AppError("Note not found", 404));
    }
  });
}

export async function remove(id) {
  const note = findNoteById(id);
  const index = notes.indexOf(note);
  if (note) {
    note.deleted = true;
    notes.splice(index, 1, note);
  } else {
    throw new AppError("note not found", 404);
  }
}
