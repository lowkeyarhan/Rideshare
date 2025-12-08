# Rideshare API - Postman Testing Guide

## Base URL

```
http://localhost:8080
```

---

## 1. AUTH ENDPOINTS

### 1.1 Register a New User (RIDER)

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/register`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Alice Johnson",
  "username": "alice_rider",
  "password": "password123",
  "role": "RIDER"
}
```

**Expected Response (200 OK):**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "alice_rider",
  "role": "RIDER"
}
```

---

### 1.2 Register a Driver

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/register`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Bob Smith",
  "username": "bob_driver",
  "password": "securepass456",
  "role": "DRIVER"
}
```

**Expected Response (200 OK):**

```json
{
  "id": "507f1f77bcf86cd799439012",
  "username": "bob_driver",
  "role": "DRIVER"
}
```

---

### 1.3 Register an Admin

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/register`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Charlie Admin",
  "username": "charlie_admin",
  "password": "adminpass789",
  "role": "ADMIN"
}
```

**Expected Response (200 OK):**

```json
{
  "id": "507f1f77bcf86cd799439013",
  "username": "charlie_admin",
  "role": "ADMIN"
}
```

---

### 1.4 Login & Get JWT Token (as Rider)

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/login`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "username": "alice_rider",
  "password": "password123"
}
```

**Expected Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZV9yaWRlciIsInJvbGUiOiJSSURFUiIsImlhdCI6MTczMzY3MTIwMCwiZXhwIjoxNzMzNjc0ODAwfQ.xxx",
  "username": "alice_rider",
  "role": "RIDER"
}
```

**⚠️ Save the token value for use in protected endpoints**

---

### 1.5 Login as Driver

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/login`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "username": "bob_driver",
  "password": "securepass456"
}
```

**Expected Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib2JfZHJpdmVyIiwicm9sZSI6IkRSSVZFUiIsImlhdCI6MTczMzY3MTIwMCwiZXhwIjoxNzMzNjc0ODAwfQ.xxx",
  "username": "bob_driver",
  "role": "DRIVER"
}
```

---

### 1.6 Login with Invalid Credentials

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/login`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "username": "alice_rider",
  "password": "wrongpassword"
}
```

**Expected Response (401 Unauthorized):**

```
Invalid username or password
```

---

### 1.7 Register with Duplicate Username (should fail)

**Method:** POST  
**URL:** `http://localhost:8080/api/auth/register`  
**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Another Alice",
  "username": "alice_rider",
  "password": "different_password",
  "role": "RIDER"
}
```

**Expected Response (409 Conflict or null):**

```
Username already exists
```

---

## 2. USER ENDPOINTS (JWT Protected)

### 2.1 Get User by Username

**Method:** GET  
**URL:** `http://localhost:8080/api/users/alice_rider`  
**Headers:**

```
Authorization: Bearer {TOKEN_FROM_LOGIN}
Content-Type: application/json
```

**Replace `{TOKEN_FROM_LOGIN}` with actual token from step 1.4**

**Expected Response (200 OK):**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Alice Johnson",
  "username": "alice_rider",
  "password": "$2a$10$...", // hashed
  "role": "RIDER"
}
```

---

### 2.2 Get Non-existent User

**Method:** GET  
**URL:** `http://localhost:8080/api/users/nonexistent_user`  
**Headers:**

```
Authorization: Bearer {TOKEN_FROM_LOGIN}
Content-Type: application/json
```

**Expected Response (404 Not Found)**

---

### 2.3 Access Protected Endpoint Without Token

**Method:** GET  
**URL:** `http://localhost:8080/api/users/alice_rider`  
**Headers:**

```
Content-Type: application/json
```

**Expected Response (401 Unauthorized or Forbidden)**

---

## 3. RIDE ENDPOINTS (JWT Protected)

### 3.1 Create a Ride (Rider requests a ride)

**Method:** POST  
**URL:** `http://localhost:8080/api/rides`  
**Headers:**

```
Authorization: Bearer {RIDER_TOKEN}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "pickupLocation": "123 Main Street, Downtown",
  "dropLocation": "456 Oak Avenue, Uptown",
  "status": "REQUESTED"
}
```

**Expected Response (200 OK):**

```json
{
  "id": "507f1f77bcf86cd799439021",
  "userId": "507f1f77bcf86cd799439011",
  "driverId": null,
  "pickupLocation": "123 Main Street, Downtown",
  "dropLocation": "456 Oak Avenue, Uptown",
  "status": "REQUESTED",
  "rideTime": "2025-12-08T14:45:30"
}
```

**⚠️ Save the ride ID for subsequent tests**

---

### 3.2 Create Another Ride

**Method:** POST  
**URL:** `http://localhost:8080/api/rides`  
**Headers:**

```
Authorization: Bearer {RIDER_TOKEN}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "pickupLocation": "Airport Terminal A",
  "dropLocation": "Hotel Downtown",
  "status": "REQUESTED"
}
```

