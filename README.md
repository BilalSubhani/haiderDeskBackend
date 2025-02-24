# Haiders Desk Backend

This is the **NestJS** backend for the frontend of **Haiders Desk**. The server provides **RESTful APIs** for managing **Admins, Logos, and Emails**. Authentication is implemented using **JWT Tokens** for secure access.

## 🚀 Features

- **NestJS Framework** for a modular and scalable backend
- **MongoDB Atlas** for database storage
- **JWT Authentication** for secure access
- **RESTful APIs** for CRUD operations on **Admins, Logos, and Emails**
- **Environment Variables Support** for configuration

## 📂 Project Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/BilalSubhani/haiderDeskBackend.git
cd haiderDeskBackend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Create a `.env` File

A `.env` file must be created in the root directory with the following variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000  # (Optional: Default is 3000)
```

### 4️⃣ Run the Server

#### Development Mode:

```sh
npm run start:dev
```

#### Production Mode:

```sh
npm run build
npm run start:prod
```

## 📡 API Endpoints

### **Admin APIs**

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/admin`              | Create an admin    |
| GET    | `/admin`              | Get all admins     |
| GET    | `/admin/:id`          | Get admin by ID    |
| GET    | `/admin/email/:email` | Get admin by email |
| PATCH  | `/admin/:id`          | Update an admin    |
| DELETE | `/admin/:id`          | Delete an admin    |

### **Category APIs**

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | `/categories`     | Create a category  |
| GET    | `/categories`     | Get all categories |
| GET    | `/categories/:id` | Get category by ID |
| PATCH  | `/categories/:id` | Update a category  |
| DELETE | `/categories/:id` | Delete a category  |

### **Logo APIs**

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| POST   | `/logo`     | Create a logo  |
| GET    | `/logo`     | Get all logos  |
| GET    | `/logo/:id` | Get logo by ID |
| PATCH  | `/logo/:id` | Update a logo  |
| DELETE | `/logo/:id` | Delete a logo  |

### **Connected Email APIs**

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | `/email`     | Add an email    |
| GET    | `/email`     | Get all emails  |
| GET    | `/email/:id` | Get email by ID |
| PATCH  | `/email/:id` | Update an email |
| DELETE | `/email/:id` | Delete an email |

### **Send Email APIs**

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/send-email` | Send email to connected emails |

### **Orders APIs**

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/orders`            | Add an order           |
| GET    | `/orders`            | Get all orders         |
| GET    | `/orders/:id`        | Get order by ID        |
| PATCH  | `/orders/:id/status` | Update an order status |
| DELETE | `/orders/:id`        | Delete an order        |

## 🛠 Technologies Used

- **NestJS** - Backend framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication & Authorization
- **RESTful APIs** - CRUD operations

## 📬 Contact

For any issues or queries, contact me at:
📧 **Email:** [bilalsubhanii@outlook.com](mailto:bilalsubhanii@outlook.com)

---
