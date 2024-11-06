import { APIError } from "src/utils/error";
import { BookModel } from "./model";
import {
  TAddBookControllerInput,
  TUpdateBookControllerInput,
} from "./validation";

export async function createBookService(input: TAddBookControllerInput) {
  const { title, genre, author, description } = input;

  const book = await BookModel.findOne({ title });
  if (book) {
    throw APIError.conflict("Book already exists");
  }

  const newBook = new BookModel({
    title,
    genre,
    author,
    description,
  });

  await newBook.save();

  return newBook;
}

export async function updateBookService(input: TUpdateBookControllerInput) {
  const { id, title, genre, author, description } = input;

  const book = await BookModel.findById(id);
  if (!book) {
    throw APIError.notFound("Book not found");
  }

  book.title = title;
  book.genre = genre;
  book.author = author;
  book.description = description;

  await book.save();

  return book;
}

export async function deleteBookService(id: string) {
  const book = await BookModel.findByIdAndDelete(id);
  if (!book) {
    throw APIError.notFound("Book not found");
  }

  await BookModel.deleteOne({ _id: id });

  return book;
}

export async function getBooksService() {
  const books = await BookModel.find();
  return books;
}

export async function getBookByIdService(id: string) {
  const book = await BookModel.findById(id);
  if (!book) {
    throw APIError.notFound("Book not found");
  }

  return book;
}
