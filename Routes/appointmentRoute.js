import express from 'express';
const router=express.Router();
import {isAdminAuthentication, isPatientAuthentication} from '../MiddleWares/Auth.js'
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from '../Controller/appointmentController.js';

// an appointment can be post by a patient only
router.post('/post',isPatientAuthentication,postAppointment)
router.get('/getAll',isAdminAuthentication,getAllAppointments)
router.put('/update/:id',isAdminAuthentication,updateAppointmentStatus)

router.delete('/delete/:id',isAdminAuthentication,deleteAppointment)

export default router