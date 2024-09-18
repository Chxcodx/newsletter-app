# Newsletter App

## Overview

This project is a lightweight version of a typical newsletters application. It includes features for managing users, organizations, subscribers, email lists, campaigns, and integration with RSS feeds. The app is built using NestJS and PostgreSQL.

## Features

- **User Management**

  - Register new users
  - User login and JWT generation
  - Fetch user details

- **Organization Management**

  - Create new organizations
  - List all organizations (admin only)

- **Subscriber Management**

  - Add new subscribers
  - List subscribers with pagination and filtering
  - Update subscriber information

- **List Management**

  - Create, list, and update email lists

- **Campaign Management**

  - Create and list campaigns
  - Send campaigns

- **GPG Encryption**

  - Upload GPG public keys for encryption

- **RSS Feed Integration** (Optional)

  - Fetch and generate campaigns from RSS feeds

- **Automation** (Optional)
  - Define triggers and background jobs for automation tasks

## Technologies Used

- NestJS
- TypeORM
- PostgreSQL
- bcrypt for password hashing
- @nestjs/jwt for JSON Web Tokens
- RSS Parser for RSS feed integration
- @nestjs/schedule for scheduled tasks

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Chxcodx/newsletter-app.git
   cd newsletter-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Database Configuration**

   The project uses direct database configuration in `app.module.ts`. Update the `TypeOrmModule.forRoot` configuration in `src/app.module.ts` with your database credentials.

4. **Start the Application**

   ```bash
   npm run start:dev
   ```

## API Endpoints

- **User Management**

  - `POST /api/users/register`
  - `POST /api/users/login`
  - `GET /api/users/:id`

- **Organization Management**

  - `POST /api/organizations`
  - `GET /api/organizations`

- **Subscriber Management**

  - `POST /api/subscribers`
  - `GET /api/subscribers`
  - `PUT /api/subscribers/:id`

- **List Management**

  - `POST /api/lists`
  - `GET /api/lists`
  - `PUT /api/lists/:id`

- **Campaign Management**

  - `POST /api/campaigns`
  - `GET /api/campaigns`
  - `POST /api/campaigns/:id/send`

- **GPG Encryption**

  - `POST /api/gpg/upload`

- **RSS Feed Integration**

  - (Not implemented due to missing RSS feed URL and SMTP server)

- **Automation**
  - (Not implemented due to lack of SMTP server)

## Testing

1. **Manual Testing**
   - Use tools like Postman or curl to test the API endpoints.

## Known Issues

- RSS Feed Integration and Automation features are not fully implemented due to missing external dependencies (RSS feed URL and SMTP server).

## Contribution

Feel free to fork the repository, make changes, and create a pull request. For any issues or feature requests, please open an issue on GitHub.

---

Feel free to modify this template as needed!
