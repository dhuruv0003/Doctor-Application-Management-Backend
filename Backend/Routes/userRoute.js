import { adminRegister, getAllDoctors, getUserDetails, logOutAdmin, logOutPatient, PatientRegister,  userLogin } from "../Controller/userController.js";

import express from 'express'
import { isAdminAuthentication, isPatientAuthentication } from "../MiddleWares/Auth.js";

const router=express.Router();

router.post('/patient/register',PatientRegister);
router.post('/login',userLogin);
router.post('/admin/addnew',isAdminAuthentication,adminRegister)
router.get('/doctor',getAllDoctors)
router.get('/admin/me',isAdminAuthentication,getUserDetails)
router.get('/patient/me',isPatientAuthentication,getUserDetails)
router.get('/admin/logout',isAdminAuthentication,logOutAdmin)
router.get('/patient/logout',isPatientAuthentication,logOutPatient)

export default router;