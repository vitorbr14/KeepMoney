const mongoose = require('mongoose')
const ValueSchema = new mongoose.Schema({
    value: {
        type: Number,
        required:[true, 'Please provid a value'],
        maxlength:50
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide an User']
        
    },
},{timestamps:true})


module.exports = mongoose.model('Task',ValueSchema)