Here's a draft for the `README.md` file that summarizes what was done and what was not included in the assignment:

---

# Newsletter App

## Overview

This project is a backend application for a Newsletter Management System. It includes features for managing users, organizations, subscribers, lists, campaigns, GPG encryption, RSS feeds, and automation. Built with NestJS and TypeORM, it uses PostgreSQL as the database.

## Features Implemented

1. **User Management**

   - **POST /api/users/register**: Register a new user.
   - **POST /api/users/login**: User login and JWT generation.
   - **GET /api/users/:id**: Get user details.

2. **Organization Management**

   - **POST /api/organizations**: Create a new organization.
   - **GET /api/organizations**: List all organizations (admin only).

3. **Subscriber Management**

   - **POST /api/subscribers**: Add a new subscriber.
   - **GET /api/subscribers**: List subscribers with pagination and filtering.
   - **PUT /api/subscribers/:id**: Update subscriber information.

4. **List Management**

   - **POST /api/lists**: Create a new list.
   - **GET /api/lists**: List all lists for the organization.
   - **PUT /api/lists/:id**: Update list details.

5. **Campaign Management**

   - **POST /api/campaigns**: Create a new campaign.
   - **GET /api/campaigns**: List all campaigns for the organization.
   - **POST /api/campaigns/:id/send**: Send a campaign.

6. **GPG Encryption**

   - **POST /api/gpg/upload**: Upload GPG public key for a subscriber.

7. **RSS Feeds**

   - **Automatic fetching and campaign generation**: Parses RSS feeds from organizations and creates campaigns based on feed items.

8. **Automation (Optional)**
   - **Automation Triggers**: Not fully implemented due to lack of SMTP and RSS URL setup.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Chxcodx/newsletter-app.git
   cd newsletter-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=123
   DB_DATABASE=newsletter_app
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**

   ```bash
   npm run start
   ```

5. **Run database migrations:**
   ```bash
   npm run typeorm:migrate
   ```

## Testing

To test the APIs, use tools like Postman or cURL to interact with the endpoints. Ensure that your PostgreSQL database is running and the environment variables are correctly set up.

### Example API Calls

- **Register a new user:**

  ```http
  POST http://localhost:3000/api/users/register
  ```

  Request body:

  ```json
  {
    "email": "testuser@test.com",
    "password": "password123",
    "role": "User",
    "organization_id": "valid-organization-id"
  }
  ```

- **List subscribers:**
  ```http
  GET http://localhost:3000/api/subscribers
  ```

## Issues and Known Limitations

1. **SMTP Integration:** Automation features relying on SMTP are not implemented due to the lack of SMTP configuration.
2. **RSS Feed URL Configuration:** Requires valid RSS feed URLs to test RSS-related features.

## Future Improvements

1. **SMTP Integration:** Set up and configure SMTP for email sending capabilities.
2. **Enhanced Error Handling:** Implement more detailed error handling and logging mechanisms.
3. **Automated Testing:** Add unit and integration tests for better test coverage.

---
