# Appointment Booking Microservice
Tech Stack: Node,js, Express, Prisma, MongoDB, RabbitMQ

Note: All the services needs to be started before use. Click on the Base URL for services to start.

## Auth Microservice Routes:
Base URL: `https://auth-microservice-khs4.onrender.com/`
1. Register User- `/api/auth/register`
    Payload:
    ```
    {
      name: String,
      email: String,
      password: String,
      user_type: User/Doctor 
    }
    ```
2. Login User- `/api/auth/login`
     Payload:
    ```
    {
      email: String,
      password: String
    }
3. Get User- `/api/auth/user/:id`
   Query Params: User Id (String)

## Appointment Microservice Routes:
Base URL: `https://appointment-microservice.onrender.com/`
1. Create Appointment: `/api/appontment/new`
    Payload:
```
{
  doctorId: String
  userId: String
  schedule: Timestamp (Integer)
}
```
## Email Service:
Base URL : `https://node-microservice-008q.onrender.com/`
No routes defined, only internal routes for messaging Queues.
