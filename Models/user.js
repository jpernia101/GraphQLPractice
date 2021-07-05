const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
   },
   password: {
       type: String,
       required: true
   },
   createdEvents: [{
       type: Schema.Types.ObjectId,
       //ref helps mongoose make a connection/relation to the Event collections
       ref: "Event"
   }]
})
module.exports = mongoose.model("User", userSchema );
