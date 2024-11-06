import { APIError } from "src/utils/error";
import {
  TAddReviewControllerInput,
  TReviewCtx,
  TUpdateReviewControllerInput,
} from "./validation";
import { ReviewModel } from "./model";

export async function createReviewService(
  context: TReviewCtx,
  input: TAddReviewControllerInput
) {
  const { rating, reviewText } = input;

  const newReview = new ReviewModel({
    bookId: context.bookId,
    userId: context.userId,
    rating,
    reviewText,
  });

  await newReview.save();

  return newReview;
}

export async function updateReviewService(
  reviewId: string,
  input: TUpdateReviewControllerInput
) {
  const review = await ReviewModel.findById(reviewId);
  if (!review) {
    throw APIError.notFound("Review not found");
  }

  const { reviewText, rating } = input;

  review.reviewText = reviewText;
  review.rating = rating;

  await review.save();

  return review;
}

export async function deleteReviewService(id: string) {
  const review = await ReviewModel.findByIdAndDelete(id);
  if (!review) {
    throw APIError.notFound("Review not found");
  }

  await ReviewModel.deleteOne({ _id: id });

  return review;
}

export async function getReviewsByBookIdService(bookId: string) {
  const reviews = await ReviewModel.find({
    bookId,
  });
  return reviews;
}
