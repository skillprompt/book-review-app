# **Book Review App - Backend**

This is the backend server for the **Book Review App**, built with **Node.js, Express, and MongoDB**. It handles user authentication, book management, and review submissions. This guide provides setup instructions and documents the available API routes.

---

## **API Documentation**

### **Authentication Routes**

1. **POST** `/api/auth/register`:

   - Register a new user.
   - **Request Body:**
     ```json
     {
       "username": "john_doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "User registered successfully",
       "user": { "id": "user_id", "username": "john_doe" }
     }
     ```

2. **POST** `/api/auth/login`:

   - Log in a user and receive a JWT token.
   - **Request Body:**
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "token": "your-jwt-token"
     }
     ```

3. **POST** `/api/auth/logout`:

   - Log out a user.
   - **Response:**
     ```json
     { "message": "User logged out successfully" }
     ```

4. **GET** `/api/auth/me`:
   - Get information about the currently logged-in user.
   - **Response:**
     ```json
     {
       "user": {
         "id": "user_id",
         "username": "john_doe",
         "email": "john@example.com"
       }
     }
     ```

---

### **Book Routes**

1. **GET** `/api/books`:

   - Retrieve a list of all books.
   - **Response:**
     ```json
     [
       { "id": "book1", "title": "Book Title 1", "author": "Author Name" },
       { "id": "book2", "title": "Book Title 2", "author": "Another Author" }
     ]
     ```

2. **GET** `/api/books/:id`:

   - Retrieve detailed information about a specific book, including reviews.
   - **Response:**
     ```json
     {
       "id": "book1",
       "title": "Book Title",
       "author": "Author Name",
       "description": "Detailed description",
       "reviews": [
         { "user": "john_doe", "rating": 5, "reviewText": "Great book!" }
       ]
     }
     ```

3. **POST** `/api/books`:

   - Add a new book (requires admin authorization).
   - **Request Body:**
     ```json
     {
       "title": "New Book Title",
       "author": "Author Name",
       "genre": "Fiction",
       "description": "This is a new book."
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Book added successfully",
       "book": { "id": "new_book_id", "title": "New Book Title" }
     }
     ```

4. **PUT** `/api/books/:id`:

   - Update the details of an existing book.
   - **Request Body:**
     ```json
     {
       "title": "Updated Book Title",
       "description": "Updated description."
     }
     ```
   - **Response:**
     ```json
     { "message": "Book updated successfully" }
     ```

5. **DELETE** `/api/books/:id`:
   - Delete a book (requires admin authorization).
   - **Response:**
     ```json
     { "message": "Book deleted successfully" }
     ```

---

### **Review Routes**

1. **POST** `/api/reviews`:

   - Submit a review for a specific book.
   - **Request Body:**
     ```json
     {
       "bookId": "book1",
       "rating": 5,
       "reviewText": "Loved this book!"
     }
     ```
   - **Response:**
     ```json
     { "message": "Review added successfully" }
     ```

2. **PUT** `/api/reviews/:id`:

   - Update an existing review (only by the author).
   - **Request Body:**
     ```json
     {
       "rating": 4,
       "reviewText": "Updated review text."
     }
     ```
   - **Response:**
     ```json
     { "message": "Review updated successfully" }
     ```

3. **DELETE** `/api/reviews/:id`:
   - Delete a review (only by the author or an admin).
   - **Response:**
     ```json
     { "message": "Review deleted successfully" }
     ```

---
