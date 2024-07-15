const MessageMod=require('../Models/messageSchema')

exports.sendMessage=async(req,res)=>{

    //Fetch data from req.body
    const {FirstName,LastName,Email,Phone,Message}=req.body;

    // check if above parameters exists or not

    if(!FirstName || !LastName || !Email || !Phone || !Message){
        return res.status(401).json({
            success:false,
            message:"Icomplete Data in the request"
        });
    }

    //Create entry in database

    const dbEntry=await MessageMod.create({
        FirstName,LastName,Email,Phone,Message
    })
    return res.status(200).json({
        success:true,
        message:"Database Entry created Successfully",
        dbEntry
    })
}