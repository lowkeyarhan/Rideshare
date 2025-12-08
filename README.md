# Rideshare Platform

A full-stack ride-hailing platform built with Spring Boot (MongoDB, JWT security) and Next.js/TypeScript. Users can register as passengers or drivers, request rides, accept ride requests, and complete trips with real-time status tracking.

## How It Works

### User Flow

1. **Registration & Authentication**

   - Users register with username, password, name, and role (ROLE_USER for passengers, ROLE_DRIVER for drivers)
   - JWT tokens are issued upon login and stored in browser localStorage
   - Tokens are automatically attached to all API requests via Axios interceptors

2. **Passenger Journey**

   - Passengers log in and access their dashboard
   - Create ride requests by specifying pickup and drop locations
   - View all their ride history with status tracking (REQUESTED → ACCEPTED → COMPLETED)
   - Monitor ride status updates in real-time

3. **Driver Journey**
   - Drivers log in and access their dedicated dashboard
   - View available ride requests (REQUESTED status)
   - Accept rides, which updates status to ACCEPTED and assigns the driver
   - View active rides currently in progress
   - Complete rides to finalize the trip (COMPLETED status)
   - Track earnings, completed rides, and ride history

### Architecture Overview

- **Backend**: Spring Boot 4.0.0, Java 25, MongoDB Atlas with JWT-based stateless authentication
- **Frontend**: Next.js 16.0.7 (Turbopack), React 19, TypeScript 5, Tailwind CSS
- **Security**: JWT tokens with Bearer authentication, auto-logout on 401/403, BCrypt password hashing
- **Database**: MongoDB Atlas with collections for Users and Rides
- **State Management**: React hooks with protected routes and role-based access control

Configure the Axios base URL in `client/src/libs/apiClient.ts` (defaults to `http://localhost:8080`).

## API Reference

> All authenticated routes require `Authorization: Bearer <jwt>`.

### Auth

| Method | Route                | Description                                      |
| ------ | -------------------- | ------------------------------------------------ |
| `POST` | `/api/auth/register` | Register a passenger or driver and receive a JWT |
| `POST` | `/api/auth/login`    | Authenticate existing users                      |

#### Register

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Alex Rider",
  "username": "alex",
  "password": "pass1234",
  "role": "ROLE_USER"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "username": "alex",
  "password": "pass1234"
}
```

Successful responses share this shape:

```json
{
  "token": "<jwt>",
  "id": "67682be3a76f0f6f0ad3b0e2",
  "name": "Alex Rider",
  "username": "alex",
  "role": "ROLE_USER"
}
```

### Ride Management

| Method | Route                                  | Auth Required | Description                                        |
| ------ | -------------------------------------- | ------------- | -------------------------------------------------- |
| `POST` | `/api/v1/rides`                        | ✅ Passenger  | Create a new ride request                          |
| `GET`  | `/api/v1/user/rides`                   | ✅ Passenger  | View all rides requested by the passenger          |
| `GET`  | `/api/v1/driver/rides`                 | ✅ Driver     | View all rides assigned to the driver              |
| `GET`  | `/api/v1/driver/rides/requests`        | ✅ Driver     | View available ride requests (REQUESTED)           |
| `POST` | `/api/v1/driver/rides/{rideId}/accept` | ✅ Driver     | Accept a ride request (changes status to ACCEPTED) |
| `POST` | `/api/v1/rides/{rideId}/complete`      | ✅ Driver     | Complete a ride (changes status to COMPLETED)      |

#### Sample Requests

Create ride (passenger token):

```http
POST /api/v1/rides
Authorization: Bearer <passenger-jwt>
Content-Type: application/json
```

```json
{
  "pickupLocation": "Times Square",
  "dropLocation": "JFK Airport"
}
```

Accept ride (driver token):

```http
POST /api/v1/driver/rides/64f0e0c61427ba0c3bfb7371/accept
Authorization: Bearer <driver-jwt>
```

Complete ride (driver token):

```http
POST /api/v1/rides/64f0e0c61427ba0c3bfb7371/complete
Authorization: Bearer <driver-jwt>
```

### Sample Test Data

#### 1. Register Test Users

**Passenger Account:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Passenger",
    "username": "priya",
    "password": "passenger123",
    "role": "ROLE_USER"
  }'
```

**Driver Account:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dev Driver",
    "username": "devdriver",
    "password": "driver123",
    "role": "ROLE_DRIVER"
  }'
```

#### 2. Login and Get Tokens

**Passenger Login:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "priya",
    "password": "passenger123"
  }'
```

**Driver Login:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "devdriver",
    "password": "driver123"
  }'
```

Save the returned `token` from each response.

#### 3. Create Ride Requests (Passenger)

```bash
# Replace <PASSENGER_TOKEN> with actual token
curl -X POST http://localhost:8080/api/v1/rides \
  -H "Authorization: Bearer <PASSENGER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": "Bangalore Palace",
    "dropLocation": "Kempegowda Airport"
  }'
```

**More Sample Rides:**

```json
{
  "pickupLocation": "MG Road Metro",
  "dropLocation": "Electronic City"
}

{
  "pickupLocation": "Indiranagar",
  "dropLocation": "Whitefield"
}

{
  "pickupLocation": "Koramangala 5th Block",
  "dropLocation": "HSR Layout"
}
```

#### 4. View Available Rides (Driver)

```bash
# Replace <DRIVER_TOKEN> with actual token
curl -X GET http://localhost:8080/api/v1/driver/rides/requests \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

