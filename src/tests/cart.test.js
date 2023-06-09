const request = require('supertest')
const app = require('../app');
const Product = require('../models/Product');
require('../models')

let token;
let cartId;

beforeAll(async() => {
    const credentials = {
        email: "testemail@gmail.com",
        password: "testpassword"
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
})

test('POST /carts should create a cart', async () => {
    const products = await Product.create({
        title: "My title",
        description: "My description",
        price: 100,
        brand: "My brand"
    })
    const cart = {
        productId: products.id,
        quantity: 5
    }
    const res = await request(app)
        .post('/carts')
        .send(cart)
        .set('Authorization', `Bearer ${token}`)
    await products.destroy()
    cartId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /carts should get carts', async () => {
    const res = await request(app)
        .get('/carts')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /carts/:id should update a cart', async () => {
    const cartUpdated = {
        quantity: 1
    }
    const res = await request(app)
        .put(`/carts/${cartId}`)
        .send(cartUpdated)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('DELETE /carts/:id should delete a cart', async () => {
    const res = await request(app)
        .delete(`/carts/${cartId}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});