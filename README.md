# URL Shortener API

A simple API to shorten URLs, track usage stats, and provide link expiration or custom aliases.

## Features
- **Shorten URLs**: Generate a shortened URL for any valid link.
- **Usage Stats**: Track the number of times a URL is accessed.
- **Link Expiration**: Set optional expiration dates for URLs.
- **Custom Aliases**: Use a custom alias for your shortened URL.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-shortener.git
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
     ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

---

## Usage

### Run the server in development mode:
```bash
npm run dev
```

### Run the server in production mode:
```bash
npm start
```

---

## API Endpoints

### 1. **Shorten URL**
- **POST /shorten**
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
    "message": "URL shortened successfully.",
    "shortUrl": "http://localhost:3000/my-custom-alias"
  }
  ```

### 2. **Redirect to Original URL**
- **GET /:shortUrl**
- Redirects to the original URL if it exists and hasn’t expired.

### 3. **Get URL Stats**
- **GET /stats/:shortUrl**
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
  npm run prisma:studio
  ```

---

## License

This project is licensed under the [MIT License](LICENSE).
```
