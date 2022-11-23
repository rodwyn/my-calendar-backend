// User Routes: / Auth
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
  '/new',
  [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Email field is required').isEmail(),
    check('password', 'Password field is required').isLength({ min: 6 })
  ],
  createUser
);
router.post(
  '/',
  [
    check('email', 'Email field is required').isEmail(),
    check('password', 'Password field is required').isLength({ min: 6 })
  ],  
  loginUser
);
router.get('/renew', renewToken)

module.exports = router;
