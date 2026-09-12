import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";
import notesRoute from "./routes/notesRoute.js";

const app = express();
app.use(express.json());
app.use("/notes", notesRoute);
app.use((req, res) => {
  throw new AppError("this endpoint doesn't exist", 404);
});
app.use(errorHandler);
export default app;
