# Rideshare Platform

## About

A full-stack ride-hailing platform built with Spring Boot (MongoDB + JWT) backend and Next.js/TypeScript frontend. Passengers request rides, drivers accept and complete them, and admins access advanced analytics and queries.

## How It Works

- **Register & Authenticate**: Users register with name, username, password, and role (`ROLE_USER` for passengers or `ROLE_DRIVER` for drivers). JWT tokens are issued on login.
- **Passenger Journey**: Create ride requests, track status transitions (REQUESTED → ACCEPTED → COMPLETED), view history with filters, search, and pagination.
- **Driver Journey**: Browse pending requests, accept rides, complete trips, track active rides, and view earnings/analytics.
- **Analytics & Admin**: Platform exposes aggregated data—rides per day, driver earnings, passenger spending, and status summaries.

## Architecture Overview

- **Backend**: Spring Boot 4.0.0, Java 25, Spring Data MongoDB, jjwt 0.11.5, BCrypt password hashing.
- **Frontend**: Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS, protected routes, Axios interceptors.
- **Persistence**: MongoDB Atlas with `users` and `rides` collections plus aggregation pipelines for analytics.
- **Security**: Stateless JWT authentication, custom filter, role-based authorization, global exception handling, CORS.

## Backend File Structure

```
server/src/main/java/com/rideshare/backend/
├── RideshareBackendApplication.java        # Spring Boot entry point
├── config/
│   ├── SecurityConfig.java                 # Security rules, CORS, filter chain
│   └── JwtFilter.java                      # Validates Bearer tokens
├── controllers/
│   ├── AuthController.java                 # /api/auth/*
│   ├── RideController.java                 # /api/v1/rides/*
│   └── AnalyticsController.java            # /api/v1/analytics/*
├── service/
│   ├── UserService.java                    # Registration + credential validation
│   ├── CustomUserDetailsService.java       # Spring Security adapter
│   ├── RideService.java                    # Ride lifecycle (create/accept/complete)
│   ├── RideQueryService.java               # Search/filter/sort/pagination
│   └── AnalyticsService.java               # Mongo aggregation pipelines
├── repository/
│   ├── UserRepository.java
│   └── RideRepository.java
├── dto/
│   ├── auth/ (UserRegisterRequest, UserLoginRequest)
│   ├── RideRequest, RideResponse, PageResponse
│   └── analytics/ (RidesPerDayResponse, DriverSummaryResponse, etc.)
├── mapper/ (UserMapper, RideMapper)
├── model/
│   ├── User.java
│   ├── Ride.java
│   └── enums/Role.java, Status.java
├── exception/ (BadRequestException, NotFoundException, GlobalExceptionHandler)
└── utils/JwtUtil.java

server/src/main/resources/application.yml
```

## API Reference

All secured routes require `Authorization: Bearer <jwt>`. Use Postman environment variables for convenience:

| Variable         | Example Value                | Purpose         |
| ---------------- | ---------------------------- | --------------- |
| `baseUrl`        | `http://localhost:8080`      | REST base URL   |
| `passengerToken` | `<JWT from passenger login>` | Passenger auth  |
| `driverToken`    | `<JWT from driver login>`    | Driver auth     |
| `userId`         | `6790c5a885fd2725fda7dd2f`   | Passenger `_id` |
| `driverId`       | `6790c5f485fd2725fda7dd31`   | Driver `_id`    |
| `rideId`         | `6790c68785fd2725fda7dd34`   | Ride `_id`      |

### API Endpoints

