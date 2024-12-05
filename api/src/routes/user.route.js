import { Router } from "express";
import { check } from "express-validator";
import { validator } from "../middlewares/validator.middleware.js";
import { 
    setUserBalance, 
    deleteUser,
    updatedUser
} from "../controllers/user.controller.js";

const router = Router();

router.delete('/:id', [
    check('id', 'Id do not exist').isUUID(),
    validator
], deleteUser );

router.patch('/:id', [
    check('id', 'Id do not exist').isUUID(),
    check('age', 'Age is required and shoud be int').notEmpty().isInt(),
    check('eyeColor', 'Eye color is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('phone', 'Phone is required').notEmpty(),
    check('address', 'Address is required').notEmpty(),
    validator
], updatedUser );

router.patch('/balance/:id', [
    check('id', 'Id do not exist').isUUID(),
    check('balance', 'Balance is required').notEmpty(),
    validator
], setUserBalance );


export default router;