import { Router } from "express";
import {
  addBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
  updateBookController,
} from "./controller";
import { checkAdmin, checkAuth } from "../auth/middleware";

function createBookRouter() {
  const router = Router();
  router.post("/", checkAuth, checkAdmin, addBookController);
  router.post("/:bookId", checkAuth, checkAdmin, updateBookController);
  router.delete("/:bookId", checkAuth, checkAdmin, deleteBookController);

  router.get("/", getBooksController);
  router.get("/:bookId", getBookByIdController);

  return router;
}

export const bookRouter = createBookRouter();
