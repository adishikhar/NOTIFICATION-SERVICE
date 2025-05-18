# Notification Service (Backend)

This is a simple notification backend service that allows sending and fetching notifications via Email, SMS, and In-App methods.

---

##  Features

- REST API to send and fetch notifications
- Supports multiple types: `email`, `sms`, `inApp`
- RabbitMQ for background processing (queue)
- Retry mechanism for 4 failed messages

---

## Tech Stack

- Node.js + Express
- MongoDB (via Mongoose)
- RabbitMQ (via Docker)
- Swagger (OpenAPI 3.0)
- dotenv for environment management

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/adishikhar/notification-service.git
cd notification-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start RabbitMQ through Docker

Make sure Docker is installed and running,

```bash
docker run -d --hostname rabbitmq-host --name rabbitmq \
  -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Management UI: http://localhost:15672
(username: guest, password: guest)

### 4. Configure Environment Variables

Create a .env
```bash
PORT=3306
URL=your_mongo_connection_string
RABBITMQ_URL=amqp://localhost:5672
```
-URL= otherwise use mine :mongodb+srv://adishikhar:hDigwDQRsojmgskb@cluster0.jldza.mongodb.net/

### 5. Run the Server Locally

```bash
node server.js
```

### 6. API Documentation

If Swagger is enabled, access live API docs at:
```bash
http://localhost:3306/api-docs
```
---

#Example API Requests

Send a Notification
```bash
POST /notifications
content-type: application/json

{
  "userId": "Aditya_123",
  "type": "sms",
  "message": "HELLO! I am ADITYA"
}
```

 Get All Notifications for a User
 ```bash
GET /users/Aditya_123/notifications
```

#✅ Assumptions

-MongoDB Atlas is used for the database
-RabbitMQ can run locally or via a cloud provider 

#📂 Project Structure
```bash
Controllers/          # Route logic
Routes/               # API endpoints
models/               # Mongoose schema
services/             # Email, SMS, In-App logic
setup/                # RabbitMQ connection setup
workers/              # Background worker
.env                  # Environment variables
server.js             # Main server file
swagger.js            # Swagger UI
```
