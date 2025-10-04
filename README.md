# EventEase

EventEase is a comprehensive event booking platform that allows users to discover, book, and manage events seamlessly. The platform supports both online and in-person events across various categories like Music, Tech, Business, Sports, Arts, Food, and more.

## Features

### User Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Event Discovery**: Browse and search through a wide range of events
- **Event Details**: View comprehensive event information including date, time, location, capacity, and pricing
- **Booking System**: Book seats for events with real-time availability updates
- **My Bookings**: View and manage personal bookings, including cancellation
- **Responsive Design**: Optimized for desktop and mobile devices

### Admin Features

- **Event Management**: Create, update, and delete events
- **Dashboard Analytics**: View key statistics and insights
- **Attendee Management**: Monitor event attendees and booking details
- **Real-time Updates**: Live updates for event availability and bookings

### Technical Features

- **Data Validation**: Comprehensive input validation and error handling
- **Role-based Access Control**: Separate permissions for users and admins

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Real-time**: Socket.io
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration management

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Handling**: date-fns and React Calendar
- **Linting**: ESLint

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eventease
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   ```

4. **Start MongoDB**:
   Ensure MongoDB is running on your system or update `MONGODB_URI` to point to your MongoDB instance.

5. **Run the backend server**:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the frontend directory with the following variables:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Running the Full Application

1. **Start Backend** (in one terminal):

   ```bash
   cd backend && npm run dev
   ```

2. **Start Frontend** (in another terminal):

   ```bash
   cd frontend && npm run dev
   ```

3. **Access the application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## API Documentation

### Swagger UI Setup

The API documentation is available via Swagger UI. To enable it:

1. Install swagger dependencies in backend:

   ```bash
   cd backend
   npm install swagger-jsdoc swagger-ui-express
   ```

2. The Swagger documentation will be available at `http://localhost:5000/api-docs`

### Postman Collection

Import the following Postman collection to test the API endpoints:

```json
{
  "info": {
    "name": "EventEase API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/auth/register",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "auth", "login"]
            }
          }
        },
        {
          "name": "Get Me",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/auth/me",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "auth", "me"]
            }
          }
        }
      ]
    },
    {
      "name": "Events",
      "item": [
        {
          "name": "Get All Events",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/api/events",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "events"]
            }
          }
        },
        {
          "name": "Get Event by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/api/events/:id",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "events", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "event_id_here"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Bookings",
      "item": [
        {
          "name": "Create Booking",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"eventId\": \"event_id_here\",\n  \"seats\": 1\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/bookings",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "bookings"]
            }
          }
        },
        {
          "name": "Get My Bookings",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/bookings/my-bookings",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "bookings", "my-bookings"]
            }
          }
        },
        {
          "name": "Cancel Booking",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/bookings/:id",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "bookings", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "booking_id_here"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Create Event",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Sample Event\",\n  \"description\": \"Event description\",\n  \"category\": \"Tech\",\n  \"location\": {\n    \"type\": \"Online\"\n  },\n  \"date\": \"2024-12-31\",\n  \"time\": \"10:00\",\n  \"capacity\": 100,\n  \"price\": 50\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/admin/events",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "events"]
            }
          }
        },
        {
          "name": "Update Event",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Event Title\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/admin/events/:id",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "events", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "event_id_here"
                }
              ]
            }
          }
        },
        {
          "name": "Delete Event",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/admin/events/:id",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "events", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "event_id_here"
                }
              ]
            }
          }
        },
        {
          "name": "Get Event Attendees",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/admin/events/:id/attendees",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "events", ":id", "attendees"],
              "variable": [
                {
                  "key": "id",
                  "value": "event_id_here"
                }
              ]
            }
          }
        },
        {
          "name": "Get Dashboard Stats",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer YOUR_JWT_TOKEN"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/admin/dashboard",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "dashboard"]
            }
          }
        }
      ]
    }
  ]
}
```

## Project Structure

```
EventEase/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
