// User Routes: / Auth
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validateJWT');

router.post(
  '/new',
  [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Email field is required').isEmail(),
    check('password', 'Password field is required').isLength({ min: 6 }),
    fieldValidator
  ],
  createUser
);
router.post(
  '/',
  [
    check('email', 'Email field is required').isEmail(),
    check('password', 'Password field is required').isLength({ min: 6 }),
    fieldValidator
  ],  
  loginUser
);
router.get('/renew', validateJWT ,renewToken)

module.exports = router;
