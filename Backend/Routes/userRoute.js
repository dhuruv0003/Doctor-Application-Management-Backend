import { adminRegister, PatientRegister,  userLogin } from "../Controller/userController.js";

import express from 'express'

const router=express.Router();

router.post('/patient/register',PatientRegister);
router.post('/login',userLogin);
router.post('/admin/addnew',adminRegister)

export default router;