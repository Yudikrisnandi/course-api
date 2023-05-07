const router = require('express').Router();
const { login, register } = require('../controllers/user');
const { check, validationResult } = require('express-validator');

router.post(
  '/register', 
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  register
);

router.post(
  '/login', 
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  login
);

module.exports = router;
