# Notification Service (Backend)

This is a simple notification backend service that allows sending and fetching notifications via Email, SMS, and In-App methods.

---

## 🚀 Features

- REST API to send and fetch notifications
- Supports multiple types: `email`, `sms`, `inApp`
- RabbitMQ for background processing (queue)
- Retry mechanism for 4 failed messages

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB (via Mongoose)
- RabbitMQ (via Docker)
- Swagger (OpenAPI 3.0)
- dotenv for environment management

---

## 📦 Installation & Setup

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

### 6. 📘 API Documentation

If Swagger is enabled, access live API docs at:
```bash
http://localhost:3306/api-docs
```


📬 Example API Requests
➕ Send a Notification
http
Copy
Edit
POST /notifications
Content-Type: application/json

{
  "userId": "john_doe_123",
  "type": "inApp",
  "message": "Welcome to our app!"
}
📥 Get All Notifications for a User
http
Copy
Edit
GET /users/john_doe_123/notifications
🌀 Queue and Retry Logic
All notifications are added to a RabbitMQ queue (notification_queue)

A worker consumes them in the background

If a service fails, it retries up to 4 times

