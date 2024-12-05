// const { login, googleSignIn, renewToken } = require('../controllers/auth.controller')
import { Router } from "express";
import { check } from "express-validator";
import { validator } from "../middlewares/validator.middleware.js";
import { signin, login, validateJWT } from "../controllers/auth.controller.js";

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validator
], login );

router.post('/signin', [
    check('name', 'Name is required').not().isEmpty(),
    check('last_name', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    validator
], signin );

router.post('/validate', [
    check('token', 'Token expected').isLength({ min: 10 }),
    validator
], validateJWT );



export default router;