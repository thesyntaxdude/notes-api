import AppError from "../utils/AppError.js";

export function sanitizeNoteData(title, content) {
  if (title.trim() === "" || title.trim().length < 3) {
    throw new AppError("Add a valid title", 400);
  }
  if (content.trim() === "" || content.trim().length < 3) {
    throw new AppError("Add some content", 400);
  }
  return {
    title: title.toUpperCase().trim(),
    content: content.trim(),
  };
}
