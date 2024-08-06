import express from 'express';
const router=express.Router();
import {isAdminAuthentication, isPatientAuthentication} from '../MiddleWares/Auth.js'
import { getAllAppointments, postAppointment } from '../Controller/appointmentController.js';

// an appointment can be post by a patient only
router.post('/post',isPatientAuthentication,postAppointment)
router.get('/getAll',isAdminAuthentication,getAllAppointments)

export default router