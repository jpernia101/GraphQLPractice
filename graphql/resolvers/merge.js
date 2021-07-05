const Event = require('../../Models/event');
const User = require('../../Models/user');
const {dateToString} = require('../../helpers/date');

const user = async userId => {
    try{
    const user = await User.findById(userId)
    return {...user._doc, 
            createdEvents: events.bind(this, user._doc.createdEvent) 
        };
    }
    catch(err)  {
        throw err;
    };
}

const events  = async eventIds => {   
    try {
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map( event => { 
            return transformEvent(event);
        });
    }
    catch(err) {
        throw err;
    }
}
 
const singleEvent = async eventId => {
    try{
        const event = await Event.findOne(eventId);
        return transformEvent(event);
    }
    catch(err){
        throw err;
    }
}

const transformEvent = (event) =>{
    return {
        ...event._doc,
         _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    };
};


const transformBooking = (booking) => {
    return {
        ...booking.doc,
        user : user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.createdAt)
    }
}

exports.transformEvent = transformEvent
exports.transformBooking = transformBooking;
//exports.user = user;
// exports.events = events
//exports.singleEvent = singleEvent