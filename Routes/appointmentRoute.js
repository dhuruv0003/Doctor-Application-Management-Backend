import express from 'express';
const router=express.Router();
import {isPatientAuthentication} from '../MiddleWares/Auth.js'
import { postAppointment } from '../Controller/appointmentController.js';

// an appointment can be post by a patient only
router.post('/post',isPatientAuthentication,postAppointment)

export default router