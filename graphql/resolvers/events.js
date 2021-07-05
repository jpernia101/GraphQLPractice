const { dateToString}  = require('../../helpers/date');
const Event = require('../../Models/event');
const User = require('../../Models/user');
const{ transformEvent } = require('./merge')
 


module.exports =  {  
    events: async () => {
    //populate is mongoose, helps w/ refs
    try{
    const events = await Event.find() 
        return events.map(event => {
            return transformEvent(event);
        })
    }
    catch(err)  {
        console.log(err);
        throw err;
        };
    },
createEvent: async (args, req) => {
    if(!req.isAuth){
        throw new Error("Unauthenticated");
    }
    //Event is of the model event.js type 
    const event = new Event({
        //the _id is auto-generated from mongo so no need to make it here
        title : args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: dateToString(args.eventInput.date),
        creator: req.userId
    });
    // "return event is some sort of way of making sure is async "
    // .save is mongoose way of inserting
    let createdEvent;
    try{
    const result = await event.save()  
    createdEvent =  transformEvent(result);
    const creator = await User.findById(req.userId);            
        //_doc is mongoose property
    if(!creator){
        throw new Error('User not found');
    }
    creator.createdEvents.push(event);
    await creator.save();
    return createdEvent;
    }
    catch(err) { 
        console.log(err)
        throw err;
    };
}



}