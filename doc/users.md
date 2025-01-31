# Documentation api 
## Introduction
api ini memungkinkan kita mendapatkan endpoint user dari aplikasi business to berkah yang akan dibuat 

## 1. User
endpoint untuk mengatur lalulintas data user dari aplikasi

### a. Register user

endpoint: POST /users/register ;

authentication: token;

request body: 
```json
{
    username:"data.username",
    password:"data.password",
    email:"data.email",
}
```

response body (success):
```json
{
    status: 200,
    message: "anda berhasil Register akun",
    data: {
        username: "data.username",
        email: "data.email",
        token: "data.token"
    }
}

```
response body (failed):
```json
{
    status: 404,
    error: "register failed please try with another email",
}

```

### b. Login user
endpoint: POST /users/register ;

authentication: token;

request body: 
```json
{
    username:"data.username",
    password:"data.password",
    email:"data.email",
}
```

response body (success):
```json
{
    status: 200,
    message: "anda berhasil login",
    data: {
        username: "data.username",
        email: "data.email",
        token: "data.token"
    }
}

```
response body (failed):
```json
{
    status: 404,
    error: "login failed please try with another email",
}

```

### C. Get user
endpoint: GET /users/current ;

Headers:
- authentication: token;



response body (success):
```json
{
    status: 200,
    message: "anda berhasil login",
    data: {
        username: "data.username",
        email: "data.email",
        token: "data.token"
    }
}

```
response body (failed):
```json
{
    status: 404,
    error: " failed  ",
}

```

