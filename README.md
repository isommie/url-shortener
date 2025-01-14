# URL Shortener API

A simple API to shorten URLs, track usage stats, and provide link expiration or custom aliases.

## Features
- **Shorten URLs**: Generate a shortened URL for any valid link.
- **Usage Stats**: Track the number of times a URL is accessed.
- **Link Expiration**: Set optional expiration dates for URLs.
- **Custom Aliases**: Use a custom alias for your shortened URL.

---


## Screenshots
![Screenshot 1](shorten.png)
This is a screenshot of the shorten url api.

![Screenshot 1](redirect.png)
This is a screenshot of the redirect url api.

![Screenshot 2](cleanup.png)
This is a screenshot of the cleanup url api.

![Screenshot 3](prisma.png)
This is a screenshot of the prisma postgres database.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/isommie/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root with the following variables:
     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/url_shortener
     PORT=3000
     NODE_ENV=development
     ```

4. Initialize the database using Prisma:
   ```bash
   npx prisma migrate dev
   ```

   - Run the Prisma Studio to explore your database visually:
     ```bash
     npx prisma studio
     ```

---

## Running the Backend Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Start the server in production mode:
   ```bash
   npm start
   ```

3. Access the Swagger API Documentation at:
   ```
   http://localhost:3000/api/docs
   ```

---

## API Endpoints

### 1. **Shorten URL**
- **POST /api/url/shorten**
- **Request Body**:
  ```json
  {
    "originalUrl": "https://example.com",
    "customAlias": "my-custom-alias",
    "expiresAt": "2025-12-31T23:59:59Z"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Shortened URL created successfully.",
    "shortUrl": "http://localhost:3000/my-custom-alias"
  }
  ```

### 2. **Redirect to Original URL**
- **GET /:shortUrl**
- Redirects to the original URL if it exists and hasn’t expired.

### 3. **Get URL Stats**
- **GET /api/url/stats/:shortUrl**
- **Response**:
  ```json
  {
    "originalUrl": "https://example.com",
    "shortUrl": "my-custom-alias",
    "clickCount": 10,
    "createdAt": "2025-01-10T12:00:00Z",
    "expiresAt": "2025-12-31T23:59:59Z"
  }
  ```

### 4. **Delete Expired URLs**
- **DELETE /api/url/cleanup**
- **Response**:
  ```json
  {
    "message": "Expired URLs cleaned up successfully.",
    "deletedCount": 5
  }
  ```

---

## Database Schema and API Visuals

### Database Schema
![Database Schema](./assets/database-schema.png)

### API Workflow
![API Workflow](./assets/api-workflow.png)

- Use the `/assets` folder in the repository to store these images.

---

## Development Tools

- **Linting**:
  ```bash
  npm run lint
  ```
- **Formatting**:
  ```bash
  npm run format
  ```

- **Prisma Studio** (Database Explorer):
  ```bash
  npx prisma studio
  ```

---

## License

This project is licensed under the [MIT License](LICENSE).

