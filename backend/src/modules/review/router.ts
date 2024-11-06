import { Router } from "express";
import {
  addReviewController,
  deleteReviewController,
  getReviewsByBookIdController,
  updateReviewController,
} from "./controller";

function createReviewRouter() {
  const router = Router();
  router.post("/", addReviewController);
  router.post("/:reviewId", updateReviewController);
  router.delete("/:reviewId", deleteReviewController);

  router.get("/:bookId", getReviewsByBookIdController);

  return router;
}

export const reviewRouter = createReviewRouter();
