const express = require('express');
const passport = require('passport');
const route = express.Router();

const UserController = require('../app/controllers/UserController');
const authenticateUser = require('../app/middlewares/Authenticate');
const requireLogin = require('../app/middlewares/LoginRequires');

// route.post('/remove-from-cart/:id', requireLogin,UserController.removeFromCart);
// route.post('/add-to-cart/:id', requireLogin,UserController.addToCart);

route.put('/updateinfo/:id', requireLogin,UserController.updateImage);

route.post('/payment', requireLogin, UserController.payment);
route.post('/stored-order', requireLogin, UserController.storedOrder);
route.post('/delete-order/:id', requireLogin, UserController.deleteOrder);
route.post('/cancel-order/:id', requireLogin, UserController.cancelOrder);
route.get('/complete/:id',requireLogin,UserController.complete);
route.post('/feedback', UserController.feedback);
route.get('/ordered', requireLogin, UserController.ordered);
route.get('/viewbooktable', requireLogin, UserController.viewTableReservation);
route.get('/viewbooktable2',requireLogin, UserController.viewTableReservation2);
route.post('/register', UserController.register);
route.post('/login', UserController.login, authenticateUser);
route.get('/resetpassword/:id/:token', UserController.resetPassword);
route.put('/updatepassword/:id/:token', UserController.updatePassword);
route.get('/logout', UserController.logout);
route.get('/',requireLogin, UserController.index);

module.exports = route;
