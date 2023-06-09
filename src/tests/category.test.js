const request = require('supertest')
const app = require('../app')

let token;
let categoryId

beforeAll(async() => {
    const credentials = {
        email: "testemail@gmail.com",
        password: "testpassword"
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
})

test('POST /categories should create a category', async () => {
    const body = {
        name: "tablets"
    }
    const res = await request(app)
        .post('/categories')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    categoryId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});


test('GET /categories should get categories', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /categories/:id should update a category', async () => {
    const categoryUpdated = {
        name: "category updated"
    }
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(categoryUpdated)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoryUpdated.name);
});

test('DELETE /categories/:id should delete a category', async () => {
    const res = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});