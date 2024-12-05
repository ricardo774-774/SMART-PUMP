import { Router } from "express";
import { validator } from "../middlewares/validator.middleware.js";
import { getRoleById } from "../controllers/role.controller.js";

const router = Router();

router.get('/:id', [
    validator
], getRoleById );

export default router;