#### 5. Accept a Ride (Driver)

```bash
# Replace <RIDE_ID> with actual ride ID from step 4
curl -X POST http://localhost:8080/api/v1/driver/rides/<RIDE_ID>/accept \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

#### 6. View Driver's Active Rides

```bash
curl -X GET http://localhost:8080/api/v1/driver/rides \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

#### 7. Complete a Ride (Driver)

```bash
# Replace <RIDE_ID> with actual ride ID
curl -X POST http://localhost:8080/api/v1/rides/<RIDE_ID>/complete \
  -H "Authorization: Bearer <DRIVER_TOKEN>"
```

#### 8. View Passenger Ride History

```bash
curl -X GET http://localhost:8080/api/v1/user/rides \
  -H "Authorization: Bearer <PASSENGER_TOKEN>"
```

## Complete Testing Flow

1. **Register** passenger and driver accounts
2. **Login** both users to get JWT tokens
3. Passenger **creates** 2-3 ride requests
4. Driver **views available rides** (should see REQUESTED rides)
5. Driver **accepts** one or more rides (status changes to ACCEPTED)
6. Driver **views active rides** (should see ACCEPTED rides)
7. Driver **completes** rides (status changes to COMPLETED)
8. Passenger **views ride history** (should see all rides with updated statuses)

Refer to `POSTMAN_TESTING_GUIDE.md` for additional testing flows and Postman collection setup.

## Backend File Structure

```
server/src/main/java/com/rideshare/backend/
├── RideshareBackendApplication.java    # Spring Boot main application
├── config/
│   ├── SecurityConfig.java             # Security configuration, CORS, endpoint access rules
│   ├── JwtAuthenticationFilter.java    # JWT token validation filter
│   └── JwtUtil.java                    # JWT token generation and parsing utilities
├── controllers/
│   ├── AuthController.java             # /api/auth/* - Registration and login endpoints
│   └── RideController.java             # /api/v1/* - Ride management endpoints
├── service/
│   ├── AuthService.java                # User registration and authentication logic
│   ├── RideService.java                # Ride creation, acceptance, completion logic
│   ├── UserService.java                # User data retrieval and management
│   └── CustomUserDetailsService.java   # Spring Security user details implementation
├── repository/
│   ├── UserRepository.java             # MongoDB queries for User collection
│   └── RideRepository.java             # MongoDB queries for Ride collection
├── dto/
│   ├── UserRegisterRequest.java        # Registration request payload
│   ├── UserLoginRequest.java           # Login request payload
│   ├── RideRequest.java                # Ride creation request payload
│   └── RideResponse.java               # Ride response payload
├── mapper/
│   ├── UserMapper.java                 # User entity ↔ DTO conversions
│   └── RideMapper.java                 # Ride entity ↔ DTO conversions
├── model/
│   ├── User.java                       # User entity (MongoDB document)
│   ├── Ride.java                       # Ride entity (MongoDB document)
│   └── enums/
│       ├── Role.java                   # ROLE_USER, ROLE_DRIVER
│       └── Status.java                 # REQUESTED, ACCEPTED, COMPLETED
└── exception/
    ├── GlobalExceptionHandler.java     # Centralized exception handling
    ├── BadRequestException.java        # 400 errors
    ├── NotFoundException.java          # 404 errors
    └── UnauthorizedException.java      # 401 errors

server/src/main/resources/
└── application.yml                     # MongoDB URI, JWT secret, server port
```

## Frontend File Structure

```
client/
├── app/
│   ├── layout.tsx                      # Root layout with metadata
│   ├── page.tsx                        # Landing page
│   ├── auth/
│   │   └── page.tsx                    # Login/Registration page
│   ├── dashboard/
│   │   ├── passenger/
│   │   │   └── page.tsx                # Passenger dashboard (request/view rides)
│   │   └── driver/
│   │       └── page.tsx                # Driver dashboard (accept/complete rides)
│   └── profile/
│       └── page.tsx                    # User profile page
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.tsx          # Route guard for authenticated users
│   │   ├── sidebarP.tsx                # Passenger sidebar navigation
│   │   └── sidebarD.tsx                # Driver sidebar navigation
│   └── libs/
│       ├── apiClient.ts                # Axios instance with JWT interceptors
│       ├── auth.ts                     # Auth helpers (login, logout, role check)
│       ├── authApi.ts                  # Auth API calls (register, login)
│       ├── userDashboardApi.ts         # Passenger API calls
│       ├── driverDashboardApi.ts       # Driver API calls
│       ├── profileApi.ts               # Profile API calls
│       └── types.ts                    # TypeScript types (User, Ride, Role, Status)
└── package.json
```

## Key Features

### Backend

- ✅ JWT-based authentication with BCrypt password hashing
- ✅ Role-based access control (ROLE_USER, ROLE_DRIVER)
- ✅ RESTful API with clean separation of concerns (Controller → Service → Repository)
- ✅ MongoDB Atlas integration with domain-driven design
- ✅ Global exception handling with custom error responses
- ✅ Auto-extraction of userId/driverId from JWT tokens
- ✅ CORS configuration for frontend integration

### Frontend

- ✅ Server-side rendering with Next.js App Router
- ✅ Protected routes with role-based access control
- ✅ Automatic JWT token management with Axios interceptors
- ✅ Auto-logout on 401/403 errors
- ✅ Real-time ride status updates
- ✅ Responsive design with Tailwind CSS
- ✅ Separate dashboards for passengers and drivers
- ✅ Material Symbols icons for modern UI
