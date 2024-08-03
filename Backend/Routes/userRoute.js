import { adminRegister, getAllDoctors, getUserDetails, PatientRegister,  userLogin } from "../Controller/userController.js";

import express from 'express'
import { isAdminAuthentication, isPatientAuthentication } from "../MiddleWares/Auth.js";

const router=express.Router();

router.post('/patient/register',isPatientAuthentication,PatientRegister);
router.post('/login',userLogin);
router.post('/admin/addnew',isAdminAuthentication,adminRegister)
router.get('/doctor',getAllDoctors)
router.get('/admin/me',isAdminAuthentication,getUserDetails)
router.get('/admin/me',isPatientAuthentication,getUserDetails)

export default router;