| Method | Route                                          | Role         | Description                        |
| ------ | ---------------------------------------------- | ------------ | ---------------------------------- |
| POST   | `/api/auth/register`                           | Public       | Register passenger or driver       |
| POST   | `/api/auth/login`                              | Public       | Login and retrieve JWT             |
| POST   | `/api/v1/rides`                                | Passenger    | Create ride request                |
| GET    | `/api/v1/rides/me`                             | Passenger    | List authenticated passenger rides |
| GET    | `/api/v1/rides/pending`                        | Driver       | View REQUESTED rides               |
| GET    | `/api/v1/rides/driver/me`                      | Driver       | View assigned driver rides         |
| POST   | `/api/v1/rides/accept/{rideId}`                | Driver       | Accept ride                        |
| POST   | `/api/v1/rides/complete/{rideId}`              | Driver       | Complete ride                      |
| GET    | `/api/v1/rides/search?text=`                   | Admin/Driver | Keyword search pickup/drop         |
| GET    | `/api/v1/rides/filter-distance?min=&max=`      | Admin        | Filter by fare/distance            |
| GET    | `/api/v1/rides/filter-date-range?start=&end=`  | Admin        | Filter by date range               |
| GET    | `/api/v1/rides/sort?order=`                    | Admin        | Sort by fare (asc/desc)            |
| GET    | `/api/v1/rides/user/{userId}`                  | Admin        | Rides for passenger                |
| GET    | `/api/v1/rides/user/{userId}/status/{status}`  | Admin        | Passenger rides by status          |
| GET    | `/api/v1/rides/driver/{driverId}/active-rides` | Admin        | Active rides for driver            |
| GET    | `/api/v1/rides/filter-status?status=&search=`  | Admin        | Filter by status + keyword         |
| GET    | `/api/v1/rides/advanced-search`                | Admin        | Advanced query with pagination     |
| GET    | `/api/v1/rides/date/{yyyy-mm-dd}`              | Admin        | Rides on specific date             |
| GET    | `/api/v1/analytics/rides-per-day`              | Admin/Driver | Rides grouped by day               |
| GET    | `/api/v1/analytics/status-summary`             | Admin/Driver | Count rides per status             |
| GET    | `/api/v1/analytics/driver/{driverId}/summary`  | Admin/Driver | Driver totals                      |
| GET    | `/api/v1/analytics/driver/{driverId}/earnings` | Admin/Driver | Driver earnings                    |
| GET    | `/api/v1/analytics/user/{userId}/spending`     | Admin        | Passenger spending                 |

### Test Data

| Field    | Passenger (Priya) | Driver (Dev)  |
| -------- | ----------------- | ------------- |
| name     | Priya Passenger   | Dev Driver    |
| username | `priya`           | `devdriver`   |
| password | `passenger123`    | `driver123`   |
| role     | `ROLE_USER`       | `ROLE_DRIVER` |

**Sample Rides:**

- Ride 1: Pickup: `Bangalore Palace`, Drop: `Kempegowda Airport`
- Ride 2: Pickup: `Indiranagar`, Drop: `Whitefield`

### Sample Postman Commands

Import via **Postman → Import → Raw Text**.

#### Register Passenger

```http
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "name": "Priya Passenger",
  "username": "priya",
  "password": "passenger123",
  "role": "ROLE_USER"
}
```

#### Register Driver

```http
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "name": "Dev Driver",
  "username": "devdriver",
  "password": "driver123",
  "role": "ROLE_DRIVER"
}
```

#### Login Passenger

```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "username": "priya",
  "password": "passenger123"
}
```

#### Login Driver

```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "username": "devdriver",
  "password": "driver123"
}
```

#### Create Ride (Passenger)

```http
POST {{baseUrl}}/api/v1/rides
Authorization: Bearer {{passengerToken}}
Content-Type: application/json

{
  "pickupLocation": "Bangalore Palace",
  "dropLocation": "Kempegowda Airport"
}
```

#### View Passenger Rides

```http
GET {{baseUrl}}/api/v1/rides/me
Authorization: Bearer {{passengerToken}}
```

#### View Pending Rides (Driver)

```http
GET {{baseUrl}}/api/v1/rides/pending
Authorization: Bearer {{driverToken}}
```

#### Accept Ride (Driver)

```http
POST {{baseUrl}}/api/v1/rides/accept/{{rideId}}
Authorization: Bearer {{driverToken}}
```

#### View Driver Rides

```http
GET {{baseUrl}}/api/v1/rides/driver/me
Authorization: Bearer {{driverToken}}
```

#### Complete Ride (Driver)

```http
POST {{baseUrl}}/api/v1/rides/complete/{{rideId}}
Authorization: Bearer {{driverToken}}
```

