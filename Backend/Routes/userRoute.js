import { register, userLogin } from "../Controller/userController.js";

import express from 'express'

const router=express.Router();

router.post('/register',register);
router.post('/login',userLogin);

export default router;