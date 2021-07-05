//THIS FILE SERVE AS THE MODEL DEFINTION FOR  EVENT
//MONGOOSE HELPS MAKES THIS EASIER 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title :{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

//EXPORT THE MODULE SO OTHER FILES CAN USE IT.
module.exports = mongoose.model("Event", eventSchema);