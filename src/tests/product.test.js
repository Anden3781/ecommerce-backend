const request = require('supertest')
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models')

let token;
let productId;

beforeAll(async() => {
    const credentials = {
        email: "testemail@gmail.com",
        password: "testpassword"
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
})

test('POST /products should create a product', async () => {
    const category = await Category.create({ name: "tablet" })
    const product = {
        title: "Lorem ipsum",
        description: "at eu laoreet sodales erat primis. Vivamus primis integer sed nostra ultrices dui, morbi dictumst sapien vulputate mauris vehicula, etiam potenti aenean donec libero. Cras dui porta vel porttitor rutrum commodo augue condimentum potenti pellentesque, erat ullamcorper tellus id arcu sollicitudin nullam praesent ultrices, iaculis sociis cursus nam pretium interdum imperdiet conubia aptent.",
        categoryId: category.id,
        price: 100,
        brand: 'apple'
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`)
    productId = res.body.id
    await category.destroy()
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /products/:id/images should set the products images', async () => {
    const image = await ProductImg.create({
        url: "http://falseurl.com",
        publicId: "false id"
    }) 
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set(`Authorization`, `Bearer ${token}`)
    await image.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /products/:id should update a product', async () => {
    const productUpdated = {
        title: "productUpdated"
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(productUpdated)
        .set(`Authorization`, `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);
});

test('DELETE /products/:id should delete a produc', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set(`Authorization`, `Bearer ${token}`)
    expect(res.status).toBe(204);
});