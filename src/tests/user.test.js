const request = require('supertest')
const app = require('../app')

let userId;
let token;

test('POST /users should create a user', async () => {
    const body = {
        firstName: "anderson",
        lastName: "puppi",
        email: "ander@gmail.com",
        password: "ander1234",
        phone: "987654321"
    }
    const res = await request(app).post('/users').send(body)
    userId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login should do login', async () => {
    const credentials = {
        email: "ander@gmail.com",
        password: "ander1234"
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials)
    token = res.body.token
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined();
});


test('POST /users/login with invalid credentials should trhow an error', async () => {
    const credentials = {
        email: "invalidander@gmail.com",
        password: "ander1234"
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials)

    expect(res.status).toBe(401)
});

test('GET /users should get all users', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('PUT /users/:id should update a user', async () => {
    const userUpdated = {
        firstName: "anderson updated"
    }
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(userUpdated)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
});

test('DELETE /users/:id should delete a user', async () => {
    const res = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});