import express from 'express';
import { getMessage, sendMessage } from  '../Controller/messageController.js'

import { isAdminAuthentication } from '../MiddleWares/Auth.js';

 const router=express.Router();

router.post('/send',sendMessage)

// Only admin can see the message, but not any doctor
router.get('/getallMessage',isAdminAuthentication,getMessage)

export default router