**Expected Response (200 OK):**

```json
{
  "id": "507f1f77bcf86cd799439022",
  "userId": "507f1f77bcf86cd799439011",
  "driverId": null,
  "pickupLocation": "Airport Terminal A",
  "dropLocation": "Hotel Downtown",
  "status": "REQUESTED",
  "rideTime": "2025-12-08T14:46:15"
}
```

---

### 3.3 Get All Rides for a User

**Method:** GET  
**URL:** `http://localhost:8080/api/rides/user/507f1f77bcf86cd799439011`  
**Headers:**

```
Authorization: Bearer {RIDER_TOKEN}
Content-Type: application/json
```

**Expected Response (200 OK):**

```json
[
  {
    "id": "507f1f77bcf86cd799439021",
    "userId": "507f1f77bcf86cd799439011",
    "driverId": null,
    "pickupLocation": "123 Main Street, Downtown",
    "dropLocation": "456 Oak Avenue, Uptown",
    "status": "REQUESTED",
    "rideTime": "2025-12-08T14:45:30"
  },
  {
    "id": "507f1f77bcf86cd799439022",
    "userId": "507f1f77bcf86cd799439011",
    "driverId": null,
    "pickupLocation": "Airport Terminal A",
    "dropLocation": "Hotel Downtown",
    "status": "REQUESTED",
    "rideTime": "2025-12-08T14:46:15"
  }
]
```

---

### 3.4 Get Rides Completed by a Driver

**Method:** GET  
**URL:** `http://localhost:8080/api/rides/driver/507f1f77bcf86cd799439012`  
**Headers:**

```
Authorization: Bearer {DRIVER_TOKEN}
Content-Type: application/json
```

**Expected Response (200 OK - Empty if driver hasn't completed rides):**

```json
[]
```

---

### 3.5 Create Ride with Missing Required Field

**Method:** POST  
**URL:** `http://localhost:8080/api/rides`  
**Headers:**

```
Authorization: Bearer {RIDER_TOKEN}
Content-Type: application/json
```

**Body (missing dropLocation):**

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "pickupLocation": "123 Main Street",
  "status": "REQUESTED"
}
```

**Expected Response (400 Bad Request - Validation Error)**

---

## 4. TOKEN LIFECYCLE TESTING

### 4.1 Use Expired Token (Wait 1+ hour or simulate)

**Method:** GET  
**URL:** `http://localhost:8080/api/users/alice_rider`  
**Headers:**

```
Authorization: Bearer {EXPIRED_TOKEN}
Content-Type: application/json
```

**Expected Response (401 Unauthorized - Token expired)**

---

### 4.2 Use Malformed Token

**Method:** GET  
**URL:** `http://localhost:8080/api/users/alice_rider`  
**Headers:**

```
Authorization: Bearer invalid.token.here
Content-Type: application/json
```

**Expected Response (401 Unauthorized - Invalid signature)**

---

## 5. QUICK TEST SEQUENCE

Follow this order to fully test the system:

1. **Register Rider** (1.1) → Save user ID
2. **Register Driver** (1.2) → Save user ID
3. **Login as Rider** (1.4) → Save **RIDER_TOKEN**
4. **Login as Driver** (1.5) → Save **DRIVER_TOKEN**
5. **Get Rider User** (2.1) → Use RIDER_TOKEN
6. **Create Ride** (3.1) → Use RIDER_TOKEN → Save ride ID
7. **Get User Rides** (3.3) → Use RIDER_TOKEN
8. **Get Driver Rides** (3.4) → Use DRIVER_TOKEN

---

## 6. cURL Command Examples

If you prefer command-line testing:

### Register:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "username": "testuser",
    "password": "password123",
    "role": "RIDER"
  }'
```

### Login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Get User (Replace TOKEN):

```bash
curl -X GET http://localhost:8080/api/users/testuser \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

### Create Ride (Replace TOKEN and USER_ID):

```bash
curl -X POST http://localhost:8080/api/rides \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "pickupLocation": "Location A",
    "dropLocation": "Location B",
    "status": "REQUESTED"
  }'
```

---

## 7. Success Indicators

✅ **System is working if:**

- Register creates users without duplicates
- Login returns a valid JWT token
- Protected endpoints reject requests without token
- Protected endpoints accept requests with valid token
- Rides are created and persisted
- User ride history returns correct rides

❌ **Issues to watch for:**

- 500 errors = Check MongoDB connection
- 401 on protected endpoints without token = Expected (correct behavior)
- 409/conflict on duplicate usernames = Expected (correct behavior)
- Null responses on register = Duplicate username detected

---

## Notes

- **Token expiry:** 1 hour from creation
- **Password encoding:** BCrypt (hashed in DB, never plain text)
- **Role values:** RIDER, DRIVER, ADMIN (case-sensitive in enum)
- **Database:** MongoDB (must be running and accessible)
