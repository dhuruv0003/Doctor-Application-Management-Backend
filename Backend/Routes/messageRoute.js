const express=require('express');
const { sendMessage } = require('../Controller/messageController');

const router=express.Router();

router.post('/send',sendMessage)

module.exports=router;