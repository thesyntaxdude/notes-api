import AppError from "../utils/AppError.js";

export default function bodyValidator(req) {
  if (!req.body) {
    throw new AppError("You need to add the note details!", 400);
  }
  if (!req.body.title || !req.body.content) {
    throw new AppError("All fields are required.");
  }
}