#### Search Rides by Keyword

```http
GET {{baseUrl}}/api/v1/rides/search?text=airport
Authorization: Bearer {{driverToken}}
```

#### Filter by Distance

```http
GET {{baseUrl}}/api/v1/rides/filter-distance?min=5&max=25
Authorization: Bearer {{driverToken}}
```

#### Filter by Date Range

```http
GET {{baseUrl}}/api/v1/rides/filter-date-range?start=2025-12-01&end=2025-12-31
Authorization: Bearer {{driverToken}}
```

#### Sort by Fare

```http
GET {{baseUrl}}/api/v1/rides/sort?order=desc
Authorization: Bearer {{driverToken}}
```

#### Get Rides for Passenger

```http
GET {{baseUrl}}/api/v1/rides/user/{{userId}}
Authorization: Bearer {{driverToken}}
```

#### Get Passenger Rides by Status

```http
GET {{baseUrl}}/api/v1/rides/user/{{userId}}/status/COMPLETED
Authorization: Bearer {{driverToken}}
```

#### Get Driver Active Rides

```http
GET {{baseUrl}}/api/v1/rides/driver/{{driverId}}/active-rides
Authorization: Bearer {{driverToken}}
```

#### Filter by Status + Keyword

```http
GET {{baseUrl}}/api/v1/rides/filter-status?status=ACCEPTED&search=palace
Authorization: Bearer {{driverToken}}
```

#### Advanced Search

```http
GET {{baseUrl}}/api/v1/rides/advanced-search?search=metro&status=REQUESTED&sort=fare&order=asc&page=0&size=5
Authorization: Bearer {{driverToken}}
```

#### Get Rides on Date

```http
GET {{baseUrl}}/api/v1/rides/date/2025-12-09
Authorization: Bearer {{driverToken}}
```

#### Analytics: Rides Per Day

```http
GET {{baseUrl}}/api/v1/analytics/rides-per-day
Authorization: Bearer {{driverToken}}
```

#### Analytics: Status Summary

```http
GET {{baseUrl}}/api/v1/analytics/status-summary
Authorization: Bearer {{driverToken}}
```

#### Analytics: Driver Summary

```http
GET {{baseUrl}}/api/v1/analytics/driver/{{driverId}}/summary
Authorization: Bearer {{driverToken}}
```

#### Analytics: Driver Earnings

```http
GET {{baseUrl}}/api/v1/analytics/driver/{{driverId}}/earnings
Authorization: Bearer {{driverToken}}
```

#### Analytics: Passenger Spending

```http
GET {{baseUrl}}/api/v1/analytics/user/{{userId}}/spending
Authorization: Bearer {{driverToken}}
```

## Frontend File Structure

```
client/
├── app/
│   ├── layout.tsx                          # Root layout + metadata
│   ├── page.tsx                            # Landing page
│   ├── auth/page.tsx                       # Login & registration
│   ├── dashboard/
│   │   ├── passenger/page.tsx              # Passenger dashboard
│   │   └── driver/page.tsx                 # Driver dashboard
│   └── profile/page.tsx                    # User profile
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.tsx              # Role-aware guard
│   │   ├── sidebarP.tsx                    # Passenger nav
│   │   └── sidebarD.tsx                    # Driver nav
│   └── libs/
│       ├── apiClient.ts                    # Axios + interceptors
│       ├── auth.ts                         # Auth helpers
│       ├── authApi.ts                      # Auth API bindings
│       ├── userDashboardApi.ts             # Passenger APIs
│       ├── driverDashboardApi.ts           # Driver APIs
│       ├── profileApi.ts                   # Profile APIs
│       └── types.ts                        # Shared types
└── package.json
```

## Key Features

- ✅ JWT authentication with BCrypt hashing, custom filter, role-aware security
- ✅ End-to-end ride lifecycle for passengers and drivers
- ✅ Advanced queries: search, filter, sort, pagination
- ✅ Analytics: rides/day, status summary, driver earnings, passenger spending
- ✅ MongoDB Atlas with aggregation pipelines and DTO mappers
- ✅ Next.js App Router with protected routes and Tailwind UI
