import { adminRegister, getAllDoctors, PatientRegister,  userLogin } from "../Controller/userController.js";

import express from 'express'
import { isAdminAuthentication, isPatientAuthentication } from "../MiddleWares/Auth.js";

const router=express.Router();

router.post('/patient/register',PatientRegister);
router.post('/login',userLogin);
router.post('/admin/addnew',isAdminAuthentication,adminRegister)
router.get('/doctor',getAllDoctors)


export default router;