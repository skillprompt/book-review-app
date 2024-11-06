import { Router } from "express";
import {
  addBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
  updateBookController,
} from "./controller";

function createBookRouter() {
  const router = Router();
  router.post("/", addBookController);
  router.post("/:bookId", updateBookController);
  router.delete("/:bookId", deleteBookController);

  router.get("/", getBooksController);
  router.get("/:bookId", getBookByIdController);

  return router;
}

export const bookRouter = createBookRouter();
