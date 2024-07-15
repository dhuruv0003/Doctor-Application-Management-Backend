const express=require('express');
const { sendMessage } = require('../Controller/messageController');

const router=express.Router();

router.post('/message',sendMessage)

module.exports=router;