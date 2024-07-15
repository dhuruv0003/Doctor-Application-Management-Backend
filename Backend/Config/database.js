const mongoose=require('mongoose')


exports.dbConnect=async()=>{
    try {
        mongoose.connect()
    } catch (error) {
        
    }
}