const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const userRoutes = express.Router();

userRoutes.route('/')
    .get(verifyJWT, getAll)
    .post(create);

userRoutes.route('/login')
    .post(login)

userRoutes.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRoutes;